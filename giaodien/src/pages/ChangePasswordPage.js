import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LockIcon, KeyIcon } from '../components/Icons.js'; // Import từ Icons.js

// --- MAIN COMPONENT ---
export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setIsSubmitting(true);

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setError('Vui lòng nhập đầy đủ các trường.');
      setIsSubmitting(false);
      return;
    }
    if (newPassword.length < 6) {
      setError('Mật khẩu mới phải có ít nhất 6 ký tự.');
      setIsSubmitting(false);
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setError('Mật khẩu mới và xác nhận mật khẩu không khớp.');
      setIsSubmitting(false);
      return;
    }
    if (currentPassword === newPassword) {
      setError('Mật khẩu mới phải khác mật khẩu hiện tại.');
      setIsSubmitting(false);
      return;
    }
    
    console.log('Yêu cầu đổi mật khẩu:', { currentPassword, newPassword });
    // Đây là nơi gọi API backend
    
    await new Promise(resolve => setTimeout(resolve, 1500)); 

    setMessage('Đổi mật khẩu thành công!');
    setError('');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setIsSubmitting(false);
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
            <KeyIcon />
            <h2 className="mt-4 text-2xl font-semibold text-sky-900">
                Đổi Mật khẩu
            </h2>
            <p className="mt-2 text-gray-500 text-sm">
                Cập nhật bảo mật cho tài khoản của bạn.
            </p>
        </div>
        
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          
          <div>
            <label htmlFor="current-password" name="current-password" className="block text-sm font-medium text-gray-700">
                Mật khẩu hiện tại
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon />
              </div>
              <input
                id="current-password"
                name="current-password"
                type="password"
                autoComplete="current-password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="appearance-none block w-full px-3 py-3 pl-10 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="new-password" name="new-password" className="block text-sm font-medium text-gray-700">
                Mật khẩu mới
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon />
              </div>
              <input
                id="new-password"
                name="new-password"
                type="password"
                autoComplete="new-password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="appearance-none block w-full px-3 py-3 pl-10 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                placeholder="•••••••• (Ít nhất 6 ký tự)"
              />
            </div>
          </div>

          <div>
            <label htmlFor="confirm-new-password" name="confirm-new-password" className="block text-sm font-medium text-gray-700">
                Xác nhận Mật khẩu mới
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon />
              </div>
              <input
                id="confirm-new-password"
                name="confirm-new-password"
                type="password"
                autoComplete="new-password"
                required
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
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
              {isSubmitting ? 'Đang lưu...' : 'Lưu thay đổi'}
            </button>
          </div>
        </form>
        
        <p className="mt-8 text-center text-sm text-gray-600">
          <Link to="/profile" className="font-medium text-sky-600 hover:text-sky-500">
            Quay lại Hồ sơ
          </Link>
        </p>
      </div>
    </div>
  );
}

