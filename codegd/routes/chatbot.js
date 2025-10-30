// codegd/routes/chatbot.js

// --- CODE CŨ GIỮ NGUYÊN: Import thư viện và khởi tạo Gemini ---
const router = require('express').Router();
const chatbotKnowledgeBase = require('../chatbotData');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Khởi tạo Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

// --- CODE CŨ GIỮ NGUYÊN: Hàm tìm chủ đề theo kịch bản ---
const findScriptedTopic = (message) => {
    const lowerCaseMessage = message.toLowerCase();
    for (const topicId in chatbotKnowledgeBase) {
        const topic = chatbotKnowledgeBase[topicId];
        if (topic.keywords && topic.keywords.find(keyword => lowerCaseMessage.includes(keyword))) {
            return { topicId, topicData: topic };
        }
    }
    return null;
};

// --- API chính để xử lý mọi tương tác ---
router.post('/interact', async (req, res) => {
    const { type, value, context } = req.body;

    // --- CODE CŨ GIỮ NGUYÊN: Xử lý khi người dùng nhập văn bản (type === 'text') ---
    if (type === 'text') {
        // Bước 1: Luôn kiểm tra tình huống cấp cứu trước
        const emergency = chatbotKnowledgeBase["cap-cuu"];
        if (emergency.keywords.find(keyword => value.toLowerCase().includes(keyword))) {
            const finalAnswer = `${emergency.answer}\n\nHãy gọi ngay: <a href="tel:115" style="color:red; font-weight:bold;">115</a>`;
            return res.json({ type: 'text', answer: finalAnswer, isEmergency: true });
        }

        // Bước 2: Kiểm tra các chủ đề theo kịch bản
        const scripted = findScriptedTopic(value);
        if (scripted) {
            return res.json({ type: 'options', topicId: scripted.topicId, question: scripted.topicData.question, options: scripted.topicData.options });
        }

        // Bước 3: Nếu không khớp, gọi AI Gemini
        try {
            const prompt = `Bạn là một trợ lý y tế am hiểu. Trả lời câu hỏi sau bằng tiếng Việt một cách súc tích và hữu ích, không dài quá 150 chữ: "${value}"`;
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            const disclaimer = "Lưu ý: Thông tin này chỉ mang tính chất tham khảo và không thay thế cho chẩn đoán y khoa chuyên nghiệp.";
            const finalAnswer = `${text}\n\n---\n*${disclaimer}*`;

            return res.json({ type: 'text', answer: finalAnswer });

        } catch (error) {
            console.error("Lỗi gọi Gemini AI:", error);
            return res.json({ type: 'text', answer: 'Xin lỗi, tôi đang gặp sự cố kết nối. Vui lòng thử lại sau.' });
        }
    }

    // --- CODE MỚI: Bổ sung đầy đủ logic xử lý khi người dùng chọn một lựa chọn (type === 'option') ---
    if (type === 'option') {
        const { topicId, optionId } = value;
        const topic = chatbotKnowledgeBase[topicId];
        const result = topic?.answers?.[optionId];

        if (!result) {
            return res.status(404).json({ error: 'Không tìm thấy câu trả lời.' });
        }

        // Kiểm tra ngữ cảnh (ví dụ: giới tính) nếu có
        if (result.requiresContext && result.requiresContext !== context?.gender) {
            return res.json({ type: 'text', answer: `Cảm ơn bạn. Lựa chọn này dành cho ngữ cảnh khác. Bạn có cần hỗ trợ thêm không?` });
        }

        // Xử lý logic phân nhánh sang chủ đề khác
        if (result.nextTopic) {
            const nextTopicData = chatbotKnowledgeBase[result.nextTopic];
            // Kiểm tra ngữ cảnh của chủ đề tiếp theo
            if (nextTopicData.requiresContext && nextTopicData.requiresContext !== context?.gender) {
                return res.json({ type: 'text', answer: `${result.answer} Tuy nhiên, các câu hỏi chuyên sâu hơn dành cho ngữ cảnh khác. Bạn có cần hỗ trợ thêm không?` });
            }
            return res.json({
                type: 'options',
                topicId: result.nextTopic,
                initialMessage: result.answer, // Hiển thị câu dẫn trước khi hỏi câu tiếp theo
                question: nextTopicData.question,
                options: nextTopicData.options
            });
        }
        
        // Trả về câu trả lời cuối cùng nếu không có phân nhánh
        return res.json({ type: 'text', answer: result.answer });
    }

    // --- CODE CŨ GIỮ NGUYÊN: Xử lý trường hợp không hợp lệ ---
    return res.status(400).json({ error: 'Loại yêu cầu không hợp lệ.' });
});

module.exports = router;