// src/pages/ArticleDetailPage.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import data from '../data.json';
import CommentSection from '../components/CommentSection';

const ArticleDetailPage = () => {
  const { id } = useParams(); // Lấy id từ URL
  const article = data.articles.find(art => art.id.toString() === id);

  if (!article) {
    return (
      <div className="text-center p-10">
        <h2>Không tìm thấy bài viết</h2>
        <Link to="/" className="text-blue-500">Quay về trang chủ</Link>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-lg shadow-md">
      <img src={article.imageUrl} alt={article.title} className="w-full h-96 object-cover rounded-lg mb-6" />
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <div className="text-sm text-gray-500 mb-6">
        <span>Tác giả: {article.author} | Ngày đăng: {article.date}</span>
      </div>
      {/* Sử dụng pre-wrap để giữ nguyên định dạng xuống dòng */}
      <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed whitespace-pre-wrap">
        {article.content}
      </div>
      <CommentSection articleId={id} /> 
    </div>
  );
};

export default ArticleDetailPage;