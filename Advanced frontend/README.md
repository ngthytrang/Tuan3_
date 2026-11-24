# Nhóm 2 · jQuery cho trang LMS-UEH

Bài làm thực hiện mục 2 của *BaiThucHanh_Responsive_JQuery.pdf*.

## Xem bản minh họa

Mở `demo.html` bằng trình duyệt. Trang tự chạy script và hiển thị kết quả. Nhấn **F12 → Console** để xem kết quả dưới dạng `console.log()` và `console.table()`. Demo chạy ngoại tuyến với jQuery 3.7.1 đi kèm.

Bài nộp thứ 5 trong dữ liệu mẫu là **jQuery cho trang LMS-UEH**. Chủ đề **Tài liệu tham khảo** hiển thị **Không** ở cột **Có bài tập**. Các chủ đề có nhiều bài tập hiển thị mỗi bài trên một dòng cùng hạn nộp tương ứng.

## Chạy trên LMS-UEH

1. Đăng nhập bằng tài khoản của bạn, mở trang tổng quan của môn học. Nếu môn học chia nội dung theo trang, mở chế độ hiển thị tất cả chủ đề nếu có.
2. Dùng trình soạn thảo mở `lms-ueh.js`, chép toàn bộ mã vào **F12 → Console** trên trang LMS rồi nhấn Enter.
3. Xem dòng **Bài nộp thứ 5** và bảng **Chủ đề / Có bài tập / Bài tập / Hạn nộp**. Bài thứ 5 được tính theo thứ tự giao diện của các mục **Bài tập** (`.modtype_assign`). Khi hạn nộp chưa xuất hiện trên trang tổng quan, script thử đọc trang chi tiết của bài tập trong cùng hệ thống LMS.

Script dùng jQuery sẵn có trên LMS, qua `window.jQuery` hoặc mô-đun `jquery` của RequireJS. Kết quả phụ thuộc vào nội dung và hạn nộp tài khoản được quyền xem. Dòng **Không thấy hạn nộp** xuất hiện khi script chưa tìm thấy giá trị hạn nộp trong dữ liệu đọc được.
