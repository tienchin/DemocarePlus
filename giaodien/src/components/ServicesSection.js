// src/components/ServicesSection.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaBookMedical, FaQuestionCircle, FaRobot } from 'react-icons/fa';

const services = [
  { to: "/knowledge", icon: <FaBookMedical size={32} />, title: "Kho Kiến thức", description: "Tra cứu thông tin chi tiết về bệnh, thuốc và các phương pháp điều trị." },
  { to: "/q-a", icon: <FaQuestionCircle size={32} />, title: "Hỏi & Đáp Sức khỏe", description: "Đặt câu hỏi và nhận câu trả lời từ cộng đồng và các chuyên gia." },
  { to: "/messenger", icon: <FaRobot size={32} />, title: "Tư vấn AI", description: "Trợ lý ảo cung cấp thông tin ban đầu dựa trên triệu chứng của bạn." },
];

const ServicesSection = () => {
  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4 text-center">
        {/* SỬA LỖI MÀU CHỮ Ở ĐÂY */}
        <h2 className="text-3xl font-bold mb-2 text-main">Dịch vụ của chúng tôi</h2>
        <p className="text-subtle mb-12 max-w-2xl mx-auto">Cung cấp các công cụ và thông tin cần thiết để bạn chủ động chăm sóc sức khỏe.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link key={index} to={service.to} className="block p-8 bg-primary rounded-lg shadow-md text-center group hover:bg-accent transition-colors duration-300">
              <div className="text-accent mb-4 inline-block group-hover:text-white">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-main group-hover:text-white">{service.title}</h3>
              <p className="text-subtle group-hover:text-gray-200">{service.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;