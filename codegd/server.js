require('dotenv').config(); // Tải biến môi trường từ .env
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const db = require('./DB'); // Import DB để kiểm tra kết nối (từ file DB.js)

// SỬA LỖI (SESSION): Kích hoạt Passport!
// Bỏ comment dòng này để passport.serializeUser hoạt động
require('./config/passport-setup'); 

// SỬA LỖI MÂU THUẪN 3: Import tất cả các routes
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/categories');
const questionRoutes = require('./routes/questions');
const commentRoutes = require('./routes/comments');
const newsRoutes = require('./routes/news'); // (File articles/tin tức)
const usersRoutes = require('./routes/users');
const chatbotRoutes = require('./routes/chatbot');

const app = express();

const PORT = process.env.PORT || 3001; 

// --- Middlewares ---
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', 
  credentials: true 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'dayLaChuoiBiMatCuaToi_khongAiDoanDuoc_12345!',
  resave: false,
  saveUninitialized: false, 
  cookie: {
    secure: process.env.NODE_ENV === 'production', 
    httpOnly: true, 
    maxAge: 24 * 60 * 60 * 1000 // Thời gian sống của cookie (1 ngày)
  }
}));

// Khởi tạo Passport và Session
app.use(passport.initialize());
app.use(passport.session());

// --- Routes API ---
// SỬA LỖI MÂU THUẪN 3: 'Use' (sử dụng) tất cả các routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/news', newsRoutes); // Frontend sẽ gọi /api/news/...
app.use('/api/users', usersRoutes);
app.use('/api/chatbot', chatbotRoutes);

console.log('[Backend] Đã tải thành công TẤT CẢ các routes (auth, news, questions, v.v...).');


app.get('/api', (req, res) => {
  res.json({ message: 'Chào mừng đến với Backend API của CarePlus! (Đang chạy trên port 3001)' });
});

// --- Khởi động Server ---
app.listen(PORT, () => {
  console.log(`[Backend] Máy chủ đang chạy tại http://localhost:${PORT}`);
  console.log('Sẵn sàng nhận yêu cầu từ Proxy của Giao diện (Frontend).');
});