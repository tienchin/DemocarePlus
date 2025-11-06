// codegd/routes/comments.js
const router = require('express').Router();
const db = require('../DB');

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'Bạn cần đăng nhập để thực hiện hành động này.' });
};

// GET: Lấy bình luận (cho bài viết hoặc câu hỏi)
router.get('/', async (req, res) => {
    try {
        const { articleId, questionId } = req.query;
        let query, params;
        
        // Sửa câu truy vấn để lấy cả parent_comment_id
        const baseQuery = `
            SELECT 
                c.id, c.comment, c.created_at, c.parent_comment_id, 
                u.name, u.avatar 
            FROM comments c 
            JOIN users u ON c.user_id = u.id
        `;

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

// POST: Thêm bình luận mới
router.post('/', isAuthenticated, async (req, res) => {
    try {
        const { articleId, questionId, parentCommentId, comment } = req.body;
        const user_id = req.user.id;

        if (!comment || !comment.trim()) {
            return res.status(400).json({ message: 'Nội dung bình luận không được để trống.' });
        }

        let newCommentPayload = {
            user_id,
            comment,
            parent_comment_id: parentCommentId || null // Lưu ID bình luận cha nếu có
        };

        if (articleId) {
            newCommentPayload.article_id = articleId;
        } else if (questionId) {
            newCommentPayload.question_id = questionId;
        } else {
            return res.status(400).json({ message: 'Không xác định được mục để bình luận.' });
        }

        const [result] = await db.query('INSERT INTO comments SET ?', newCommentPayload);
        
        const [newlyCreatedComment] = await db.query(`
            SELECT 
                c.id, c.comment, c.created_at, c.parent_comment_id, 
                u.name, u.avatar 
            FROM comments c 
            JOIN users u ON c.user_id = u.id 
            WHERE c.id = ?
        `, [result.insertId]);
        
        if (newlyCreatedComment.length === 0) {
            return res.status(404).json({ message: 'Không thể truy xuất bình luận vừa tạo.' });
        }

        res.status(201).json(newlyCreatedComment[0]);
    } catch (error) {
        console.error("Lỗi API [POST] /comments:", error);
        res.status(500).json({ message: 'Lỗi server khi lưu bình luận.' });
    }
});

module.exports = router;