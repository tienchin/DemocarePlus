import React from 'react';
import { useParams, Link } from 'react-router-dom';
// SỬA LỖI: Đường dẫn import đã được sửa
import { medicalKnowledgeBase } from '../knowledgeBase.js'; 
import { ArrowLeftIcon } from '../components/Icons.js'; // SỬA LỖI: Import icon

// Hàm helper để tìm bài viết trong cơ sở dữ liệu
function findArticleById(articleId) {
  for (const category of medicalKnowledgeBase) {
    const article = category.subitems.find(item => item.id === articleId);
    if (article) {
      return { ...article, categoryName: category.title };
    }
  }
  return null;
}

// --- COMPONENT CHÍNH ---
export default function KnowledgeDetailPage() {
  const { articleId } = useParams(); // Lấy ID bài viết từ URL
  const article = findArticleById(articleId);

  // Xử lý trường hợp không tìm thấy bài viết
  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center animate-fade-in">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Không tìm thấy bài viết</h1>
        <p className="text-lg text-gray-700 mb-6">
          Bài viết bạn đang tìm kiếm với ID "{articleId}" không tồn tại.
        </p>
        <Link 
          to="/knowledge"
          className="inline-flex items-center gap-2 bg-sky-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-sky-700 transition-colors"
        >
          <ArrowLeftIcon />
          Quay lại Kho Kiến thức
        </Link>
      </div>
    );
  }

  // Hiển thị nội dung bài viết
  return (
    <div className="bg-white py-12 animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Nút quay lại */}
        <div className="mb-6">
          <Link 
            to="/knowledge"
            className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-800 font-medium transition-colors"
          >
            <ArrowLeftIcon />
            Quay lại Kho Kiến thức
          </Link>
        </div>

        {/* Tiêu đề và Thông tin bài viết */}
        <header className="mb-8">
          <p className="text-base font-semibold text-sky-600 uppercase">
            {article.categoryName}
          </p>
          <h1 className="mt-2 text-4xl font-extrabold text-sky-900 tracking-tight">
            {article.name}
          </h1>
          <div className="mt-4 flex items-center gap-6 text-sm text-gray-500">
            <span>
              Tác giả: <strong className="text-gray-700">{article.author}</strong>
            </span>
            <span>
              Ngày đăng: <strong className="text-gray-700">{article.date}</strong>
            </span>
          </div>
        </header>

        {/* Nội dung bài viết */}
        <article className="prose prose-lg prose-sky max-w-none">
          {/* Sử dụng dangerouslySetInnerHTML để render HTML từ database */}
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </article>
        
        {/* Nút quay lại ở cuối trang */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <Link 
            to="/knowledge"
            className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-800 font-medium transition-colors"
          >
            <ArrowLeftIcon />
            Quay lại Kho Kiến thức
          </Link>
        </div>

      </div>
    </div>
  );
}

