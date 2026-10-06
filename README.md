# 🎓 UniLife - Nền Tảng Hỗ Trợ Đời Sống Sinh Viên

[![GitDiagram](https://img.shields.io/badge/GitDiagram-Xem%20S%C6%A1%20%C4%90%E1%BB%93%20Repo-2ea44f?style=for-the-badge&logo=git)](https://gitdiagram.com/bin0106/PHANTRIDUC24CT1-CNPM)
[![GitHub Repo](https://img.shields.io/badge/GitHub-PHANTRIDUC24CT1--CNPM-181717?style=for-the-badge&logo=github)](https://github.com/bin0106/PHANTRIDUC24CT1-CNPM)

UniLife là ứng dụng Web tất-cả-trong-một (All-in-One Platform) dành cho sinh viên, hỗ trợ tìm trọ, quán ăn, trao đổi mua bán đồ cũ, địa điểm vui chơi giải trí và tài liệu học tập.

> 📊 **Xem sơ đồ cấu trúc GitDiagram:** Nhấp vào đường link [https://gitdiagram.com/bin0106/PHANTRIDUC24CT1-CNPM](https://gitdiagram.com/bin0106/PHANTRIDUC24CT1-CNPM) để xem trực quan toàn bộ sơ đồ thư mục và cây cấu trúc code của dự án.

---

## 🗺️ Sơ Đồ Kiến Trúc & Luồng Hệ Thống (Architecture Flow)

```mermaid
flowchart TD
    %% Định nghĩa các tác nhân
    ClientUser([ 👤 Khách Hàng / Sinh Viên ])
    AdminUser([ 🛡️ Quản Trị Viên / Admin ])

    subgraph AuthSystem[" 🔐 Hệ Thống Xác Thực & Phân Quyền (Auth) "]
        Login[" Đăng Nhập (Email / Mật khẩu) "]
        Register[" Đăng Ký Tài Khoản Mới "]
        RoleCheck{" Kiểm Tra Vai Trò (Role) "}
        
        RoleCustomer[" Vai Trò: Khách Hàng\n(Không có quyền truy cập Admin) "]
        RoleAdmin[" Vai Trò: Quản Trị Viên\n(Toàn quyền truy cập Dashboard) "]
    end

    subgraph ClientApp[" Ứng Dụng UniLife (React SPA) "]
        Router[" Hash Router (#/home, #/housing, #/food, #/market...) "]
        Storage[(" LocalStorage Persistent State ")]
        
        subgraph Modules[" Phân Hệ Dịch Vụ "]
            M1[" 🏠 Phòng Trọ & Ở Ghép\n(Bộ lọc: Máy lạnh, máy giặt, wifi, bãi xe, khoảng giá) "]
            M2[" 🍜 Quán Ăn Sinh Viên\n(Hình ảnh thực tế, menu, phân loại, giờ mở cửa) "]
            M3[" 📦 Chợ Đồ Cũ (Marketplace)\n(Sách, giáo trình, laptop, đồ gia dụng) "]
            M4[" 🎮 Giải Trí & Thể Thao\n(Bida, Net Gaming, Karaoke, Cầu lông) "]
            M5[" 📚 Góc Học Tập & Tài Liệu\n(Đề thi mẫu, slide bài giảng, ghép nhóm học) "]
        end

        subgraph AdminModule[" 🛡️ Bảng Điều Khiển Quản Trị (Admin Dashboard) "]
            AD1[" Quản lý người dùng & Phân quyền "]
            AD2[" Duyệt bài đăng phòng trọ / chợ cũ "]
            AD3[" Báo cáo thống kê & Vi phạm "]
        end

        subgraph Interactivity[" Tương Tác Trực Tiếp "]
            Fav[" ❤️ Lưu Tin Yêu Thích "]
            Chat[" 💬 Nhắn Tin Trao Đổi "]
            Call[" 📞 Gọi Điện / Zalo Trực Tiếp "]
        end
    end

    %% Luồng đăng nhập & phân quyền
    ClientUser --> Login & Register
    AdminUser --> Login
    Login & Register --> RoleCheck
    RoleCheck -->|Khách hàng| RoleCustomer
    RoleCheck -->|Quản trị viên| RoleAdmin

    %% Quyền truy cập
    RoleCustomer --> Router
    Router --> Modules
    Modules <--> Storage
    Modules --> Interactivity

    RoleAdmin --> Router
    RoleAdmin --> AdminModule
    AdminModule <--> Storage
```

---

## 🧭 Sơ Đồ Điều Hướng Ứng Dụng (Navigation Flow)

```mermaid
graph LR
    Home[Trang Chủ UniLife] --> Housing[Phòng Trọ]
    Home --> Food[Ăn Uống]
    Home --> Market[Chợ Sinh Viên]
    Home --> Ent[Giải Trí]
    Home --> Study[Góc Học Tập]
    Home --> Fav[Mục Yêu Thích]
    Home --> Auth[Đăng Nhập / Đăng Ký]
    
    Auth -->|Admin| Dashboard[Bảng Quản Trị Admin]
    Auth -->|Khách hàng| Profile[Tài Khoản Khách Hàng]

    Housing --> DetailHousing[Xem Chi Tiết & Gọi Điện / Nhắn Tin]
```

---

## 🗄️ Cơ Sở Dữ Liệu & Sơ Đồ Quan Hệ (Database Schema & ERD)

Toàn bộ hệ thống cơ sở dữ liệu quan hệ được thiết kế chuẩn hóa và lưu trữ tại thư mục [`database/`](./database/):
- **Script SQL khởi tạo & Dữ liệu mẫu:** [`database/unilife_database.sql`](./database/unilife_database.sql)
- **Tài liệu chi tiết từ điển dữ liệu:** [`database/CSDL_DESIGN.md`](./database/CSDL_DESIGN.md)

### Sơ Đồ ERD Thực Thể Quan Hệ (Entity-Relationship Diagram):
```mermaid
erDiagram
    USERS ||--o{ HOUSING : "dang_bai"
    USERS ||--o{ FOOD_PLACES : "so_huu"
    USERS ||--o{ MARKETPLACE : "thanh_ly"
    USERS ||--o{ STUDY_DOCUMENTS : "chia_se"
    USERS ||--o{ USER_FAVORITES : "luu_tin"
    USERS ||--o{ REVIEWS : "danh_gia"
    USERS ||--o{ MESSAGES : "gui_tin"

    USERS {
        bigint id PK
        varchar name
        varchar email UK
        varchar password_hash
        varchar phone
        enum role
        enum status
        text avatar_url
        datetime created_at
    }

    HOUSING {
        bigint id PK
        bigint user_id FK
        varchar name
        varchar price
        decimal price_num
        varchar area
        varchar address
        varchar dist
        varchar phone
        tinyint ac
        tinyint washer
        tinyint wifi
        tinyint parking
        text image_url
        enum status
        datetime created_at
    }

    FOOD_PLACES {
        bigint id PK
        bigint user_id FK
        varchar name
        varchar cat
        varchar price
        varchar address
        varchar hours
        decimal rating
        varchar phone
        text image_url
        enum status
        datetime created_at
    }

    MARKETPLACE {
        bigint id PK
        bigint user_id FK
        varchar name
        varchar price
        varchar cond
        varchar cat
        varchar seller
        varchar phone
        varchar loc
        text image_url
        enum status
        datetime created_at
    }

    ENTERTAINMENT {
        bigint id PK
        varchar name
        varchar cat
        varchar price
        varchar address
        varchar hours
        decimal rating
        text image_url
        enum status
        datetime created_at
    }

    STUDY_DOCUMENTS {
        bigint id PK
        bigint user_id FK
        varchar title
        varchar author
        int downloads
        decimal rating
        varchar doc_type
        text file_url
        text description
        datetime created_at
    }

    USER_FAVORITES {
        bigint id PK
        bigint user_id FK
        enum item_type
        bigint item_id
        datetime created_at
    }

    REVIEWS {
        bigint id PK
        bigint user_id FK
        enum target_type
        bigint target_id
        tinyint rating
        text comment
        datetime created_at
    }

    MESSAGES {
        bigint id PK
        bigint sender_id FK
        bigint receiver_id FK
        text message
        tinyint is_read
        datetime created_at
    }
```

---

## 👥 Tài Khoản Trải Nghiệm Hệ Thống

Hệ thống hỗ trợ đăng nhập nhanh với 2 phân quyền:

| Phân quyền | Email đăng nhập | Mật khẩu | Quyền hạn |
| :--- | :--- | :--- | :--- |
| **Khách hàng (User)** | `khachhang@gmail.com` | `123456` | Tìm trọ, xem quán ăn, đăng tin chợ cũ, nhắn tin trao đổi, lưu yêu thích (không vào được Admin). |
| **Quản trị viên (Admin)** | `admin@unilife.vn` | `admin123` | Toàn quyền quản trị hệ thống, quản lý người dùng, duyệt tin đăng, xem thống kê. |

*Bạn cũng có thể bấm vào tab **Đăng ký** để tạo tài khoản Khách hàng mới bất kỳ lúc nào.*

---

## ✨ Tính Năng Nổi Bật

- **Phân quyền người dùng & Khách hàng:** Đăng nhập, đăng ký tài khoản khách hàng, bảo vệ khu vực quản trị nghiêm ngặt.
- **Hình ảnh thực tế sinh động:** Tích hợp bộ sưu tập hình ảnh phòng trọ, quán ăn, sản phẩm chợ đồ cũ và tụ điểm giải trí.
- **Tìm trọ thông minh:** Lọc theo mức giá, máy lạnh, máy giặt, wifi, bãi xe, vị trí.
- **Ăn uống & Giải trí:** Tổng hợp các địa điểm chuẩn tiêu chí ngon - bổ - rẻ kèm giờ mở cửa và đánh giá sao.
- **Chợ đồ cũ:** Đăng tin thanh lý sách vở, giáo trình, đồ điện tử nhanh chóng.
- **Tương tác trực tiếp:** Tích hợp hộp thoại nhắn tin trao đổi và liên hệ trực tiếp cho từng bài đăng.
- **Lưu dữ liệu Offline/Local:** Sử dụng `usePersistentState` lưu trữ trực tiếp trên trình duyệt, không mất dữ liệu khi tải lại trang (F5).
- **Hoạt động độc lập (Standalone):** Đã đóng gói sẵn bản build production (`index.html` và `assets/`), có thể chạy ngay với bất kỳ web server nào hoặc GitHub Pages.

---

## 🚀 Hướng Dẫn Chạy Sản Phẩm

### 1. Chạy trực tiếp (Bản độc lập đã build sẵn)
Chỉ cần mở file `index.html` trong trình duyệt hoặc thông qua Live Server / GitHub Pages.

### 2. Môi trường phát triển (Development)
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
- **Sơ đồ kiến trúc:** [Mermaid.js](https://mermaid.js.org/) & [GitDiagram](https://gitdiagram.com/)
- **Quản lý phiên bản:** Git & GitHub

---

© 2026 UniLife — Nền tảng tiện ích kết nối toàn diện đời sống sinh viên.
