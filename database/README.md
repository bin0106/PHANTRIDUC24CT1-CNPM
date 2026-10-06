# 🗄️ Co So Du Lieu UniLife — unilife_db

Toan bo he thong co so du lieu quan he cho du an UniLife Platform.

## He Quan Tri CSDL
- **MySQL** / **MariaDB** (chay qua XAMPP)
- **phpMyAdmin**: http://localhost/phpmyadmin

## Cac File Trong Thu Muc Nay

| File | Mo ta |
|------|-------|
| `unilife_database.sql` | Script SQL day du: tao bang + du lieu mau (seed data) cho 9 bang |
| `CSDL_DESIGN.md` | Tai lieu thiet ke: so do ERD Mermaid + tu dien du lieu |
| `setup_database.bat` | Script 1-click tu dong import vao MySQL (Windows XAMPP) |

## 9 Bang Co So Du Lieu

```
unilife_db
├── users              -- Nguoi dung & phan quyen (5 vai tro)
├── housing            -- Tin dang phong tro sinh vien
├── food_places        -- Quan an sinh vien
├── marketplace        -- San pham cho do cu
├── entertainment      -- Dia diem giai tri
├── study_documents    -- Tai lieu hoc tap
├── user_favorites     -- Danh sach yeu thich cua nguoi dung
├── reviews            -- Danh gia & binh luan
└── messages           -- Nhan tin trao doi
```

## Phan Quyen Trong CSDL (role enum trong bang users)

| Vai tro | Quyen tren CSDL |
|---------|-----------------|
| `Quan tri vien` | Toan quyen: doc/ghi/xoa tat ca bang |
| `Khach hang` | Doc: housing, food, marketplace, entertainment, study; Ghi: user_favorites, messages |
| `Chu nha tro` | Tao/sua: housing (status = pending cho den khi Admin duyet) |
| `Chu quan an` | Tao/sua: food_places (status = pending) |
| `Nguoi ban do cu` | Tao/sua: marketplace (status = pending) |

## Cach Chay

```bash
# Option 1: Tu dong (Windows XAMPP)
database/setup_database.bat

# Option 2: Thu cong
mysql -u root -p < unilife_database.sql

# Option 3: phpMyAdmin
# -> Import -> chon file unilife_database.sql
```

## Trang Thai Kiem Duyet (status field)

- `pending`  — Cho Admin xem xet
- `approved` — Da duoc duyet, hien thi cong khai
- `hidden`   — Bi an do vi pham
