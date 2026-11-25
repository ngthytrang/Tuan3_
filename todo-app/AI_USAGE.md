2đ. Ứng dụng ToDo: quản lý các task cá nhân\
\+ Kết quả: Code: đưa lên github với readme mô tả chức năng hệ thống\
Chức năng: Hiện thị các task trong ngày hôm nay, có thể search, filter; 2) Thêm sửa xóa; 3) Trang thống kê, có thể đưa những data mock vào.\
\-	GUI giao diện; prompt vibe code: 1.5\
\-	Chương trình không có CSDL: 1\
\-	Database: 1\
\-	Chương trình full: 1\
\
Hãy hoàn thiện mốc GUI cho bài tập ToDo cá nhân trong thư mục todo-app hiện tại. Đọc các file đã có rồi chỉnh tiếp trên bộ khung Node.js thuần.\
\
Thiết kế hai trang tiếng Việt, giao diện tông tím nhạt và dùng được trên laptop, điện thoại:\
1\. Trang Hôm nay có ngày hiện tại, ô tìm theo tên công việc, bộ lọc Tất cả / Chưa xong / Đã hoàn thành, nút Thêm công việc và danh sách task mẫu. Mỗi task có tên, hạn làm, checkbox hoàn thành và nút Sửa, Xóa. Tạo form dùng chung cho Thêm và Sửa.\
2\. Trang Thống kê có ba số liệu mẫu: Tổng số công việc, Đã hoàn thành, Chưa xong. Có biểu đồ 7 ngày với nhãn “Dữ liệu minh họa”.\
3\. Hai trang có menu qua lại. Kiểm tra giao diện bằng npm start.\
\
Ở mốc này chỉ làm giao diện và dữ liệu mẫu để xem bố cục. Phần API CRUD sẽ làm ở mốc chương trình không có CSDL. Lưu nguyên văn prompt này vào AI_USAGE.md, nối tiếp nội dung đã có.

Hãy hoàn thiện bài tập “Ứng dụng ToDo quản lý công việc cá nhân” trong dự án todo-app hiện tại. Em đã dùng prompt trước để tạo giao diện Hôm nay và Thống kê. Hãy đọc các file hiện có, chỉnh tiếp trên giao diện đó và thực hiện trực tiếp trong workspace. Đừng chỉ đưa kế hoạch hoặc đoạn code để em tự chép.\
\
1\. Chương trình không có CSDL — 1 điểm\
\- Dùng module http của Node.js để phục vụ giao diện và viết API.\
\- Làm đầy đủ chức năng xem task hôm nay, tìm theo tên, lọc trạng thái, thêm, sửa, xóa và đánh dấu hoàn thành. Giao diện phải gọi API bằng fetch().\
\- Dùng một mảng trên server để lưu task trong chế độ này. Tải lại trình duyệt khi server vẫn chạy thì task còn. Khởi động lại server thì task mới sẽ mất.\
\- Thêm lệnh npm run start:memory để em có thể demo lại bản này sau khi hoàn thành bài.\
\
2\. Database — 1 điểm\
\- Dùng SQLite cho bản chính. Kiểm tra node -v và chọn cách kết nối SQLite tương thích với Node.js đang dùng trên Windows. Ghi phiên bản Node.js yêu cầu và lệnh cài đặt trong README.\
\- Tự tạo database và bảng tasks khi chạy lần đầu. Mỗi task có ID, tên công việc, ngày đến hạn và trạng thái hoàn thành. Nếu giao diện hiện có trường mức ưu tiên thì lưu luôn trường đó.\
\- Dùng truy vấn có tham số. Thêm, sửa, xóa và đánh dấu hoàn thành đều phải lưu vào SQLite.\
\- npm start chạy bản SQLite. Sau khi khởi động lại server, task đã tạo vẫn còn.\
\- Hai chế độ dùng chung giao diện và API. Khác nhau ở chỗ lưu dữ liệu.\
\
3\. Chương trình full — 1 điểm\
\- Trang Hôm nay hiển thị các task có hạn làm trùng ngày hiện tại theo giờ máy người dùng. Form thêm mặc định chọn hôm nay. Tìm theo tên và lọc trạng thái phải dùng đồng thời được.\
\- Form thêm và sửa kiểm tra tên rỗng và ngày không hợp lệ. Khi xóa, hỏi xác nhận trước. Sau mỗi thao tác, danh sách cập nhật ngay. Hiển thị thông báo dễ hiểu khi không có kết quả hoặc khi API lỗi.\
\- Trang Thống kê hiển thị tổng số công việc, số đã hoàn thành và số chưa xong từ dữ liệu thật của chế độ đang chạy. Có thể giữ biểu đồ 7 ngày dùng dữ liệu mẫu nếu giao diện đã có. Ghi rõ “Dữ liệu minh họa” ngay cạnh biểu đồ.\
\- Giữ bố cục, màu sắc và menu của giao diện đã tạo. Kiểm tra hai trang dùng được trên laptop và điện thoại.\
\
4\. README, prompt vibe code và GitHub\
\- Viết README.md bằng tiếng Việt, có mô tả hệ thống, chức năng, công nghệ, cách cài và chạy từ repo mới, URL hai trang, cách demo riêng bản không CSDL và bản SQLite. Ghi rõ phần nào dùng dữ liệu minh họa.\
\- Nối nguyên văn prompt này vào AI_USAGE.md, giữ các prompt đã lưu trước đó.\
\- Đưa node_modules/ và các file SQLite phát sinh vào .gitignore. Nếu dự án dùng thư viện npm, giữ package-lock.json trong mã nguồn.\
\- Kiểm tra git status và remote. Nếu đã có đúng repo GitHub dành cho bài ToDo và em đã cho phép push, hãy commit phần bài này rồi push. Nếu chưa có repo đích hoặc chưa có quyền push, hoàn thiện toàn bộ code, README và ghi chính xác lệnh Git em cần chạy. Không commit các file bài tập khác.\
\
5\. Kiểm tra trước khi báo xong\
\- Chạy cả hai chế độ và kiểm tra luồng thêm → tìm → lọc → sửa → hoàn thành → xem thống kê → xóa.\
\- Thử tạo một task hạn ngày mai và kiểm tra nó không xuất hiện ở trang Hôm nay.\
\- Khởi động lại từng chế độ để xác nhận bản SQLite giữ dữ liệu và bản trong bộ nhớ mất task vừa thêm.\
\- Kiểm tra hai trang qua Node.js, dùng npm start hoặc npm run start:memory. Nếu cổng 8080 đang bận, dùng cổng khác để kiểm tra và ghi rõ URL.\
\- Báo ngắn gọn phần nào đã hoàn thành, phần nào đã chạy kiểm tra, lệnh em cần dùng để demo và trạng thái GitHub.

Hãy nâng cấp ứng dụng ToDo cá nhân trong thư mục todo-app hiện tại. Đọc code và chạy thử trước, sau đó triển khai trực tiếp trên dự án. Tiếp tục dùng Node.js thuần với module http, HTML/CSS/JavaScript và SQLite. Giữ cả npm start cho bản SQLite và npm run start:memory cho bản không CSDL. Hai bản phải dùng chung giao diện và có cùng chức năng.\
\
1\. Nâng cấp màn hình quản lý công việc\
\- Mặc định mở mục “Hôm nay”. Thêm các mục “Quá hạn”, “Sắp tới” và “Tất cả”. Hôm nay là task có hạn đúng ngày hiện tại theo giờ máy người dùng. Quá hạn là task chưa xong có hạn trước hôm nay. Sắp tới là task có hạn sau hôm nay. Tất cả hiển thị mọi task.\
\- Khi sửa hạn sang ngày mai, task sẽ xuất hiện ở Sắp tới. Khi đánh dấu hoàn thành một task quá hạn, task rời mục Quá hạn và vẫn xem được ở Tất cả.\
\- Thêm danh mục Học tập / Cá nhân / Công việc / Khác, mức ưu tiên Cao / Vừa / Thấp và ghi chú tùy chọn tối đa 500 ký tự. Dùng form Thêm/Sửa hiện có và cập nhật cả API.\
\- Giữ tìm kiếm theo tên. Cho phép dùng tìm kiếm cùng bộ lọc trạng thái, danh mục và ưu tiên trong mục đang mở. Thêm sắp xếp theo hạn gần nhất hoặc ưu tiên cao nhất. Có nút xóa bộ lọc khi đang lọc.\
\- Ở mục Hôm nay, đặt thanh tiến độ “X/Y việc đã xong” phía trên danh sách. Tính trên toàn bộ task đến hạn hôm nay để số liệu không đổi khi tìm kiếm hoặc lọc.\
\
2\. Nâng cấp trang Thống kê\
\- Hiển thị tổng số task, số hoàn thành, số chưa xong và số quá hạn.\
\- Thay biểu đồ mẫu bằng biểu đồ 7 ngày gần nhất tính đến hôm nay, nhóm theo ngày đến hạn. Mỗi ngày thể hiện số task đã hoàn thành và chưa hoàn thành theo trạng thái hiện tại. Ghi rõ “Công việc theo ngày đến hạn” để người xem hiểu cách tính.\
\- Dùng dữ liệu từ API ở cả hai chế độ. Có trạng thái trống khi chưa có dữ liệu.\
\
3\. Làm giao diện rõ ràng hơn\
\- Giữ phong cách tím nhạt của bản hiện tại. Trên desktop, đặt điều hướng bên trái và danh sách task ở vùng chính. Trên điện thoại, dùng thanh điều hướng gọn và cho các bộ lọc xuống dòng.\
\- Mỗi task cần nhìn rõ tên, hạn làm, danh mục và ưu tiên. Hiển thị nhãn “Quá hạn” với màu dễ đọc. Thêm phản hồi ngắn sau khi lưu hoặc xóa. Giữ xác nhận trước khi xóa.\
\- Ưu tiên để ô tìm kiếm, bộ lọc và nút “Thêm công việc” dễ thấy. Dùng màu và khoảng cách để phân cấp thông tin, tránh thêm chữ trang trí hoặc nhiều loại nhãn trùng nhau.\
\
4\. Bảo toàn dữ liệu cũ và kiểm tra\
\- Kiểm tra schema SQLite hiện có và chỉ thêm các cột còn thiếu. Việc cập nhật schema phải chạy an toàn khi khởi động lại nhiều lần. Giữ nguyên task cũ và giá trị đã có. Với trường mới chưa có giá trị, dùng mặc định Khác, Vừa và ghi chú trống.\
\- Kiểm tra trên cả bản SQLite và bản không CSDL. Tạo task hạn hôm qua, hôm nay và ngày mai, rồi thử đổi hạn, đánh dấu hoàn thành, tìm kiếm kết hợp lọc và kiểm tra thống kê.\
\- Kiểm tra bản SQLite giữ dữ liệu sau khi khởi động lại. Dùng dữ liệu kiểm thử riêng hoặc dọn đúng các task tự tạo khi kiểm tra.\
\- Cập nhật README.md với chức năng mới, cách chạy hai chế độ và cách tính biểu đồ. Nối nguyên văn prompt này vào AI_USAGE.md. Cuối cùng báo ngắn gọn những gì đã làm và những thao tác đã kiểm tra.
