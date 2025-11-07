import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
// SỬA LỖI: Import tất cả icon cần thiết
import { 
    UserIcon, EditIcon, TrashIcon, ClockIcon, CommentIcon 
} from '../components/Icons.js'; 

// --- HÀM HELPER ---
function formatTimeAgo(dateString) {
  if (!dateString) return "Vừa xong";
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

// --- TẠO MỘT SỐ COMPONENT CON CHO TABS ---

// 1. Tab Lịch sử Câu hỏi (Hiển thị và Thao tác)
function QuestionsTab({ questions, deleteQuestion }) {
    if (questions.length === 0) return <p className="text-gray-500 p-4">Bạn chưa đăng câu hỏi nào.</p>;

    return (
        <div className="space-y-4">
            {questions.map((q) => (
                <div key={q.id} className="p-4 border border-blue-200 rounded-lg bg-blue-50/50 shadow-sm flex justify-between items-start">
                    <div className="flex-1 overflow-hidden pr-4">
                        <Link to={`/q-a/${q.id}`} className="text-lg font-semibold text-sky-800 hover:text-sky-600 truncate block">
                            {q.title}
                        </Link>
                        {/* Hiển thị bản xem trước nội dung */}
                        <p className="text-sm text-gray-700 truncate mt-1">{q.content}</p>
                        <p className="text-xs text-gray-500 mt-1">Đăng vào: {formatTimeAgo(q.created_at)}</p>
                    </div>
                    <div className="flex space-x-1.5 flex-shrink-0">
                        {/* Nút Sửa */}
                        <Link to={`/edit-question/${q.id}`} className="p-1.5 text-sky-500 hover:text-sky-700 rounded-full hover:bg-sky-50 transition" title="Sửa">
                            <EditIcon className="w-5 h-5" />
                        </Link>
                        {/* Nút Xóa */}
                        <button 
                            onClick={() => deleteQuestion(q.id)}
                            className="p-1.5 text-red-500 hover:text-red-700 rounded-full hover:bg-red-50 transition"
                            title="Xóa"
                        >
                            <TrashIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

// 2. Tab Lịch sử Bình luận (Hiển thị và Thao tác)
function CommentsTab({ comments, deleteComment }) {
    if (comments.length === 0) return <p className="text-gray-500 p-4">Bạn chưa có bình luận nào.</p>;

    return (
        <div className="space-y-4">
            {comments.map((c) => (
                <div key={c.id} className="p-4 border border-indigo-200 rounded-lg bg-indigo-50/50 shadow-sm">
                    <div className="flex justify-between items-start">
                        <div className="flex-1 overflow-hidden pr-4">
                            <p className="text-gray-800 italic font-medium">"{c.comment}"</p>
                            
                            <p className="text-xs text-gray-500 mt-2">
                                Đăng: {formatTimeAgo(c.created_at)}
                            </p>
                            {/* Sửa lỗi ESLint: Thêm CommentIcon ở đây để sử dụng */}
                            <div className="text-xs text-gray-500 flex items-center mt-1">
                                <CommentIcon className="w-4 h-4 mr-1"/> Bình luận
                            </div>
                        </div>
                        <div className="flex space-x-1.5 flex-shrink-0">
                            {/* Nút Sửa */}
                            <Link to={`/edit-comment/${c.id}`} className="p-1.5 text-sky-500 hover:text-sky-700 rounded-full hover:bg-sky-50 transition" title="Sửa">
                                <EditIcon className="w-5 h-5" />
                            </Link>
                            {/* Nút Xóa */}
                            <button 
                                onClick={() => deleteComment(c.id)}
                                className="p-1.5 text-red-500 hover:text-red-700 rounded-full hover:bg-red-50 transition"
                                title="Xóa"
                            >
                                <TrashIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    <div className="mt-3 pt-2 border-t border-indigo-200">
                         <p className="text-sm font-semibold text-indigo-600">
                            {c.question_title ? 'Về Câu hỏi:' : 'Về Bài viết:'}
                        </p>
                        {/* Link đến trang chi tiết của bài đăng/câu hỏi */}
                        <Link 
                            to={c.question_id ? `/q-a/${c.question_id}` : `/news/${c.article_id}`} 
                            className="text-xs text-gray-600 hover:text-sky-700 underline"
                        >
                            {c.question_title || c.article_title || 'Xem Chi tiết'}
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}

// 3. Tab Lịch sử Tư vấn (YÊU CẦU MỚI)
function ChatHistoryTab({ chatHistory, deleteHistory }) {
    if (chatHistory.length === 0) return <p className="text-gray-500 p-4">Bạn chưa lưu cuộc tư vấn nào.</p>;

    return (
        <div className="space-y-4">
            {chatHistory.map((chat) => (
                <div key={chat.id} className="p-4 border border-green-200 rounded-lg bg-green-50/50 shadow-sm flex justify-between items-start">
                    <div className="flex-1 overflow-hidden pr-4">
                        <Link to={`/profile/history/${chat.id}`} className="text-lg font-semibold text-green-800 hover:text-green-600 truncate block">
                            {/* 'message' là tiêu đề (tin nhắn đầu tiên) */}
                            {chat.message}
                        </Link>
                        <p className="text-xs text-gray-500 mt-1">Lưu vào: {formatTimeAgo(chat.created_at)}</p>
                    </div>
                    <div className="flex-shrink-0">
                         <button 
                            onClick={() => deleteHistory(chat.id)}
                            className="p-1.5 text-red-500 hover:text-red-700 rounded-full hover:bg-red-50 transition"
                            title="Xóa"
                        >
                            <TrashIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}


// --- COMPONENT CHÍNH PROFILE PAGE ---
export default function ProfilePage() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // --- STATES ---
    const [activeTab, setActiveTab] = useState('questions');
    const [counts, setCounts] = useState({ questions: 0, comments: 0, history: 0 });
    const [userQuestions, setUserQuestions] = useState([]);
    const [userComments, setUserComments] = useState([]);
    const [userChatHistory, setUserChatHistory] = useState([]); // State mới
    
    const [isLoading, setIsLoading] = useState(true);
    const [apiError, setApiError] = useState(null);
    
    const API_BASE = '/api/users/me';
    
    // --- API HANDLERS ---
    
    // 1. Fetch Counts (Số lượng)
    const fetchCounts = useCallback(async () => {
        if (!user) return;
        try {
            // API đếm số lượng
            const [qCountRes, cCountRes, hCountRes] = await Promise.all([
                fetch(`${API_BASE}/questions/count`).then(r => r.json()),
                fetch(`${API_BASE}/comments/count`).then(r => r.json()),
                fetch(`${API_BASE}/chathistory/count`).then(r => r.json()) // API đếm lịch sử chat
            ]);
            setCounts({ 
                questions: qCountRes.count || 0, 
                comments: cCountRes.count || 0,
                history: hCountRes.count || 0
            });
        } catch (e) {
            console.error("Lỗi đếm:", e);
        }
    }, [user]);

    // 2. Fetch Detailed Data (Chi tiết)
    const fetchData = useCallback(async (tab) => {
        if (!user) return;
        setIsLoading(true);
        setApiError(null);
        try {
            let url;
            if (tab === 'questions') {
                url = `${API_BASE}/questions/detailed`;
            } else if (tab === 'comments') {
                url = `${API_BASE}/comments/detailed`;
            } else if (tab === 'history') { // YÊU CẦU MỚI
                url = `${API_BASE}/chathistory`;
            } else {
                setIsLoading(false);
                return;
            }

            const response = await fetch(url);
            if (response.status === 404) {
                if (tab === 'questions') setUserQuestions([]);
                if (tab === 'comments') setUserComments([]);
                if (tab === 'history') setUserChatHistory([]); 
                return;
            }
            if (response.status === 401) throw new Error("Vui lòng đăng nhập để xem thông tin.");
            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || "Không thể tải dữ liệu chi tiết.");
            }

            const data = await response.json();
            if (tab === 'questions') setUserQuestions(data);
            if (tab === 'comments') setUserComments(data);
            if (tab === 'history') setUserChatHistory(data); 

        } catch (e) {
            setApiError(e.message);
        } finally {
            setIsLoading(false);
        }
    }, [user]); 

    
    // 3. Delete Question
    const handleDeleteQuestion = async (questionId) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa câu hỏi này?')) return;
        try {
            const response = await fetch(`/api/questions/${questionId}`, { method: 'DELETE' });
            if (response.status === 403) throw new Error("Bạn không có quyền xóa bài này.");
            if (!response.ok) throw new Error("Xóa bài viết thất bại.");
            
            setUserQuestions(prev => prev.filter(q => q.id !== questionId));
            fetchCounts(); 
        } catch (e) {
            alert(e.message);
        }
    };

    // 4. Delete Comment
    const handleDeleteComment = async (commentId) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa bình luận này?')) return;
        try {
            const response = await fetch(`/api/comments/${commentId}`, { method: 'DELETE' });
            if (response.status === 403) throw new Error("Bạn không có quyền xóa bình luận này.");
            if (!response.ok) throw new Error("Xóa bình luận thất bại.");
            
            setUserComments(prev => prev.filter(c => c.id !== commentId));
            fetchCounts(); 
        } catch (e) {
            alert(e.message);
        }
    };
    
    // 5. Delete Chat History (YÊU CẦU MỚI)
    const handleDeleteHistory = async (historyId) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa lịch sử tư vấn này?')) return;
         try {
            const response = await fetch(`/api/chatbot/history/${historyId}`, { method: 'DELETE' });
            if (response.status === 403) throw new Error("Bạn không có quyền xóa lịch sử này.");
            if (!response.ok) throw new Error("Xóa lịch sử thất bại.");
            
            setUserChatHistory(prev => prev.filter(h => h.id !== historyId));
            fetchCounts(); 
        } catch (e) {
            alert(e.message);
        }
    };


    // --- EFFECTS ---
    useEffect(() => {
        if (user) {
            fetchCounts();
        } else {
            navigate('/login', { replace: true });
        }
    }, [user, navigate, fetchCounts]); 

    useEffect(() => {
        if (user) {
            fetchData(activeTab);
        }
    }, [activeTab, user, fetchData]); 

    // --- RENDER ---
    if (!user) return null; // Chờ navigate chuyển hướng

    return (
        <div className="bg-gray-50 py-10 animate-fade-in">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header Profile (Redesigned) */}
                <div className="bg-white p-8 rounded-xl shadow-2xl border border-sky-300 flex items-center gap-6 mb-8">
                    <div className="flex-shrink-0">
                        <UserIcon avatar={user.avatar} className="w-24 h-24 text-sky-600 rounded-full bg-sky-100 p-2 border-4 border-white shadow-md" />
                    </div>
                    <div className="flex-grow">
                        <h1 className="text-3xl font-extrabold text-sky-900">{user.name}</h1>
                        <p className="text-md text-gray-600 font-medium">{user.email}</p>
                        <button 
                            onClick={logout}
                            className="mt-3 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg text-sm transition shadow-md"
                        >
                            Đăng xuất
                        </button>
                    </div>
                </div>
                
                {/* Tabs Điều hướng (Styled) */}
                <div className="flex border-b border-gray-200 mb-6 bg-white rounded-xl shadow-md overflow-hidden">
                    {/* Tab Câu hỏi */}
                    <button 
                        onClick={() => setActiveTab('questions')}
                        className={`flex-1 py-3 text-center text-lg font-semibold transition-colors ${activeTab === 'questions' ? 'text-sky-600 border-b-4 border-sky-600 bg-sky-50' : 'text-gray-500 hover:text-sky-500 hover:bg-gray-50'}`}
                    >
                        Câu hỏi của tôi ({counts.questions})
                    </button>
                    {/* Tab Bình luận */}
                    <button 
                        onClick={() => setActiveTab('comments')}
                        className={`flex-1 py-3 text-center text-lg font-semibold transition-colors ${activeTab === 'comments' ? 'text-sky-600 border-b-4 border-sky-600 bg-sky-50' : 'text-gray-500 hover:text-sky-500 hover:bg-gray-50'}`}
                    >
                        Bình luận của tôi ({counts.comments})
                    </button>
                    {/* Tab Lịch sử tư vấn */}
                    <button 
                        onClick={() => setActiveTab('history')}
                        className={`flex-1 py-3 text-center text-lg font-semibold transition-colors ${activeTab === 'history' ? 'text-sky-600 border-b-4 border-sky-600 bg-sky-50' : 'text-gray-500 hover:text-sky-500 hover:bg-gray-50'}`}
                    >
                        <div className="flex items-center justify-center gap-2">
                           <ClockIcon className="w-5 h-5" /> 
                           Lịch sử Tư vấn ({counts.history})
                        </div>
                    </button>
                </div>

                {/* Nội dung Tabs */}
                <div className="bg-white p-6 rounded-xl shadow-lg min-h-[300px] border border-gray-200">
                    {apiError && <p className="text-red-600 p-4 text-center">{apiError}</p>}
                    {isLoading && <p className="text-center text-gray-500 py-10">Đang tải dữ liệu...</p>}

                    {!isLoading && !apiError && activeTab === 'questions' && (
                        <QuestionsTab 
                            questions={userQuestions} 
                            deleteQuestion={handleDeleteQuestion}
                        />
                    )}
                    
                    {!isLoading && !apiError && activeTab === 'comments' && (
                        <CommentsTab 
                            comments={userComments} 
                            deleteComment={handleDeleteComment}
                        />
                    )}
                    
                    {!isLoading && !apiError && activeTab === 'history' && (
                        // YÊU CẦU MỚI: Hiển thị danh sách lịch sử chat
                        <ChatHistoryTab 
                            chatHistory={userChatHistory}
                            deleteHistory={handleDeleteHistory}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}