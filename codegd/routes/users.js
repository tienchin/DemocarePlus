const router = require('express').Router();
const db = require('../DB'); // Import kết nối MySQL Pool

// Middleware để kiểm tra xem user đã đăng nhập chưa
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ message: 'Unauthorized' });
};

// --- API ĐẾM SỐ LƯỢNG (Giữ nguyên) ---

// GET /api/users/me/questions/count
router.get('/me/questions/count', isAuthenticated, async (req, res) => {
    try {
        const userId = req.user.id;
        const [rows] = await db.query('SELECT COUNT(*) as count FROM questions WHERE user_id = ?', [userId]);
        res.json(rows[0]);
    } catch (error) {
        console.error("Lỗi API [GET] /me/questions/count:", error);
        res.status(500).json({ message: 'Lỗi server khi đếm câu hỏi' });
    }
});

// GET /api/users/me/comments/count
router.get('/me/comments/count', isAuthenticated, async (req, res) => {
    try {
        const userId = req.user.id;
        const [rows] = await db.query('SELECT COUNT(*) as count FROM comments WHERE user_id = ?', [userId]);
        res.json(rows[0]);
    } catch (error) {
        console.error("Lỗi API [GET] /me/comments/count:", error);
        res.status(500).json({ message: 'Lỗi server khi đếm bình luận' });
    }
});


// --- API CHI TIẾT DANH SÁCH (Mới - Để hiển thị nội dung trên Profile Page) ---

// GET /api/users/me/questions/detailed
// Lấy danh sách chi tiết các câu hỏi của người dùng hiện tại
router.get('/me/questions/detailed', isAuthenticated, async (req, res) => {
    try {
        const userId = req.user.id;
        // LẤY THÊM content để hiển thị bản xem trước
        const [questions] = await db.query(
            `SELECT id, title, content, created_at, user_id FROM questions WHERE user_id = ? ORDER BY created_at DESC`,
            [userId]
        );
        res.status(200).json(questions);
    } catch (error) {
        console.error("Lỗi API [GET] /users/me/questions/detailed:", error);
        res.status(500).json({ message: 'Lỗi server khi lấy danh sách câu hỏi.' });
    }
});

// GET /api/users/me/comments/detailed
// Lấy danh sách chi tiết các bình luận của người dùng hiện tại
router.get('/me/comments/detailed', isAuthenticated, async (req, res) => {
    try {
        const userId = req.user.id;
        // Lấy bình luận, kèm theo tiêu đề của câu hỏi/bài viết mà họ đã bình luận
        const [comments] = await db.query(
            `SELECT 
                c.id, c.comment, c.created_at, c.article_id, c.question_id, c.user_id,
                -- Lấy tiêu đề của câu hỏi (nếu tồn tại)
                q.title AS question_title,
                -- Lấy tiêu đề của bài viết (nếu tồn tại)
                a.title AS article_title
            FROM comments c 
            WHERE c.user_id = ?
            LEFT JOIN questions q ON c.question_id = q.id
            LEFT JOIN articles a ON c.article_id = a.id
            ORDER BY c.created_at DESC`,
            [userId]
        );
        res.status(200).json(comments);
    } catch (error) {
        console.error("Lỗi API [GET] /users/me/comments/detailed:", error);
        res.status(500).json({ message: 'Lỗi server khi lấy danh sách bình luận.' });
    }
});

module.exports = router;