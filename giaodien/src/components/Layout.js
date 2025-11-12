import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js'; 
import { 
    SearchIcon, BotIcon, FacebookIcon, PhoneIcon,
    MenuIcon, XIcon, SendIcon, UserIcon, SaveIcon
} from './Icons.js'; 

// --- COMPONENT CON: Navbar (Đã thiết kế lại) ---
function Navbar({ user, onLogout, searchTerm, onSearchChange }) {
  const DEFAULT_AVATAR = 'https://placehold.co/100x100/E2E8F0/4A5568?text=User';
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleSearch = (e) => {
    e.preventDefault(); 
    if (searchTerm.trim()) {
      navigate(`/knowledge?q=${encodeURIComponent(searchTerm)}`);
    }
  };
  
  const closeMenu = () => setIsMenuOpen(false);

  // Tự động đóng menu khi chuyển trang
  useEffect(() => {
    closeMenu();
  }, [location]);

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 gap-4">
          
          <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
            <img 
              src="https://ttagencyads.com/wp-content/uploads/2022/03/Logo-rong-do.jpg" 
              alt="CarePlus Logo" 
              className="w-10 h-10 rounded-full object-cover transition-all duration-300 group-hover:scale-110"
              style={{ 
                filter: 'saturate(1.3) brightness(1.05) drop-shadow(0 1px 2px rgba(220, 38, 38, 0.2))' 
              }}
            />
            <div><h1 className="text-xl font-bold text-sky-600">CarePlus</h1></div>
          </Link>
          
          <form onSubmit={handleSearch} className="relative flex-grow max-w-xs md:max-w-md hidden md:block">
            <input
              type="text"
              placeholder="Tìm kiếm bài đăng, tin tức..."
              value={searchTerm} 
              onChange={(e) => onSearchChange(e.target.value)} 
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon />
            </div>
            <button type="submit" className="hidden"></button>
          </form>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
              aria-label="Mở menu"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Menu Dropdown */}
      <div 
        className={`fixed top-0 right-0 h-screen w-72 bg-white shadow-xl border-l border-gray-200 z-[60] transform transition-transform duration-300 ease-in-out
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-semibold text-lg text-sky-800">Menu</h2>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
            aria-label="Đóng menu"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        
        <div className="user-profile-section p-4 border-b">
          {user ? (
            <div className="flex flex-col items-start gap-3">
              <Link to="/profile" onClick={closeMenu} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 w-full">
                <img src={user.avatar || DEFAULT_AVATAR} alt="User Avatar" className="w-10 h-10 rounded-full border-2 border-sky-500 object-cover"/>
                <span className="font-semibold text-gray-700">{user.name}</span>
              </Link>
              <button 
                onClick={() => {
                  onLogout();
                  closeMenu();
                }} 
                className="w-full bg-red-500 text-white px-3 py-2 rounded-md font-medium hover:bg-red-600 text-sm"
              >
                Thoát
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              onClick={closeMenu} 
              className="w-full text-center block bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
            >
              Đăng nhập
            </Link>
          )}
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          <Link to="/" onClick={closeMenu} className="p-3 rounded-lg hover:bg-gray-100 font-medium text-gray-700">Trang chủ</Link>
          <Link to="/knowledge" onClick={closeMenu} className="p-3 rounded-lg hover:bg-gray-100 font-medium text-gray-700">Kho Kiến thức</Link>
          <Link to="/q-a" onClick={closeMenu} className="p-3 rounded-lg hover:bg-gray-100 font-medium text-gray-700">Hỏi & Đáp</Link>
          <Link to="/about" onClick={closeMenu} className="p-3 rounded-lg hover:bg-gray-100 font-medium text-gray-700">Về chúng tôi</Link>
        </nav>
      </div>
      
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-[55]" // z-index thấp hơn menu
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </nav>
  );
}

// --- (Footer giữ nguyên) ---
function Footer() {
  return (
    <footer className="bg-sky-900 text-sky-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold uppercase text-white tracking-wider">Về CarePlus</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/about" className="text-base hover:text-white">Giới thiệu</Link></li>
              <li><Link to="#" className="text-base hover:text-white">Đội ngũ</Link></li>
              <li><Link to="#" className="text-base hover:text-white">Tuyển dụng</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase text-white tracking-wider">Hỗ trợ</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/q-a" className="text-base hover:text-white">Câu hỏi thường gặp</Link></li>
              <li><Link to="/contact" className="text-base hover:text-white">Liên hệ</Link></li>
              <li><Link to="#" className="text-base hover:text-white">Chính sách bảo mật</Link></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-2">
             <h3 className="text-sm font-semibold uppercase text-white tracking-wider">Khuyến cáo</h3>
             <p className="mt-4 text-base">
               Thông tin trên CarePlus chỉ mang tính chất tham khảo, không thay thế cho chẩn đoán hoặc điều trị y khoa chuyên nghiệp. Luôn luôn tham khảo ý kiến bác sĩ hoặc chuyên gia y tế có trình độ.
             </p>
          </div>
        </div>
        <div className="mt-8 border-t border-sky-800 pt-8 text-center">
          <p className="text-base">&copy; 2025 DemoCarePlus. Một phần của Hùng Hậu Holding.</p>
        </div>
      </div>
    </footer>
  );
}

// --- (FloatingActionButtons được cập nhật để mở Modal) ---
function FloatingActionButtons({ onOpenChat }) {
  const handleAIClick = (e) => {
    e.preventDefault();
    // Thay vì cuộn trang, gọi hàm onOpenChat
    onOpenChat(); 
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {/* SỬA LỖI: onClick gọi onOpenChat */}
      <button
        onClick={handleAIClick}
        className="w-14 h-14 rounded-full bg-sky-600 hover:bg-sky-700 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110"
        aria-label="Tư vấn AI"
      >
        <BotIcon className="w-7 h-7 text-white" />
      </button>
      
      <a
        href="https://www.facebook.com/trien.vo.337115/about"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110"
        aria-label="Facebook"
      >
        <FacebookIcon />
      </a>
      
      <a
        href="tel:0877342668"
        className="w-14 h-14 rounded-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110"
        aria-label="Gọi điện thoại"
      >
        <PhoneIcon />
      </a>
    </div>
  );
}

// --- COMPONENT CHATBOT NỔI (YÊU CẦU MỚI) ---
// Component này chứa UI của chatbot, nhận logic từ Layout
function ChatbotModal({ 
  isOpen, 
  onClose,
  // Props cho "bộ não" chat
  user,
  messages,
  userInput,
  isTyping,
  botOptions,
  isSaving,
  onSendMessage,
  onOptionClick,
  onSaveHistory,
  onUserInput
}) {
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Cuộn xuống khi có tin nhắn mới
      setTimeout(() => {
         chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* SỬA LỖI: Xóa lớp phủ (Overlay) để không làm mờ trang */}
      
      {/* Nội dung Modal (giống Shopee) */}
      <div className="fixed bottom-24 right-6 z-50 w-full max-w-md animate-fade-in-up">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
          {/* Header Modal */}
          <div className="flex justify-between items-center p-4 bg-sky-600 text-white">
            <h3 className="text-lg font-semibold">Trợ lý Sức khỏe AI</h3>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-white hover:bg-sky-500"
              aria-label="Đóng chat"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>
          
          {/* Nội dung Chat */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'bot' && <BotIcon className="w-10 h-10 rounded-full bg-sky-600 flex items-center justify-center flex-shrink-0 text-white p-2" />}
                <div className={`rounded-2xl p-3 max-w-[80%] ${
                  msg.sender === 'user'
                    ? 'bg-sky-600 text-white rounded-br-none'
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}>
                  {/* SỬA LỖI (IN ĐẬM): Sử dụng SimpleMarkdown */}
                  <SimpleMarkdown text={msg.text} />
                </div>
                {msg.sender === 'user' && <UserIcon avatar={user?.avatar} />}
              </div>
            ))}
            
            {botOptions && (
              <div className="flex flex-wrap gap-2 p-2 justify-center">
                {Object.entries(botOptions).map(([key, value]) => (
                  <button 
                    key={key} 
                    onClick={() => onOptionClick(key, value)}
                    className="bg-sky-100 text-sky-800 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-sky-200 transition-colors"
                  >
                    {value}
                  </button>
                ))}
              </div>
            )}

            {isTyping && (
              <div className="flex gap-3 justify-start">
                <BotIcon className="w-10 h-10 rounded-full bg-sky-600 flex items-center justify-center flex-shrink-0 text-white p-2" />
                <div className="rounded-2xl p-3 bg-gray-100 text-gray-800 rounded-bl-none">
                  <p className="text-sm italic">Trợ lý AI đang nhập...</p>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Form nhập liệu */}
          <form onSubmit={onSendMessage} className="p-4 bg-gray-50 border-t border-gray-200 flex items-center gap-3">
            <input
              type="text"
              value={userInput}
              onChange={onUserInput}
              disabled={isTyping || !!botOptions} 
              placeholder={botOptions ? "Vui lòng chọn một mục ở trên..." : "Nhập triệu chứng của bạn..."}
              className="flex-grow p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-500 text-gray-900 disabled:bg-gray-200"
            />
            <button
              type="submit"
              disabled={isTyping || !!botOptions} 
              className="w-12 h-12 rounded-full bg-sky-600 hover:bg-sky-700 text-white flex items-center justify-center flex-shrink-0 transition-colors shadow disabled:opacity-50"
            >
              <SendIcon />
            </button>
          </form>
          
          {/* Nút Lưu */}
          <div className="p-4 bg-gray-100 border-t border-gray-200 text-center">
            <button
              onClick={onSaveHistory}
              disabled={isSaving || !user || messages.length < 2}
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow disabled:opacity-50"
            >
              <SaveIcon className="w-5 h-5" />
              {isSaving ? 'Đang lưu...' : 'Lưu Lịch sử Tư vấn'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}


// --- COMPONENT CHÍNH (LAYOUT) ---
export default function Layout() { 
  const { user, logout } = useAuth(); 
  const [searchTerm, setSearchTerm] = useState(''); 
  
  // --- YÊU CẦU MỚI: NÂNG STATE CHATBOT LÊN LAYOUT ---
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [botOptions, setBotOptions] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Load lời chào ban đầu
  const handleApiInteract = useCallback(async (messageText) => {
    setIsTyping(true);
    setBotOptions(null); 
    try {
      const response = await fetch('/api/chatbot/interact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText })
      });
      if (!response.ok) throw new Error('Bot interact API error');
      const data = await response.json();
      if (data.type === 'options') {
        setMessages(prev => [...prev, { id: Date.now(), sender: 'bot', text: data.question }]);
        setBotOptions(data.options); 
      } else {
        setMessages(prev => [...prev, { id: Date.now(), sender: 'bot', text: data.answer }]);
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { id: Date.now(), sender: 'bot', text: 'Xin lỗi, tôi đang gặp sự cố kết nối.' }]);
    } finally {
      setIsTyping(false);
    }
  }, []); // Bọc trong useCallback

  useEffect(() => {
    handleApiInteract(""); 
  }, [handleApiInteract]);
  
  // --- (Các hàm Chatbot được di chuyển từ HomePage lên đây) ---
  
  const handleOptionClick = async (optionId, optionText) => {
    const userMessage = { id: Date.now(), sender: 'user', text: optionText };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    setBotOptions(null); 
    try {
      const response = await fetch('/api/chatbot/answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ optionId: optionId })
      });
      if (!response.ok) throw new Error('Bot answer API error');
      const data = await response.json();
      if (data.type === 'options') {
        setMessages(prev => [...prev, { id: Date.now()+1, sender: 'bot', text: data.question }]);
        setBotOptions(data.options); 
      } else {
        setMessages(prev => [...prev, { id: Date.now()+1, sender: 'bot', text: data.answer }]);
        await new Promise(res => setTimeout(res, 1500)); 
        handleApiInteract(""); 
      }
    } catch (error) {
      console.error("Lỗi tại handleOptionClick:", error); 
      setMessages(prev => [...prev, { id: Date.now(), sender: 'bot', text: 'Xin lỗi, tôi đang gặp sự cố kết nối (answer API).' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!userInput.trim() || isTyping || botOptions) return;
    const newUserMessage = { id: Date.now(), sender: 'user', text: userInput };
    setMessages(prev => [...prev, newUserMessage]);
    handleApiInteract(userInput); 
    setUserInput('');
  };
  
  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSaveHistory = async () => {
    if (!user) { alert("Bạn cần đăng nhập để sử dụng tính năng này."); return; }
    if (messages.length < 2) { alert("Chưa có nội dung tư vấn để lưu."); return; }
    
    setIsSaving(true);
    try {
      const response = await fetch('/api/chatbot/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: messages }) 
      });
      if (!response.ok) { const err = await response.json(); throw new Error(err.message || 'Lưu thất bại.'); }
      alert('Lưu lịch sử tư vấn thành công! Bạn có thể xem lại trong Hồ sơ cá nhân.');
    } catch (error) {
      console.error(error);
      alert(`Lỗi: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };
  
  // Đóng gói state và hàm cho các component con
  const chatState = { user, messages, userInput, isTyping, botOptions, isSaving };
  const chatActions = { 
    onSendMessage: handleSendMessage, 
    onOptionClick: handleOptionClick, 
    onSaveHistory: handleSaveHistory,
    onUserInput: handleUserInput
  };

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <Navbar 
        user={user} 
        onLogout={logout} 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm}
      />
      <main className="flex-grow">
        <Outlet context={{ searchTerm, chatState, chatActions }} />
      </main>
      <Footer />
      <FloatingActionButtons onOpenChat={() => setIsChatModalOpen(true)} />
      
      <ChatbotModal 
        isOpen={isChatModalOpen} 
        onClose={() => setIsChatModalOpen(false)}
        {...chatState}
        {...chatActions}
      />
    </div>
  );
}

// --- SỬA LỖI (IN ĐẬM): Component render Markdown ---
function SimpleMarkdown({ text }) {
  if (!text) return null;

  // 1. Tách văn bản dựa trên \n (xuống dòng)
  const lines = text.split('\n');

  return (
    <div className="text-sm break-words">
      {lines.map((line, lineIndex) => (
        <p key={lineIndex} className="mb-1 last:mb-0">
          {/* 2. Tách mỗi dòng dựa trên **bold** */}
          {line.split(/(\*\*.*?\*\*)/g).map((part, partIndex) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={partIndex}>{part.substring(2, part.length - 2)}</strong>;
            }
            return <span key={partIndex}>{part}</span>;
          })}
        </p>
      ))}
    </div>
  );
}