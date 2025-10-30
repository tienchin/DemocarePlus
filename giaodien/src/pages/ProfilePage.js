// src/pages/ProfilePage.js

// --- CODE CŨ GIỮ NGUYÊN: Import thư viện ---
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import api from '../services/api';

// --- CODE MỚI HOÀN TOÀN: Component con để hiển thị Lịch sử Câu hỏi, có gọi API ---
const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get('/users/me/questions');
        setPosts(res.data);
      } catch (error) {
        console.error("Lỗi khi tải lịch sử câu hỏi:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (isLoading) {
    return <p className="text-subtle">Đang tải danh sách câu hỏi...</p>;
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-main">Lịch sử câu hỏi</h3>
      <div className="border-t border-main pt-4 space-y-3">
        {posts.length > 0 ? (
          posts.map(post => (
            <Link to={`/question/${post.id}`} key={post.id} className="block p-3 border border-main rounded-md hover:bg-secondary transition-colors">
              <p className="font-semibold text-accent">{post.title}</p>
              <p className="text-xs text-subtle mt-1">Đã đăng vào: {new Date(post.created_at).toLocaleDateString('vi-VN')}</p>
            </Link>
          ))
        ) : (
          <p className="text-subtle">Bạn chưa đăng câu hỏi nào.</p>
        )}
      </div>
    </div>
  );
};

// --- CODE CŨ GIỮ NGUYÊN: Component con cho tab "Bình luận" (tạm thời) ---
const MyComments = () => (
  <div>
    <h3 className="text-xl font-semibold mb-4 text-main">Lịch sử bình luận</h3>
    <div className="border-t border-main pt-4">
      <p className="text-subtle">Tính năng đang được phát triển.</p>
    </div>
  </div>
);

// --- Component chính của trang cá nhân (Code logic được giữ nguyên) ---
const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('posts');
  const [postCount, setPostCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
        try {
            const postRes = await api.get('/users/me/questions/count');
            setPostCount(postRes.data.count);
            const commentRes = await api.get('/users/me/comments/count');
            setCommentCount(commentRes.data.count);
        } catch (error) {
            console.error("Lỗi khi lấy số lượng:", error);
        }
    };
    if (user) {
        fetchCounts();
    }
  }, [user]);

  if (!user) { return <Navigate to="/" />; }
  
  const formatCount = (count) => count > 99 ? '99+' : count;

  return (
    <div className="card-bg p-6 md:p-10 rounded-lg max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center gap-6 border-b border-main pb-6 mb-6">
        <img src={user.avatar} alt="User Avatar" className="w-32 h-32 rounded-full border-4 border-accent shadow-md"/>
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold text-main">{user.name}</h1>
          <p className="text-subtle mt-1">{user.email}</p>
          <button onClick={logout} className="mt-4 bg-red-500 text-white px-5 py-2 rounded-md font-medium hover:bg-red-600">Đăng xuất</button>
        </div>
      </div>

      <div>
        <div className="flex border-b border-main mb-6">
          <button onClick={() => setActiveTab('posts')} className={`px-4 py-2 font-semibold ${activeTab === 'posts' ? 'tab-active' : 'tab-inactive'}`}>
            Câu hỏi của tôi ({formatCount(postCount)})
          </button>
          <button onClick={() => setActiveTab('comments')} className={`px-4 py-2 font-semibold ${activeTab === 'comments' ? 'tab-active' : 'tab-inactive'}`}>
            Bình luận của tôi ({formatCount(commentCount)})
          </button>
          <Link to="/messenger" className="px-4 py-2 font-semibold tab-inactive text-accent-hover">Lịch sử Tư vấn</Link>
        </div>
        
        <div>
          {activeTab === 'posts' && <MyPosts />}
          {activeTab === 'comments' && <MyComments />}
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;