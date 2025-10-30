// codegd/routes/users.js

// --- CODE CŨ GIỮ NGUYÊN: Import thư viện và middleware ---
const router = require('express').Router();
const db = require('../DB');

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ message: 'Unauthorized' });
};

// --- CODE CŨ GIỮ NGUYÊN: API để đếm số lượng câu hỏi ---
router.get('/me/questions/count', isAuthenticated, async (req, res) => {
    try {
        const userId = req.user.id;
        const [rows] = await db.query('SELECT COUNT(*) as count FROM questions WHERE user_id = ?', [userId]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
});

// --- CODE CŨ GIỮ NGUYÊN: API để đếm số lượng bình luận ---
router.get('/me/comments/count', isAuthenticated, async (req, res) => {
    try {
        const userId = req.user.id;
        const [rows] = await db.query('SELECT COUNT(*) as count FROM comments WHERE user_id = ?', [userId]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
});

// --- CODE MỚI: API để lấy danh sách chi tiết các câu hỏi của người dùng hiện tại ---
router.get('/me/questions', isAuthenticated, async (req, res) => {
    try {
        const userId = req.user.id;
        const [questions] = await db.query(
            'SELECT id, title, created_at FROM questions WHERE user_id = ? ORDER BY created_at DESC',
            [userId]
        );
        res.status(200).json(questions);
    } catch (error) {
        console.error("Lỗi API [GET] /users/me/questions:", error);
        res.status(500).json({ message: 'Lỗi server khi lấy danh sách câu hỏi.' });
    }
});

module.exports = router;