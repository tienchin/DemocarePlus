const mysql = require('mysql2/promise');
require('dotenv').config();

const poolConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(poolConfig);

// --- NÂNG CẤP: TỰ ĐỘNG KIỂM TRA KẾT NỐI ---
// Chúng ta sẽ tạo một hàm tự gọi (IIFE) để kiểm tra kết nối ngay
(async () => {
  let connection;
  try {
    // Thử lấy 1 kết nối từ pool
    connection = await pool.getConnection(); 
    // Thử 1 truy vấn đơn giản
    await connection.ping(); 
    // Nếu 2 bước trên thành công:
    console.log('[MySQL] Đã tạo Pool kết nối thành công.');
    console.log(`[MySQL] Đã kết nối thành công với database "${process.env.DB_NAME}" tại "${process.env.DB_HOST}".`);
  } catch (error) {
    // Nếu kết nối thất bại, báo lỗi rõ ràng
    console.error('--- LỖI KẾT NỐI CƠ SỞ DỮ LIỆU ---');
    console.error(`[MySQL] KHÔNG THỂ KẾT NỐI TỚI "${process.env.DB_HOST}" VỚI USER "${process.env.DB_USER}".`);
    console.error('[MySQL] Lỗi chi tiết:', error.code, error.message);
    console.error('--------------------------------------');
    console.error('GỢI Ý: Vui lòng kiểm tra lại DB_HOST, DB_USER, và DB_PASSWORD trong tệp .env của bạn!');
  } finally {
    // Luôn luôn trả kết nối về pool
    if (connection) {
      connection.release();
    }
  }
})();
// --- KẾT THÚC NÂNG CẤP ---

module.exports = pool;
