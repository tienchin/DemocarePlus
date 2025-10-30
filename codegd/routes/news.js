const router = require('express').Router();
const db = require('../DB');

// Middleware để kiểm tra xem user đã đăng nhập chưa
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized: You must be logged in to perform this action.' });
};

// GET: Lấy tất cả bài viết (công khai)
router.get('/', async (req, res) => {
  try {
    const [articles] = await db.query('SELECT * FROM articles ORDER BY created_at DESC');
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// POST: Tạo bài viết mới (bảo vệ)
router.post('/', isAuthenticated, async (req, res) => {
  const { title, content, imageUrl } = req.body;
  const user_id = req.user.id;
  if (!title || !content) {
    return res.status(400).json({ message: 'Tiêu đề và nội dung là bắt buộc.' });
  }
  try {
    const newArticle = { title, content, user_id, imageUrl };
    const [result] = await db.query('INSERT INTO articles SET ?', newArticle);
    res.status(201).json({ id: result.insertId, ...newArticle });
  } catch (error) {
    res.status(500).json({ message: 'Không thể tạo bài viết', error });
  }
});

module.exports = router;