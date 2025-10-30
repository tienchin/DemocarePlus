import axios from 'axios';

// Tạo một axios instance để dùng chung
const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  withCredentials: true, // <-- ĐẢM BẢO DÒNG NÀY LÀ `true`
});

export const getArticles = () => {
  return api.get('/news'); // Hàm này sẽ gọi đến API để lấy bài viết
};

// Chúng ta vẫn giữ export default để có thể dùng instance 'api' ở nơi khác nếu cần
export default api;