# 🎓 UniLife - Nền Tảng Hỗ Trợ Đời Sống Sinh Viên

UniLife là ứng dụng Web tất-cả-trong-một (All-in-One Platform) dành cho sinh viên, hỗ trợ tìm trọ, quán ăn ngon - bổ - rẻ, trao đổi đồ dùng cũ, tụ điểm giải trí và tài liệu học tập.

---

## 🗺️ Sơ Đồ Kiến Trúc & Luồng Hệ Thống (Architecture & System Flow)

Dưới đây là sơ đồ chi tiết hoạt động của hệ thống UniLife hiển thị trực quan trên GitHub:

```mermaid
flowchart TD
    %% Định nghĩa các node chính
    User([ Sinh Viên / Người Dùng ])
    Admin([ Quản Trị Viên / Host ])

    subgraph ClientApp[" Ứng Dụng UniLife (Frontend SPA) "]
        Router[" Hash Router (#/housing, #/food...) "]
        Storage[(" LocalStorage Cache & State ")]
        
        subgraph Modules[" Các Phân Hệ Chức Năng "]
            M1[" Tìm Phòng Trọ & Ở Ghép\n(Bộ lọc: Máy lạnh, giặt, giá, khoảng cách)"]
            M2[" Quán Ăn Sinh Viên\n(Review, phân loại, giờ mở cửa)"]
            M3[" Chợ Đồ Cũ (Marketplace)\n(Sách giáo trình, laptop, xe đạp, đồ gia dụng)"]
            M4[" Vui Chơi & Giải Trí\n(Bida, Net Gaming, Karaoke, Cầu lông)"]
            M5[" Góc Học Tập & Tài Liệu\n(Đề thi, slide, tài liệu ôn tập)"]
            M6[" Quản Trị & Đăng Bài\n(Thêm tin mới, kiểm duyệt, duyệt bài)"]
        end

        subgraph Interactivity[" Tính Năng Tương Tác Trực Tiếp "]
            Fav[" Lưu Tin Yêu Thích "]
            Chat[" Trò Chuyện Trực Tuyến "]
            Call[" Liên Hệ Nhanh (Gọi / Zalo) "]
        end
    end

    %% Luồng kết nối
    User -->|Truy cập web| Router
    Router --> Modules
    
    Modules <-->|Đọc & Lưu trữ tức thì| Storage
    Modules --> Interactivity
    
    Admin -->|Quản lý & Duyệt bài| M6
    M6 -->|Cập nhật danh sách| Storage
```

---

## 🧭 Sơ Đồ Điều Hướng Ứng Dụng (User Navigation Flow)

```mermaid
graph LR
    A[Trang Chủ / Overview] --> B[Phòng Trọ]
    A --> C[Ăn Uống]
    A --> D[Chợ Sinh Viên]
    A --> E[Giải Trí]
    A --> F[Góc Học Tập]
    A --> G[Mục Yêu Thích]
    A --> H[Bảng Quản Trị]

    B --> B1[Xem Chi Tiết & Bộ Lọc Giá]
    C --> C1[Xem Quán & Giờ Mở Cửa]
    D --> D1[Đăng Bán / Mua Đồ Cũ]
    B1 --> J[Nhắn Tin / Gọi Điện Cho Chủ]
    D1 --> J
```

---

## ✨ Tính Năng Nổi Bật

- **Tìm trọ thông minh:** Lọc theo khoảng cách, máy lạnh, máy giặt, wifi, bãi gửi xe, mức giá.
- **Ăn uống & Giải trí:** Tổng hợp các địa điểm quanh trường chuẩn tiêu chí ngon - bổ - rẻ.
- **Chợ đồ cũ:** Đăng tin thanh lý sách vở, giáo trình, đồ điện tử nhanh chóng.
- **Chat & Liên hệ:** Tích hợp modal nhắn tin và thông tin liên hệ trực tiếp cho từng tin đăng.
- **Lưu dữ liệu Offline/Local:** Sử dụng `usePersistentState` lưu trực tiếp trên trình duyệt, không lo mất dữ liệu khi tải lại trang (F5).
- **Hoạt động độc lập (Standalone):** Đã đóng gói sẵn bản build production (`index.html` và `assets/`), có thể chạy ngay với bất kỳ web server nào hoặc GitHub Pages.

---

## 🚀 Hướng Dẫn Chạy Sản Phẩm

### 1. Chạy trực tiếp (Bản độc lập đã build sẵn)
Chỉ cần mở file `index.html` thông qua một máy chủ tĩnh (Live Server trong VS Code, `npx serve`, v.v.).

### 2. Chạy môi trường phát triển (Development)
```bash
# Cài đặt thư viện phụ thuộc
npm install

# Khởi chạy server phát triển
npm run dev
```

### 3. Đóng gói cho Production
```bash
npm run build
```
Bản build tối ưu sẽ được xuất ra thư mục `dist/`.

---

## 🛠️ Công Nghệ Sử Dụng

- **Frontend Core:** [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Icon Library:** [Lucide React](https://lucide.dev/)
- **Kiến trúc:** Single Page Application (SPA), Component-Driven, Client-Side Storage
- **Quản lý phiên bản:** Git & GitHub

---

*Dự án thực hiện bởi Phan Trí Đức - Lớp 24CT1.*
