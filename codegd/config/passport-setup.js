// codegd/config/passport-setup.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const db = require('../DB');
require('dotenv').config();

// Hàm này được gọi khi user đăng nhập thành công, nó sẽ quyết định lưu gì vào session.
// Ở đây chúng ta chỉ lưu user.id để session được nhẹ.
passport.serializeUser((user, done) => {
  // Quan trọng: user có thể là safeUser (từ login) hoặc createdUser (từ register)
  // Đảm bảo rằng 'user' luôn là đối tượng đầy đủ trước khi gọi done
  done(null, user.id);
});

// Hàm này được gọi ở MỖI request, để lấy thông tin user từ session (dùng id)
passport.deserializeUser(async (id, done) => {
  try {
    // Lấy thông tin an toàn (không lấy password)
    const [rows] = await db.query('SELECT id, name, email, avatar, provider FROM users WHERE id = ?', [id]);
    if (rows.length > 0) {
      return done(null, rows[0]); // Trả về user object (an toàn)
    }
    return done(new Error('User not found'), null);
  } catch (err) {
    return done(err, null);
  }
});

// --- Cấu hình Local Strategy (Đăng nhập thủ công) ---
passport.use(new LocalStrategy(
  { usernameField: 'email' }, // Nói cho Passport biết chúng ta dùng email thay cho username
  async (email, password, done) => {
    try {
      // Tìm người dùng trong DB bằng email
      const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
      if (rows.length === 0) {
        return done(null, false, { message: 'Email không tồn tại.' });
      }
      const user = rows[0];

      // Chỉ tài khoản 'local' mới có mật khẩu
      if (user.provider !== 'local') {
        return done(null, false, { message: 'Tài khoản này được đăng ký bằng Google. Vui lòng đăng nhập bằng Google.' });
      }

      // So sánh mật khẩu đã mã hóa
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'Mật khẩu không chính xác.' });
      }

      // Nếu mọi thứ đúng, trả về người dùng (phiên bản an toàn, không password)
      const safeUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        provider: user.provider
      };
      return done(null, safeUser);

    } catch (err) {
      return done(err);
    }
  }
));

// --- Cấu hình Google Strategy ---
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback', // Khớp với routes/auth.js
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id, displayName, emails, photos } = profile;
      const email = emails[0].value;
      const google_id = id;
      const avatar = photos && photos.length > 0 ? photos[0].value : null;

      try {
        // --- LOGIC MỚI ĐỂ SỬA LỖI "DUPLICATE ENTRY" ---

        // Bước 1: Tìm user bằng Google ID
        const [existingUserByGoogleId] = await db.query('SELECT id, name, email, avatar, provider FROM users WHERE google_id = ?', [google_id]);

        if (existingUserByGoogleId.length > 0) {
          // 1. ĐÃ TÌM THẤY BẰNG GOOGLE ID (Đăng nhập bình thường)
          const user = existingUserByGoogleId[0];
          // Cập nhật avatar nếu có thay đổi
          if (user.avatar !== avatar) {
            await db.query('UPDATE users SET avatar = ? WHERE google_id = ?', [avatar, google_id]);
            user.avatar = avatar; // Cập nhật avatar cho session
          }
          return done(null, user);
        }

        // 2. KHÔNG TÌM THẤY BẰNG GOOGLE ID -> Kiểm tra bằng EMAIL
        const [existingUserByEmail] = await db.query('SELECT id, name, email, avatar, provider FROM users WHERE email = ?', [email]);
        
        if (existingUserByEmail.length > 0) {
          // 3. ĐÃ TÌM THẤY BẰNG EMAIL (Tài khoản local, như 'votientrien26@gmail.com')
          // -> Chúng ta cần LIÊN KẾT tài khoản này
          
          const user = existingUserByEmail[0];
          
          // Cập nhật tài khoản local, thêm google_id và avatar mới
          await db.query(
            'UPDATE users SET google_id = ?, avatar = ?, provider = ? WHERE email = ?', 
            [google_id, user.avatar || avatar, 'google', email] // (Giữ avatar cũ nếu có, hoặc cập nhật avatar Google)
          );
          
          // Cập nhật lại đối tượng user để trả về
          user.google_id = google_id;
          user.avatar = user.avatar || avatar;
          user.provider = 'google';
          
          return done(null, user); // Đăng nhập user đã được liên kết
        }

        // 4. KHÔNG TÌM THẤY BẰNG CẢ GOOGLE ID VÀ EMAIL (User mới hoàn toàn)
        // -> Tạo user mới
        const newUser = { 
          google_id, 
          name: displayName, 
          email, 
          avatar, 
          provider: 'google' 
          // Không có password
        };
        const [result] = await db.query('INSERT INTO users SET ?', newUser);
        
        const createdUser = { id: result.insertId, ...newUser };
        return done(null, createdUser);

        // --- KẾT THÚC LOGIC MỚI ---
      } catch (err) {
        console.error('Lỗi trong Google Strategy:', err);
        return done(err, null);
      }
    }
  )
);