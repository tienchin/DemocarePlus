// src/components/HeroSection.js
import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative h-[60vh] flex items-center justify-center text-center text-white">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200" alt="Medical Background" className="absolute inset-0 w-full h-full object-cover"/>
      <div className="relative z-10 p-4">
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">Chăm sóc sức khỏe toàn diện</h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">Tiếp cận kiến thức y khoa đáng tin cậy và các công cụ hữu ích để chủ động bảo vệ sức khỏe của bạn.</p>
        <div className="mt-8 space-x-4">
          <Link to="/about" className="bg-accent hover:bg-accent-hover text-white font-bold py-3 px-8 rounded-full transition-colors">Tìm hiểu thêm</Link>
          <Link to="/contact" className="bg-white text-accent font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-colors">Liên hệ</Link>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
