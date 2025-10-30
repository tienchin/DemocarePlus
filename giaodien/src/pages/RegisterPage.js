// src/pages/RegisterPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Vui lòng nhập đầy đủ thông tin.');
      return;
    }
    setError('');
    try {
      await api.post('/auth/register', { name, email, password });
      alert('Đăng ký thành công! Đang chuyển hướng về trang chủ...');
      window.location.href = '/'; // Tải lại để AuthContext cập nhật
    } catch (err) {
      setError(err.response?.data?.message || 'Đã có lỗi xảy ra.');
    }
  };

  return (
    <div className="card-bg p-8 rounded-lg max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-main">Tạo tài khoản</h1>
      {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-main mb-1">Tên hiển thị</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-3 rounded-md border border-main bg-transparent text-main" />
        </div>
        <div>
          <label className="block font-medium text-main mb-1">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-3 rounded-md border border-main bg-transparent text-main" />
        </div>
        <div>
          <label className="block font-medium text-main mb-1">Mật khẩu</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-3 rounded-md border border-main bg-transparent text-main" />
        </div>
        <button type="submit" className="w-full bg-accent bg-accent-hover text-white font-bold py-3 rounded-lg transition-colors">Đăng ký</button>
      </form>
      <p className="mt-6 text-center text-subtle">
        Đã có tài khoản? <Link to="/login" className="font-semibold text-accent text-accent-hover">Đăng nhập</Link>
      </p>
    </div>
  );
};

export default RegisterPage;