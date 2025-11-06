import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { getCommentsByArticle, getCommentsByQuestion, addComment, updateComment, deleteComment } from '../services/api';

export default function CommentSection({ articleId, questionId }) {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [limit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [alert, setAlert] = useState(null); // {type:'success'|'error', message:string}
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const fetchData = useCallback(async (reset = true) => {
    const res = articleId
      ? await getCommentsByArticle(articleId, { limit, offset: reset ? 0 : offset })
      : await getCommentsByQuestion(questionId, { limit, offset: reset ? 0 : offset });
    setItems(prev => (reset ? res.data.items : [...prev, ...res.data.items]));
    setHasMore(res.data.items.length === limit);
  }, [articleId, questionId, limit, offset]);

  useEffect(() => { setOffset(0); fetchData(true); }, [articleId, questionId, fetchData]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      await addComment(articleId ? { articleId, comment: text } : { questionId, comment: text });
      setText('');
      setOffset(0);
      await fetchData(true);
      setAlert({ type: 'success', message: 'Đã gửi bình luận.' });
      setTimeout(() => setAlert(null), 2000);
    } catch (e) {
      const msg = e?.response?.data?.message || e?.message || 'Gửi bình luận thất bại.';
      // eslint-disable-next-line no-console
      console.error('Add comment failed:', e);
      setAlert({ type: 'error', message: msg });
      setTimeout(() => setAlert(null), 2000);
    }
  };

  const onStartEdit = (c) => { setEditingId(c.id); setEditText(c.comment); };
  const onSaveEdit = async () => {
    try {
      await updateComment(editingId, { comment: editText });
      setEditingId(null); setEditText('');
      setOffset(0);
      await fetchData(true);
      setAlert({ type: 'success', message: 'Đã cập nhật bình luận.' });
      setTimeout(() => setAlert(null), 2000);
    } catch (e) {
      const msg = e?.response?.data?.message || e?.message || 'Cập nhật thất bại.';
      // eslint-disable-next-line no-console
      console.error('Update comment failed:', e);
      setAlert({ type: 'error', message: msg });
      setTimeout(() => setAlert(null), 2000);
    }
  };
  const onDelete = async (id) => {
    if (!window.confirm('Xóa bình luận này?')) return;
    try {
      await deleteComment(id);
      setOffset(0);
      await fetchData(true);
      setAlert({ type: 'success', message: 'Đã xóa bình luận.' });
      setTimeout(() => setAlert(null), 2000);
    } catch (e) {
      const msg = e?.response?.data?.message || e?.message || 'Xóa bình luận thất bại.';
      // eslint-disable-next-line no-console
      console.error('Delete comment failed:', e);
      setAlert({ type: 'error', message: msg });
      setTimeout(() => setAlert(null), 2000);
    }
  };

  return (
    <div className="mt-6 space-y-4">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900">Bình luận</h3>

      {user && (
        <form onSubmit={onSubmit} className="flex gap-2">
          <input
            value={text}
            onChange={(e)=>setText(e.target.value)}
            className="flex-1 border rounded-lg px-3 py-2 text-sm"
            placeholder="Viết bình luận của bạn..."
          />
          <button className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm">Gửi</button>
        </form>
      )}

      {alert && (
        <div className={`text-sm rounded-lg px-3 py-2 ${alert.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-rose-50 text-rose-700'}`}>
          {alert.message}
        </div>
      )}

      <div className="space-y-3">
        {items.map(c => (
          <div key={c.id} className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4">
            <div className="flex items-center gap-3">
              {c.avatar ? <img src={c.avatar} alt="" className="w-8 h-8 rounded-full" /> : <div className="w-8 h-8 rounded-full bg-gray-200" />}
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">{c.name || 'Người dùng'}</div>
                <div className="text-xs text-gray-500">{new Date(c.created_at).toLocaleString()}</div>
              </div>
              {user && user.id === c.user_id && (
                <div className="flex gap-2">
                  {editingId === c.id ? (
                    <>
                      <button onClick={onSaveEdit} className="px-2 py-1 rounded bg-blue-600 text-white text-xs">Lưu</button>
                      <button onClick={()=>{setEditingId(null);setEditText('');}} className="px-2 py-1 rounded bg-gray-200 text-xs">Hủy</button>
                    </>
                  ) : (
                    <>
                      <button onClick={()=>onStartEdit(c)} className="px-2 py-1 rounded bg-blue-600 text-white text-xs">Sửa</button>
                      <button onClick={()=>onDelete(c.id)} className="px-2 py-1 rounded bg-rose-600 text-white text-xs">Xóa</button>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="mt-2 text-sm text-gray-800 whitespace-pre-wrap break-words">
              {editingId === c.id ? (
                <textarea value={editText} onChange={(e)=>setEditText(e.target.value)} rows={3} className="w-full border rounded px-3 py-2" />
              ) : (
                c.comment
              )}
            </div>
          </div>
        ))}
        {items.length === 0 && <div className="text-sm text-gray-500">Chưa có bình luận.</div>}
        {hasMore && (
          <div className="pt-2">
            <button
              className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm"
              onClick={async ()=>{ const next = offset + limit; setOffset(next); await fetchData(false); }}
            >
              Xem thêm
            </button>
          </div>
        )}
      </div>
    </div>
  );
}