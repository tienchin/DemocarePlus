// src/pages/AboutPage.js
import React from 'react';

const AboutPage = () => {
  return (
    <div className="card-bg p-6 md:p-10 rounded-lg">
      <div className="prose prose-lg max-w-none text-main prose-headings:text-main prose-strong:text-main prose-a:text-accent hover:prose-a:text-accent-hover">
        
        <section>
          <h1 className="border-b-2 border-accent pb-2">QUY ĐỊNH SỬ DỤNG WEBSITE</h1>
          <p>Chào mừng Bạn đến với Website Thương mại điện tử của Hệ thống phòng khám Quốc tế CarePlus thuộc Công ty TNHH CityClinic Việt Nam (gọi chung là "Website"). Vui lòng đọc kỹ Quy định Sử dụng trước khi tạo tài khoản hoặc tiếp tục truy cập website, để bạn biết được các quyền lợi và nghĩa vụ hợp pháp của mình liên quan đến Chúng tôi...</p>
          
          <h2>Các định nghĩa:</h2>
          <p><strong>Chúng tôi:</strong> theo ngữ cảnh có thể là Phòng khám Quốc tế CarePlus...</p>
          <p><strong>Dịch vụ:</strong> Dịch vụ chăm sóc sức khỏe triển khai trên Website...</p>
          <p><strong>Bạn:</strong> theo ngữ cảnh có thể là người dùng, hoặc khách hàng...</p>

          <h2>1. ĐẶT MUA DỊCH VỤ CHĂM SÓC SỨC KHỎE</h2>
          <p><strong>Bước 1:</strong> Bạn truy cập website và lựa chọn mục “Gói khám sức khỏe”...</p>
          <p><strong>Bước 2:</strong> Sau khi lựa chọn được Dịch vụ, Bạn bấm “Thêm vào giỏ hàng”...</p>
          <p><strong>Bước 3:</strong> Ở trang “Thanh toán”, Bạn lần lượt nhập các thông tin cá nhân...</p>

          {/* ... Thêm các mục khác tương tự ... */}
          <h2>5. PHƯƠNG THỨC THANH TOÁN</h2>
          <p>Bạn có thể thanh toán các khoản tiền cho Chúng tôi thông qua:</p>
          <ul>
            <li>Thẻ ATM nội địa đã kích hoạt tính năng thanh toán trực tuyến</li>
            <li>Thẻ thanh toán quốc tế Visa/MasterCard...</li>
            <li>Ví điện tử</li>
            <li>Thanh toán trực tiếp tại phòng khám</li>
          </ul>
          <p>Nếu không có các loại thẻ trên/ hoặc bạn gặp vấn đề trong quá trình thanh toán vui lòng liên hệ tổng đài Miễn cước 1800 6116 để được hỗ trợ.</p>
        </section>

        <section className="mt-12">
          <h1 className="border-b-2 border-accent pb-2">CHÍNH SÁCH BẢO MẬT</h1>
          
          <h2>A. MỤC ĐÍCH VÀ PHẠM VI THU NHẬP</h2>
          <p>Việc thu thập dữ liệu chủ yếu trên website bao gồm: họ và tên, email, số điện thoại, địa chỉ của khách hàng trong mục “Liên hệ”. Việc thu thập những thông tin kể trên là bắt buộc và cần thiết...</p>
          <p>Khách hàng đăng ký sẽ tự chịu trách nhiệm về bảo mật và lưu giữ mọi hoạt động sử dụng dịch vụ...</p>

          <h2>E. ĐỊA CHỈ CỦA ĐƠN VỊ THU THẬP VÀ QUẢN LÝ THÔNG TIN</h2>
          <div className="not-prose p-6 border border-main rounded-lg">
            <h3 className="text-xl font-bold text-main">PHÒNG KHÁM QUỐC TẾ CAREPLUS</h3>
            <p className="text-subtle"><strong>Địa chỉ 1:</strong> 107 Tân Hải, P.13, Q. Tân Bình, TP.HCM</p>
            <p className="text-subtle"><strong>Địa chỉ 2:</strong> Lầu 2, Crescent Plaza, 105 Tôn Dật Tiên, P. Tân Phú, Q.7, TP. HCM</p>
            <p className="text-subtle"><strong>Điện thoại:</strong> 028 7300 3223 - <strong>Hotline:</strong> 1800 6116</p>
            <p className="text-subtle"><strong>E-mail:</strong> info@careplusvn.com</p>
            <p className="text-subtle"><strong>Website:</strong> www.careplusvn.com</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default AboutPage;