// src/components/ConfirmationModal.js
import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, actionText }) => {
  // Nếu modal không được mở, không hiển thị gì cả
  if (!isOpen) {
    return null;
  }

  return (
    // Lớp phủ mờ toàn màn hình
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      {/* Khung nội dung của modal */}
      <div className="card-bg p-6 rounded-lg shadow-xl w-full max-w-sm transform transition-all">
        {/* Tiêu đề */}
        <div className="flex justify-between items-center border-b border-main pb-3 mb-4">
          <h2 className="text-xl font-bold text-main uppercase">{actionText}</h2>
          <button onClick={onClose} className="text-2xl text-subtle hover:text-main">&times;</button>
        </div>

        {/* Nội dung xác nhận */}
        <div className="py-4">
          <p className="text-main text-lg">
            Bạn có chắc là mình muốn: <strong className="text-accent">{actionText}</strong>?
          </p>
        </div>

        {/* Các nút hành động */}
        <div className="flex justify-end gap-4 mt-4">
          <button 
            onClick={onClose} 
            className="px-6 py-2 rounded-md border border-main text-main font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Nô
          </button>
          <button 
            onClick={onConfirm} 
            className="px-6 py-2 rounded-md bg-accent bg-accent-hover text-white font-semibold transition-colors"
          >
            Zét
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;