import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js'; 
import { MailIcon, LockIcon, UserCircleIcon, CheckCircleIcon } from '../components/Icons.js'; // Import thêm CheckCircleIcon

// --- COMPONENT THÔNG BÁO (TOAST) ---
// (Copy từ LoginPage để hiển thị thông báo)
function SuccessToast({ message, show, onClose }) {
  React.useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); 
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
export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false); // Thêm state cho thông báo
  
  const navigate = useNavigate();
  const { register } = useAuth(); // Dùng useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Vui lòng nhập đầy đủ các trường bắt buộc.');
      return;
    }
    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Mật khẩu và xác nhận mật khẩu không khớp.');
      return;
    }
    
    setIsSubmitting(true);
    
    // --- SỬA LỖI MÂU THUẪN 2 ---
    // Xóa bỏ logic giả lập và kích hoạt lệnh gọi API thật
    try {
      // Kích hoạt dòng này
      await register(name, email, password); 
      
      console.log('Đăng ký thành công!');
      setShowSuccessToast(true); // Hiển thị thông báo thành công
      
      // Chuyển hướng đến trang đăng nhập sau 2 giây
      setTimeout(() => {
         navigate('/login'); 
      }, 2000);

    } catch (err) {
      console.error("Lỗi đăng ký:", err);
      setError(err.message || 'Email này đã được sử dụng.');
      setIsSubmitting(false);
    }
    // --- KẾT THÚC SỬA LỖI ---
  };

  return (
    <>
      <SuccessToast 
        message="Đăng ký thành công! Đang chuyển đến Đăng nhập..." 
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
            Tạo tài khoản mới
          </h2>
          
          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Họ và Tên
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserCircleIcon />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-3 pl-10 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  placeholder="Văn An"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-3 pl-10 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  placeholder="•••••••• (Ít nhất 6 ký tự)"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirm-password" name="confirm-password" className="block text-sm font-medium text-gray-700">
                Xác nhận Mật khẩu
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon />
                </div>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-3 pl-10 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>
            
            {error && (
              <div className="text-red-600 text-sm text-center p-3 rounded-lg bg-red-50 border border-red-200">
                {error}
              </div>
            )}
            
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Đang tạo tài khoản...' : 'Đăng ký'}
              </button>
            </div>
          </form>
          
          <p className="mt-8 text-center text-sm text-gray-600">
            Đã có tài khoản?{' '}
            <Link to="/login" className="font-medium text-sky-600 hover:text-sky-500">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}