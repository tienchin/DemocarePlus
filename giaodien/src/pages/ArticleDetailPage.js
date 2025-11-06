import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
// SỬA LỖI: Bổ sung EditIcon, TrashIcon để sử dụng biến 'user'
import { ArrowLeftIcon, EditIcon, TrashIcon } from '../components/Icons.js'; 

// Hàm helper để định dạng thời gian
function formatFullDate(dateString) {
  if (!dateString) return "Không rõ";
  try {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  } catch (e) {
    return "Không rõ";
  }
}

// --- COMPONENT CHÍNH ---
export default function ArticleDetailPage() {
  const { id } = useParams(); // Lấy 'id' từ route /news/:id
  const { user } = useAuth(); // SỬA LỖI: Biến 'user' được sử dụng ở đây
  
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    // ... (logic fetch bài viết) ...
    const fetchArticle = async () => {
      setIsLoading(true);
      setApiError('');
      try {
        const response = await fetch(`/api/news/${id}`); 
        
        if (response.status === 404) {
          throw new Error('404 - Không tìm thấy bài viết');
        }
        if (!response.ok) {
          throw new Error('Không thể tải bài viết.');
        }
        
        const data = await response.json();
        setArticle(data);
        
      } catch (error) {
        console.error(error);
        setApiError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  // Xử lý khi đang tải
  if (isLoading) {
     return <p className="text-center text-gray-500 py-20">Đang tải bài viết...</p>;
  }
  
  // Xử lý khi không tìm thấy (lỗi 404)
  if (!article || apiError.includes('404')) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center animate-fade-in">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Không tìm thấy bài viết</h1>
        <p className="text-lg text-gray-700 mb-6">
          Tin tức bạn đang tìm kiếm với ID "{id}" không tồn tại.
        </p>
        <Link 
          to="/"
          className="inline-flex items-center gap-2 bg-sky-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-sky-700 transition-colors"
        >
          <ArrowLeftIcon />
          Quay lại Trang chủ
        </Link>
      </div>
    );
  }
  
  // Hiển thị nội dung bài viết
  return (
    <div className="bg-white py-12 animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-6 flex justify-between items-center">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-800 font-medium transition-colors"
          >
            <ArrowLeftIcon />
            Quay lại Trang chủ
          </Link>
          
          {/* SỬA LỖI ESLINT: Sử dụng biến user */}
          {user && user.provider === 'admin' && ( 
            <div className="flex gap-2">
              <button className="text-gray-500 hover:text-sky-600 p-2" title="Chỉnh sửa"><EditIcon /></button>
              <button className="text-gray-500 hover:text-red-600 p-2" title="Xóa bài viết"><TrashIcon /></button>
            </div>
          )}
        </div>

        <header className="mb-8">
          <h1 className="mt-2 text-4xl font-extrabold text-sky-900 tracking-tight">
            {article.title}
          </h1>
          <div className="mt-4 flex items-center gap-6 text-sm text-gray-500">
            <span>
              Tác giả: <strong className="text-gray-700">{article.user_name || 'CarePlus Team'}</strong>
            </span>
            <span>
              Ngày đăng: <strong className="text-gray-700">{formatFullDate(article.created_at)}</strong>
            </span>
          </div>
        </header>

        {article.imageUrl && (
          <img 
            src={article.imageUrl} 
            alt={article.title} 
            className="w-full h-96 object-cover rounded-xl shadow-lg mb-8" 
          />
        )}

        <article className="prose prose-lg prose-sky max-w-none">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </article>
        
      </div>
    </div>
  );
}