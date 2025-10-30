// src/pages/ContactPage.js
import React from 'react';

const ContactPage = () => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg p-6 md:p-10 rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Liên hệ</h1>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Chúng tôi luôn sẵn lòng lắng nghe ý kiến của bạn. Vui lòng liên hệ qua các kênh dưới đây:
      </p>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Email</h3>
          <p className="text-gray-700 dark:text-gray-300">info@careplusvn.com</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Hotline (Miễn cước)</h3>
          <p className="text-gray-700 dark:text-gray-300">1800 6116</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Giờ làm việc</h3>
          <p className="text-gray-700 dark:text-gray-300">Thứ Hai - Thứ Bảy: 8:00 - 17:00</p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;