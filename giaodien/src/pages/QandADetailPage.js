import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import { ArrowLeftIcon, UserIcon, SendIcon, EditIcon, TrashIcon } from '../components/Icons.js';

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
export default function QandADetailPage() {
  const { questionId } = useParams();
  const { user } = useAuth(); // Lấy thông tin người dùng đang đăng nhập
  const navigate = useNavigate();

  // --- STATES ---
  const [question, setQuestion] = useState(null); // State cho câu hỏi từ API
  const [comments, setComments] = useState([]); // State cho bình luận từ API
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState('');
  
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState("");

  
  // Hàm fetch dữ liệu được đóng gói trong useCallback để dùng trong useEffect
  const loadData = useCallback(async () => {
    setIsLoading(true);
    setApiError('');

    // 1. Fetch chi tiết câu hỏi
    const fetchQuestion = async () => {
      try {
        const response = await fetch(`/api/questions/${questionId}`);
        if (response.status === 404) {
          throw new Error('404 - Không tìm thấy câu hỏi');
        }
        if (!response.ok) {
          throw new Error('Không thể tải câu hỏi.');
        }
        const data = await response.json();
        setQuestion(data);
        return data; // Trả về data
      } catch (error) {
        console.error("Lỗi Fetch Question:", error);
        setApiError(error.message);
        return null;
      }
    };

    // 2. Fetch danh sách bình luận
    const fetchComments = async () => {
      try {
        // Gọi API backend (codegd) để lấy danh sách bình luận cho câu hỏi này
        const response = await fetch(`/api/comments?questionId=${questionId}`); 
        if (!response.ok) {
          throw new Error('Không thể tải bình luận.');
        }
        const data = await response.json();
        // Sắp xếp theo ngày tạo
        setComments(data.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)));
      } catch (error) {
        console.error("Lỗi Fetch Comments:", error);
      }
    };

    // 3. Thực thi
    const questionData = await fetchQuestion(); // Tải câu hỏi trước
    if (questionData) {
      await fetchComments(); // Sau đó tải bình luận
    }
    setIsLoading(false);
  }, [questionId]); // Chạy lại khi ID câu hỏi thay đổi

  
  // --- EFFECTS ---
  useEffect(() => {
    loadData();
  }, [loadData]); // Chỉ phụ thuộc vào loadData


  // --- HANDLERS (Kết nối API) ---
  
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const commentText = newComment.trim();
    if (!commentText || !user) return; 

    setIsSubmitting(true);
    
    try {
      // Gọi API POST /api/comments
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: questionId,
          comment: commentText // Sử dụng nội dung comment
        })
      });
      
      if (!response.ok) {
         const errorData = await response.json();
         throw new Error(errorData.message || 'Gửi bình luận thất bại.');
      }
      
      // Backend (routes/comments.js) trả về bình luận mới (đã kèm user.name, avatar)
      const newCommentData = await response.json(); 
      
      // Cập nhật state (đã lưu vào CSDL và lấy lại bản cuối cùng)
      setComments(prevComments => [...prevComments, newCommentData]);
      setNewComment(""); // Xóa nội dung form
      
    } catch (error) {
       console.error(error);
       alert(error.message); // Thông báo lỗi
    } finally {
       setIsSubmitting(false);
    }
  };
  
  const handleDeleteQuestion = async () => {
    // Logic phân quyền (frontend)
    if (!user || user.id !== question.user_id) {
       alert("Bạn không có quyền xóa câu hỏi này.");
       return;
    }
    
    if (window.confirm('Bạn có chắc chắn muốn xóa câu hỏi này không?')) {
      try {
        // Gọi API DELETE /api/questions/:questionId
        const response = await fetch(`/api/questions/${questionId}`, {
          method: 'DELETE'
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Xóa câu hỏi thất bại.');
        }
        
        console.log('Đã xóa câu hỏi!');
        navigate('/q-a'); // Chuyển về trang danh sách
        
      } catch (error) {
         console.error(error);
         alert(error.message);
      }
    }
  };
  
  // Logic Sửa/Xóa Bình luận (Giữ nguyên giả lập Frontend)
  const startEditComment = (comment) => {
    setEditingCommentId(comment.id);
    setEditingCommentText(comment.comment); // Lấy trường 'comment'
  };
  
  const handleEditCommentSubmit = async (e, commentId) => {
    e.preventDefault();
    if (!editingCommentText.trim()) return;
    
    // (Tương lai: Gọi API PUT /api/comments/:commentId)
    setComments(prev => prev.map(c => 
      c.id === commentId ? { ...c, comment: editingCommentText } : c
    ));
    setEditingCommentId(null);
    setEditingCommentText("");
  };
   const handleDeleteComment = async (commentId) => {
    if (!user) return;
    
    if (window.confirm('Bạn có chắc chắn muốn xóa bình luận này không?')) {
      // (Tương lai: Gọi API DELETE /api/comments/:commentId)
      setComments(prev => prev.filter(c => c.id !== commentId));
    }
  };


  // --- RENDER ---
  
  if (isLoading) {
     return <p className="text-center text-gray-500 py-20">Đang tải...</p>;
  }
  
  if (!question || apiError.includes('404')) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center animate-fade-in">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Không tìm thấy câu hỏi</h1>
        <p className="text-lg text-gray-700 mb-6">
          Câu hỏi bạn đang tìm kiếm với ID "{questionId}" không tồn tại.
        </p>
        <Link 
          to="/q-a"
          className="inline-flex items-center gap-2 bg-sky-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-sky-700 transition-colors"
        >
          <ArrowLeftIcon />
          Quay lại trang Hỏi & Đáp
        </Link>
      </div>
    );
  }
  
  if (apiError) {
     return <p className="text-center text-red-600 py-20">{apiError}</p>;
  }

  // Hiển thị chi tiết câu hỏi và bình luận (Render thật)
  return (
    <div className="bg-gray-50 py-12 animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Nút quay lại (Giữ nguyên) */}
        <div className="mb-6">
          <Link 
            to="/q-a"
            className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-800 font-medium transition-colors"
          >
            <ArrowLeftIcon />
            Quay lại trang Hỏi & Đáp
          </Link>
        </div>

        {/* Nội dung câu hỏi (Render từ API) */}
        <article className="bg-white shadow-lg rounded-lg p-6 sm:p-8">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <UserIcon avatar={question.avatar} /> 
              <div>
                <span className="text-lg font-semibold text-sky-900">{question.name}</span>
                <p className="text-sm text-gray-500">{formatTimeAgo(question.created_at)}</p>
              </div>
            </div>
            
            {user && user.id === question.user_id && (
              <div className="flex gap-2">
                <button 
                  onClick={() => alert('Tính năng sửa câu hỏi đang được phát triển!')} 
                  className="p-2 text-gray-500 hover:text-sky-600 transition-colors"
                  title="Sửa câu hỏi"
                >
                  <EditIcon />
                </button>
                <button 
                  onClick={handleDeleteQuestion}
                  className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                  title="Xóa câu hỏi"
                >
                  <TrashIcon />
                </button>
              </div>
            )}
          </div>
          
          <div className="mt-6">
            <h1 className="text-3xl font-extrabold text-sky-900 tracking-tight">
              {question.title}
            </h1>
            <p className="mt-4 text-lg text-gray-700 leading-relaxed">
              {question.content}
            </p>
          </div>
        </article>

        {/* Phần bình luận (Render từ API) */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-sky-900 mb-6">
            Bình luận ({comments.length})
          </h2>

          <div className="space-y-6">
            {comments.map(comment => (
              <div key={comment.id} className="flex gap-4">
                <UserIcon avatar={comment.avatar} /> 
                <div className="flex-1 bg-white p-4 rounded-lg shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-semibold text-sky-800">{comment.name}</span>
                      <span className="text-sm text-gray-500 ml-2">{formatTimeAgo(comment.created_at)}</span>
                    </div>
                    {user && user.id === comment.user_id && (
                      <div className="flex gap-1">
                        <button 
                          onClick={() => startEditComment(comment)} 
                          className="p-1 text-gray-400 hover:text-sky-600 transition-colors"
                          title="Sửa bình luận"
                        >
                          <EditIcon className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteComment(comment.id)}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                          title="Xóa bình luận"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {editingCommentId === comment.id ? (
                    <form onSubmit={(e) => handleEditCommentSubmit(e, comment.id)} className="mt-2">
                      <textarea
                        value={editingCommentText}
                        onChange={(e) => setEditingCommentText(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-sky-500"
                        rows="3"
                      ></textarea>
                      <div className="flex gap-2 mt-2">
                        <button type="submit" className="text-sm bg-sky-600 text-white px-3 py-1 rounded-md hover:bg-sky-700">Lưu</button>
                        <button type="button" onClick={() => setEditingCommentId(null)} className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300">Hủy</button>
                      </div>
                    </form>
                  ) : (
                    <p className="mt-2 text-gray-700">{comment.comment}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Form viết bình luận mới (Giữ nguyên) */}
          <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
            {user ? (
              <form onSubmit={handleCommentSubmit}>
                <h3 className="text-lg font-semibold text-sky-900 mb-3">
                  Viết bình luận của bạn
                </h3>
                <div className="flex items-start gap-3">
                  <UserIcon avatar={user.avatar} /> 
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    rows="4"
                    placeholder="Nhập bình luận của bạn..."
                  ></textarea>
                </div>
                <div className="flex justify-end mt-4">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 bg-sky-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-sky-700 transition-colors disabled:opacity-50"
                  >
                    <SendIcon className="w-4 h-4" />
                    {isSubmitting ? 'Đang gửi...' : 'Gửi bình luận'}
                  </button>
                </div>
              </form>
            ) : (
              <p className="text-center text-gray-700">
                Vui lòng <Link to="/login" state={{ from: `/q-a/${questionId}` }} className="text-sky-600 font-semibold hover:underline">đăng nhập</Link> để viết bình luận.
              </p>
            )}
          </div>

        </section>

      </div>
    </div>
  );
}