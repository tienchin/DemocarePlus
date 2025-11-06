import axios from 'axios';

// Tạo một axios instance để dùng chung
const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  withCredentials: true, // <-- ĐẢM BẢO DÒNG NÀY LÀ `true`
});

export const getArticles = () => {
  return api.get('/news'); // Hàm này sẽ gọi đến API để lấy bài viết
};
export const getArticleById = (id) => api.get(`/news/${id}`);
export const getMyArticles = () => api.get('/users/me/articles');
export const getMyQuestions = () => api.get('/users/me/questions');
export const getMyComments = () => api.get('/users/me/comments');

export const getKnowledge = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return api.get(`/chatbot/knowledge${qs ? `?${qs}` : ''}`);
};

export const getPromotedKnowledge = () => getKnowledge({ promoted: true });

export const updateArticle = (id, payload) => api.put(`/news/${id}`, payload);
export const deleteArticle = (id) => api.delete(`/news/${id}`);

export const updateQuestion = (id, payload) => api.put(`/questions/${id}`, payload);
export const deleteQuestion = (id) => api.delete(`/questions/${id}`);

export const getCommentsByArticle = (articleId, { limit, offset } = {}) => {
  const params = new URLSearchParams({ articleId });
  if (typeof limit === 'number') params.append('limit', String(limit));
  if (typeof offset === 'number') params.append('offset', String(offset));
  return api.get(`/comments?${params.toString()}`);
};
export const getCommentsByQuestion = (questionId, { limit, offset } = {}) => {
  const params = new URLSearchParams({ questionId });
  if (typeof limit === 'number') params.append('limit', String(limit));
  if (typeof offset === 'number') params.append('offset', String(offset));
  return api.get(`/comments?${params.toString()}`);
};
export const addComment = (payload) => api.post('/comments', payload); // {articleId|questionId, comment}
export const updateComment = (id, payload) => api.put(`/comments/${id}`, payload); // {comment}
export const deleteComment = (id) => api.delete(`/comments/${id}`);
export const askChatbot = async (message) => {
  try {
    const res = await api.post('/chatbot', { message });
    if (res.data && (res.data.reply || res.data.message)) {
      return res.data.reply || res.data.message;
    }
    return '';
  } catch (e) {
    return '';
  }
};
export default api;