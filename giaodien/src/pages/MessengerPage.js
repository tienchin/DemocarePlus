// src/pages/MessengerPage.js
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaPaperPlane } from 'react-icons/fa';
import api from '../services/api';

const BOT_AVATAR = 'https://maunailxinh.com/wp-content/uploads/2025/06/avatar-bua-troll-6.jpg';

const MessengerPage = () => {
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const chatEndRef = useRef(null);

    useEffect(() => {
        const initialMessage = `Chào ${user ? user.name.split(' ')[0] : 'bạn'}! Tôi có thể giúp gì cho bạn?`;
        setMessages([{ type: 'bot', text: initialMessage }]);
    }, [user]);

    useEffect(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async (e) => {
      e.preventDefault();
      if (!input.trim()) return;
      const userMessage = { type: 'user', text: input };
      setMessages(prev => [...prev, userMessage]);
      setInput('');
      // Giả lập API call
      setTimeout(() => {
        let botResponse = 'Xin lỗi, tôi chưa hiểu câu hỏi của bạn.';
        if (input.toLowerCase().includes('đau đầu')) {
          botResponse = 'Đau đầu có nhiều nguyên nhân. Bạn có thể cho tôi biết bạn đau ở vùng nào không?';
        }
        setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
      }, 1000);
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
                <div className={`p-3 rounded-lg max-w-[80%] ${msg.type === 'user' ? 'bg-accent text-white' : 'bg-gray-100 text-gray-800'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <form onSubmit={handleSend} className="p-4 border-t border-main flex gap-2 flex-shrink-0">
            <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="Nhập câu hỏi của bạn..." className="flex-grow p-3 rounded-md border border-main bg-transparent text-main"/>
            <button type="submit" className="bg-accent p-3 rounded-md text-white"><FaPaperPlane /></button>
          </form>
        </div>
    );
};
export default MessengerPage;