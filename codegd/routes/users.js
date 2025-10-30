// codegd/routes/users.js
const router = require('express').Router();
const db = require('../DB');

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ message: 'Unauthorized' });
};

// ĐẾM SỐ LƯỢNG CÂU HỎI (CHO MỤC HỎI & ĐÁP)
router.get('/me/questions/count', isAuthenticated, async (req, res) => {
    try {
        const userId = req.user.id;
        const [rows] = await db.query('SELECT COUNT(*) as count FROM questions WHERE user_id = ?', [userId]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
});

// ĐẾM SỐ LƯỢNG BÌNH LUẬN
router.get('/me/comments/count', isAuthenticated, async (req, res) => {
    try {
        const userId = req.user.id;
        const [rows] = await db.query('SELECT COUNT(*) as count FROM comments WHERE user_id = ?', [userId]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
});

module.exports = router;