import React from 'react';

// --- CÁC ICON TỪ LAYOUT.JS VÀ HOMEPAGE.JS ---

export function BotIcon({ className = "w-6 h-6 text-white" }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export function ChevronLeftIcon() {
  return (
    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );
}

export function ChevronRightIcon() {
  return (
    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function FacebookIcon() {
    return (
        <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.494v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
        </svg>
    );
}

export function PhoneIcon() {
    return (
        <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21.384 17.824l-3.58-3.58a1.99 1.99 0 00-2.812 0l-1.992 1.992c-2.376-1.188-4.464-3.276-5.652-5.652l1.992-1.992a1.99 1.99 0 000-2.812l-3.58-3.58a1.99 1.99 0 00-2.812 0l-1.992 1.992c-1.188 1.188-1.584 2.808-1.188 4.404 1.584 6.324 6.72 11.46 13.044 13.044 1.596.396 3.216 0 4.404-1.188l1.992-1.992a1.99 1.99 0 000-2.812z"/>
        </svg>
    );
}

export function SearchIcon() {
  return (
    <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

export function SendIcon() {
  return (
    <svg className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 16.571V11.69a1 1 0 112 0v4.881a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
    </svg>
  );
}

export function UserIcon({ avatar, className = "w-10 h-10" }) {
  if (avatar) {
    return (
      <img src={avatar} alt="User Avatar" className={`${className} rounded-full object-cover flex-shrink-0`} />
    );
  }
  return (
    <div className={`${className} rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0`}>
      <svg className="w-6 h-6 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    </div>
  );
}

// --- CÁC ICON TỪ TRANG ĐĂNG NHẬP, ĐĂNG KÝ ---

export function MailIcon() {
  return (
    <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
    </svg>
  );
}

export function LockIcon() {
  return (
    <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );
}

export function UserCircleIcon() {
    return (
        <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    );
}

export function QuestionMarkIcon() {
    return (
        <svg className="w-16 h-16 mx-auto text-sky-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.79 4 4 0 1.897-1.354 3.479-3.146 3.917l-.07.03-.021.012v.002a.5.5 0 01-.49.49h-.006a.5.5 0 01-.49-.49v-.006l.006-.012.021-.012.07-.03A3.982 3.982 0 0112 13a2 2 0 10-4 0v.01a2 2 0 00.5 1.328l.006.008.01.01.01.008.007.006A.5.5 0 018.5 15h-.006a.5.5 0 01-.49-.49v-.002l.002-.006.007-.008.01-.01.01-.008A2 2 0 008 13.01V13a2 2 0 00-1.008-1.728l-.007-.006-.01-.01-.01-.008-.006-.007A.5.5 0 016.5 11h.006a.5.5 0 01.49.49v.006l-.006.012-.021.012-.07.03A3.982 3.982 0 016 13a4 4 0 01-4-4 4 4 0 014-4c1.742 0 3.223.835 3.772 2zM12 18a1 1 0 100 2 1 1 0 000-2z" />
        </svg>
    );
}

export function KeyIcon() {
    return (
        <svg className="w-16 h-16 mx-auto text-sky-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a3 3 0 013 3m-3.414 4.586a5 5 0 11-7.07-7.07 5 5 0 017.07 7.07zm-1.06 1.061l5.657-5.657a3 3 0 10-4.242-4.242l-5.657 5.657a3 3 0 104.242 4.242z" />
        </svg>
    );
}

export function GoogleIcon() {
  return (
    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.657 5.17-6.699 8.799-12.603 8.799-7.22 0-13.04-5.82-13.04-13s5.82-13 13.04-13c3.106 0 5.938 1.127 8.169 2.978l5.708-5.708C34.69 6.983 29.698 4.799 24 4.799 10.795 4.799 0 15.594 0 28.799s10.795 24 24 24c12.783 0 22.805-9.819 23.415-22.518H43.611z"></path>
      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12.799 24 12.799c3.106 0 5.938 1.127 8.169 2.978l5.708-5.708C34.69 6.983 29.698 4.799 24 4.799 16.218 4.799 9.387 8.853 6.306 14.691z"></path>
      <path fill="#4CAF50" d="M24 44.799c5.337 0 9.89-2.383 13.008-6.096l-6.19-4.821C28.707 36.689 26.477 38 24 38c-4.473 0-8.28-2.618-9.84-6.19l-6.571 4.82C10.74 41.65 16.82 44.799 24 44.799z"></path>
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-0.792 2.237-2.231 4.166-4.087 5.571l6.19 4.821C39.99 34.557 43.25 29.61 43.611 20.083z"></path>
    </svg>
  );
}

export function CheckCircleIcon() {
  return (
    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

// --- BỔ SUNG CÁC ICON CÒN THIẾU TỪ QandA ---

export function ArrowLeftIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  );
}

export function EditIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  );
}

export function TrashIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );
}

export function CommentIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );
}

// --- BỔ SUNG ICON CHO "LỊCH SỬ TƯ VẤN" ---

export function SaveIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
    </svg>
  );
}

export function ClockIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

// --- BỔ SUNG ICON CHO MENU 3 GẠCH ---

export function MenuIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

export function XIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}