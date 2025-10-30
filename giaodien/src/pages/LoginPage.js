// src/pages/LoginPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { FaGoogle } from 'react-icons/fa';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLocalLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/auth/login', { email, password });
      window.location.href = '/';
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng nhập thất bại.');
    }
  };

  return (
    <div className="card-bg p-8 rounded-lg max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-main">Đăng nhập</h1>
      {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</p>}
      
      <form onSubmit={handleLocalLogin} className="space-y-4">
        <div>
          <label className="block font-medium text-main mb-1">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-3 rounded-md border border-main bg-transparent text-main"/>
        </div>
        <div>
          <label className="block font-medium text-main mb-1">Mật khẩu</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-3 rounded-md border border-main bg-transparent text-main"/>
        </div>
        <button type="submit" className="w-full bg-accent bg-accent-hover text-white font-bold py-3 rounded-lg transition-colors">Đăng nhập</button>
      </form>

      <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-main"></div></div>
          <div className="relative flex justify-center text-sm"><span className="px-2" style={{backgroundColor: 'var(--bg-secondary)'}}><p className="text-subtle">Hoặc</p></span></div>
      </div>

      <a href="http://localhost:3001/api/auth/google" className="w-full flex items-center justify-center gap-3 border border-main text-main font-semibold py-3 px-4 rounded-lg hover:bg-primary transition-colors">
        <FaGoogle className="text-red-500" /> Đăng nhập bằng Google
      </a>

      <div className="mt-6 text-center text-subtle">
        <Link to="/register" className="font-semibold text-accent text-accent-hover">Tạo tài khoản mới</Link>
        <span className="mx-2">·</span>
        <Link to="/forgot-password" className="text-sm text-accent-hover">Quên mật khẩu?</Link>
      </div>
    </div>
  );
};
export default LoginPage;