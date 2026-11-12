# Kim Ngân Makeup — Showcase Site · Design

Ngày: 12/11/2026 · Trạng thái: giao diện đã duyệt (spike v6), bắt đầu dựng

## 1. Mục đích

Trang showcase cho makeup artist Kim Ngân. Khách (từ Facebook/IG/TikTok/Threads, chủ yếu trên điện thoại) xem các gương mặt thật Ngân đã trang điểm → thấy tay nghề → nhắn đặt lịch qua **Facebook** hoặc **Instagram DM**. Ba ngôn ngữ: **Việt / Hàn / Nga**.

Khác Ngô Trâm: ảnh là ảnh makeup thường (không concept chủ đề), chụp bằng điện thoại, đa số qua filter làm mịn — độ nét thật chỉ 45–70% số pixel.

## 2. Đã quyết (người dùng duyệt qua 6 bản spike, `spike/`)

| Hạng mục | Quyết định |
|---|---|
| Phong cách | Tối + vàng kim (champagne), sang, tiết chế. Nền `#0D0A09`, chữ `#EDE3D6`, vàng gradient `#9C7643 → #E8CFA0 → #B8925A` |
| Trải nghiệm | "Hành trình" 5 chương nối liền, mọi chuyển động là hàm liên tục của vị trí cuộn (không nhảy nấc — bản v1 bị chê "khựng") |
| Hiệu ứng | Bụi vàng nhiều lớp (bokeh, bụi, sao nhấp nháy, vảy xoay), bùng hạt ở logo/khi mở look, vệt kim tuyến theo chuột (desktop), khung ảnh lơ lửng, tiêu đề bay vào từng chữ |
| Ảnh | **Không vỡ hình là tiên quyết.** Hiện nhỏ, trong khung viền vàng. Quy tắc đo: `bề rộng hiện (CSS px) × DPR ≤ độ nét thật` của file. Không phóng/cắt mặt khách, không đè chữ lên mặt, chỉ dùng góc đẹp |
| Ảnh #19 | Bỏ (watermark makeup artist khác) |
| Đặt lịch | Facebook (chính) + Instagram DM. TikTok, Threads ở chân trang |
| Khu vực | Nội thành Nha Trang (như Ngô Trâm) |
| Ngôn ngữ | vi / ko / ru, route `/vi` `/ko` `/ru`, `/` chuyển theo Accept-Language |
| Công nghệ | Next.js 16 (như Ngô Trâm), Lenis, canvas tự viết; không GSAP |

## 3. Cấu trúc

**Trang chủ `/[locale]`** — 5 chương, thanh bản đồ hành trình I–V bên trái (desktop):
1. **Mở đầu** — monogram KN vàng, "Kim Ngân" chữ vàng, 3 khung ảnh; cuộn = máy quay tiến xuyên logo, rồi hiện câu "Mỗi gương mặt là một hành trình riêng". Đoạn ghim ~0,9 màn hình.
2. **Bộ sưu tập** — 10 look; cuộn dọc → dạo ngang qua dãy khung tranh (ghim, dịch ngang liên tục). Khung giữa rõ nhất; rê chuột đổi góc; bấm → hộp chi tiết 4 góc + ô màu + nút đặt lịch.
3. **Khoảnh khắc** — 6 ảnh lẻ so le dọc sợi chỉ vàng vẽ dần theo cuộn.
4. **Người cầm cọ** — ảnh Ngân làm việc (#16), giới thiệu, dịch vụ đánh số.
5. **Hẹn gặp** — CTA Facebook / Instagram + TikTok / Threads.

**Trang look `/[locale]/looks/[slug]`** — bản không cần JS và có URL chia sẻ của hộp chi tiết: 4 góc trong khung vàng, ô màu, mô tả, đặt lịch, look trước/sau. Trên trang chủ có JS, khung tranh mở hộp chi tiết thay vì chuyển trang.

**Không JS**: mọi chữ và ảnh vẫn hiện; phòng tranh thành dải cuộn ngang; không ghim.
**Giảm chuyển động**: không hạt, không ghim/parallax, hiện ngay.

## 4. Ảnh & ngân sách độ nét

Đo bằng mắt ở 100% (`scripts` ghi lại): ô 2×2 của bộ 1, 2, 4, 5, 6, 7, 10 mềm (~430 px nét / file 954 px); bộ 3, 8, 9 nét hơn (~670 px). Ảnh lẻ: #0 ~380, #16 ~450, #14 ~405, còn lại ~630.

Mỗi `<img>` mang `data-eff`; test e2e kiểm `offsetWidth × DPR ≤ eff` ở desktop DPR 2 và iPhone DPR 3. Kích thước đạt chuẩn trên spike: khung phòng tranh 212/142 px (desktop/mobile), hộp chi tiết 138/118, khoảnh khắc 178/128, giới thiệu 178/128, mở đầu ≤128/78.

Rosy Bloom chỉ dùng 2 góc tầm trung (2 góc selfie góc rộng làm méo mặt bị bỏ).

## 5. Ràng buộc

- Không dữ liệu cá nhân khách; tên look là tên mô tả phong cách.
- Bản ko/ru là **nháp**, cần người bản ngữ duyệt trước khi công khai.
- Hỏi trước khi deploy.
- Next.js 16.4.6 — đọc `node_modules/next/dist/docs/` khi dùng API lạ (AGENTS.md).

## 6. Việc mở (không chặn build)

Đoạn giới thiệu về Ngân · danh sách dịch vụ thật · tên miền · người duyệt tiếng Hàn/Nga · kiểm trên iPhone thật trong webview FB/IG.
