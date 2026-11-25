# Nhóm 2 · Advanced Frontend

Mở `demo.html` để chọn một trong ba bài thực hành.

## jQuery cho trang LMS-UEH

Bài làm thực hiện mục 2 của *BaiThucHanh_Responsive_JQuery.pdf*.

## Xem bản minh họa

Chọn **Mở bản minh họa LMS** từ trang tổng hợp hoặc mở `lms-ueh/index.html`. Trang tự chạy script và hiển thị kết quả. Nhấn **F12 → Console** để xem kết quả dưới dạng `console.log()` và `console.table()`. Demo chạy ngoại tuyến với jQuery 3.7.1 đi kèm.

Bài nộp thứ 5 trong dữ liệu mẫu là **jQuery cho trang LMS-UEH**. Chủ đề **Tài liệu tham khảo** hiển thị **Không** ở cột **Có bài tập**. Các chủ đề có nhiều bài tập hiển thị mỗi bài trên một dòng cùng hạn nộp tương ứng.

## Chạy trên LMS-UEH

1. Đăng nhập bằng tài khoản của bạn, mở trang tổng quan của môn học. Nếu môn học chia nội dung theo trang, mở chế độ hiển thị tất cả chủ đề nếu có.
2. Dùng trình soạn thảo mở `lms-ueh/lms-ueh.js`, chép toàn bộ mã vào **F12 → Console** trên trang LMS rồi nhấn Enter.
3. Xem dòng **Bài nộp thứ 5** và bảng **Chủ đề / Có bài tập / Bài tập / Hạn nộp**. Bài thứ 5 được tính theo thứ tự giao diện của các mục **Bài tập** (`.modtype_assign`). Khi hạn nộp chưa xuất hiện trên trang tổng quan, script thử đọc trang chi tiết của bài tập trong cùng hệ thống LMS.

Script dùng jQuery sẵn có trên LMS, qua `window.jQuery` hoặc mô-đun `jquery` của RequireJS. Kết quả phụ thuộc vào nội dung và hạn nộp tài khoản được quyền xem. Dòng **Không thấy hạn nộp** xuất hiện khi script chưa tìm thấy giá trị hạn nộp trong dữ liệu đọc được.

## Các phần còn lại của Nhóm 2

### E-commerce · Mộc Rang

Mở `ecommerce/index.html` trong trình duyệt. Dùng ô tìm kiếm, bộ lọc hoặc nút chuyển ảnh để xem danh mục. Trong **Chi tiết**, chọn ảnh thu nhỏ rồi di chuột qua ảnh lớn để kiểm tra xZoom. Trang dùng **Bootstrap 3.4.1 Progress** để thể hiện tồn kho và **Bootstrap Star Rating** để hiển thị điểm sao và nhận đánh giá.

Mỗi sản phẩm có nhãn phần trăm giảm giá ở góc trái ảnh và nhãn **Mới** hoặc **Bán chạy** ở góc phải. Có thể chọn kiểu xay, thêm vào giỏ, đổi số lượng, xác nhận đơn mẫu và xem **Đơn hàng**. Giỏ hàng, đánh giá và đơn mẫu được lưu cục bộ trong trình duyệt. Biểu mẫu dùng thông tin mẫu và không thực hiện thanh toán.

Ảnh minh họa cà phê tải từ Unsplash. Thư viện được đặt trong `ecommerce/vendor`; các tính năng của bài có thể chạy ngoại tuyến.

### Game · Vẹt qua rừng tre

Mở `game/index.html`. Nhấn **↓** hoặc nút **Vỗ cánh** và tránh các cặp ống tre. Mỗi cặp vượt qua được tính một điểm. Game dùng hình vẹt và ống tre tự vẽ trong Canvas.

| Điểm | Level | Interval cập nhật vật lý |
|---|---:|---:|
| 0–4 | 1 | 40 ms |
| 5–19 | 2 | 30 ms |
| 20–39 | 3 | 25 ms |
| 40–49 | 4 | 20 ms |
| 50 | Chiến thắng | Dừng game |

Canvas vẽ bằng `requestAnimationFrame` để chuyển động mượt giữa các lần cập nhật. Level đầu có khe rộng và tốc độ thấp hơn. Game có nút tạm dừng, chơi lại và lưu kỷ lục. Cải tiến có thể làm thêm là chế độ luyện tập ở từng level.

