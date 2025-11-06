const router = require('express').Router();
const db = require('../DB'); // Import kết nối MySQL Pool

// Middleware để kiểm tra xem user đã đăng nhập chưa
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'Unauthorized' });
};

// GET /api/questions
// Lấy tất cả câu hỏi (Đã thêm logic đếm bình luận)
router.get('/', async (req, res) => {
    try {
        const [questions] = await db.query(
            `SELECT 
                q.id, q.title, q.content, q.created_at, q.user_id,
                u.name, u.avatar, 
                COUNT(c.id) AS commentCount
            FROM questions q 
            JOIN users u ON q.user_id = u.id 
            LEFT JOIN comments c ON q.id = c.question_id
            GROUP BY q.id
            ORDER BY q.created_at DESC`
        );
        res.status(200).json(questions);
    } catch (error) {
        console.error("Lỗi API [GET] /questions:", error);
        res.status(500).json({ message: 'Lỗi server khi lấy câu hỏi' });
    }
});

// GET /api/questions/:id
// Lấy chi tiết một câu hỏi
router.get('/:id', async (req, res) => {
    try {
        const [question] = await db.query(
            `SELECT 
                q.id, q.title, q.content, q.created_at, q.user_id,
                u.name, u.avatar 
            FROM questions q 
            JOIN users u ON q.user_id = u.id 
            WHERE q.id = ?`, [req.params.id]
        );
        if (question.length === 0) return res.status(404).json({ message: 'Không tìm thấy câu hỏi' });
        res.status(200).json(question[0]);
    } catch (error) {
        console.error("Lỗi API [GET] /questions/:id:", error);
        res.status(500).json({ message: 'Lỗi server khi lấy chi tiết câu hỏi' });
    }
});

// POST /api/questions
// Tạo câu hỏi mới
router.post('/', isAuthenticated, async (req, res) => {
    try {
        const { title, content } = req.body;
        const user_id = req.user.id;
        
        if (!title || !content) {
             return res.status(400).json({ message: 'Tiêu đề và nội dung là bắt buộc.' });
        }
        
        const [result] = await db.query('INSERT INTO questions SET ?', { user_id, title, content });
        const newQuestionId = result.insertId;

        // Trả về câu hỏi vừa tạo (kèm thông tin user)
        const [createdQuestion] = await db.query(
             `SELECT 
                q.id, q.title, q.content, q.created_at, q.user_id,
                u.name, u.avatar 
            FROM questions q 
            JOIN users u ON q.user_id = u.id 
            WHERE q.id = ?`, [newQuestionId]
        );

        res.status(201).json(createdQuestion[0]);
    } catch (error) {
        console.error('Lỗi API [POST] /questions:', error);
        res.status(500).json({ message: 'Lỗi server khi tạo câu hỏi' });
    }
});

// PUT /api/questions/:id
// Cập nhật câu hỏi
router.put('/:id', isAuthenticated, async (req, res) => {
    try {
      const { title, content } = req.body;
      const [own] = await db.query('SELECT id FROM questions WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
      if (own.length === 0) return res.status(403).json({ message: 'Forbidden: Bạn không có quyền sửa câu hỏi này.' });
  
      await db.query('UPDATE questions SET title = ?, content = ? WHERE id = ?', [title, content, req.params.id]);
      const [rows] = await db.query('SELECT id, title, content, created_at FROM questions WHERE id = ?', [req.params.id]);
      res.json(rows[0]);
    } catch (e) {
      console.error("Lỗi API [PUT] /questions/:id:", e);
      res.status(500).json({ message: 'Lỗi server khi cập nhật câu hỏi' });
    }
});
  
// DELETE /api/questions/:id
// Xóa câu hỏi
router.delete('/:id', isAuthenticated, async (req, res) => {
    try {
      const [own] = await db.query('SELECT id FROM questions WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
      if (own.length === 0) return res.status(403).json({ message: 'Forbidden: Bạn không có quyền xóa câu hỏi này.' });
  
      await db.query('DELETE FROM questions WHERE id = ?', [req.params.id]);
      res.json({ success: true });
    } catch (e) {
      console.error("Lỗi API [DELETE] /questions/:id:", e);
      res.status(500).json({ message: 'Lỗi server khi xóa câu hỏi' });
    }
});

module.exports = router;