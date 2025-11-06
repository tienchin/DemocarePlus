import React, { useState } from 'react';
// SỬA LỖI 1: Import <Outlet>
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import { 
    SearchIcon, BotIcon, FacebookIcon, PhoneIcon 
} from './Icons.js'; // Import từ Icons.js

// --- COMPONENT CON ---

// SỬA LỖI 2: Navbar giờ nhận searchTerm và onSearchChange từ cha (Layout)
function Navbar({ user, onLogout, searchTerm, onSearchChange }) {
  const DEFAULT_AVATAR = 'https://placehold.co/100x100/E2E8F0/4A5568?text=User';
  
  const navigate = useNavigate();
  
  // SỬA LỖI 3: Di chuyển state 'searchTerm' lên component cha (Layout)
  
  const handleSearch = (e) => {
    e.preventDefault(); 
    if (searchTerm.trim()) {
      // Điều hướng đến trang Kho Kiến thức với truy vấn
      navigate(`/knowledge?q=${encodeURIComponent(searchTerm)}`);
    }
  };

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
              value={searchTerm} // Dùng prop
              onChange={(e) => onSearchChange(e.target.value)} // Dùng prop
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon />
            </div>
            <button type="submit" className="hidden"></button>
          </form>

          <div className="flex items-center gap-4">
            <nav className="hidden lg:flex items-center gap-6 font-semibold">
              <Link to="/" className="text-gray-600 hover:text-sky-700">Trang chủ</Link>
              <Link to="/knowledge" className="text-gray-600 hover:text-sky-700">Kho Kiến thức</Link>
              <Link to="/q-a" className="text-gray-600 hover:text-sky-700">Hỏi & Đáp</Link>
              <Link to="/about" className="text-gray-600 hover:text-sky-700">Về chúng tôi</Link>
            </nav>

            {user ? (
              <div className="flex items-center gap-3">
                <Link to="/profile" className="flex items-center gap-3">
                  <span className="font-semibold text-gray-700 hidden sm:inline">{user.name}</span>
                  <img src={user.avatar || DEFAULT_AVATAR} alt="User Avatar" className="w-9 h-9 rounded-full border-2 border-sky-500 object-cover"/>
                </Link>
                <button onClick={onLogout} className="bg-red-500 text-white px-3 py-1.5 rounded-md font-medium hover:bg-red-600 text-sm">Thoát</button>
              </div>
            ) : (
              <Link to="/login" className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

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

function FloatingActionButtons() {
  const handleAIClick = (e) => {
    e.preventDefault();
    const aiSection = document.getElementById('ai-advisor');
    if (aiSection) {
      aiSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Nếu AI section không có trên trang hiện tại, điều hướng đến trang chủ
      window.location.href = '/#ai-advisor';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <a
        href="#ai-advisor"
        onClick={handleAIClick}
        className="w-14 h-14 rounded-full bg-sky-600 hover:bg-sky-700 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110"
        aria-label="Tư vấn AI"
      >
        <BotIcon className="w-7 h-7 text-white" />
      </a>
      
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

// --- COMPONENT CHÍNH ---
// SỬA LỖI 4: Xóa {children} khỏi props
export default function Layout() { 
  const { user, logout } = useAuth(); 
  
  // SỬA LỖI 5: Nâng state 'searchTerm' lên đây
  const [searchTerm, setSearchTerm] = useState(''); 

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      {/* SỬA LỖI 6: Truyền state và setter xuống Navbar */}
      <Navbar 
        user={user} 
        onLogout={logout} 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm}
      />
      <main className="flex-grow">
        {/* SỬA LỖI 7: Thay {children} bằng <Outlet /> và truyền context */}
        <Outlet context={searchTerm} />
      </main>
      <Footer />
      <FloatingActionButtons />
    </div>
  );
}