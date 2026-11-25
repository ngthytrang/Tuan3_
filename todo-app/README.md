# ToDo cá nhân

Ứng dụng quản lý công việc cá nhân bằng tiếng Việt, dùng được trên laptop và điện thoại. Hai chế độ lưu trữ dùng chung giao diện và API.

## Chức năng

- **Hôm nay** là mục mở mặc định, hiển thị các việc đến hạn theo ngày của thiết bị. Thanh tiến độ đếm toàn bộ việc hôm nay, kể cả những việc đang bị ẩn bởi bộ lọc.
- **Quá hạn** hiển thị việc chưa xong có hạn trước hôm nay. **Sắp tới** hiển thị việc có hạn sau hôm nay. **Tất cả** hiển thị mọi công việc.
- Tìm theo tên có dấu hoặc không dấu, kết hợp lọc trạng thái, danh mục và ưu tiên trong từng mục. Có thể xóa bộ lọc hoặc sắp xếp theo hạn gần nhất và ưu tiên cao nhất.
- Thêm, sửa, xóa có xác nhận và đánh dấu hoàn thành. Form thêm mặc định chọn hôm nay. Mỗi công việc có một danh mục, một mức ưu tiên, giờ đến hạn tùy chọn và ghi chú tối đa 500 ký tự.
- **Thống kê** hiển thị tổng số, số đã hoàn thành, số chưa xong, số quá hạn và tỷ lệ hoàn thành trên toàn bộ dữ liệu. Biểu đồ dùng dữ liệu thật từ 6 ngày trước tới hết hôm nay theo lịch của thiết bị. Mỗi cặp cột nhóm công việc theo **ngày đến hạn**, tách theo trạng thái hiện tại.

## Cài và chạy

Cần Node.js từ **22.13.0** và npm đi kèm. Khi cài mới trên Windows, dùng bản LTS từ [trang tải Node.js](https://nodejs.org/en/download). Máy chủ dùng `node:http` và [`node:sqlite` tích hợp](https://nodejs.org/download/release/latest-jod/docs/api/sqlite.html). Giao diện dùng HTML, CSS và JavaScript với `fetch()`. Dự án chạy trực tiếp, không cần cài thư viện npm hay cài SQLite riêng.

Nếu Windows có WinGet, có thể cài Node.js LTS bằng lệnh sau rồi mở lại terminal.

```powershell
winget install --id OpenJS.NodeJS.LTS --exact
```

```powershell
git clone https://github.com/TAI_KHOAN/TEN_REPO.git todo-app
cd todo-app
node -v
npm start
```

Thay `TAI_KHOAN/TEN_REPO` bằng tên kho thực tế. Nếu đã có mã nguồn trên máy, mở terminal tại thư mục chứa `package.json` rồi chạy từ bước `node -v`.

| Trang | URL mặc định |
| --- | --- |
| Hôm nay | http://127.0.0.1:8080/ |
| Thống kê | http://127.0.0.1:8080/thong-ke |

### Demo SQLite

Chạy `npm start`. Lần đầu, ứng dụng tự tạo tệp `tasks.sqlite` và bảng `tasks`. Khi mở tệp từ bản cũ, ứng dụng bổ sung các cột còn thiếu và giữ dữ liệu đã lưu. Các trường mới mặc định là **Khác**, **Vừa** và ghi chú trống. Tạo một công việc, dừng bằng Ctrl+C rồi chạy lại `npm start` để kiểm tra dữ liệu lưu lại. Có thể đặt `TODO_DB_PATH` thành đường dẫn tệp SQLite khác để chạy với dữ liệu riêng.

### Demo bản không CSDL

Dừng chế độ SQLite nếu đang dùng cùng cổng, rồi chạy `npm run start:memory`. Tạo một công việc và tải lại trang để thấy dữ liệu vẫn còn khi máy chủ đang chạy. Dừng và chạy lại lệnh trên để thấy danh sách trống. Chế độ này dùng mảng trên máy chủ.

Nếu cổng 8080 đang bận, có thể chạy ở cổng khác trong PowerShell và thay cổng trong hai URL trên.

```powershell
$env:PORT = '8081'
npm start
```

Nếu PowerShell chặn `npm.ps1`, dùng `npm.cmd start` hoặc `npm.cmd run start:memory`.

## API chung

| Phương thức | Đường dẫn | Tác vụ |
| --- | --- | --- |
| GET | `/api/tasks` | Lấy toàn bộ công việc hoặc lọc theo ngày đến hạn qua `?date=YYYY-MM-DD` |
| POST | `/api/tasks` | Tạo công việc từ `name`, `dueDate` và các trường tùy chọn `time`, `category`, `priority`, `notes` |
| PUT | `/api/tasks/:id` | Sửa thông tin công việc |
| PATCH | `/api/tasks/:id` | Cập nhật trạng thái qua `done` |
| DELETE | `/api/tasks/:id` | Xóa công việc |
| GET | `/api/stats?today=YYYY-MM-DD` | Lấy tổng, đã hoàn thành, chưa xong, quá hạn và số liệu biểu đồ theo ngày hiện tại của thiết bị |
