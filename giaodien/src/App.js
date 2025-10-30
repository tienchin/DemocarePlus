// src/App.js
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Import các component chung
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import ChatbotWidget from './components/ChatbotWidget';
import { FaFacebook } from 'react-icons/fa';

// Import các trang (pages)
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import ProfilePage from './pages/ProfilePage';
import CreatePostPage from './pages/CreatePostPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import KnowledgeHubPage from './pages/KnowledgeHubPage';
import KnowledgeDetailPage from './pages/KnowledgeDetailPage';
import QandAPage from './pages/QandAPage';
import AskQuestionPage from './pages/AskQuestionPage';
import QuestionDetailPage from './pages/QuestionDetailPage';
import MessengerPage from './pages/MessengerPage';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  // Không còn logic theme ở đây nữa
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar setSearchTerm={setSearchTerm} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage searchTerm={searchTerm} />} />
          <Route path="/knowledge" element={<KnowledgeHubPage />} />
          <Route path="/knowledge/:id" element={<KnowledgeDetailPage />} />
          <Route path="/article/:id" element={<ArticleDetailPage />} />
          <Route path="/q-a" element={<QandAPage />} />
          <Route path="/question/:id" element={<QuestionDetailPage />} />
          <Route path="/ask-question" element={<ProtectedRoute><AskQuestionPage /></ProtectedRoute>} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/messenger" element={<ProtectedRoute><MessengerPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/create-post" element={<ProtectedRoute><CreatePostPage /></ProtectedRoute>} />
        </Routes>
      </main>
      
      <div className="fixed bottom-5 right-5 flex flex-col items-center gap-4 z-40">
        <a 
          href="https://www.facebook.com/trien.vo.337115/about_overview" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#1877F2] w-14 h-14 rounded-full text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          aria-label="Facebook"
        >
          <FaFacebook size={28} />
        </a>
      </div>
      <ChatbotWidget />

      <Footer />
    </div>
  );
}

export default App;