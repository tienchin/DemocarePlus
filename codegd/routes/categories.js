const router = require('express').Router();
const db = require('../DB');

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) return next();
  return res.status(401).json({ message: 'Unauthorized' });
};

// Danh sách danh mục (công khai)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, name, code, description FROM categories ORDER BY name ASC');
    res.json(rows);
  } catch (e) {
    res.status(500).json({ message: 'Lỗi server khi lấy danh mục' });
  }
});

// Tạo danh mục (bảo vệ)
router.post('/', isAuthenticated, async (req, res) => {
  const { name, code, description } = req.body;
  if (!name) return res.status(400).json({ message: 'Tên danh mục là bắt buộc.' });
  try {
    const [result] = await db.query('INSERT INTO categories (name, code, description) VALUES (?, ?, ?)', [name, code || null, description || null]);
    res.status(201).json({ id: result.insertId, name, code: code || null, description: description || null });
  } catch (e) {
    res.status(500).json({ message: 'Không thể tạo danh mục', error: e && e.message });
  }
});

// Cập nhật danh mục
router.put('/:id', isAuthenticated, async (req, res) => {
  const { name, code, description } = req.body;
  if (!name) return res.status(400).json({ message: 'Tên danh mục là bắt buộc.' });
  try {
    await db.query('UPDATE categories SET name = ?, code = ?, description = ? WHERE id = ?', [name, code || null, description || null, req.params.id]);
    const [rows] = await db.query('SELECT id, name, code, description FROM categories WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (e) {
    res.status(500).json({ message: 'Không thể cập nhật danh mục', error: e && e.message });
  }
});

// Xóa danh mục (chỉ xóa nếu không còn bài viết tham chiếu hoặc bạn xử lý SET NULL ở FK)
router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    await db.query('DELETE FROM categories WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ message: 'Không thể xóa danh mục (có thể còn bài viết đang tham chiếu).', error: e && e.message });
  }
});

module.exports = router;