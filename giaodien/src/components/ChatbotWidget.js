// src/components/ChatbotWidget.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaComments, FaTimes, FaArrowRight } from 'react-icons/fa';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="fixed bottom-24 right-5 bg-accent w-16 h-16 rounded-full text-white flex items-center justify-center shadow-lg transform transition-transform hover:scale-110 z-50">
        {isOpen ? <FaTimes size={24} /> : <FaComments size={24} />}
      </button>

      {isOpen && (
        <div className="fixed bottom-5 right-5 w-[calc(100%-2.5rem)] max-w-sm card-bg rounded-lg shadow-xl flex flex-col z-50">
          <div className="p-4 border-b border-main flex justify-between items-center">
            <h3 className="font-bold text-main">Trợ lý sức khỏe</h3>
            <button onClick={() => setIsOpen(false)} className="p-1 rounded-full text-subtle text-accent-hover"><FaTimes /></button>
          </div>
          <div className="p-4 space-y-4 text-center">
            <p className="text-subtle">Bắt đầu cuộc trò chuyện với trợ lý ảo để được tư vấn sức khỏe ban đầu.</p>
            <Link to="/messenger" onClick={() => setIsOpen(false)} className="inline-flex items-center gap-2 bg-accent bg-accent-hover text-white font-bold py-3 px-6 rounded-lg transition-colors">
              Bắt đầu Chat <FaArrowRight />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
export default ChatbotWidget;