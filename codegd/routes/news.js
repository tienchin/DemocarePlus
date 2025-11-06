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

// GET: Lấy chi tiết bài viết theo id (công khai)
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM articles WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Không tìm thấy bài viết' });
    res.json(rows[0]);
  } catch (e) {
    res.status(500).json({ message: 'Lỗi server khi lấy bài viết' });
  }
});

// POST: Tạo bài viết mới (bảo vệ)
router.post('/', isAuthenticated, async (req, res) => {
  const { title, content, imageUrl, categoryId, code } = req.body;
  const user_id = req.user.id;
  if (!title || !content) {
    return res.status(400).json({ message: 'Tiêu đề và nội dung là bắt buộc.' });
  }
  try {
    const newArticle = {
      title,
      content,
      user_id,
      imageUrl: imageUrl || null,
      category_id: categoryId || null,
      code: code || null
    };
    const [result] = await db.query('INSERT INTO articles SET ?', newArticle);
    res.status(201).json({ id: result.insertId, ...newArticle });
  } catch (error) {
    res.status(500).json({ message: 'Không thể tạo bài viết', error });
  }
});
// PUT: Cập nhật bài viết
router.put('/:id', isAuthenticated, async (req, res) => {
  const { title, content, imageUrl, categoryId, code } = req.body;
  try {
    const [own] = await db.query('SELECT id FROM articles WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
    if (own.length === 0) return res.status(403).json({ message: 'Forbidden' });

    await db.query(
      'UPDATE articles SET title = ?, content = ?, imageUrl = ?, category_id = ?, code = ? WHERE id = ?',
      [title, content, imageUrl || null, categoryId || null, code || null, req.params.id]
    );
    const [rows] = await db.query('SELECT * FROM articles WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (e) {
    res.status(500).json({ message: 'Không thể cập nhật bài viết', error: e });
  }
});

// DELETE: Xóa bài viết
router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    const [own] = await db.query('SELECT id FROM articles WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
    if (own.length === 0) return res.status(403).json({ message: 'Forbidden' });

    await db.query('DELETE FROM articles WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ message: 'Không thể xóa bài viết', error: e });
  }
});
module.exports = router;