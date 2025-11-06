import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// URL backend API của bạn
const API_URL = '/api'; 
// SỬA LỖI GOOGLE: Định nghĩa URL tuyệt đối của backend
const BACKEND_URL = 'http://localhost:3001'; 

// 1. Tạo Context
const AuthContext = createContext(null);

// 2. Tạo Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Trạng thái chờ, để kiểm tra session
  const navigate = useNavigate();

  // Hàm kiểm tra session khi tải trang
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        // Gọi API backend để kiểm tra xem session/cookie còn hợp lệ không
        const response = await fetch(`${API_URL}/auth/check-session`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Lỗi kiểm tra session:', error);
        setUser(null);
      } finally {
        setLoading(false); // Hoàn tất kiểm tra
      }
    };

    checkUserSession();
  }, []);

  // Hàm Đăng ký (gọi API backend)
  const register = async (name, email, password) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      const newUser = await response.json();
      setUser(newUser); // Tự động đăng nhập sau khi đăng ký
      return newUser;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Đăng ký thất bại');
    }
  };

  // Hàm Đăng nhập (gọi API backend)
  const login = async (email, password, rememberMe) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, rememberMe }),
    });

    if (response.ok) {
      const userData = await response.json();
      setUser(userData); // Lưu thông tin user vào state
      return userData;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Đăng nhập thất bại');
    }
  };

  // Hàm Đăng xuất (gọi API backend)
  const logout = async () => {
    await fetch(`${API_URL}/auth/logout`, { method: 'POST' });
    setUser(null); // Xóa user khỏi state
    navigate('/login'); // Chuyển hướng về trang đăng nhập
  };

  // Hàm Đăng nhập Google (chuyển hướng)
  const loginWithGoogle = () => {
    // SỬA LỖI GOOGLE: 
    // Thay vì dùng proxy (API_URL), chúng ta chuyển hướng thẳng đến backend
    // Backend (codegd) sẽ xử lý việc gọi Google và redirect lại
    window.location.href = `${BACKEND_URL}/api/auth/google`;
  };

  // 3. Giá trị cung cấp cho các component con
  const value = {
    user, // Thông tin người dùng (null nếu chưa đăng nhập)
    loading, // Trạng thái chờ
    register,
    login,
    logout,
    loginWithGoogle,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Chỉ render khi đã kiểm tra session xong */}
    </AuthContext.Provider>
  );
};

// 4. Tạo hook (để sửa lỗi 'AuthContext' not found)
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth phải được dùng bên trong AuthProvider');
  }
  return context;
};