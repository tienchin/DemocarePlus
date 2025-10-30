
const db = require('../seeders/db');
module.exports = {
  getAll: cb => db.query('SELECT * FROM articles', cb),
  getById: (id, cb) => db.query('SELECT * FROM articles WHERE id = ?', [id], cb)
};
