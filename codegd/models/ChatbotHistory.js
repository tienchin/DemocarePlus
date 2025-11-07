const db = require('../DB'); // Import kết nối MySQL Pool (mysql2/promise)

// Viết lại model để sử dụng async/await
const ChatbotHistory = {
  
  /**
   * Lưu một cuộc trò chuyện mới vào CSDL
   * @param {number} userId - ID của người dùng
   * @param {string} title - Tiêu đề (ví dụ: tin nhắn đầu tiên của người dùng)
   * @param {string} fullConversation - Toàn bộ cuộc trò chuyện (dưới dạng JSON string)
   */
  save: async (userId, title, fullConversation) => {
    try {
      const [result] = await db.query(
        // Dùng đúng tên cột 'message' (cho tiêu đề) và 'response' (cho nội dung JSON)
        'INSERT INTO chatbot_history (user_id, message, response) VALUES (?, ?, ?)',
        [userId, title, fullConversation]
      );
      return result.insertId;
    } catch (error) {
      console.error("Lỗi khi lưu lịch sử chat:", error);
      throw error;
    }
  },

  /**
   * Lấy tất cả lịch sử chat của một người dùng (chỉ tiêu đề)
   * @param {number} userId - ID của người dùng
   */
  getByUser: async (userId) => {
    try {
      // Chỉ lấy các trường cần thiết cho danh sách (không lấy 'response' vì nó nặng)
      const [rows] = await db.query(
        'SELECT id, user_id, message, created_at FROM chatbot_history WHERE user_id = ? ORDER BY created_at DESC', 
        [userId]
      );
      return rows;
    } catch (error) {
      console.error("Lỗi khi lấy lịch sử chat:", error);
      throw error;
    }
  },
  
  /**
   * Lấy chi tiết một cuộc trò chuyện
   * @param {number} historyId - ID của cuộc trò chuyện
   * @param {number} userId - ID của người dùng (để bảo mật)
   */
  getById: async (historyId, userId) => {
     try {
      // Lấy toàn bộ, bao gồm 'response'
      const [rows] = await db.query(
        'SELECT * FROM chatbot_history WHERE id = ? AND user_id = ?', 
        [historyId, userId]
      );
      return rows[0]; // Trả về undefined nếu không tìm thấy
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết lịch sử chat:", error);
      throw error;
    }
  }
};

module.exports = ChatbotHistory;