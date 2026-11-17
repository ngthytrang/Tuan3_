# BÀI THỰC HÀNH JAVASCRIPT

**Học phần: Phát triển ứng dụng thương mại điện tử — Chương 4**

## 1. Thông tin sinh viên

| Thông tin | Nội dung |
| --- | --- |
| Họ và tên | Nguyễn Linh Thùy Trang |
| Mã số sinh viên | 31241026274 |
| Lớp học phần | 26C1INF50902701 |
| GitHub cá nhân | [ngthytrang](https://github.com/ngthytrang) |
| Repository | [Tuan3_](https://github.com/ngthytrang/Tuan3_) |

## 2. Giới thiệu và mục tiêu

Bài thực hành gồm ba Lab về nền tảng JavaScript, thao tác DOM và xử lý sự kiện, cùng thư viện jQuery. Các bài tập tập trung vào việc xử lý dữ liệu, thay đổi nội dung trang và xây dựng chức năng tương tác trên website.

Mục tiêu thực hiện:

- Vận dụng biến, kiểu dữ liệu, cấu trúc điều khiển, hàm, mảng và đối tượng.
- Truy xuất, tạo, sửa và xóa phần tử HTML thông qua DOM.
- Xử lý sự kiện người dùng và kiểm tra dữ liệu biểu mẫu.
- Sử dụng jQuery để thao tác DOM, tạo hiệu ứng và thực hiện yêu cầu GET.
- Vận dụng vào các chức năng thương mại điện tử như kiểm tra đăng ký, tính tổng đơn hàng và xem trước ảnh sản phẩm.

## 3. Nội dung các bài Lab

| Bài Lab | Nội dung chính | Số Exercise | Truy cập |
| --- | --- | --- | --- |
| Lab 08 — Language Foundations | Script nhúng và bên ngoài, noscript, Console, String, Date, Math, mảng, hàm và đối tượng | 11 | [Lab 08](Lab08/index.html) |
| Lab 09 — DOM and Events | Lựa chọn và thay đổi DOM, quan hệ giữa các node, sự kiện, biểu mẫu và kiểm tra dữ liệu | 8 | [Lab 09](Lab09/index.html) |
| Lab 10 — jQuery | Cài đặt jQuery, selectors, events, chèn phần tử, animation, GET và jqXHR | 10 | [Lab 10](Lab10/index.html) |

Tổng cộng **29 Exercise**, mỗi bài có trang HTML và mã JavaScript tương ứng. Lab 08 có thêm [bài Travel](Lab08/Travel/index.html), sử dụng mảng và hàm để sinh danh sách và nội dung bài viết từ dữ liệu.

## 4. Cấu trúc thư mục

```text
JavaScript-Labs/
├── index.html                  # Trang chủ giới thiệu và điều hướng
├── README.md                   # Giới thiệu bài thực hành
├── profile.json                # Thông tin sinh viên
├── css/
│   └── style.css               # Giao diện chung và responsive
├── js/
│   ├── main.js                 # Hiển thị thông tin trên trang chủ
│   └── jquery-3.1.1.min.js     # Thư viện jQuery
├── assets/
│   ├── flags/                 # Hình ảnh cờ quốc gia
│   └── images/                # Hình ảnh sử dụng trong bài tập
├── data/
│   └── cities.json            # Dữ liệu minh họa cho yêu cầu GET
├── Lab08/
│   ├── index.html
│   ├── Exercise01/ ... Exercise11/
│   └── Travel/
├── Lab09/
│   ├── index.html
│   └── Exercise01/ ... Exercise08/
└── Lab10/
    ├── index.html
    └── Exercise01/ ... Exercise10/
```

Mỗi thư mục Exercise gồm `index.html` và `main.js`. Một số bài có thêm `hello.js`, thư mục `js/` hoặc script nhúng trong HTML theo nội dung thực hành.

## 5. Hướng dẫn truy cập

### Chạy trên máy tính

1. Tải mã nguồn hoặc clone repository.
2. Mở dự án bằng Visual Studio Code.
3. Sử dụng **Live Server** để mở `JavaScript-Labs/index.html`.
4. Từ trang chủ, chọn Lab và Exercise cần xem.

Nên chạy qua HTTP để các chức năng `fetch` và AJAX hoạt động đầy đủ. Khi mở trực tiếp bằng `file://`, trình duyệt có thể chặn yêu cầu đọc dữ liệu.

### GitHub Pages

Đường dẫn dự kiến theo cấu trúc repository:

- [Trang chủ JavaScript Labs](https://ngthytrang.github.io/Tuan3_/JavaScript-Labs/)
- [Lab 08](https://ngthytrang.github.io/Tuan3_/JavaScript-Labs/Lab08/)
- [Lab 09](https://ngthytrang.github.io/Tuan3_/JavaScript-Labs/Lab09/)
- [Lab 10](https://ngthytrang.github.io/Tuan3_/JavaScript-Labs/Lab10/)

Trạng thái truy cập GitHub Pages chưa được xác minh.

## 6. Kiểm tra chức năng

- **Exercise 8.1 và 8.4:** bật/tắt JavaScript rồi tải lại trang để so sánh kết quả và kiểm tra `noscript`.
- **Exercise 8.5:** mở `F12` → Console để xem biến và các thông báo `log`, `warn`, `error` được tạo có chủ đích trong bài học.
- **Lab 09:** thử click, di chuột, focus/blur và gửi biểu mẫu với trường rỗng hoặc đã điền đầy đủ.
- **Lab 10:** thử các phương thức chèn phần tử, hiệu ứng fade/slide, xem trước ảnh và chuỗi animation.
- **Exercise 10.9 và 10.10:** chọn JSON cục bộ để kiểm tra GET thành công; chọn HTTP 404 để kiểm tra xử lý lỗi. Lựa chọn dịch vụ giáo trình phụ thuộc khả năng truy cập và chính sách CORS của dịch vụ.

jQuery được lưu trong mã nguồn để các bài không phụ thuộc CDN khi chạy bình thường. `cities.json` là dữ liệu minh họa dùng để kiểm thử GET cùng nguồn.

## 7. Báo cáo và minh chứng

- Báo cáo: `31241026274_NguyenLinhThuyTrang_JavaScript_Labs.docx`.
- Thư mục `MinhChung/` nằm cùng cấp với `JavaScript-Labs/`, chứa ảnh chụp kết quả và nhật ký kiểm thử.
- Báo cáo trình bày nội dung từng Exercise, kết quả thực hiện, ảnh minh chứng có chú thích và tổng kết kiến thức.

Các bài đã được kiểm thử cục bộ trên Chrome, gồm tương tác DOM, biểu mẫu, hiệu ứng, GET thành công và thất bại. Trang chủ và các trang đại diện được kiểm tra trên kích thước màn hình máy tính và điện thoại. Ảnh minh chứng hiện có được chụp từ môi trường chạy cục bộ.

## 8. Tài liệu tham khảo

- *Fundamentals of Web Development, 2nd Edition* — Randy Connolly và Ricardo Hoar.
- Tài liệu thực hành `Lab08.pdf`, `Lab09.pdf`, `Lab10.pdf`.
- Hướng dẫn bài tập cá nhân `BaiTap_CaNhan_JS.pdf`.

Hình ảnh và thư viện jQuery được lấy từ các bộ mã nguồn khởi đầu đi kèm tài liệu thực hành.
