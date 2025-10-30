// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import ConfirmationModal from '../components/ConfirmationModal';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- State để quản lý modal ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const res = await api.get('/auth/user');
        if (res.data.user) {
          setUser(res.data.user);
        }
      } catch (err) {
        console.error("Người dùng chưa đăng nhập.", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkUserStatus();
  }, []);

  // --- Logic cho modal xác nhận ---
  const handleConfirm = () => {
    if (modalAction) {
      modalAction(); // Thực hiện hành động đã lưu
    }
    setIsModalOpen(false); // Đóng modal
    setModalAction(null); // Reset hành động
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setModalAction(null);
  };

  // --- HÀM LOGOUT ĐÃ ĐƯỢC NÂNG CẤP ---
  const logout = () => {
    // Thay vì gọi API trực tiếp, chúng ta mở modal và lưu hành động logout
    setModalAction(() => async () => {
      try {
        await api.get('/auth/logout');
        setUser(null);
        window.location.href = '/';
      } catch (err) {
        console.error("Lỗi đăng xuất:", err);
      }
    });
    setIsModalOpen(true);
  };

  const value = { user, loading, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}

      {/* 2. Đặt modal ở đây để nó có thể được gọi từ bất kỳ đâu */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        actionText="Đăng xuất" 
      />
    </AuthContext.Provider>
  );
};