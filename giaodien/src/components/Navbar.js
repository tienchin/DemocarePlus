// src/components/Navbar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaSearch, FaTimes } from 'react-icons/fa';

const DEFAULT_AVATAR = 'https://gamek.mediacdn.vn/133514250583805952/2023/1/14/vi-daochich-dtcl-6-16736364925801623067077-29-0-657-1200-crop-16736691436801405945754.png';

const Navbar = ({ setSearchTerm }) => {
  const { user, logout } = useAuth();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(query);
    navigate('/');
  };

  const clearSearch = () => {
    setQuery('');
    setSearchTerm('');
  };

  return (
    <header className="card-bg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <Link to="/" className="flex items-center gap-3">
            <img src="https://ttagencyads.com/wp-content/uploads/2022/03/Logo-rong-do.jpg" alt="CarePlus Logo" className="w-10 h-10 rounded-full object-cover"/>
            <div><h1 className="text-xl font-bold text-accent">CarePlus</h1></div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 font-semibold">
            <Link to="/" className="text-main text-accent-hover">Trang chủ</Link>
            <Link to="/knowledge" className="text-main text-accent-hover">Kho Kiến thức</Link>
            <Link to="/q-a" className="text-main text-accent-hover">Hỏi & Đáp</Link>
            <Link to="/about" className="text-main text-accent-hover">Về chúng tôi</Link>
          </nav>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <Link to="/profile" className="flex items-center gap-3">
                  <span className="font-semibold text-main hidden sm:inline">{user.name}</span>
                  <img src={user.avatar || DEFAULT_AVATAR} alt="User Avatar" className="w-9 h-9 rounded-full border-2 border-accent object-cover"/>
                </Link>
                <button onClick={logout} className="bg-red-500 text-white px-3 py-1.5 rounded-md font-medium hover:bg-red-600 text-sm">Thoát</button>
              </div>
            ) : (
              <Link to="/login" className="bg-accent bg-accent-hover text-white px-4 py-2 rounded-md font-medium transition-colors">
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
        
        <div className="pb-4 relative">
          <form onSubmit={handleSearch} className="relative">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm kiếm bệnh, triệu chứng, bài viết..." 
              className="w-full py-2 pl-4 pr-20 rounded-full border border-main bg-primary text-main placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-accent"
              style={{backgroundColor: 'var(--bg-primary)'}}
            />
            {query && <button type="button" onClick={clearSearch} className="absolute right-12 top-1/2 -translate-y-1/2 p-2 text-subtle hover:text-main"><FaTimes /></button>}
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full text-subtle text-accent-hover">
              <FaSearch />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Navbar;