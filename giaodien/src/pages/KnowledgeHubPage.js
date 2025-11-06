import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon } from '../components/Icons.js'; // SỬA LỖI: Đường dẫn đúng

// --- DỮ LIỆU GIẢ LẬP TỪ `knowledgeBase.js` ---
// Trong dự án thật, bạn sẽ import từ file:
// import { medicalKnowledgeBase } from '../services/knowledgeBase.js';
const medicalKnowledgeBase = [
  {
    title: "Kiến Thức Y Khoa Cơ Bản",
    id: "co-ban",
    subitems: [
      { id: 'giai-phau-hoc', name: 'Giải Phẫu Học (Anatomy)', author: 'BS. Nguyễn Minh Khang', date: '12/10/2025' },
      { id: 'sinh-ly-hoc', name: 'Sinh Lý Học (Physiology)', author: 'TS. Lê Thị Thu Hà', date: '14/10/2025' },
      { id: 'hoa-sinh-y-hoc', name: 'Hóa Sinh Y Học (Biochemistry)', author: 'PGS. Trần Quốc Dũng', date: '16/10/2025' },
      { id: 'te-bao-hoc-di-truyen-hoc', name: 'Tế Bào & Di Truyền Học (Cell & Genetics)', author: 'BS. Đỗ Hoàng Lộc', date: '18/10/2025' },
      { id: 'vi-sinh-vat-y-hoc', name: 'Vi Sinh Vật Y Học (Microbiology)', author: 'ThS. Phạm Thị Mai', date: '20/10/2025' },
      { id: 'mien-dich-hoc', name: 'Miễn Dịch Học (Immunology)', author: 'GS. Nguyễn Văn Lưu', date: '21/10/2025' },
      { id: 'benh-ly-hoc', name: 'Bệnh Lý Học (Pathology)', author: 'BSCKII. Trịnh Văn Hòa', date: '22/10/2025' }
    ]
  },
  {
    title: "Kiến Thức Y Khoa Lâm Sàng",
    id: "lam-sang",
    subitems: [
      { id: 'trieu-chung-hoc', name: 'Triệu Chứng Học (Symptomatology)', author: 'BS. Lê Ngọc Hiền', date: '23/10/2025' },
      { id: 'chan-doan-benh', name: 'Chẩn Đoán Bệnh (Diagnostics)', author: 'TS. Đoàn Quang Phúc', date: '24/10/2025' },
      { id: 'dieu-tri-benh', name: 'Điều Trị Bệnh (Therapeutics)', author: 'BS. Nguyễn Ngọc Linh', date: '25/10/2025' },
      { id: 'dich-te-hoc', name: 'Dịch Tễ Học (Epidemiology)', author: 'PGS. Bùi Thị Thu', date: '26/10/2025' },
      { id: 'y-hoc-du-phong', name: 'Y Học Dự Phòng (Preventive Medicine)', author: 'ThS. Võ Văn Bình', date: '27/10/2025' },
      { id: 'suc-khoe-cong-dong', name: 'Sức Khỏe Cộng Đồng (Community Health)', author: 'BS. Đặng Mỹ Duyên', date: '28/10/2025' },
      { id: 'dao-duc-y-khoa', name: 'Đạo Đức Y Khoa (Medical Ethics)', author: 'GS. Trần Thị Hồng', date: '28/10/2025' }
    ]
  },
  {
    title: "Thông Tin Y Tế Cụ Thể",
    id: "thong-tin-cu-the",
    subitems: [
      { id: 'thong-tin-ve-benh', name: 'Thông Tin Về Bệnh', author: 'Ban Biên Tập YKhoa.vn', date: '01/11/2025' },
      { id: 'thong-tin-ve-thuoc', name: 'Thông Tin Về Thuốc', author: 'DS. Nguyễn Hồng Hà', date: '02/11/2025' },
      { id: 'thu-thuat-y-khoa', name: 'Thủ Thuật Y Khoa', author: 'BS. Trần Quang Tùng', date: '03/11/2025' },
    ]
  },
  {
    title: "Sức Khỏe Số (Digital Health)",
    id: "suc-khoe-so",
    subitems: [
      { id: 'du-lieu-y-te-dien-tu', name: 'Dữ Liệu Y Tế Điện Tử (EHR/EMR)', author: 'CN. Nguyễn Thanh Quý', date: '07/11/2025' },
      { id: 'y-hoc-tu-xa', name: 'Y Học Từ Xa (Telemedicine)', author: 'BS. Lý Hương Giang', date: '10/11/2025' },
    ]
  }
];

// --- COMPONENT CHÍNH CỦA TRANG ---
// Tệp này sẽ được bọc bởi Layout.js, nên không cần Navbar/Footer
export default function KnowledgeHubPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredKnowledgeBase = medicalKnowledgeBase.map(category => {
    const filteredSubitems = category.subitems.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return { ...category, subitems: filteredSubitems };
  }).filter(category => 
    category.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    category.subitems.length > 0
  );

  return (
    <div className="animate-fade-in">
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-sky-900 sm:text-5xl">
            Kho Kiến thức Y khoa
          </h1>
          <p className="mt-4 text-xl text-sky-700">
            Tìm kiếm và khám phá thông tin chi tiết về sức khỏe.
          </p>
        </div>

        <div className="mb-10 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm bài viết, chủ đề, tác giả..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-lg"
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <SearchIcon />
            </div>
          </div>
        </div>

        <div className="space-y-12">
          {filteredKnowledgeBase.length > 0 ? (
            filteredKnowledgeBase.map(category => (
              <section key={category.id} id={category.id}>
                <h2 className="text-3xl font-bold text-sky-800 border-b-2 border-sky-200 pb-2 mb-6">
                  {category.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.subitems.map(item => (
                    <Link 
                      key={item.id} 
                      to={`/knowledge/${item.id}`} // Dùng <Link>
                      className="block p-5 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 group"
                    >
                      <h3 className="text-lg font-semibold text-sky-900 group-hover:text-sky-700">{item.name}</h3>
                      <p className="text-sm text-gray-600 mt-2">Tác giả: {item.author}</p>
                      <p className="text-sm text-gray-500 mt-1">Ngày đăng: {item.date}</p>
                    </Link>
                  ))}
                </div>
              </section>
            ))
          ) : (
            <p className="text-center text-lg text-gray-500">
              Không tìm thấy kết quả nào phù hợp với "{searchTerm}".
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

