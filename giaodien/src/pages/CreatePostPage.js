// src/pages/CreatePostPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/news', { title, content });
      alert('Đăng bài thành công!');
      navigate('/');
    } catch (error) {
      alert('Đã có lỗi xảy ra.');
    }
  };

  return (
    <div className="card-bg p-8 rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-main">Tạo bài viết mới</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium text-main">Tiêu đề</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full mt-2 p-3 rounded-md border border-main bg-transparent"/>
        </div>
        <div>
          <label className="block font-medium text-main">Nội dung</label>
          <textarea value={content} onChange={e => setContent(e.target.value)} rows="10" className="w-full mt-2 p-3 rounded-md border border-main bg-transparent"/>
        </div>
        <button type="submit" className="bg-accent bg-accent-hover text-white font-bold py-3 px-6 rounded-lg transition-colors">
          Đăng bài
        </button>
      </form>
    </div>
  );
};
export default CreatePostPage;