const db = require('../DB');

const ChatbotHistory = {
  save: (user_id, question, answer, callback) => {
    db.query(
      'INSERT INTO chatbot_history (user_id, question, answer) VALUES (?, ?, ?)',
      [user_id, question, answer],
      callback
    );
  },
  getByUser: (user_id, callback) => {
    db.query('SELECT * FROM chatbot_history WHERE user_id = ? ORDER BY created_at DESC', [user_id], callback);
  }
};

module.exports = ChatbotHistory;
