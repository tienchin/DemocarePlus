import React, { useState, useEffect } from 'react';
// SỬA LỖI: Thêm useParams để lấy ID bài viết từ URL
import { Link, useParams, useSearchParams } from 'react-router-dom'; 
// SỬA LỖI: Xóa 'medicalNewsData' (không dùng nữa), thêm icon
import { SearchIcon, ArrowLeftIcon } from '../components/Icons.js'; 

// --- HÀM HELPER (Định dạng ngày) ---
// Giữ nguyên hoặc có thể copy lại từ HomePage.js nếu cần
function formatFullDate(dateString) {
  if (!dateString) return "Không rõ";
  try {
    // Giả định dateString từ API là ISO format (e.g., "2025-11-10T10:00:00Z") hoặc timestamp
    // Nếu API trả về định dạng khác, bạn cần điều chỉnh cách tạo new Date()
    const date = new Date(dateString); 
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  } catch (e) {
    console.error("Lỗi định dạng ngày:", e);
    return dateString; // Trả về chuỗi gốc nếu lỗi
  }
}

// --- SỬA LỖI: Component render Markdown ---
// Bạn có thể copy component này từ HomePage.js sang đây, hoặc đảm bảo nó được import từ một file chung
function SimpleMarkdown({ text }) {
  if (!text) return null;
  const lines = text.split('\n');
  return (
    <div className="text-sm break-words">
      {lines.map((line, lineIndex) => (
        <p key={lineIndex} className="mb-1 last:mb-0">
          {line.split(/(\*\*.*?\*\*)/g).map((part, partIndex) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={partIndex}>{part.substring(2, part.length - 2)}</strong>;
            }
            return <span key={partIndex}>{part}</span>;
          })}
        </p>
      ))}
    </div>
  );
}

// --- COMPONENT CHÍNH CHI TIẾT BÀI VIẾT ---
export default function ArticleDetailPage() {
  // SỬA LỖI: Lấy ID bài viết từ URL
  const { id } = useParams(); 
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    const fetchArticleDetail = async () => {
      setIsLoading(true);
      setApiError('');
      try {
        // Gọi API backend để lấy chi tiết bài viết theo ID
        const response = await fetch(`/api/news/${id}`); 
        if (!response.ok) {
          // Xử lý các lỗi HTTP khác nhau
          if (response.status === 404) {
            throw new Error('Bài viết không tìm thấy.');
          }
          throw new Error('Không thể tải chi tiết bài viết.');
        }
        const data = await response.json();
        setArticle(data); // Giả định API trả về object bài viết
      } catch (error) {
        console.error("Lỗi khi fetch chi tiết bài viết:", error);
        setApiError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) { // Chỉ gọi API nếu có ID
      fetchArticleDetail();
    } else {
      setApiError('Không có ID bài viết nào được cung cấp.');
      setIsLoading(false);
    }
  }, [id]); // Chạy lại khi ID bài viết thay đổi

  // --- RENDER KHI ĐANG TẢI ---
  if (isLoading) {
    return (
      <div className="py-12 text-center animate-pulse">
        <p className="text-gray-500">Đang tải chi tiết bài viết...</p>
      </div>
    );
  }

  // --- RENDER KHI CÓ LỖI ---
  if (apiError) {
    return (
      <div className="py-12 text-center">
        <p className="text-red-600">{apiError}</p>
        <Link 
          to="/"
          className="mt-4 inline-flex items-center gap-2 text-sky-600 hover:text-sky-800 font-medium transition-colors"
        >
          <ArrowLeftIcon />
          Quay lại Trang chủ
        </Link>
      </div>
    );
  }

  // --- RENDER NỘI DUNG BÀI VIẾT ---
  return (
    <article className="bg-gray-50 py-12 animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Nút quay lại */}
        <div className="mb-8">
          <Link 
            to="/news-archive" // Quay lại trang lưu trữ tin tức
            className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-800 font-medium transition-colors"
          >
            <ArrowLeftIcon />
            Quay lại Lưu trữ Tin tức
          </Link>
        </div>

        {article ? (
          <>
            {/* Tiêu đề và thông tin */}
            <div className="text-center mb-8">
              <p className="text-sm text-sky-600 font-semibold mb-2">{article.category || 'Tin tức'}</p>
              <h1 className="text-4xl font-extrabold text-sky-900 sm:text-5xl leading-tight">
                {article.title}
              </h1>
              <div className="mt-4 text-lg text-sky-700 flex flex-col sm:flex-row sm:justify-center gap-2 sm:gap-4">
                {/* SỬA LỖI: Hiển thị ngày và tác giả (nếu có từ API) */}
                {article.author && <span className="font-medium">Tác giả: {article.author}</span>}
                <span>Ngày đăng: {formatFullDate(article.created_at || article.date)}</span> {/* Ưu tiên created_at từ API, fallback sang date cũ nếu cần */}
              </div>
            </div>

            {/* Hình ảnh */}
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden rounded-xl shadow-lg mb-8">
              <img
                src={article.imageUrl || 'https://placehold.co/1200x500/e2e8f0/94a3b8?text=Hinh+Anh'}
                alt={article.title}
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.src = 'https://placehold.co/1200x500/e2e8f0/94a3b8?text=Hinh+Anh'; }} // Fallback image
              />
            </div>

            {/* Nội dung bài viết */}
            <div className="prose max-w-none text-lg text-sky-900 leading-relaxed">
              {/* SỬA LỖI: Sử dụng SimpleMarkdown cho nội dung */}
              <SimpleMarkdown text={article.content} />
            </div>

            {/* Link nguồn (nếu có) */}
            {article.source && (
              <div className="mt-8 text-center">
                <a
                  href={article.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-800 font-medium transition-colors"
                >
                  Nguồn bài viết <ArrowLeftIcon className="rotate-180 w-4 h-4" />
                </a>
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-500">Không có dữ liệu bài viết nào.</p>
        )}

      </div>
    </article>
  );
}