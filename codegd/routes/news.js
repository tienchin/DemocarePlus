const router = require('express').Router();
const db = require('../DB');

// Middleware để kiểm tra xem user đã đăng nhập chưa
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized: You must be logged in to perform this action.' });
};

// --- NÂNG CẤP PAGINATION VÀ THÊM TÌM KIẾM ---
// GET: Lấy tất cả bài viết (ĐÃ PHÂN TRANG & CÓ TÌM KIẾM)
router.get('/', async (req, res) => {
  try {
    // 1. Lấy tham số từ query string (URL)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9; // Mặc định là 9 bài/trang
    const searchTerm = req.query.search || ''; // Lấy từ khóa tìm kiếm, mặc định là chuỗi rỗng

    const offset = (page - 1) * limit;

    // 2. Xây dựng câu lệnh truy vấn SQL
    let baseQuery = 'SELECT id, title, content, imageUrl, category_id, created_at FROM articles';
    let countQuery = 'SELECT COUNT(*) as total FROM articles';
    let queryParams = [];

    // Nếu có từ khóa tìm kiếm, thêm điều kiện WHERE
    if (searchTerm) {
      baseQuery += ' WHERE title LIKE ? OR content LIKE ?'; // Tìm kiếm trong tiêu đề hoặc nội dung
      countQuery += ' WHERE title LIKE ? OR content LIKE ?';
      // Sử dụng wildcard '%' để tìm kiếm bất kỳ đâu trong chuỗi
      const searchTermWithWildcard = `%${searchTerm}%`; 
      queryParams.push(searchTermWithWildcard, searchTermWithWildcard);
    }

    // Thêm ORDER BY và LIMIT/OFFSET cho câu lệnh lấy dữ liệu
    baseQuery += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    queryParams.push(limit, offset);

    // 3. Đếm tổng số bài viết (có thể kèm điều kiện tìm kiếm)
    const [[countResult]] = await db.query(countQuery, queryParams.slice(0, queryParams.length - 2)); // Loại bỏ limit và offset khỏi mảng queryParams cho câu đếm
    const totalItems = countResult.total;
    const totalPages = Math.ceil(totalItems / limit);

    // 4. Lấy dữ liệu cho trang hiện tại (có thể kèm điều kiện tìm kiếm)
    const [articles] = await db.query(baseQuery, queryParams);
    
    // 5. Trả về đối tượng (object) chứa dữ liệu và thông tin phân trang
    res.status(200).json({
      articles: articles,
      totalPages: totalPages,
      currentPage: page,
      totalItems: totalItems
    });

  } catch (error) {
    console.error("Lỗi API [GET] /news (pagination & search):", error);
    res.status(500).json({ message: 'Server error', error: error.message }); // Trả về thông báo lỗi chi tiết hơn
  }
});
// --- KẾT THÚC NÂNG CẤP PAGINATION VÀ TÌM KIẾM ---


// GET: Lấy chi tiết bài viết theo id (công khai)
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM articles WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Không tìm thấy bài viết' });
    res.json(rows[0]);
  } catch (e) {
    res.status(500).json({ message: 'Lỗi server khi lấy bài viết', error: e.message });
  }
});

// POST: Tạo bài viết mới (bảo vệ)
router.post('/', isAuthenticated, async (req, res) => {
  const { title, content, imageUrl, categoryId, code } = req.body;
  const user_id = req.user.id;
  if (!title || !content) {
    return res.status(400).json({ message: 'Tiêu đề và nội dung là bắt buộc.' });
  }
  try {
    const newArticle = {
      title,
      content,
      user_id,
      imageUrl: imageUrl || null,
      category_id: categoryId || null,
      code: code || null
    };
    const [result] = await db.query('INSERT INTO articles SET ?', newArticle);
    // Lấy lại bài viết vừa tạo để trả về thông tin đầy đủ hơn
    const [createdArticle] = await db.query('SELECT * FROM articles WHERE id = ?', [result.insertId]);
    res.status(201).json(createdArticle[0]);
  } catch (error) {
    console.error("Lỗi API [POST] /news:", error);
    res.status(500).json({ message: 'Không thể tạo bài viết', error: error.message });
  }
});

// PUT: Cập nhật bài viết
router.put('/:id', isAuthenticated, async (req, res) => {
  const { title, content, imageUrl, categoryId, code } = req.body;
  try {
    // Kiểm tra xem người dùng có quyền sở hữu bài viết không
    const [own] = await db.query('SELECT user_id FROM articles WHERE id = ?', [req.params.id]);
    if (own.length === 0 || own[0].user_id !== req.user.id) {
        return res.status(403).json({ message: 'Forbidden: Bạn không có quyền sửa bài viết này.' });
    }

    const updatedArticleData = {
      title,
      content,
      imageUrl: imageUrl || null,
      category_id: categoryId || null,
      code: code || null
    };

    await db.query('UPDATE articles SET ? WHERE id = ?', [updatedArticleData, req.params.id]);
    
    // Lấy lại bài viết đã cập nhật để trả về
    const [rows] = await db.query('SELECT * FROM articles WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Không tìm thấy bài viết để cập nhật.' });
    res.json(rows[0]);
  } catch (e) {
    console.error("Lỗi API [PUT] /news/:id:", e);
    res.status(500).json({ message: 'Không thể cập nhật bài viết', error: e.message });
  }
});

// DELETE: Xóa bài viết
router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    // Kiểm tra xem người dùng có quyền sở hữu bài viết không
    const [own] = await db.query('SELECT user_id FROM articles WHERE id = ?', [req.params.id]);
    if (own.length === 0 || own[0].user_id !== req.user.id) {
        return res.status(403).json({ message: 'Forbidden: Bạn không có quyền xóa bài viết này.' });
    }

    const [result] = await db.query('DELETE FROM articles WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Không tìm thấy bài viết để xóa.' });
    }
    res.json({ success: true, message: 'Bài viết đã được xóa thành công.' });
  } catch (e) {
    console.error("Lỗi API [DELETE] /news/:id:", e);
    res.status(500).json({ message: 'Không thể xóa bài viết', error: e.message });
  }
});

module.exports = router;