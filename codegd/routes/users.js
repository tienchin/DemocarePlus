const router = require('express').Router();
const db = require('../DB'); // Import kết nối MySQL Pool
const ChatbotHistory = require('../models/ChatbotHistory'); // Import Model ChatHistory

// Middleware để kiểm tra xem user đã đăng nhập chưa
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ message: 'Unauthorized' });
};

// --- API ĐẾM SỐ LƯỢNG (ĐÃ SỬA LỖI) ---

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

// SỬA LỖI: BỔ SUNG API ĐẾM LỊCH SỬ TƯ VẤN
// GET /api/users/me/chathistory/count
router.get('/me/chathistory/count', isAuthenticated, async (req, res) => {
    try {
        const userId = req.user.id;
        const [rows] = await db.query('SELECT COUNT(*) as count FROM chatbot_history WHERE user_id = ?', [userId]);
        res.json(rows[0]);
    } catch (error) {
        console.error("Lỗi API [GET] /me/chathistory/count:", error);
        res.status(500).json({ message: 'Lỗi server khi đếm lịch sử chat' });
    }
});


// --- API CHI TIẾT DANH SÁCH (Giữ nguyên) ---

// GET /api/users/me/questions/detailed
router.get('/me/questions/detailed', isAuthenticated, async (req, res) => {
    try {
        const userId = req.user.id;
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
router.get('/me/comments/detailed', isAuthenticated, async (req, res) => {
    try {
        const userId = req.user.id;
        const [comments] = await db.query(
            `SELECT 
                c.id, c.comment, c.created_at, c.article_id, c.question_id, c.user_id,
                q.title AS question_title,
                a.title AS article_title
            FROM comments c 
            LEFT JOIN questions q ON c.question_id = q.id
            LEFT JOIN articles a ON c.article_id = a.id
            WHERE c.user_id = ?
            ORDER BY c.created_at DESC`,
            [userId]
        );
        res.status(200).json(comments);
    } catch (error) {
        console.error("Lỗi API [GET] /users/me/comments/detailed:", error);
        res.status(500).json({ message: 'Lỗi server khi lấy danh sách bình luận.' });
    }
});

// GET /api/users/me/chathistory
router.get('/me/chathistory', isAuthenticated, async (req, res) => {
    try {
        const userId = req.user.id;
        const historyList = await ChatbotHistory.getByUser(userId);
        
        if (historyList.length === 0) {
             return res.status(200).json([]);
        }
        res.status(200).json(historyList);
    } catch (error) {
        console.error("Lỗi API [GET] /users/me/chathistory:", error);
        res.status(500).json({ message: 'Lỗi server khi lấy lịch sử tư vấn.' });
    }
});


// SỬA LỖI: BỔ SUNG API XÓA LỊCH SỬ CHAT
// (Tệp ProfilePage.js đang gọi /api/chatbot/history/:id, chúng ta cần tạo nó)
// Chúng ta sẽ đặt nó ở routes/chatbot.js để nhất quán
// BẠN CẦN THÊM DÒNG NÀY VÀO `codegd/routes/chatbot.js` (hoặc tôi sẽ thêm vào đây)

// DELETE /api/users/me/chathistory/:id (Xóa lịch sử chat)
router.delete('/me/chathistory/:id', isAuthenticated, async (req, res) => {
    try {
        const userId = req.user.id;
        const historyId = req.params.id;

        // Kiểm tra quyền sở hữu
        const [rows] = await db.query('SELECT id FROM chatbot_history WHERE id = ? AND user_id = ?', [historyId, userId]);
        if (rows.length === 0) {
            return res.status(403).json({ message: 'Forbidden: Bạn không có quyền xóa lịch sử này.' });
        }

        // Tiến hành xóa
        await db.query('DELETE FROM chatbot_history WHERE id = ?', [historyId]);
        res.json({ success: true });

    } catch (error) {
        console.error("Lỗi API [DELETE] /me/chathistory/:id:", error);
        res.status(500).json({ message: 'Lỗi server khi xóa lịch sử chat.' });
    }
});


module.exports = router;