import React, { useState, useEffect, useCallback } from 'react'; // Thêm useCallback
import { Link, useSearchParams } from 'react-router-dom';
import { SearchIcon, ArrowLeftIcon } from '../components/Icons.js';

// --- HÀM HELPER (Định dạng ngày) ---
function formatFullDate(dateString) {
  if (!dateString) return "Không rõ";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  } catch (e) {
    console.error("Lỗi định dạng ngày:", e);
    return dateString; 
  }
}

// --- COMPONENT CHÍNH ---
export default function NewsArchivePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  // States cho dữ liệu API
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState('');

  // States cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // --- NÂNG CẤP TÌM KIẾM VÀ PHÂN TRANG: Kết nối API Backend ---
  // Sử dụng useCallback để tránh tạo hàm mới mỗi lần render
  const fetchArticles = useCallback(async (page, currentSearchTerm) => {
    setIsLoading(true);
    setApiError('');
    try {
      // Xây dựng URL API với các tham số: page, limit, và search term
      const url = `/api/news?page=${page}&limit=9${currentSearchTerm ? `&search=${encodeURIComponent(currentSearchTerm)}` : ''}`;
      const response = await fetch(url);

      if (!response.ok) {
        // Xử lý lỗi http trả về từ backend
        const errorData = await response.json();
        throw new Error(errorData.message || 'Không thể tải danh sách tin tức.');
      }

      const data = await response.json();

      setArticles(data.articles);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage); // Cập nhật trang hiện tại từ API

    } catch (error) {
      console.error("Lỗi khi fetch tin tức:", error);
      setApiError(error.message);
      // Reset articles và pagination state khi có lỗi
      setArticles([]);
      setTotalPages(0);
      setCurrentPage(1); 
    } finally {
      setIsLoading(false);
    }
  }, []); // Dependency rỗng vì hàm này không phụ thuộc vào state bên ngoài lúc khai báo

  useEffect(() => {
    // Lấy 'page' và 'search' từ URL
    const pageFromUrl = parseInt(searchParams.get('page')) || 1;
    const searchTermFromUrl = searchParams.get('search') || "";
    
    // Cập nhật state searchTerm và currentPage dựa trên URL
    setSearchTerm(searchTermFromUrl);
    setCurrentPage(pageFromUrl);

    // Gọi API với các tham số từ URL
    fetchArticles(pageFromUrl, searchTermFromUrl);

  }, [searchParams, fetchArticles]); // Chạy lại khi searchParams (bao gồm page và search) thay đổi

  // --- XỬ LÝ KHI NGƯỜI DÙNG NHẬP VÀO Ô TÌM KIẾM ---
  const handleSearch = (e) => {
    e.preventDefault(); // Ngăn chặn form submit mặc định
    
    // Cập nhật URL để phản ánh kết quả tìm kiếm hiện tại
    // Reset về trang 1 khi tìm kiếm mới
    setSearchParams({ page: 1, search: searchTerm }); 
    // fetchArticles sẽ tự động được gọi lại nhờ dependency 'searchParams'
  };

  // --- HÀM ĐỂ THAY ĐỔI TRANG (cập nhật URL) ---
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    
    // Cập nhật URL với trang mới và giữ nguyên search term hiện tại
    const currentSearch = searchParams.get('search') || '';
    setSearchParams({ page: page, search: currentSearch });
    // fetchArticles sẽ tự động được gọi lại nhờ dependency 'searchParams'
  };

  // --- RENDER ---
  return (
    <div className="bg-gray-50 py-12 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Nút quay lại */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-800 font-medium transition-colors"
          >
            <ArrowLeftIcon />
            Quay lại Trang chủ
          </Link>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-sky-900 sm:text-5xl">
            Lưu trữ Tin tức Y tế
          </h1>
          <p className="mt-4 text-xl text-sky-700">
            Xem tất cả các bài viết và thành tựu đã được đăng.
          </p>
        </div>

        {/* Thanh tìm kiếm - Form và Input */}
        <form onSubmit={handleSearch} className="mb-10 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm trong kho lưu trữ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-lg"
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <SearchIcon />
            </div>
            {/* Nút tìm kiếm (tùy chọn, có thể thêm nếu muốn nút bấm rõ ràng) */}
            {/* <button type="submit" className="absolute inset-y-0 right-0 pr-4 flex items-center">
              <SearchIcon className="text-sky-500" />
            </button> */}
          </div>
        </form>

        {/* Lưới tin tức (Kết nối API với tìm kiếm và phân trang) */}
        {isLoading && <p className="text-center text-gray-500 py-10">Đang tải tin tức...</p>}
        {apiError && <p className="text-center text-red-600 py-10">{apiError}</p>}

        {!isLoading && !apiError && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {articles.length > 0 ? (
                articles.map((article) => (
                  <div key={article.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
                    <Link to={`/news/${article.id}`} className="block group">
                      <div className="h-40 overflow-hidden">
                        <img
                          src={article.imageUrl || 'https://placehold.co/600x400/e2e8f0/94a3b8?text=Hinh+Anh'}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400/e2e8f0/94a3b8?text=Hinh+Anh'; }}
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-sky-600 font-semibold">{article.category_name || article.category_id || 'Tin tức'}</p> {/* Ưu tiên category_name từ JOIN, fallback */}
                        <h3 className="mt-1 text-base font-bold text-sky-900 group-hover:text-sky-700 h-16">{article.title}</h3>
                        <p className="mt-2 text-sm text-gray-600">Ngày đăng: {formatFullDate(article.created_at)}</p> {/* Lấy từ created_at của backend */}
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                 // Chỉ hiển thị thông báo này nếu không có lỗi và không tải, nhưng không có bài viết
                 !isLoading && !apiError && articles.length === 0 && (
                   <p className="text-center text-gray-500 col-span-3">
                      Không tìm thấy tin tức nào khớp với tìm kiếm của bạn.
                   </p>
                 )
              )}
            </div>

            {/* --- THANH PHÂN TRANG (PAGINATION UI) --- */}
            {/* Chỉ hiển thị phân trang nếu có nhiều hơn 1 trang */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}

      </div>
    </div>
  );
}

// --- COMPONENT PAGINATION (Giữ nguyên, nhưng có thể cần điều chỉnh nhỏ) ---
function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    const maxPages = Math.min(totalPages, maxPagesToShow);

    let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
    let endPage = Math.min(totalPages, startPage + maxPages - 1);

    if (endPage - startPage + 1 < maxPages) {
        startPage = Math.max(1, endPage - maxPages + 1);
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('...');
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <nav className="flex justify-center items-center gap-2 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-lg bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
      >
        &lt; Trang trước
      </button>

      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => (page !== '...' ? onPageChange(page) : null)}
          disabled={page === '...'}
          className={`px-4 py-2 rounded-lg border
            ${currentPage === page
              ? 'bg-sky-600 text-white border-sky-600'
              : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-100'
            }
            ${page === '...' ? 'cursor-default' : ''}
          `}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-lg bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
      >
        Trang sau &gt;
      </button>
    </nav>
  );
}