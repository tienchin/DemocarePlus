// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Hiển thị màn hình chờ trong lúc kiểm tra đăng nhập
  if (loading) {
    return <div className="text-center p-10">Đang kiểm tra xác thực...</div>;
  }

  // Nếu không có user, chuyển hướng về trang login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Nếu có user, hiển thị trang được yêu cầu
  return children;
};

export default ProtectedRoute;