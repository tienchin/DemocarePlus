import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MailIcon, QuestionMarkIcon } from '../components/Icons.js'; // Import icon

// --- MAIN COMPONENT ---
// Tệp này độc lập, không dùng Layout
export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!email) {
      setError('Vui lòng nhập địa chỉ email của bạn.');
      return;
    }
    
    setIsSubmitting(true);
    
    console.log('Yêu cầu đặt lại mật khẩu cho:', email);
    // Đây là nơi bạn sẽ gọi API backend
    // API sẽ xử lý việc tạo token (reset_password_token) và gửi email
    
    await new Promise(resolve => setTimeout(resolve, 1500)); 

    // Giả lập thành công
    setMessage('Nếu email của bạn tồn tại trong hệ thống, chúng tôi đã gửi một liên kết đặt lại mật khẩu.');
    setIsSubmitting(false);
    setEmail('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
        
        <div className="flex justify-center mb-6">
          <Link to="/" className="flex items-center gap-3">
            <img src="https://ttagencyads.com/wp-content/uploads/2022/03/Logo-rong-do.jpg" alt="CarePlus Logo" className="w-12 h-12 rounded-full object-cover"/>
            <h1 className="text-3xl font-bold text-sky-600">CarePlus</h1>
          </Link>
        </div>

        <div className="text-center mb-6">
            <QuestionMarkIcon />
            <h2 className="mt-4 text-2xl font-semibold text-sky-900">
                Quên Mật khẩu?
            </h2>
            <p className="mt-2 text-gray-500 text-sm">
                Đừng lo lắng! Nhập email của bạn để chúng tôi gửi liên kết đặt lại mật khẩu.
            </p>
        </div>
        
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          
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
          
          {error && (
            <div className="text-red-600 text-sm text-center p-3 rounded-lg bg-red-50 border border-red-200">
              {error}
            </div>
          )}
          {message && (
            <div className="text-sm text-center p-3 rounded-lg bg-green-50 text-green-700 border border-green-200">
              {message}
            </div>
          )}
          
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Đang gửi...' : 'Gửi liên kết đặt lại'}
            </button>
          </div>
        </form>
        
        <p className="mt-8 text-center text-sm text-gray-600">
          Nhớ mật khẩu rồi?{' '}
          <Link to="/login" className="font-medium text-sky-600 hover:text-sky-500">
            Quay lại Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}

