// codegd/routes/auth.js
const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const db = require('../DB');
require('dotenv').config();

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin.' });
  }

  // Thêm validation email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Địa chỉ email không hợp lệ.' });
  }

  try {
    const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(409).json({ message: 'Email này đã được sử dụng.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = { name, email, password: hashedPassword, provider: 'local' };
    const [result] = await db.query('INSERT INTO users SET ?', newUser);
    const createdUser = { id: result.insertId, name, email, provider: 'local' };

    req.login(createdUser, (err) => {
      if (err) { return res.status(500).json({ message: 'Lỗi khi tự động đăng nhập' }); }
      return res.status(201).json({ user: createdUser });
    });

  } catch (error) {
    return res.status(500).json({ message: 'Lỗi server', error });
  }
});

// POST /api/auth/login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { return res.status(401).json({ message: info.message }); }
    
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      return res.status(200).json({ user: req.user });
    });
  })(req, res, next);
});

// --- GOOGLE AUTH ---
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', {
  successRedirect: process.env.FRONTEND_URL || 'http://localhost:3000',
  failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/login`
}));

// --- USER STATUS & LOGOUT ---
router.get('/user', (req, res) => {
  if (req.user) {
    res.status(200).json({ user: req.user });
  } else {
    res.status(200).json({ user: null });
  }
});

router.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.status(200).json({ message: 'Đăng xuất thành công' });
    });
  });
});

module.exports = router;