import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.js'; // Tệp context của bạn
import Layout from './components/Layout.js'; // Tệp layout chung (Navbar/Footer)

// Import tất cả các trang của bạn
import HomePage from './pages/HomePage.js';
import KnowledgeHubPage from './pages/KnowledgeHubPage.js';
import QandAPage from './pages/QandAPage.js';
import LoginPage from './pages/LoginPage.js';
import RegisterPage from './pages/RegisterPage.js';
import ForgotPasswordPage from './pages/ForgotPasswordPage.js';
import ChangePasswordPage from './pages/ChangePasswordPage.js';
import ProfilePage from './pages/ProfilePage.js'; 
import AboutPage from './pages/AboutPage.js';     
import KnowledgeDetailPage from './pages/KnowledgeDetailPage.js'; 
import QandADetailPage from './pages/QandADetailPage.js'; 

// SỬA LỖI: Bổ sung trang chi tiết Tin tức/Bài viết
import ArticleDetailPage from './pages/ArticleDetailPage.js'; 


export default function App() {
  return (
    <AuthProvider>
      {/* Chúng ta không cần <BrowserRouter> ở đây nữa
        vì nó đã được bọc bên ngoài <App /> trong tệp 'index.js'
      */}
      <Routes>
        {/* Các trang sử dụng Layout chung (có Navbar và Footer) */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="knowledge" element={<KnowledgeHubPage />} />
          <Route path="knowledge/:articleId" element={<KnowledgeDetailPage />} />
          
          <Route path="q-a" element={<QandAPage />} />
          <Route path="q-a/:questionId" element={<QandADetailPage />} />
          
          <Route path="profile" element={<ProfilePage />} />
          <Route path="about" element={<AboutPage />} />
          
          {/* SỬA LỖI: Thêm route cho Tin tức (từ HomePage) */}
          <Route path="news/:id" element={<ArticleDetailPage />} />
          {/* (Route này sẽ khớp với /news/news-1, /news/news-2, ...) */}

        </Route>

        {/* Các trang độc lập (không có Navbar/Footer) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </AuthProvider>
  );
}