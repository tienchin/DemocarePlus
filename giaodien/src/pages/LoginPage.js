import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js'; // SỬA LỖI: Dùng useAuth
import { MailIcon, LockIcon, GoogleIcon, CheckCircleIcon } from '../components/Icons.js'; // SỬA LỖI: Import icon

// --- COMPONENT THÔNG BÁO (TOAST) ---
// Một component thông báo đơn giản, chỉ hiển thị khi `show` là true
function SuccessToast({ message, show, onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Tự động đóng sau 3 giây
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-5 right-5 z-50 animate-fade-in-down">
      <div className="flex items-center gap-3 bg-green-500 text-white p-4 rounded-lg shadow-lg">
        <CheckCircleIcon />
        <span>{message}</span>
        <button onClick={onClose} className="ml-2 text-lg font-bold">&times;</button>
      </div>
    </div>
  );
}


// --- COMPONENT CHÍNH ---
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  
  // SỬA LỖI: Lấy hàm login và loginWithGoogle từ context
  const { login, loginWithGoogle } = useAuth(); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Vui lòng nhập cả email và mật khẩu.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // SỬA LỖI: Gọi hàm login thật từ AuthContext
      await login(email, password, rememberMe); 
      
      console.log('Đăng nhập thành công với:', { email, password, rememberMe });
      setShowSuccessToast(true); // Hiển thị thông báo thành công
      
      // Chuyển hướng về trang chủ sau 1 giây (để người dùng kịp thấy thông báo)
      setTimeout(() => {
        navigate('/'); 
      }, 1000);

    } catch (err) {
      setError(err.message || 'Email hoặc mật khẩu không chính xác.');
      setIsSubmitting(false);
    }
  };
  
  const handleGoogleLogin = async () => {
    setError('');
    setIsSubmitting(true);
    try {
      // SỬA LỖI: Gọi hàm login Google thật từ AuthContext
      // Hàm này sẽ tự chuyển hướng, nên ta không cần làm gì thêm
      await loginWithGoogle();
      
      // (Phần code dưới đây có thể không chạy nếu trang bị redirect ngay, 
      // nhưng hàm check-session ở AuthContext sẽ xử lý việc đăng nhập)
      console.log('Đăng nhập Google thành công!');
      setShowSuccessToast(true); // Hiển thị thông báo thành công
      
      setTimeout(() => {
        navigate('/');
      }, 1000);

    } catch (err) {
      setError(err.message || 'Đăng nhập Google thất bại.');
      setIsSubmitting(false);
    }
  };


  return (
    <>
      {/* Thông báo thành công (Toast) */}
      <SuccessToast 
        message="Đăng nhập thành công!" 
        show={showSuccessToast} 
        onClose={() => setShowSuccessToast(false)} 
      />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
          
          <div className="flex justify-center mb-6">
            <Link to="/" className="flex items-center gap-3">
              <img src="https://ttagencyads.com/wp-content/uploads/2022/03/Logo-rong-do.jpg" alt="CarePlus Logo" className="w-12 h-12 rounded-full object-cover"/>
              <h1 className="text-3xl font-bold text-sky-600">CarePlus</h1>
            </Link>
          </div>

          <h2 className="text-center text-2xl font-semibold text-sky-900">
            Đăng nhập tài khoản
          </h2>
          
          {/* Nút Đăng nhập Google (Yêu cầu mới) */}
          <div className="mt-6">
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isSubmitting}
              className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors duration-200 disabled:opacity-50"
            >
              <GoogleIcon />
              Đăng nhập bằng Google
            </button>
          </div>

          <div className="my-4 flex items-center justify-center">
            <div className="border-b border-gray-200 flex-grow"></div>
            <span className="px-4 text-gray-500 text-sm">HOẶC</span>
            <div className="border-b border-gray-200 flex-grow"></div>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            <div>
              <label htmlFor="email" name="email" className="block text-sm font-medium text-gray-700">
                Địa chỉ Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MailIcon />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-3 pl-10 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" name="password" className="block text-sm font-medium text-gray-700">
                Mật khẩu
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-3 pl-10 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Ghi nhớ tôi
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-sky-600 hover:text-sky-500">
                  Quên mật khẩu?
                </Link>
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center p-3 rounded-lg bg-red-50 border border-red-200">
                {error}
              </div>
            )}
            
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Đang xử lý...' : 'Đăng nhập'}
              </button>
            </div>
          </form>
          
          <p className="mt-8 text-center text-sm text-gray-600">
            Chưa có tài khoản?{' '}
            <Link to="/register" className="font-medium text-sky-600 hover:text-sky-500">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

