// codegd/config/passport-setup.js

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy; // <-- 1. Import LocalStrategy
const bcrypt = require('bcryptjs'); // <-- 2. Import bcrypt
const db = require('../DB');
require('dotenv').config();
// Hàm này được gọi khi user đăng nhập thành công, nó sẽ quyết định lưu gì vào session.
// Ở đây chúng ta chỉ lưu user.id để session được nhẹ.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Hàm này được gọi ở mỗi request sau khi đã đăng nhập.
// Nó lấy id từ session, tìm user trong database và gắn vào req.user.
passport.deserializeUser(async (id, done) => {
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    if (rows.length > 0) {
      done(null, rows[0]);
    } else {
      done(new Error('User not found'), null);
    }
  } catch (err) {
    done(err, null);
  }
});
// ... (serializeUser và deserializeUser giữ nguyên) ...
passport.serializeUser((user, done) => { done(null, user.id); });
passport.deserializeUser(async (id, done) => {
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    if (rows.length > 0) { done(null, rows[0]); }
    else { done(new Error('User not found'), null); }
  } catch (err) { done(err, null); }
});

// --- 3. Cấu hình Local Strategy ---
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

      // So sánh mật khẩu đã mã hóa
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'Mật khẩu không chính xác.' });
      }

      // Nếu mọi thứ đúng, trả về người dùng
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id, displayName, emails, photos } = profile;
      const email = emails[0].value;
      const google_id = id;
      const avatar = photos && photos.length > 0 ? photos[0].value : null;

      try {
        const [existingUser] = await db.query('SELECT * FROM users WHERE google_id = ?', [google_id]);

        if (existingUser.length > 0) {
          // Nếu user đã tồn tại, cập nhật avatar nếu có thay đổi
          if (existingUser[0].avatar !== avatar) {
            await db.query('UPDATE users SET avatar = ? WHERE google_id = ?', [avatar, google_id]);
          }
          const userToReturn = {...existingUser[0], avatar: avatar};
          return done(null, userToReturn);

        } else {
          // User chưa tồn tại, tạo user mới với đầy đủ thông tin
          const newUser = { google_id, name: displayName, email, avatar };
          const [result] = await db.query('INSERT INTO users SET ?', newUser);
          
          const createdUser = { id: result.insertId, ...newUser };
          return done(null, createdUser);
        }
      } catch (err) {
        console.error('Lỗi trong Google Strategy:', err);
        return done(err, null);
      }
    }
  )
);