// src/pages/MessengerPage.js
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaPaperPlane } from 'react-icons/fa';
import api from '../services/api';

const BOT_AVATAR = 'https://maunailxinh.com/wp-content/uploads/2025/06/avatar-bua-troll-6.jpg';

const MessengerPage = () => {
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [quickReplies, setQuickReplies] = useState([]);
    const [input, setInput] = useState('');
    const [context, setContext] = useState({}); // Lưu ngữ cảnh (gender, age)
    const [step, setStep] = useState('collect_gender'); // Bắt đầu bằng việc hỏi giới tính
    const chatEndRef = useRef(null);

    useEffect(() => {
        // Bắt đầu cuộc trò chuyện
        if (messages.length === 0) {
            const initialMessage = `Chào ${user ? user.name.split(' ')[0] : 'bạn'}! Để đưa ra lời khuyên phù hợp, bạn vui lòng cho tôi biết giới tính của bạn.`;
            setMessages([{ type: 'bot', text: initialMessage }]);
            setQuickReplies([{ id: 'female', text: 'Nữ' }, { id: 'male', text: 'Nam' }, { id: 'other', text: 'Khác' }]);
        }
    }, [user, messages.length]);

    useEffect(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, quickReplies]);

    const processBotResponse = (response) => {
        if (response.type === 'options') {
            if (response.initialMessage) {
                setMessages(prev => [...prev, { type: 'bot', text: response.initialMessage }]);
            }
            setTimeout(() => {
                setMessages(prev => [...prev, { type: 'bot', text: response.question }]);
                setQuickReplies(Object.entries(response.options).map(([id, text]) => ({ id, text, topicId: response.topicId })));
            }, 500);
        } else {
            const escalation = "Thông tin trên chỉ mang tính tham khảo. Nếu triệu chứng không thuyên giảm, bạn nên đi khám bác sĩ.";
            setMessages(prev => [...prev, { type: 'bot', text: response.answer }, { type: 'bot', text: escalation }]);
        }
    };
    
    const handleSend = async (e) => {
      e.preventDefault();
      if (!input.trim() || quickReplies.length > 0 || step === 'collect_gender') return;
      const userMessage = { type: 'user', text: input };
      setMessages(prev => [...prev, userMessage]);
      setInput('');
      try {
        const res = await api.post('/chatbot/interact', { type: 'text', value: input, context });
        processBotResponse(res.data);
      } catch (error) { console.error("Lỗi:", error); }
    };

    const handleQuickReplyClick = async (reply) => {
        setMessages(prev => [...prev, { type: 'user', text: reply.text }]);
        setQuickReplies([]);

        // Bước 1: Thu thập giới tính và chuyển sang bước tiếp theo
        if (step === 'collect_gender') {
            setContext({ gender: reply.id });
            setMessages(prev => [...prev, { type: 'bot', text: 'Cảm ơn bạn! Giờ hãy cho tôi biết triệu chứng bạn đang gặp phải.' }]);
            setStep('initial_prompt');
            return;
        }

        // Bước 2: Xử lý các lựa chọn sau khi đã có ngữ cảnh
        try {
            const res = await api.post('/chatbot/interact', { type: 'option', value: { topicId: reply.topicId, optionId: reply.id }, context });
            processBotResponse(res.data);
        } catch (error) { console.error("Lỗi:", error); }
    };

    return (
        <div className="card-bg rounded-lg shadow-xl flex flex-col h-[75vh]">
          <div className="p-4 border-b border-main flex items-center gap-3 flex-shrink-0">
            <img src={BOT_AVATAR} alt="bot avatar" className="w-10 h-10 rounded-full" />
            <h1 className="font-bold text-main text-xl">Trợ lý sức khỏe CarePlus</h1>
          </div>
          <div className="flex-grow p-4 overflow-y-auto space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-start gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                {msg.type === 'bot' && <img src={BOT_AVATAR} alt="bot" className="w-8 h-8 rounded-full flex-shrink-0"/>}
                <div className={`p-3 rounded-lg max-w-[80%] ${msg.type === 'user' ? 'bg-accent text-white' : 'bg-gray-100 text-gray-800'}`}>{msg.text}</div>
              </div>
            ))}
            {quickReplies.length > 0 && (
                <div className="flex justify-end pt-2">
                    <div className="space-y-2 max-w-[85%] w-full">
                        {quickReplies.map(reply => (
                            <button key={reply.id} onClick={() => handleQuickReplyClick(reply)} className="block w-full text-center p-2 rounded-full border border-accent bg-white text-accent font-semibold hover:bg-blue-50">
                                {reply.text}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <form onSubmit={handleSend} className="p-4 border-t border-main flex gap-2 flex-shrink-0">
            <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="Nhập triệu chứng..." className="flex-grow p-3 rounded-md border border-main bg-transparent text-main" disabled={quickReplies.length > 0 || step === 'collect_gender'}/>
            <button type="submit" className="bg-accent p-3 rounded-md text-white" disabled={quickReplies.length > 0 || step === 'collect_gender'}><FaPaperPlane /></button>
          </form>
        </div>
    );
};
export default MessengerPage;