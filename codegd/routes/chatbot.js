const router = require('express').Router();
const chatbotKnowledgeBase = require('../chatbotData'); // Import dữ liệu (đã sửa)
const ChatbotHistory = require('../models/ChatbotHistory'); // Import model (đã sửa)

// Middleware để kiểm tra đã đăng nhập chưa
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Bạn cần đăng nhập để thực hiện hành động này.' });
};

// POST /api/chatbot/interact
// SỬA LỖI 500: Logic này đã được cập nhật để xử lý 'general'
router.post('/interact', (req, res) => {
    const { message } = req.body;
    const lowerCaseMessage = message.toLowerCase();

    // Logic tìm kiếm cơ bản
    for (const categoryId in chatbotKnowledgeBase) {
        // Bỏ qua 'diseases' (data chi tiết) và 'general' (data chung)
        if (categoryId === 'diseases' || categoryId === 'general') continue; 
        
        const category = chatbotKnowledgeBase[categoryId];
        if (category.keywords.find(kw => lowerCaseMessage.includes(kw))) {
            // Tìm thấy chuyên khoa (Hô hấp, Tim mạch, v.v.)
            return res.json({ type: 'options', question: category.question, options: category.options });
        }
    }
    
    // SỬA LỖI 500: 
    // Nếu không tìm thấy từ khóa, trả về các option 'general'
    // (Tệp chatbotData.js mới đã có mục 'general')
    return res.json({ 
        type: 'options', 
        question: 'Xin lỗi, tôi chưa hiểu rõ. Bạn có thể chọn một trong các chủ đề chung sau:', 
        options: chatbotKnowledgeBase.general.options 
    });
});

// --- SỬA LỖI 500 (API Error) TẠI ĐÂY ---
// POST /api/chatbot/answer
// Nâng cấp logic: Xử lý cả Chuyên khoa và Bệnh lý
router.post('/answer', (req, res) => {
    const { optionId } = req.body;

    // 1. Kiểm tra xem optionId có phải là Bệnh lý không?
    const diseaseInfo = chatbotKnowledgeBase.diseases[optionId];
    if (diseaseInfo) {
        const finalAnswer = `**Nhận biết:**\n${diseaseInfo.nhanBiet}\n\n**Thông tin:**\n${diseaseInfo.thongTin}\n\n**Sơ cứu:**\n${diseaseInfo.soCuu}`;
        // Trả về câu trả lời cuối cùng
        return res.json({ type: 'text', answer: finalAnswer }); 
    }

    // 2. Kiểm tra xem optionId có phải là Chuyên khoa không? (ví dụ: 'ho-hap')
    const categoryInfo = chatbotKnowledgeBase[optionId];
    if (categoryInfo) {
        // Trả về các lựa chọn con (ví dụ: 'viem-phe-quan', 'viem-phoi'...)
        return res.json({ 
            type: 'options', 
            question: categoryInfo.question, 
            options: categoryInfo.options 
        });
    }
    
    // 3. Nếu không tìm thấy ở cả hai
    return res.status(404).json({ error: 'Không tìm thấy thông tin cho lựa chọn này.' });
});
// --- KẾT THÚC SỬA LỖI ---


// POST /api/chatbot/save
// Route này được bảo vệ, chỉ người dùng đã đăng nhập mới được lưu
router.post('/save', isAuthenticated, async (req, res) => {
    const { messages } = req.body; // Nhận mảng messages từ frontend
    const userId = req.user.id; // Lấy ID của người dùng đã đăng nhập

    if (!messages || messages.length < 2) { // Phải có ít nhất 1 câu hỏi và 1 câu trả lời
        return res.status(400).json({ message: 'Không có đủ nội dung để lưu.' });
    }

    try {
        // Lấy tin nhắn đầu tiên của người dùng làm tiêu đề
        const title = messages.find(m => m.sender === 'user')?.text || 'Cuộc tư vấn AI';
        
        // Lưu toàn bộ cuộc trò chuyện dưới dạng JSON string vào cột 'response'
        const fullConversation = JSON.stringify(messages);

        // Gọi Model (ChatbotHistory.js) để lưu vào CSDL
        const historyId = await ChatbotHistory.save(userId, title.substring(0, 250), fullConversation);
        
        res.status(201).json({ message: 'Lưu lịch sử thành công!', historyId });

    } catch (error) {
        console.error("Lỗi API [POST] /chatbot/save:", error);
        res.status(500).json({ message: 'Lỗi server khi lưu lịch sử chat.' });
    }
});

module.exports = router;