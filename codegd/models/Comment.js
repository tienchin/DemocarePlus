// codegd/routes/comments.js
const router = require('express').Router();
const db = require('../DB');

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'Bạn cần đăng nhập để thực hiện hành động này.' });
};

// GET: Lấy bình luận (cho bài viết hoặc câu hỏi) - Logic được tối ưu
router.get('/', async (req, res) => {
    try {
        const { articleId, questionId } = req.query;
        let query, params;

        const baseQuery = `SELECT c.id, c.comment, c.created_at, u.name, u.avatar 
                         FROM comments c 
                         JOIN users u ON c.user_id = u.id`;

        if (articleId) {
            query = `${baseQuery} WHERE c.article_id = ? ORDER BY c.created_at DESC`;
            params = [articleId];
        } else if (questionId) {
            query = `${baseQuery} WHERE c.question_id = ? ORDER BY c.created_at DESC`;
            params = [questionId];
        } else {
            return res.status(400).json({ message: 'Thiếu ID của bài viết hoặc câu hỏi.' });
        }

        const [comments] = await db.query(query, params);
        res.status(200).json(comments);
    } catch (error) {
        console.error("Lỗi API [GET] /comments:", error);
        res.status(500).json({ message: 'Lỗi server khi lấy bình luận.' });
    }
});

// POST: Thêm bình luận mới - LOGIC MỚI, AN TOÀN HƠN
router.post('/', isAuthenticated, async (req, res) => {
    try {
        const { articleId, questionId, comment } = req.body;
        const user_id = req.user.id;

        if (!comment || !comment.trim()) {
            return res.status(400).json({ message: 'Nội dung bình luận không được để trống.' });
        }

        let newCommentPayload = { user_id, comment };
        if (articleId) {
            newCommentPayload.article_id = articleId;
        } else if (questionId) {
            newCommentPayload.question_id = questionId;
        } else {
            return res.status(400).json({ message: 'Không xác định được mục để bình luận.' });
        }

        // Bước 1: Lưu bình luận mới vào DB
        const [result] = await db.query('INSERT INTO comments SET ?', newCommentPayload);
        const newCommentId = result.insertId;

        // Bước 2: Lấy lại chính xác bình luận vừa tạo (kèm thông tin user)
        const [newlyCreatedComment] = await db.query(
            `SELECT c.id, c.comment, c.created_at, u.name, u.avatar 
             FROM comments c 
             JOIN users u ON c.user_id = u.id 
             WHERE c.id = ?`, [newCommentId]
        );
        
        if (newlyCreatedComment.length === 0) {
            return res.status(404).json({ message: 'Không thể truy xuất bình luận vừa tạo.' });
        }

        // Bước 3: Gửi về cho frontend để hiển thị ngay lập tức
        res.status(201).json(newlyCreatedComment[0]);

    } catch (error) {
        console.error("Lỗi API [POST] /comments:", error);
        res.status(500).json({ message: 'Lỗi server khi lưu bình luận.' });
    }
});

module.exports = router;