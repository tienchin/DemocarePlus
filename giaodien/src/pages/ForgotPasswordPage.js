// src/pages/ForgotPasswordPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage('');
        if (newPassword !== confirmPassword) {
            setMessage('Mật khẩu mới không khớp.');
            return;
        }
        // TODO: Gửi yêu cầu đổi mật khẩu lên API
        console.log('Đổi mật khẩu:', { oldPassword, newPassword });
        setMessage('Chức năng này đang được phát triển.');
    };

    return (
        <div className="card-bg p-8 rounded-lg max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center text-main">Đổi mật khẩu</h1>
            {message && <p className="bg-blue-100 text-blue-700 p-3 rounded mb-4">{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium text-main mb-1">Mật khẩu cũ</label>
                    <input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} required className="w-full p-3 rounded-md border border-main bg-transparent text-main"/>
                </div>
                <div>
                    <label className="block font-medium text-main mb-1">Mật khẩu mới</label>
                    <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required className="w-full p-3 rounded-md border border-main bg-transparent text-main"/>
                </div>
                <div>
                    <label className="block font-medium text-main mb-1">Nhập lại mật khẩu mới</label>
                    <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="w-full p-3 rounded-md border border-main bg-transparent text-main"/>
                </div>
                <button type="submit" className="w-full bg-accent bg-accent-hover text-white font-bold py-3 rounded-lg">Xác nhận</button>
            </form>
            <p className="mt-6 text-center text-subtle">
                <Link to="/login" className="text-sm text-accent text-accent-hover">Quay lại Đăng nhập</Link>
            </p>
        </div>
    );
};
export default ForgotPasswordPage;
