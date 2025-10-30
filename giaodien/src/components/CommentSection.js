// src/components/CommentSection.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { FaThumbsUp, FaThumbsDown, FaReply } from 'react-icons/fa';

const DEFAULT_AVATAR = 'https://gamek.mediacdn.vn/133514250583805952/2023/1/14/vi-daochich-dtcl-6-16736364925801623067077-29-0-657-1200-crop-16736691436801405945754.png';

// --- ĐÂY LÀ PHẦN CODE ĐƯỢC BỔ SUNG ĐẦY ĐỦ ---
const Comment = ({ comment }) => {
  const avatarSrc = comment.avatar || DEFAULT_AVATAR;
  return (
    <div className="flex gap-4 py-4">
      <img src={avatarSrc} alt={comment.name} className="w-10 h-10 rounded-full flex-shrink-0 mt-1 object-cover"/>
      <div className="flex-grow">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-semibold text-main">{comment.name}</p>
          <p className="text-xs text-subtle">·</p>
          <p className="text-xs text-subtle">{new Date(comment.created_at).toLocaleString('vi-VN')}</p>
        </div>
        <p className="mt-1 text-main whitespace-pre-wrap">{comment.comment}</p>
        <div className="flex items-center gap-4 mt-2 text-subtle">
          <button className="flex items-center gap-1 text-accent-hover"><FaThumbsUp /> <span className="text-xs">Thích</span></button>
          <button className="flex items-center gap-1 text-accent-hover"><FaThumbsDown /></button>
          <button className="flex items-center gap-1 text-accent-hover text-xs font-semibold"><FaReply /> Trả lời</button>
        </div>
      </div>
    </div>
  );
};

// --- Component chính của mục bình luận (Code cũ giữ nguyên) ---
const CommentSection = ({ articleId, questionId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchComments = async () => {
            setIsLoading(true);
            const params = articleId ? { articleId } : { questionId };
            try {
                const res = await api.get('/comments', { params });
                setComments(res.data);
            } catch (error) {
                console.error("Lỗi khi tải bình luận:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchComments();
    }, [articleId, questionId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const payload = { comment: newComment };
        if (articleId) {
            payload.articleId = articleId;
        } else if (questionId) {
            payload.questionId = questionId;
        } else {
            alert('Lỗi: Không xác định được mục để bình luận.');
            return;
        }

        try {
            const res = await api.post('/comments', payload);
            setComments([res.data, ...comments]); 
            setNewComment('');
        } catch (error) {
            console.error("Lỗi khi gửi bình luận:", error);
            alert('Đã xảy ra lỗi. Vui lòng đăng nhập và thử lại.');
        }
    };

    return (
        <div className="mt-12 pt-8 border-t border-main">
            <h2 className="text-2xl font-bold mb-6 text-main">Bình luận ({comments.length})</h2>
            
            {user ? (
                <form onSubmit={handleSubmit} className="mb-8">
                    <textarea 
                        value={newComment} 
                        onChange={e => setNewComment(e.target.value)} 
                        placeholder="Viết bình luận của bạn..." 
                        rows="4" 
                        className="w-full p-3 rounded-md border border-main bg-transparent text-main focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-subtle" 
                    />
                    <button 
                        type="submit" 
                        className="mt-2 bg-accent bg-accent-hover text-white font-bold py-2 px-5 rounded-lg transition-colors"
                    >
                        Gửi bình luận
                    </button>
                </form>
            ) : (
                <p className="text-subtle mb-8 p-4 border border-main rounded-lg">
                    Vui lòng <Link to="/login" className="font-semibold text-accent underline">đăng nhập</Link> để tham gia bình luận.
                </p>
            )}

            <div className="divide-y divide-main">
                {isLoading ? (
                    <p className="text-subtle text-center py-4">Đang tải bình luận...</p>
                ) : comments.length > 0 ? (
                    comments.map(comment => <Comment key={comment.id} comment={comment} />)
                ) : (
                    <p className="text-subtle text-center py-4">Chưa có bình luận nào. Hãy là người đầu tiên!</p>
                )}
            </div>
        </div>
    );
};

export default CommentSection;