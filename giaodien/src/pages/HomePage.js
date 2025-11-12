import React, { useState, useEffect, useRef } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import {
  SendIcon, ChevronLeftIcon, ChevronRightIcon, BotIcon, UserIcon,
  SaveIcon, ArrowLeftIcon // Thêm ArrowLeftIcon nếu cần cho trang chủ
} from '../components/Icons.js';
// SỬA LỖI: Xóa medicalNewsData vì dữ liệu giờ lấy từ API
// import { medicalNewsData } from '../newsData.js'; 

// --- SỬA LỖI: Component render Markdown ---
function SimpleMarkdown({ text }) {
  if (!text) return null;
  const lines = text.split('\n');
  return (
    <div className="text-sm break-words">
      {lines.map((line, lineIndex) => (
        <p key={lineIndex} className="mb-1 last:mb-0">
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

// --- CÁC COMPONENT CON (Hero, News, HungHau) ---
const heroBanners = [
  { id: 1, title: "Kiến thức sức khỏe đáng tin cậy", description: "Đồng hành cùng gia đình bạn cập nhật tin tức y tế, hiểu đúng bệnh và nhận gợi ý từ Trợ lý AI.", imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1600&auto=format&fit=crop", cta1_text: "Tư vấn AI ngay", cta1_link: "#ai-advisor", cta2_text: "Khám phá tin tức", cta2_link: "#recent-news" },
  { id: 2, title: "Cam kết của chúng tôi", description: "CarePlus cam kết mang đến thông tin Chất lượng – Tận tâm – Khoa học, được kiểm duyệt bởi đội ngũ chuyên gia y tế.", imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1600&auto=format&fit=crop", cta1_text: "Cam kết của chúng tôi", cta1_link: "/about", cta_single: true },
  { id: 3, title: "Người dùng nói về chúng tôi", description: "\"Một ứng dụng tuyệt vời! Trợ lý AI đã giúp tôi có những gợi ý ban đầu rất hữu ích trước khi quyết định đi khám bác sĩ.\"", imageUrl: "https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=1600&auto=format&fit=crop", cta1_text: "Xem thêm đánh giá", cta1_link: "/q-a", cta2_text: "Bắt đầu ngay", cta2_link: "/register" }
];

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
  // SỬA LỖI ESLint: Thêm dependency
  }, [currentBanner, heroBanners.length]); 

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

// --- SỬA LỖI (IN ĐẬM): RecentNewsSection LẤY DỮ LIỆU TỪ API ---
function RecentNewsSection({ searchTerm }) {
  const [latestNews, setLatestNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  // Lấy 5 bài viết mới nhất cho trang chủ (có thể điều chỉnh số lượng)
  const NEWS_LIMIT = 5; 

  useEffect(() => {
    const fetchLatestNews = async () => {
      setIsLoading(true);
      setError('');
      try {
        // Gọi API backend để lấy các bài viết mới nhất
        const response = await fetch(`/api/news?page=1&limit=${NEWS_LIMIT}`); 
        if (!response.ok) {
          throw new Error('Không thể tải tin tức mới nhất.');
        }
        const data = await response.json();
        setLatestNews(data.articles);
      } catch (err) {
        console.error("Lỗi khi fetch tin tức mới:", err);
        setError('Đã có lỗi xảy ra khi tải tin tức.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestNews();
  }, []); // Chỉ chạy một lần khi component mount

  // Lọc tin tức dựa trên searchTerm (chỉ áp dụng cho tin tức đang hiển thị trên trang chủ)
  const filteredNews = latestNews.filter(news => 
    news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    news.category.toLowerCase().includes(searchTerm.toLowerCase())
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

        {isLoading && (
          <div className="mt-12 text-center">
            <p className="text-gray-500">Đang tải tin tức...</p>
          </div>
        )}
        {error && (
          <div className="mt-12 text-center">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {!isLoading && !error && filteredNews.length > 0 && (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {filteredNews.map((news) => (
              <div key={news.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
                {/* SỬA LỖI: Link tới trang chi tiết bài viết mới */}
                <Link to={`/news/${news.id}`} className="block group"> 
                  <div className="h-40 overflow-hidden">
                    <img
                      src={news.imageUrl || 'https://placehold.co/600x400/e2e8f0/94a3b8?text=Hinh+Anh'}
                      alt={news.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400/e2e8f0/94a3b8?text=Hinh+Anh'; }}
                    />
                  </div>
                  <div className="p-4">
                    {/* SỬA LỖI: Giả định category name trả về từ API, hoặc hiển thị mặc định */}
                    <p className="text-sm text-sky-600 font-semibold">{news.category || 'Tin tức'}</p> 
                    <h3 className="mt-1 text-base font-bold text-sky-900 group-hover:text-sky-700 h-16">{news.title}</h3>
                    <p className="mt-2 text-sm text-gray-600">Ngày đăng: {news.date || 'Không rõ'}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
        {!isLoading && !error && filteredNews.length === 0 && (
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

// --- TÁI CẤU TRÚC AIAdvisorSection ---
// Component này giờ là "dumb" (ngu), nó nhận state và hàm từ Layout
function AIAdvisorSection({ chatState, chatActions }) {
  // Logic đã được chuyển lên Layout.js
  const { user, messages, userInput, isTyping, botOptions, isSaving } = chatState;
  const { onSendMessage, onOptionClick, onSaveHistory, onUserInput } = chatActions;
  const chatEndRef = useRef(null);
  
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

        {/* Đây là khung chat trên trang chủ, nó dùng chung state với Modal */}
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
              onChange={onUserInput} // Dùng hàm từ props
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
          
          {/* Nút Lưu Lịch sử */}
          <div className="p-4 bg-gray-100 border-t border-gray-200 text-center">
            <button
              onClick={onSaveHistory} // Dùng hàm từ props
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
  // SỬA LỖI: Lấy searchTerm VÀ "bộ não" chatbot từ Layout
  const context = useOutletContext();
  
  // SỬA LỖI: Xử lý trường hợp context chưa sẵn sàng (khi Layout đang tải)
  if (!context) {
    return <div className="animate-pulse p-10 text-center">Đang tải trang chủ...</div>; 
  }

  const { searchTerm, chatState, chatActions } = context;

  return (
    <div className="animate-fade-in">
      <HeroLanding />
      {/* SỬA LỖI: Truyền searchTerm THẬT xuống RecentNewsSection */}
      {/* Lưu ý: Tìm kiếm hiện tại chỉ lọc trên 5 bài hiển thị trên trang chủ */}
      <RecentNewsSection searchTerm={searchTerm} /> 
      <HungHauSection />
      {/* SỬA LỖI: Truyền "bộ não" chatbot xuống AIAdvisorSection */}
      <AIAdvisorSection chatState={chatState} chatActions={chatActions} />
    </div>
  );
}