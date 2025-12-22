import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const mountApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error("Lỗi: Không tìm thấy phần tử #root để gắn ứng dụng.");
    return;
  }

  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Lỗi khi khởi tạo React:", error);
    rootElement.innerHTML = `
      <div style="padding: 20px; font-family: sans-serif; text-align: center;">
        <h2>Rất tiếc, đã có lỗi xảy ra khi khởi động ứng dụng.</h2>
        <p>Vui lòng làm mới trang hoặc kiểm tra kết nối internet.</p>
      </div>
    `;
  }
};

// Đảm bảo DOM đã sẵn sàng trước khi chạy React
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp);
} else {
  mountApp();
}