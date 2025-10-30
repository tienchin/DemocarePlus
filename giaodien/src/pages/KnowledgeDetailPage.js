// src/pages/KnowledgeDetailPage.js
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { medicalKnowledgeBase } from '../knowledgeBase';

const KnowledgeDetailPage = () => {
  const { id } = useParams();
  const topic = medicalKnowledgeBase.flatMap(cat => cat.subitems).find(item => item.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!topic) {
    return (
      <div className="card-bg p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold text-main">Không tìm thấy nội dung</h2>
        <p className="text-subtle mt-4">Nội dung bạn tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        <Link to="/knowledge" className="mt-6 inline-block bg-accent text-white font-bold py-2 px-6 rounded-lg">
          Quay về Kho Kiến thức
        </Link>
      </div>
    );
  }

  return (
    <article className="card-bg p-6 md:p-10 rounded-lg">
      <h1 className="text-4xl font-bold text-main">{topic.name}</h1>
      
      {/* Thông tin Tác giả và Ngày đăng */}
      <div className="text-subtle text-sm mt-4 mb-6 border-b border-main pb-4">
        <span>Tác giả: <strong>{topic.author}</strong></span> | <span>Ngày đăng: {topic.date}</span>
      </div>
      
      {/* Nội dung chi tiết */}
      <div 
        className="prose prose-lg max-w-none text-main prose-h3:text-accent prose-p:text-subtle"
        dangerouslySetInnerHTML={{ __html: topic.content }}
      />
    </article>
  );
};

export default KnowledgeDetailPage;