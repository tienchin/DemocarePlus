// src/components/Sidebar.js
import React, { useState } from 'react';
import { medicalKnowledgeBase } from '../knowledgeBase'; // Import từ file mới
import { Link } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';

const CollapsibleCategory = ({ title, subitems }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <li className="mb-4">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center font-semibold text-main text-accent-hover">
        <span>{title}</span>
        <FaChevronDown className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen mt-2' : 'max-h-0'}`}>
        <ul className="ml-4 space-y-2 border-l border-main pl-3">
          {subitems.map((item, subIndex) => (
            <li key={subIndex}>
              {/* Liên kết đến trang chi tiết kiến thức */}
              <Link to={`/knowledge/${item.id}`} className="block text-subtle text-accent-hover">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

const Sidebar = () => {
  return (
    <aside className="card-bg w-full md:w-64 lg:w-72 flex-shrink-0 p-6 rounded-lg self-start sticky top-32">
      <h2 className="text-xl font-bold mb-4 pb-2 border-b border-main text-main">
        Danh mục Y tế
      </h2>
      <nav>
        <ul>
          <li className="mb-4">
            {/* Link này sẽ quay về trang chủ tin tức */}
            <Link to="/" className="w-full text-left font-semibold text-accent text-accent-hover">
              Tất cả bài viết
            </Link>
          </li>
          {medicalKnowledgeBase.map((category, index) => (
            <CollapsibleCategory key={index} {...category} />
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;