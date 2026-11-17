# JavaScript Labs — Phát triển ứng dụng TMĐT

## Thông tin sinh viên

- Họ tên: **Nguyễn Linh Thùy Trang**.
- MSSV: **31241026274**.
- Lớp học phần: **26C1INF50902701**.
- GitHub cá nhân: https://github.com/ngthytrang
- Repository: https://github.com/ngthytrang/Tuan3_
- GitHub Pages: **Chưa xác minh triển khai**.

Sửa `profile.json` để cập nhật thông tin trên trang chủ. Cập nhật thông tin tại README và báo cáo Word tương ứng. Avatar hiện tại là hình đại diện mặc định bằng HTML/CSS; có thể thay bằng ảnh cá nhân. Nội dung giới thiệu và tự đánh giá là bản nháp có AI hỗ trợ: sinh viên cần đọc hiểu, chỉnh sửa theo trải nghiệm thật trước khi nộp.

## Mục tiêu

Hoàn thành các Exercise của Lab08, Lab09 và Lab10 theo tài liệu Fundamentals of Web Development, 2nd Ed (2017) được cung cấp; thực hành tổ chức dữ liệu, cập nhật giao diện, sự kiện, biểu mẫu và AJAX để vận dụng vào website thương mại điện tử.

## Cấu trúc

```text
JavaScript-Labs/
├── index.html                  Portfolio và liên kết 3 Lab
├── profile.json                Thông tin cá nhân
├── css/style.css               Giao diện chung, responsive
├── js/main.js                  Hiển thị thông tin cá nhân
├── js/jquery-3.1.1.min.js       Thư viện gốc kèm tài liệu
├── assets/                     Ảnh và cờ từ bộ khởi đầu
├── data/cities.json             Dữ liệu minh họa cho GET cùng origin
├── Lab08/
│   ├── index.html
│   ├── Exercise01/ … Exercise11/  index.html và main.js mỗi bài
│   └── Travel/                 Bài bổ sung từ exercise.html
├── Lab09/
│   └── Exercise01/ … Exercise08/
└── Lab10/
    └── Exercise01/ … Exercise10/
```

Một số bài thêm `hello.js` hoặc script trong `head` theo đúng kỹ thuật đang được học. Mở `index.html` của bài tương ứng để xem script nhúng. Phần xem mã nguồn trên mỗi bài hiển thị `main.js`; các tệp khác được ghi chú trong bài.

## Nội dung

- **Lab08 — 11 Exercise:** bật/tắt JavaScript, script nhúng/ngoài, noscript, console, String/Date/Math, mảng và lịch 30 ngày, hàm và scope, callback tính thuế, đơn hàng và mảng Country.
- **Lab09 — 8 Exercise:** lựa chọn DOM, quan hệ node, tạo/xóa phần tử, click/hover, load, gỡ lỗi sự kiện, focus/blur và kiểm tra biểu mẫu rỗng.
- **Lab10 — 10 Exercise:** cài jQuery và fallback, selectors, on/off, bảy phương thức chèn DOM, fade/slide, preview ảnh, animate nối tiếp, GET và jqXHR done/fail/always.

## Chạy bài

Trang chủ: `JavaScript-Labs/index.html`. Các bài: `Lab08/`, `Lab09/`, `Lab10/`.

Để chạy đầy đủ AJAX, phục vụ thư mục qua HTTP, ví dụ dùng VS Code Live Server và mở `JavaScript-Labs/index.html`. Mở bằng `file://` có thể chặn fetch và XMLHttpRequest. Trên GitHub Pages không cần cài Node hay thư viện phụ thuộc.

Trong mỗi bài có mô tả yêu cầu, vùng kết quả tương tác, liên kết mã nguồn và điều hướng bài tiếp theo. Dùng F12 → Console/Sources để kiểm tra. Exercise 8.5 ghi một `console.error` có chủ đích đúng bài học; đây không phải lỗi JavaScript chưa được xử lý. Exercise 8.1 và 8.4 cần tắt JavaScript rồi tải lại để thấy noscript.

### GET và jqXHR

Exercise 10.9–10.10 cung cấp ba lựa chọn:

1. JSON cục bộ: gửi GET thật đến `data/cities.json`, không cần dịch vụ bên ngoài.
2. Web service giáo trình: endpoint cũ được chuyển sang HTTPS để phù hợp GitHub Pages; hoạt động tùy tình trạng dịch vụ và chính sách CORS.
3. Lỗi 404: gửi yêu cầu đến tài nguyên không tồn tại để kiểm tra nhánh lỗi.

Dữ liệu cục bộ được ghi rõ là minh họa. Không tuyên bố đã kiểm chứng khả dụng của dịch vụ giáo trình. jQuery 3.1.1 được giữ theo bộ bài học; không cần CDN cho hoạt động bình thường. Exercise 10.1 có nút thử CDN, tự trở về thư viện cục bộ khi lỗi hoặc quá thời gian.

## Đưa vào repository hiện có và triển khai GitHub Pages

**Không tạo repository mới; không thay thế các bài trước.** Chỉ chép thêm thư mục `JavaScript-Labs` vào repository cũ. Chép tệp `.nojekyll` kèm theo nếu repository chưa có.

```bash
git add JavaScript-Labs
git commit -m "Complete JavaScript Labs 08 09 10 and portfolio"
git push
```

Nếu repository đã có GitHub Pages, giữ cấu hình hiện hành. Nếu chưa có, vào Settings → Pages → Deploy from a branch, chọn nhánh chứa bài và thư mục gốc `/ (root)`. Nếu website cũ dùng thư mục `docs` hay workflow riêng, đưa `JavaScript-Labs` vào đúng nguồn xuất bản của website cũ; không đổi cấu hình làm mất trang trước đó.

URL cần điền sau khi triển khai thực tế:

```text
https://<username>.github.io/<repository>/JavaScript-Labs/
https://<username>.github.io/<repository>/JavaScript-Labs/Lab08/
https://<username>.github.io/<repository>/JavaScript-Labs/Lab09/
https://<username>.github.io/<repository>/JavaScript-Labs/Lab10/
```

Đề yêu cầu repository Public. Cần xác minh trạng thái Public và mở các URL thực tế trước khi nộp. Các URL mẫu trên không phải minh chứng triển khai.

## Minh chứng và báo cáo

Thư mục `MinhChung` cạnh thư mục mã nguồn chứa ảnh chụp thật từ Chrome khi kiểm thử cục bộ, kết quả JSON và thông tin breakpoint Exercise 9.6. Báo cáo Word tổng hợp đủ từng Exercise và chú thích ảnh. Ảnh chứng minh kết quả cục bộ, chưa chứng minh GitHub Pages.

Báo cáo tạm mang tên `CHUA_CO_MSSV_CHUA_CO_HOTEN_JavaScript_Labs.docx`. Sau khi bổ sung thông tin, đổi theo `MSSV_HoTen_JavaScript_Labs.docx`.

## Nguồn và kiểm tra trước khi nộp

Tài nguyên và jQuery lấy từ ba ZIP giáo trình người dùng cung cấp. Mã bài làm và giao diện được triển khai dựa trên yêu cầu trong Lab08.pdf, Lab09.pdf, Lab10.pdf và BaiTap_CaNhan_JS.pdf. Bộ tài liệu gốc lưu riêng ở `TaiLieu`, không phải sản phẩm để upload thay mã nguồn.

Hoàn thành thông tin cá nhân, đọc hiểu mã nguồn, chỉnh phần tự đánh giá; cập nhật repository cũ, kiểm chứng GitHub Pages; cập nhật URL thật trong báo cáo/README và đổi tên Word trước khi nộp lên LMS.
