// codegd/routes/questions.js
const router = require('express').Router();
const db = require('../DB');

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ message: 'Unauthorized' });
};

// GET: Lấy tất cả câu hỏi
router.get('/', async (req, res) => {
    try {
        const [questions] = await db.query(
            `SELECT q.id, q.title, q.content, q.created_at, u.name, u.avatar 
             FROM questions q 
             JOIN users u ON q.user_id = u.id 
             ORDER BY q.created_at DESC`
        );
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
});

// GET: Lấy chi tiết một câu hỏi
router.get('/:id', async (req, res) => {
    try {
        const [question] = await db.query(
            `SELECT q.id, q.title, q.content, q.created_at, u.name, u.avatar 
             FROM questions q 
             JOIN users u ON q.user_id = u.id 
             WHERE q.id = ?`, [req.params.id]
        );
        if (question.length === 0) return res.status(404).json({ message: 'Không tìm thấy câu hỏi' });
        res.status(200).json(question[0]);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
});

// POST: Tạo câu hỏi mới
router.post('/', isAuthenticated, async (req, res) => {
    try {
        const { title, content } = req.body;
        const user_id = req.user.id;
        const [result] = await db.query('INSERT INTO questions SET ?', { user_id, title, content });
        res.status(201).json({ id: result.insertId, title, content });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
});

module.exports = router;