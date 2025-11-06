import React, { useState, useEffect, useRef } from 'react';
// SỬA LỖI: Import useOutletContext để nhận searchTerm từ Layout
import { useOutletContext, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import {
  SendIcon, ChevronLeftIcon, ChevronRightIcon, BotIcon, UserIcon
} from '../components/Icons.js';

// --- DỮ LIỆU GIẢ LẬP (MOCK DATA) ---
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

  const filteredNews = recentMedicalNews.filter(news =>
    news.title.toLowerCase().includes(searchTerm ? searchTerm.toLowerCase() : "") ||
    news.category.toLowerCase().includes(searchTerm ? searchTerm.toLowerCase() : "")
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

function AIAdvisorSection() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Chào bạn! Tôi là Trợ lý AI của CarePlus. Bạn có triệu chứng gì cần tư vấn sơ bộ không?' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getBotResponse = (input) => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('đau bụng dưới') && (lowerInput.includes('tuổi') || lowerInput.includes('tuoi'))) {
      return { id: Date.now(), sender: 'bot', text: 'Để tôi hiểu rõ hơn, bạn có thể cho biết giới tính của mình là nam hay nữ không?' };
    }
    if (lowerInput === 'nữ' || lowerInput === 'nu') {
       return { id: Date.now(), sender: 'bot', text: 'Cảm ơn bạn. Ở nữ giới 18 tuổi, đau bụng dưới có thể liên quan đến chu kỳ kinh nguyệt (đau bụng kinh). Bạn có thấy triệu chứng này trùng với ngày hành kinh không?' };
    }
    if (lowerInput === 'nam') {
       return { id: Date.now(), sender: 'bot', text: 'Cảm ơn bạn. Ở nam giới, đau bụng dưới có thể liên quan đến tiêu hóa (ví dụ: rối loạn tiêu hóa, viêm ruột thừa) hoặc đường tiết niệu. Cơn đau của bạn có kèm theo sốt hay buồn nôn không?' };
    }
    return { id: Date.now(), sender: 'bot', text: 'Tôi đã ghi nhận thông tin. Bạn có thể mô tả thêm về triệu chứng (ví dụ: đau âm ỉ, đau quặn, có sốt không...)?' };
  }

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const newUserMessage = {
      id: Date.now(),
      sender: 'user',
      text: userInput
    };

    setMessages(prev => [...prev, newUserMessage]);
    setUserInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getBotResponse(userInput);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
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
                  <p className="text-sm break-words">{msg.text}</p>
                </div>

                {msg.sender === 'user' && <UserIcon avatar={user?.avatar} />}
              </div>
            ))}
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

          <form onSubmit={handleSendMessage} className="p-4 bg-gray-50 border-t border-gray-200 flex items-center gap-3">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Nhập triệu chứng của bạn..."
              className="flex-grow p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-500 text-gray-900"
            />
            <button
              type="submit"
              className="w-12 h-12 rounded-full bg-sky-600 hover:bg-sky-700 text-white flex items-center justify-center flex-shrink-0 transition-colors shadow"
            >
              <SendIcon />
            </button>
          </form>
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

