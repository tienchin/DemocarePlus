import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js'; // SỬA LỖI: Dùng useAuth
// SỬA LỖI: Import các icon đã được bổ sung
import { SearchIcon, CommentIcon, UserIcon, SendIcon } from '../components/Icons.js';

// --- HÀM HELPER (Giữ nguyên) ---
function formatTimeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  
  let interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " ngày trước";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " giờ trước";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " phút trước";
  return Math.floor(seconds) + " giây trước";
}

// --- COMPONENT CHÍNH ---
export default function QandAPage() {
  const { user } = useAuth(); // Lấy thông tin user
  const navigate = useNavigate();

  // --- STATES ---
  const [questions, setQuestions] = useState([]); // State để lưu câu hỏi từ API
  const [isLoading, setIsLoading] = useState(true); // State chờ tải
  const [apiError, setApiError] = useState(''); // State báo lỗi API
  const [searchTerm, setSearchTerm] = useState("");
  
  // States cho form câu hỏi mới
  const [newQuestionTitle, setNewQuestionTitle] = useState("");
  const [newQuestionContent, setNewQuestionContent] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- SỬA LỖI MÂU THUẪN 4: Kết nối API thật ---
  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      setApiError('');
      try {
        // Gọi API backend: GET /api/questions
        const response = await fetch('/api/questions'); 
        if (!response.ok) {
          throw new Error('Không thể tải danh sách câu hỏi.');
        }
        const data = await response.json();
        
        // Giả sử API trả về mảng câu hỏi (đã JOIN thông tin user và có thể cả commentCount)
        setQuestions(data); 
      } catch (error) {
        setApiError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []); // Chỉ chạy 1 lần khi trang tải

  // Lọc câu hỏi (giữ nguyên logic lọc client-side)
  const filteredQuestions = questions.filter(q => 
    q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.name.toLowerCase().includes(searchTerm.toLowerCase()) // Lọc theo tên người đăng
  );

  // Xử lý đăng câu hỏi mới (Kết nối API)
  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setFormError("Bạn cần đăng nhập để đặt câu hỏi.");
      return;
    }
    if (!newQuestionTitle.trim() || !newQuestionContent.trim()) {
      setFormError("Tiêu đề và nội dung không được để trống.");
      return;
    }
    
    setIsSubmitting(true);
    setFormError("");

    try {
      // SỬA LỖI MÂU THUẪN 4: Gọi API POST /api/questions
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // API Backend sẽ tự lấy user.id từ req.user (session)
        },
        body: JSON.stringify({
          title: newQuestionTitle,
          content: newQuestionContent
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gửi câu hỏi thất bại.');
      }
      
      const newQuestionData = await response.json(); // Nhận câu hỏi đã lưu từ CSDL
      
      // Thêm câu hỏi mới vào danh sách (để hiển thị ngay)
      setQuestions(prev => [newQuestionData, ...prev]);

      // Reset form
      setNewQuestionTitle("");
      setNewQuestionContent("");
      setIsSubmitting(false);
      
      // Tự động chuyển đến trang chi tiết của câu hỏi vừa tạo
      navigate(`/q-a/${newQuestionData.id}`);

    } catch (error) {
      setFormError(error.message);
      setIsSubmitting(false);
    }
  };

  // --- RENDER ---
  
  return (
    <div className="bg-gray-50 py-12 animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Tiêu đề và Thanh tìm kiếm (Giữ nguyên) */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-sky-900 sm:text-5xl">
            Hỏi & Đáp Sức khỏe
          </h1>
          <p className="mt-4 text-xl text-sky-700">
            Đặt câu hỏi và chia sẻ kiến thức cùng cộng đồng.
          </p>
          <div className="mt-8 mb-10 max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm câu hỏi, triệu chứng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-lg"
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <SearchIcon />
              </div>
            </div>
          </div>
        </div>
        
        {/* Form Đặt câu hỏi mới */}
        <section className="mb-10">
          {user ? (
            <form onSubmit={handleQuestionSubmit} className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-sky-900 mb-4">Đặt câu hỏi mới</h2>
              <div className="flex items-start gap-3">
                <UserIcon avatar={user.avatar} className="w-12 h-12" />
                <div className="flex-1 space-y-4">
                  <div>
                    <label htmlFor="question-title" className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề câu hỏi</label>
                    <input 
                      type="text"
                      id="question-title"
                      value={newQuestionTitle}
                      onChange={(e) => setNewQuestionTitle(e.target.value)}
                      placeholder="Ví dụ: Đau bụng dưới khi gần đến ngày kinh nguyệt?"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="question-content" className="block text-sm font-medium text-gray-700 mb-1">Nội dung chi tiết</label>
                    <textarea 
                      id="question-content"
                      value={newQuestionContent}
                      onChange={(e) => setNewQuestionContent(e.target.value)}
                      rows="4"
                      placeholder="Mô tả chi tiết triệu chứng, độ tuổi,..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    ></textarea>
                  </div>
                  {formError && (
                    <p className="text-red-600 text-sm">{formError}</p>
                  )}
                  <div className="flex justify-end">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 bg-sky-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-sky-700 transition-colors disabled:opacity-50"
                    >
                      <SendIcon className="w-4 h-4" />
                      {isSubmitting ? 'Đang gửi...' : 'Gửi câu hỏi'}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <p className="text-lg text-gray-700">
                Vui lòng <Link to="/login" state={{ from: '/q-a' }} className="text-sky-600 font-semibold hover:underline">đăng nhập</Link> để đặt câu hỏi mới.
              </p>
            </div>
          )}
        </section>

        {/* Danh sách câu hỏi */}
        <section>
          <h2 className="text-2xl font-bold text-sky-900 mb-6">
            Câu hỏi gần đây
          </h2>
          {/* Xử lý trạng thái Loading và Lỗi API */}
          {isLoading && <p className="text-center text-gray-500">Đang tải câu hỏi...</p>}
          {apiError && <p className="text-center text-red-600">{apiError}</p>}
          
          <div className="space-y-4">
            {!isLoading && !apiError && filteredQuestions.length > 0 ? (
              filteredQuestions.map(question => (
                <Link 
                  key={question.id} 
                  to={`/q-a/${question.id}`} 
                  className="block bg-white p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <UserIcon avatar={question.avatar} className="w-10 h-10" />
                    <div>
                      {/* API Backend trả về 'name' (user.name) */}
                      <span className="font-semibold text-sky-800">{question.name || 'Người dùng'}</span>
                      <p className="text-sm text-gray-500">{formatTimeAgo(question.created_at)}</p>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-sky-900 group-hover:text-sky-700 mb-2">
                    {question.title}
                  </h3>
                  <p className="text-gray-600 text-sm truncate">
                    {question.content}
                  </p>
                  <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
                    <CommentIcon />
                    {/* API Backend cần trả về 'commentCount' */}
                    <span>{question.commentCount || 0} bình luận</span>
                  </div>
                </Link>
              ))
            ) : (
              !isLoading && !apiError && (
                <p className="text-center text-gray-500">
                  {searchTerm ? `Không tìm thấy câu hỏi nào phù hợp với "${searchTerm}".` : "Chưa có câu hỏi nào."}
                </p>
              )
            )}
          </div>
        </section>

      </div>
    </div>
  );
}