# AGENTS.md

Website tĩnh, không framework, không build (`netlify.toml` publish = ".").

- Menu và chân trang được tạo trong `js/main.js` (đối tượng `SITE`, mảng `BAI_TAP`). Mỗi trang chỉ có `<header id="site-header">`, `<footer id="site-footer">` và `<body data-page="...">`.
- Placeholder dạng `[CHỮ IN HOA]` được main.js tự tô sáng. Href/src bắt đầu bằng `[` hoặc `file:` sẽ bị khoá hoặc thay bằng khung `.ph-box`. Link Google Docs/Drive/YouTube được tự đổi sang link nhúng.
- Bảng màu có 4 biến trong `:root` của style.css. Font: Fraunces + Be Vietnam Pro.
- Chú thích viết bằng tiếng Việt, dành cho người mới học.
- Không bịa nội dung quá trình làm bài: chỉ dùng thông tin thật sinh viên cung cấp.
- `404.html` dùng `<base href="/">` và đường dẫn tuyệt đối.
- Việc tiếp theo: xem PLAN.md.
