const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const db = require('../DB'); // Import kết nối MySQL Pool
const path = require('path');

// (Giả sử bạn đã import và cấu hình passport-setup.js trong file server.js chính)
// require('../config/passport-setup');

// --- HÀM HELPER ---

// Middleware để kiểm tra đã đăng nhập chưa
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Bạn cần đăng nhập để thực hiện hành động này.' });
};

// --- CÁC ROUTE XÁC THỰC ---

// [SỬA LỖI 404]
// GET /api/auth/check-session
// Route này được AuthContext gọi khi tải trang để kiểm tra phiên đăng nhập
router.get('/check-session', (req, res) => {
  if (req.isAuthenticated()) {
    // Nếu đã đăng nhập, trả về thông tin user
    res.status(200).json(req.user);
  } else {
    // Nếu chưa, trả về lỗi 401
    res.status(401).json({ message: 'Không có phiên đăng nhập hợp lệ.' });
  }
});

// POST /api/auth/register
// Xử lý đăng ký tài khoản local
router.post('/register', async (req, res) => {
  try {
    // SỬA LỖI CÚ PHÁP TẠI ĐÂY
    const { name, email, password } = req.body; 
    
    // 1. Kiểm tra xem email đã tồn tại chưa
    const [existingUsers] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      return res.status(409).json({ message: 'Email này đã được sử dụng.' });
    }

    // 2. Băm mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Tạo user mới
    const newUser = {
      name,
      email,
      password: hashedPassword,
      provider: 'local', // Đánh dấu là tài khoản local
    };

    // 4. Lưu vào cơ sở dữ liệu
    const [result] = await db.query('INSERT INTO users SET ?', newUser);
    const newUserId = result.insertId;

    // 5. Lấy lại thông tin user vừa tạo (không bao gồm mật khẩu)
    const [createdUserRows] = await db.query('SELECT id, name, email, avatar, provider FROM users WHERE id = ?', [newUserId]);
    const createdUser = createdUserRows[0];

    // 6. Tự động đăng nhập cho user
    req.login(createdUser, (err) => {
      if (err) {
        console.error('Lỗi tự động đăng nhập sau khi đăng ký:', err);
        return res.status(500).json({ message: 'Đăng ký thành công nhưng đăng nhập tự động thất bại.' });
      }
      // Trả về thông tin user
      res.status(201).json(createdUser);
    });

  } catch (error) {
    console.error('Lỗi API [POST] /register:', error);
    res.status(500).json({ message: 'Lỗi server khi đăng ký.' });
  }
});

// --- SỬA LỖI 500 (INTERNAL SERVER ERROR) TẠI ĐÂY ---
// POST /api/auth/login
// Xử lý đăng nhập local (Viết lại để không dùng passport.authenticate)
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Tìm người dùng bằng email
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      // Không tìm thấy email
      return res.status(401).json({ message: 'Email hoặc mật khẩu không chính xác.' });
    }

    const user = users[0];

    // 2. Kiểm tra tài khoản local (tài khoản Google không có mật khẩu)
    if (user.provider !== 'local') {
      return res.status(401).json({ message: 'Vui lòng đăng nhập bằng Google.' });
    }

    // 3. So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Sai mật khẩu
      return res.status(401).json({ message: 'Email hoặc mật khẩu không chính xác.' });
    }

    // 4. Tạo đối tượng user an toàn (không chứa mật khẩu)
    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      provider: user.provider
    };

    // 5. Đăng nhập user vào session
    req.login(safeUser, (err) => {
      if (err) {
        console.error('Lỗi req.login:', err);
        return res.status(500).json({ message: 'Lỗi khi lưu phiên đăng nhập.' });
      }

      // 6. Xử lý "Ghi nhớ tôi"
      if (req.body.rememberMe) {
        req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // 30 ngày
      } else {
        req.session.cookie.expires = false; // Hết hạn khi đóng trình duyệt
      }

      // 7. Trả về thông tin user
      res.status(200).json(safeUser);
    });

  } catch (error) {
    console.error('Lỗi API [POST] /login:', error);
    res.status(500).json({ message: 'Lỗi server khi đăng nhập.' });
  }
});

// POST /api/auth/logout
// Xử lý đăng xuất
router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Lỗi khi req.logout:', err);
      return res.status(500).json({ message: 'Lỗi khi đăng xuất.' });
    }
    
    req.session.destroy((err) => {
      if (err) {
        console.error('Lỗi khi hủy session:', err);
        return res.status(500).json({ message: 'Lỗi khi hủy phiên.' });
      }
      
      // Xóa cookie
      res.clearCookie('connect.sid'); // (Tên cookie mặc định của express-session)
      res.status(200).json({ message: 'Đăng xuất thành công.' });
    });
  });
});


// --- XÁC THỰC GOOGLE (Sử dụng Client ID/Secret từ .env) ---

// GET /api/auth/google
// Bước 1: Chuyển hướng người dùng đến trang đăng nhập Google
router.get('/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'] // Yêu cầu lấy thông tin profile và email
  })
);

// GET /api/auth/google/callback
// Bước 2: Google gọi lại route này sau khi người dùng xác thực
router.get('/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/login` // Nếu thất bại, về trang login
  }),
  (req, res) => {
    // Xác thực thành công!
    // Chuyển hướng người dùng về trang chủ của Frontend
    res.redirect(process.env.FRONTEND_URL || 'http://localhost:3000');
  }
);


module.exports = router;

