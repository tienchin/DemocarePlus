import React, { useState, useEffect, useRef } from 'react';
// SỬA LỖI: Import useOutletContext để nhận searchTerm từ Layout
import { useOutletContext, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import {
  SendIcon, ChevronLeftIcon, ChevronRightIcon, BotIcon, UserIcon,
  // SỬA LỖI: Import thêm icon Save
  SaveIcon 
} from '../components/Icons.js'; 

// --- DỮ LIỆU GIẢ LẬP (MOCK DATA) ---
// (Dữ liệu này vẫn là giả lập, vì chúng ta chưa kết nối API /api/news)
const heroBanners = [
  {
    id: 1,
    title: "Kiến thức sức khỏe đáng tin cậy",
    description: "Đồng hành cùng gia đình bạn cập nhật tin tức y tế, hiểu đúng bệnh và nhận gợi ý từ Trợ lý AI.",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1600&auto=format&fit=crop",
    cta1_text: "Tư vấn AI ngay",
    cta1_link: "#ai-advisor",
    cta2_text: "Khám phá tin tức",
    cta2_link: "#recent-news",
  },
  {
    id: 2,
    title: "Cam kết của chúng tôi",
    description: "CarePlus cam kết mang đến thông tin Chất lượng – Tận tâm – Khoa học, được kiểm duyệt bởi đội ngũ chuyên gia y tế.",
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1600&auto=format&fit=crop",
    cta1_text: "Cam kết của chúng tôi",
    cta1_link: "/about",
    cta_single: true
  },
  {
    id: 3,
    title: "Người dùng nói về chúng tôi",
    description: "\"Một ứng dụng tuyệt vời! Trợ lý AI đã giúp tôi có những gợi ý ban đầu rất hữu ích trước khi quyết định đi khám bác sĩ.\"",
    imageUrl: "https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=1600&auto=format&fit=crop",
    cta1_text: "Xem thêm đánh giá",
    cta1_link: "/q-a",
    cta2_text: "Bắt đầu ngay",
    cta2_link: "/register",
  }
];

const recentMedicalNews = [
  {
    id: 'news-1',
    title: 'Nghiên cứu mới về vaccine mRNA cho bệnh ung thư da',
    category: 'Nghiên cứu & Thành tựu',
    date: '30/10/2025',
    imageUrl: 'https://images.unsplash.com/photo-1629196599220-6820c388f4c0?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'news-2',
    'title': 'Bộ Y tế: Cảnh báo về dịch sốt xuất huyết gia tăng',
    category: 'Truyền thông Y tế',
    date: '29/10/2025',
    imageUrl: 'https://images.unsplash.com/photo-1581056771107-24201018510b?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'news-3',
    'title': 'AI phát hiện sớm Alzheimer qua giọng nói',
    category: 'Nghiên cứu & Thành tựu',
    date: '28/10/2025',
    imageUrl: 'https://images.unsplash.com/photo-1505751172876-8f3b7c54e5de?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'news-4',
    'title': 'Lợi ích của việc ngủ đủ giấc đối với sức khỏe tim mạch',
    category: 'Thông tin sức khỏe',
    date: '27/10/2025',
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=600&auto=format&fit=crop'
  }
];

// --- CÁC COMPONENT CON CỦA TRANG CHỦ ---

function HeroLanding() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setCurrentBanner((prevIndex) =>
          prevIndex === heroBanners.length - 1 ? 0 : prevIndex + 1
        ),
      15000 // 15 giây
    );

    return () => {
      resetTimeout();
    };
  }, [currentBanner]);

  const goToSlide = (slideIndex) => {
    setCurrentBanner(slideIndex);
  }

  const nextSlide = () => {
    setCurrentBanner((prevIndex) => (prevIndex === heroBanners.length - 1 ? 0 : prevIndex + 1));
  }

  const prevSlide = () => {
     setCurrentBanner((prevIndex) => (prevIndex === 0 ? heroBanners.length - 1 : prevIndex - 1));
  }

  const handleCTAClick = (e, link) => {
    if (link.startsWith('#')) {
      e.preventDefault();
      const targetId = link.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const banner = heroBanners[currentBanner];

  return (
    <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden bg-gray-900">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000"
        style={{ backgroundImage: `url(${banner.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <button onClick={prevSlide} className="absolute top-1/2 left-4 -translate-y-1/2 z-30 p-2 bg-white/20 hover:bg-white/40 rounded-full text-white transition-colors">
        <ChevronLeftIcon />
      </button>
      <button onClick={nextSlide} className="absolute top-1/2 right-4 -translate-y-1/2 z-30 p-2 bg-white/20 hover:bg-white/40 rounded-full text-white transition-colors">
        <ChevronRightIcon />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {heroBanners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${currentBanner === index ? 'bg-white scale-110' : 'bg-white/50'}`}
          ></button>
        ))}
      </div>

      <div className="relative z-20 h-full flex items-center justify-center text-center">
        <div className="max-w-3xl px-4 text-white">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-shadow-lg animate-fade-in-down" style={{textShadow: '0 2px 4px rgba(0,0,0,0.5)'}}>
            {banner.title}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-shadow-md animate-fade-in-up" style={{textShadow: '0 1px 3px rgba(0,0,0,0.5)'}}>
            {banner.description}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
            <Link
              to={banner.cta1_link}
              onClick={(e) => handleCTAClick(e, banner.cta1_link)}
              className="inline-flex items-center justify-center rounded-lg bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 font-semibold shadow-lg transform hover:scale-105 transition-all"
            >
              {banner.cta1_text}
            </Link>
            {!banner.cta_single && (
              <Link
                to={banner.cta2_link}
                onClick={(e) => handleCTAClick(e, banner.cta2_link)}
                className="inline-flex items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm border border-white/50 text-white hover:bg-white/30 px-6 py-3 font-semibold shadow-lg transform hover:scale-105 transition-all"
              >
                {banner.cta2_text}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function RecentNewsSection({ searchTerm }) {

  // SỬA LỖI (Trang trắng): Xử lý trường hợp searchTerm ban đầu là null
  const safeSearchTerm = searchTerm || "";
  const filteredNews = recentMedicalNews.filter(news =>
    news.title.toLowerCase().includes(safeSearchTerm.toLowerCase()) ||
    news.category.toLowerCase().includes(safeSearchTerm.toLowerCase())
  );

  return (
    <section id="recent-news" className="py-16 sm:py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-sky-900 sm:text-4xl">
            Tin tức Y tế & Thành tựu Mới
          </h2>
          <p className="mt-4 text-lg text-sky-700">
            Cập nhật các nghiên cứu, truyền thông y tế và thông tin sức khỏe gần đây.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {filteredNews.map((news) => (
            <div key={news.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
              <Link to={`/news/${news.id}`} className="block group">
                <div className="h-40 overflow-hidden">
                  <img
                    src={news.imageUrl}
                    alt={news.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm text-sky-600 font-semibold">{news.category}</p>
                  <h3 className="mt-1 text-base font-bold text-sky-900 group-hover:text-sky-700 h-16">{news.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">Ngày đăng: {news.date}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
        {filteredNews.length === 0 && (
          <p className="text-center text-gray-500 mt-12">Không tìm thấy tin tức nào phù hợp.</p>
        )}

        <div className="mt-12 text-center">
          <Link
            to="/news-archive"
            className="inline-flex items-center justify-center rounded-lg bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 font-semibold shadow transition-colors duration-200"
          >
            Xem tất cả Tin tức
          </Link>
        </div>
      </div>
    </section>
  );
}

function HungHauSection() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h2 className="text-3xl font-extrabold text-sky-900 sm:text-4xl">
              Một phần của Hệ sinh thái Hùng Hậu
            </h2>
            <p className="mt-4 text-lg text-gray-700">
              CarePlus tự hào là một thành viên của <strong className="text-sky-800">Hùng Hậu Holding</strong>,
              hoạt động trong <strong className="text-sky-800">Ban Phát Triển Sinh Thái</strong>.
            </p>
            <p className="mt-3 text-gray-600">
              Chúng tôi kế thừa và phát huy giá trị cốt lõi vì một cộng đồng khỏe mạnh,
              đóng góp vào hệ sinh thái đa dạng bao gồm Nông nghiệp, Công nghiệp,
              Giáo dục và Công nghệ.
            </p>
            <a
              href="https://hunghau.vn/vi/gioi-thieu/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center rounded-lg bg-sky-100 text-sky-700 hover:bg-sky-200 px-6 py-3 font-semibold shadow-sm transition-colors duration-200"
            >
              Tìm hiểu về Hùng Hậu Holding
            </a>
          </div>
          <div className="flex justify-center">
            <img
              src="https://hunghau.vn/wp-content/uploads/2020/05/Khoi-2020-vn.png"
              alt="Hệ sinh thái Hùng Hậu Holding"
              className="max-w-full h-auto rounded-lg"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// --- NÂNG CẤP CHATBOT (Kết nối API và Thêm nút Lưu) ---
function AIAdvisorSection() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    // Tin nhắn chào mừng sẽ được tải từ API
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [botOptions, setBotOptions] = useState(null); // State cho các nút lựa chọn
  const [isSaving, setIsSaving] = useState(false); // State cho nút lưu
  const chatEndRef = useRef(null);

  // Gửi tin nhắn chào mừng (hoặc các option) khi component tải
  useEffect(() => {
    // Gọi API /interact với tin nhắn rỗng để lấy lời chào/option mặc định
    handleApiInteract(""); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Hàm gọi API /interact (Khi người dùng gõ)
  const handleApiInteract = async (messageText) => {
    setIsTyping(true);
    setBotOptions(null); // Xóa các nút option cũ

    try {
      const response = await fetch('/api/chatbot/interact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText })
      });
      if (!response.ok) throw new Error('Bot interact API error');
      
      const data = await response.json();
      
      if (data.type === 'options') {
        // Nếu bot trả về câu hỏi VÀ các lựa chọn
        setMessages(prev => [...prev, { id: Date.now(), sender: 'bot', text: data.question }]);
        setBotOptions(data.options); // Hiển thị các nút lựa chọn
      } else {
        // Nếu bot trả về text (hiện tại logic backend không có)
        setMessages(prev => [...prev, { id: Date.now(), sender: 'bot', text: data.answer }]);
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { id: Date.now(), sender: 'bot', text: 'Xin lỗi, tôi đang gặp sự cố kết nối.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  // --- SỬA LỖI LOGIC CHATBOT (BUG 1 & 2) ---
  // Hàm gọi API /answer (Khi người dùng chọn option)
  const handleOptionClick = async (optionId, optionText) => {
    // 1. Thêm lựa chọn của người dùng vào tin nhắn
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: optionText
    };
    setMessages(prev => [...prev, userMessage]);
    
    setIsTyping(true);
    setBotOptions(null); // Xóa các nút option
    
    try {
      // 2. Gửi ID của lựa chọn đến backend
      const response = await fetch('/api/chatbot/answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ optionId: optionId })
      });
      if (!response.ok) throw new Error('Bot answer API error');
      
      const data = await response.json();

      // SỬA LỖI LOGIC: Kiểm tra loại phản hồi
      if (data.type === 'options') {
        // 3a. Nếu Bot trả về LỰA CHỌN MỚI (ví dụ: các bệnh lý)
        setMessages(prev => [...prev, { id: Date.now()+1, sender: 'bot', text: data.question }]);
        setBotOptions(data.options); // Hiển thị các nút lựa chọn mới
      } else {
        // 3b. Nếu Bot trả về CÂU TRẢ LỜI CUỐI CÙNG (text)
        setMessages(prev => [...prev, { id: Date.now()+1, sender: 'bot', text: data.answer }]);
        
        // 4. (Tùy chọn) Chỉ quay lại menu chính SAU KHI có câu trả lời cuối cùng.
        await new Promise(res => setTimeout(res, 1500)); // Chờ 1.5 giây
        handleApiInteract(""); // Quay lại menu chính
      }
      // --- KẾT THÚC SỬA LỖI ---

    } catch (error) {
      console.error(error); // In ra lỗi 'Bot answer API error'
      setMessages(prev => [...prev, { id: Date.now(), sender: 'bot', text: 'Xin lỗi, tôi đang gặp sự cố kết nối (answer API).' }]);
    } finally {
      setIsTyping(false);
    }
  };

  // Hàm gửi tin nhắn (khi người dùng gõ và nhấn Enter)
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!userInput.trim() || isTyping || botOptions) return;

    const newUserMessage = {
      id: Date.now(),
      sender: 'user',
      text: userInput
    };

    setMessages(prev => [...prev, newUserMessage]);
    handleApiInteract(userInput); // Gọi API thay vì getBotResponse
    setUserInput('');
  };

  // Hàm LƯU LỊCH SỬ (Yêu cầu mới)
  const handleSaveHistory = async () => {
    if (!user) {
      alert("Bạn cần đăng nhập để sử dụng tính năng này.");
      return;
    }
    if (messages.length < 2) {
      alert("Chưa có nội dung tư vấn để lưu.");
      return;
    }
    
    setIsSaving(true);
    try {
      // Gọi API POST /api/chatbot/save (từ codegd/routes/chatbot.js)
      const response = await fetch('/api/chatbot/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: messages }) // Gửi toàn bộ mảng tin nhắn
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Lưu thất bại.');
      }
      
      alert('Lưu lịch sử tư vấn thành công! Bạn có thể xem lại trong Hồ sơ cá nhân.');
      
    } catch (error) {
      console.error(error);
      alert(`Lỗi: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };


  return (
    <section id="ai-advisor" className="py-16 sm:py-24 bg-gradient-to-br from-sky-600 to-indigo-700 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Trợ lý Sức khỏe AI
          </h2>
          <p className="mt-4 text-lg text-sky-100 max-w-2xl mx-auto">
            Bắt đầu cuộc trò chuyện để nhận gợi ý sơ bộ.
            <br/>
            <strong className="text-yellow-300">Lưu ý: Thông tin này không thay thế chẩn đoán của bác sĩ.</strong>
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl max-w-lg mx-auto overflow-hidden">
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'bot' && <BotIcon className="w-10 h-10 rounded-full bg-sky-600 flex items-center justify-center flex-shrink-0 text-white p-2" />}

                <div className={`rounded-2xl p-3 max-w-[80%] ${
                  msg.sender === 'user'
                    ? 'bg-sky-600 text-white rounded-br-none'
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}>
                  {/* Hiển thị text, xử lý xuống dòng (pre-wrap) */}
                  <p className="text-sm break-words whitespace-pre-wrap">{msg.text}</p>
                </div>

                {msg.sender === 'user' && <UserIcon avatar={user?.avatar} />}
              </div>
            ))}
            
            {/* Hiển thị các nút Option */}
            {botOptions && (
              <div className="flex flex-wrap gap-2 p-2 justify-center">
                {Object.entries(botOptions).map(([key, value]) => (
                  <button 
                    key={key} 
                    onClick={() => handleOptionClick(key, value)}
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
          <form onSubmit={handleSendMessage} className="p-4 bg-gray-50 border-t border-gray-200 flex items-center gap-3">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              // Vô hiệu hóa nếu bot đang gõ HOẶC đang hiển thị lựa chọn
              disabled={isTyping || !!botOptions} 
              placeholder={botOptions ? "Vui lòng chọn một mục ở trên..." : "Nhập triệu chứng của bạn..."}
              className="flex-grow p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-500 text-gray-900 disabled:bg-gray-200"
            />
            <button
              type="submit"
              disabled={isTyping || !!botOptions} // Vô hiệu hóa nút gửi
              className="w-12 h-12 rounded-full bg-sky-600 hover:bg-sky-700 text-white flex items-center justify-center flex-shrink-0 transition-colors shadow disabled:opacity-50"
            >
              <SendIcon />
            </button>
          </form>
          
          {/* NÚT LƯU LỊCH SỬ MỚI */}
          <div className="p-4 bg-gray-100 border-t border-gray-200 text-center">
            <button
              onClick={handleSaveHistory}
              disabled={isSaving || !user || messages.length < 2}
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow disabled:opacity-50"
            >
              <SaveIcon className="w-5 h-5" />
              {isSaving ? 'Đang lưu...' : 'Lưu Lịch sử Tư vấn'}
            </button>
            {!user && (
              <p className="text-xs text-red-600 mt-2">
                Bạn cần <Link to="/login" className="font-bold underline">đăng nhập</Link> để lưu lịch sử.
              </p>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}


// --- COMPONENT CHÍNH CỦA TRANG CHỦ ---
export default function HomePage() {
  // SỬA LỖI: Lấy searchTerm từ context của Layout (do <Outlet> cung cấp)
  const searchTerm = useOutletContext();

  return (
    <div className="animate-fade-in">
      <HeroLanding />
      {/* SỬA LỖI: Truyền searchTerm thật xuống component tin tức */}
      <RecentNewsSection searchTerm={searchTerm} />
      <HungHauSection />
      <AIAdvisorSection />
    </div>
  );
}