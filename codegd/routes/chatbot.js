// codegd/routes/chatbot.js
const router = require('express').Router();
const chatbotKnowledgeBase = require('../chatbotData');

router.post('/interact', (req, res) => {
    const { message } = req.body;
    const lowerCaseMessage = message.toLowerCase();

    for (const categoryId in chatbotKnowledgeBase) {
        if (categoryId === 'diseases') continue;
        const category = chatbotKnowledgeBase[categoryId];
        if (category.keywords.find(kw => lowerCaseMessage.includes(kw))) {
            return res.json({ type: 'options', question: category.question, options: category.options });
        }
    }
    return res.json({ type: 'text', answer: 'Xin lỗi, tôi chưa hiểu. Bạn có thể hỏi về các chuyên khoa như "hô hấp", "tim mạch" không?' });
});

router.post('/answer', (req, res) => {
    const { optionId } = req.body;
    const diseaseInfo = chatbotKnowledgeBase.diseases[optionId];
    if (diseaseInfo) {
        const finalAnswer = `**Nhận biết:**\n${diseaseInfo.nhanBiet}\n\n**Thông tin:**\n${diseaseInfo.thongTin}\n\n**Sơ cứu:**\n${diseaseInfo.soCuu}`;
        return res.json({ answer: finalAnswer });
    }
    return res.status(404).json({ error: 'Không tìm thấy thông tin.' });
});
module.exports = router;