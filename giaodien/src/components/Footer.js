// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom'; // <-- LỖI THIẾU IMPORT ĐÃ ĐƯỢC SỬA Ở ĐÂY
import { FaFacebook, FaYoutube, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#1f2937] text-gray-300 pt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Cột 1: Giới thiệu */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">CarePlus</h3>
            <p className="text-sm">
              Cổng thông tin y khoa toàn diện, trao quyền kiến thức sức khỏe cho mọi người.
            </p>
          </div>

          {/* Cột 2: Liên kết nhanh */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-white hover:underline">Về chúng tôi</Link></li>
              <li><Link to="/contact" className="hover:text-white hover:underline">Liên hệ</Link></li>
              <li><Link to="/privacy" className="hover:text-white hover:underline">Chính sách bảo mật</Link></li>
            </ul>
          </div>

          {/* Cột 3: Chuyên mục */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Chuyên mục</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white hover:underline">Tin tức</Link></li>
              <li><Link to="/knowledge" className="hover:text-white hover:underline">Kho Kiến thức</Link></li>
              <li><Link to="/q-a" className="hover:text-white hover:underline">Hỏi & Đáp</Link></li>
            </ul>
          </div>

          {/* Cột 4: Kết nối */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Kết nối với chúng tôi</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white"><FaFacebook size={24}/></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white"><FaYoutube size={24}/></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white"><FaTwitter size={24}/></a>
            </div>
          </div>
        </div>

        {/* Dòng Copyright */}
        <div className="mt-8 py-4 border-t border-gray-700 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Democareplus. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;