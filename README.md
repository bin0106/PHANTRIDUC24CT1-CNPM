# 🎓 UniLife — Nền Tảng Hỗ Trợ Đời Sống Sinh Viên

[![GitHub Repo](https://img.shields.io/badge/GitHub-PHANTRIDUC24CT1--CNPM-181717?style=for-the-badge&logo=github)](https://github.com/bin0106/PHANTRIDUC24CT1-CNPM)
[![GitDiagram](https://img.shields.io/badge/GitDiagram-So%20Do%20Repo-2ea44f?style=for-the-badge&logo=git)](https://gitdiagram.com/bin0106/PHANTRIDUC24CT1-CNPM)
[![GitIngest](https://img.shields.io/badge/GitIngest-Phan%20Tich%20Code-orange?style=for-the-badge)](https://gitingest.com/bin0106/PHANTRIDUC24CT1-CNPM)

UniLife la ung dung Web tat-ca-trong-mot (All-in-One Platform) danh cho sinh vien, ho tro tim tro, quan an, trao doi mua ban do cu, dia diem vui choi giai tri va tai lieu hoc tap.

---

## 🗺️ Kien Truc Tong Quan (Architecture Overview)

```mermaid
flowchart TD
    subgraph Frontend["⚛️ Frontend — React 18 + Vite (SPA)"]
        A["src/App.jsx — Dieu huong & State toan cuc"]

        subgraph Data["src/data/ — Du lieu & Hang so"]
            D1["theme.js — Bang mau, tab config"]
            D2["initialData.js — Du lieu mau"]
        end

        subgraph Hooks["src/hooks/ — Custom React Hooks"]
            H1["usePersistentState.js — Luu LocalStorage"]
        end

        subgraph Services["src/services/ — Xu ly Nghiep vu (Business Logic)"]
            S1["authService.js — Dang nhap / Dang ky / Kiem tra quyen"]
            S2["postService.js — Duyet / An / Xoa bai dang"]
            S3["userService.js — Quan ly tai khoan nguoi dung"]
        end

        subgraph Components["src/components/ — Thanh phan giao dien tai su dung"]
            C1["common/ — Badge, StarRow, FavButton, FilterChip..."]
            C2["cards/ — PlaceCard, FoodCard, ProductCard, EntCard"]
            C3["modals/ — AuthModal, DetailModal, ChatModal, AddModal..."]
        end

        subgraph Views["src/views/ — Man hinh chinh (Pages)"]
            V1["HomeView.jsx — Trang chu"]
            V2["HousingView.jsx — Phong tro"]
            V3["FoodView.jsx — Quan an"]
            V4["MarketView.jsx — Cho do cu"]
            V5["EntertainmentView.jsx — Giai tri"]
            V6["StudyView.jsx — Hoc tap"]
            V7["FavoritesView.jsx — Yeu thich"]
            V8["ProfileView.jsx — Trang ca nhan"]
            V9["AdminView.jsx — Quan tri (chi Admin)"]
        end
    end

    subgraph Database["🗄️ database/ — Co So Du Lieu MySQL"]
        DB1["unilife_database.sql — DDL + Du lieu mau 9 bang"]
        DB2["CSDL_DESIGN.md — ERD + Tu dien du lieu"]
        DB3["setup_database.bat — Script tu dong import"]
    end

    A --> Services
    A --> Views
    Services --> Data
    Services --> Hooks
    Views --> Components
```

---

## 🔐 Phan Quyen Nguoi Dung (Role-Based Access Control)

```mermaid
flowchart TD
    subgraph Roles["👥 5 Vai Tro He Thong"]
        R0["🛡️ Quan Tri Vien\nadmin@unilife.vn / admin123"]
        R1["👤 Khach Hang\nSinh vien thong thuong"]
        R2["🏠 Chu Nha Tro\nDang tin phong tro"]
        R3["🍜 Chu Quan An\nDang thong tin quan"]
        R4["🛍️ Nguoi Ban Do Cu\nDang tin cho do cu"]
    end

    subgraph Public["🌐 Tinh Nang Cong Khai — Khong Can Dang Nhap"]
        PF1["Xem danh sach Phong Tro"]
        PF2["Xem danh sach Quan An"]
        PF3["Xem danh sach Cho Do Cu"]
        PF4["Xem Giai Tri & Hoc Tap"]
        PF5["Tim kiem & Bo loc nang cao"]
    end

    subgraph UserOnly["✅ Tinh Nang Sau Khi Dang Nhap"]
        UF1["Luu bai vao Muc Yeu Thich"]
        UF2["Nhan tin trao doi voi chu tro"]
        UF3["Xem thong tin lien he truc tiep"]
        UF4["Trang ca nhan & Doi Avatar"]
        UF5["Xem lai nhung bai da thich"]
    end

    subgraph OwnerOnly["🏠 Tinh Nang Chu Tro / Chu Quan / Nguoi Ban"]
        OF1["Dang tin Phong Tro moi"]
        OF2["Dang tin Quan An moi"]
        OF3["Dang ban do cu / rao vat"]
        OF4["Bai cho Admin duyet — status: pending"]
    end

    subgraph AdminOnly["🛡️ Bang Quan Tri — CHI ADMIN"]
        AF1["Xem tat ca tai khoan da dang ky"]
        AF2["Khoa / Mo khoa tai khoan"]
        AF3["Xoa tai khoan nguoi dung"]
        AF4["Duyet bai dang — pending to approved"]
        AF5["An bai vi pham — approved to hidden"]
        AF6["Xoa bai vi pham"]
    end

    R0 --> Public
    R0 --> UserOnly
    R0 --> AdminOnly

    R1 --> Public
    R1 --> UserOnly

    R2 --> Public
    R2 --> UserOnly
    R2 --> OF1
    R2 --> OF4

    R3 --> Public
    R3 --> UserOnly
    R3 --> OF2
    R3 --> OF4

    R4 --> Public
    R4 --> UserOnly
    R4 --> OF3
    R4 --> OF4
```

---

## 🗄️ Co So Du Lieu — So Do ERD (Entity-Relationship Diagram)

> **File SQL:** [`database/unilife_database.sql`](./database/unilife_database.sql)
> **Tai lieu thiet ke:** [`database/CSDL_DESIGN.md`](./database/CSDL_DESIGN.md)
> **Script tu dong:** [`database/setup_database.bat`](./database/setup_database.bat)

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

**9 Bang CSDL:**

| Bang | Mo ta | Quan he |
|------|-------|---------|
| `users` | Nguoi dung & phan quyen (5 vai tro) | Trung tam he thong |
| `housing` | Tin dang phong tro | users -> housing |
| `food_places` | Quan an sinh vien | users -> food_places |
| `marketplace` | San pham cho do cu | users -> marketplace |
| `entertainment` | Dia diem giai tri | Doc lap |
| `study_documents` | Tai lieu hoc tap | users -> study_documents |
| `user_favorites` | Danh sach yeu thich | users -> * |
| `reviews` | Danh gia & binh luan | users -> * |
| `messages` | Nhan tin trao doi | users -> users |

---

## 🏗️ Cau Truc Thu Muc (Project Structure)

```
PHANTRIDUC24CT1-CNPM/
│
├── database/                    # Co So Du Lieu MySQL
│   ├── unilife_database.sql     # DDL + Seed data (9 bang)
│   ├── CSDL_DESIGN.md           # ERD + Tu dien du lieu
│   └── setup_database.bat       # Script 1-click import vao MySQL
│
├── src/                         # Source Code Frontend React
│   ├── data/                    # Du lieu & Hang so thiet ke
│   │   ├── theme.js             # Bang mau, tab config, PRESET_AVATARS
│   │   └── initialData.js       # Du lieu mau (phong tro, quan an, cho cu...)
│   │
│   ├── hooks/                   # Custom React Hooks
│   │   └── usePersistentState.js
│   │
│   ├── services/                # Xu ly nghiep vu (Business Logic)
│   │   ├── authService.js       # Dang nhap, dang ky, kiem tra quyen
│   │   ├── postService.js       # Duyet / An / Xoa bai dang
│   │   └── userService.js       # Quan ly tai khoan nguoi dung
│   │
│   ├── components/              # Thanh phan giao dien tai su dung
│   │   ├── common/              # Badge, StarRow, FavButton, FilterChip...
│   │   ├── cards/               # PlaceCard, FoodCard, ProductCard, EntCard
│   │   └── modals/              # AuthModal, DetailModal, ChatModal, AddModal...
│   │
│   ├── views/                   # Man hinh chinh (Pages)
│   │   ├── HomeView.jsx
│   │   ├── HousingView.jsx
│   │   ├── FoodView.jsx
│   │   ├── MarketView.jsx
│   │   ├── EntertainmentView.jsx
│   │   ├── StudyView.jsx
│   │   ├── FavoritesView.jsx
│   │   ├── ProfileView.jsx      # Trang ca nhan + doi avatar + bai da thich
│   │   └── AdminView.jsx        # Bang quan tri (chi Admin)
│   │
│   └── App.jsx                  # Diem vao chinh — dieu huong & state toan cuc
│
├── dist/                        # Ban build production (san sang deploy)
├── public/
├── package.json
└── README.md
```

---

## 👥 Tai Khoan Trai Nghiem

| Phan quyen | Email | Mat khau | Quyen han |
|---|---|---|---|
| **Quan tri vien (Admin)** | `admin@unilife.vn` | `admin123` | Toan quyen: quan ly nguoi dung, duyet bai, an/xoa bai vi pham |
| **Khach hang** | `khachhang@gmail.com` | `123456` | Tim tro, xem quan an, luu yeu thich, nhan tin, trang ca nhan |

*Co the bam tab "Dang ky" de tao tai khoan moi voi phan loai vai tro.*

---

## 🚀 Huong Dan Chay

### 1. Chay truc tiep (da build san)
Mo file `index.html` qua Live Server hoac GitHub Pages.

### 2. Moi truong phat trien
```bash
npm install
npm run dev
```

### 3. Import Co So Du Lieu MySQL (XAMPP)
```bash
# Chay file bat tu dong
database/setup_database.bat

# Hoac thu cong qua phpMyAdmin
# http://localhost/phpmyadmin -> Import -> unilife_database.sql
```

---

## 🛠️ Cong Nghe Su Dung

| Lop | Cong nghe |
|-----|-----------|
| Frontend | React 18 + Vite |
| UI Icons | Lucide React |
| Luu tru | LocalStorage (usePersistentState hook) |
| Co so du lieu | MySQL / MariaDB (XAMPP) |
| So do | Mermaid.js + GitDiagram |
| Quan ly phien ban | Git + GitHub |

---

© 2026 UniLife — Nen tang tien ich ket noi toan dien doi song sinh vien.
