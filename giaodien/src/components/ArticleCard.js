// src/components/ArticleCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const ArticleCard = ({ article }) => {
  const { id, title, excerpt, imageUrl, author, date, category } = article;
  return (
    <Link to={`/article/${id}`} className="block card-bg rounded-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group">
        <div className="overflow-hidden relative">
          <img className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" src={imageUrl} alt={title} />
          {category && <span className="absolute top-3 right-3 bg-accent text-white text-xs font-bold px-2 py-1 rounded">{category.toUpperCase()}</span>}
        </div>
        <div className="p-5">
          <h3 className="font-bold text-lg mb-2 text-main group-hover:text-accent transition-colors h-14 overflow-hidden">{title}</h3>
          <div className="text-xs text-subtle mb-3">
            <span>{author} | {date}</span>
          </div>
          <p className="text-sm text-subtle leading-relaxed h-20 overflow-hidden">{excerpt}</p>
        </div>
        <div className="p-5 pt-0">
            <span className="font-semibold text-accent text-accent-hover">Đọc thêm →</span>
        </div>
    </Link>
  );
};

export default ArticleCard;