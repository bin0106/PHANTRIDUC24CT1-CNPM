-- ==============================================================================
-- DỰ ÁN: HỆ THỐNG NỀN TẢNG TIỆN ÍCH SINH VIÊN UNILIFE (UNILIFE PLATFORM)
-- BẢN QUYỀN THIẾT KẾ CƠ SỞ DỮ LIỆU QUAN HỆ (RELATIONAL DATABASE SCHEMA)
-- HỆ QUẢN TRỊ CSDL: MySQL / MariaDB / PostgreSQL Compatible
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS `unilife_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `unilife_db`;

-- ------------------------------------------------------------------------------
-- 1. BẢNG NGƯỜI DÙNG & PHÂN QUYỀN (USERS & ROLES)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(150) NOT NULL COMMENT 'Họ và tên người dùng',
    `email` VARCHAR(191) NOT NULL UNIQUE COMMENT 'Email đăng nhập hệ thống',
    `password_hash` VARCHAR(255) NOT NULL COMMENT 'Mật khẩu đã mã hóa',
    `phone` VARCHAR(20) DEFAULT NULL COMMENT 'Số điện thoại liên hệ',
    `role` ENUM('Quản trị viên', 'Khách hàng', 'Chủ nhà trọ', 'Chủ quán ăn', 'Người bán đồ cũ') NOT NULL DEFAULT 'Khách hàng' COMMENT 'Phân loại vai trò người dùng',
    `status` ENUM('Active', 'Banned', 'Pending') NOT NULL DEFAULT 'Active' COMMENT 'Trạng thái hoạt động tài khoản',
    `avatar_url` TEXT DEFAULT NULL COMMENT 'Đường dẫn ảnh đại diện',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 2. BẢNG PHÒNG TRỌ SINH VIÊN (HOUSING)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `housing`;
CREATE TABLE `housing` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT UNSIGNED DEFAULT NULL COMMENT 'ID chủ trọ đăng bài',
    `name` VARCHAR(255) NOT NULL COMMENT 'Tiêu đề phòng trọ',
    `price` VARCHAR(50) NOT NULL COMMENT 'Chuỗi giá hiển thị (VD: 2.2 tr/tháng)',
    `price_num` DECIMAL(10, 2) NOT NULL COMMENT 'Giá số phục vụ lọc và sắp xếp (triệu đồng)',
    `area` VARCHAR(50) DEFAULT '20m²' COMMENT 'Diện tích phòng',
    `address` VARCHAR(255) NOT NULL COMMENT 'Địa chỉ chi tiết',
    `dist` VARCHAR(50) DEFAULT '1.2 km' COMMENT 'Khoảng cách đến trường',
    `phone` VARCHAR(20) DEFAULT '0905.123.456' COMMENT 'Số điện thoại liên hệ',
    `ac` TINYINT(1) NOT NULL DEFAULT 1 COMMENT 'Có điều hòa / máy lạnh (1: Có, 0: Không)',
    `washer` TINYINT(1) NOT NULL DEFAULT 1 COMMENT 'Có máy giặt (1: Có, 0: Không)',
    `wifi` TINYINT(1) NOT NULL DEFAULT 1 COMMENT 'Có wifi internet',
    `parking` TINYINT(1) NOT NULL DEFAULT 1 COMMENT 'Có chỗ để xe an ninh',
    `image_url` TEXT DEFAULT NULL COMMENT 'Link ảnh phòng trọ',
    `status` ENUM('approved', 'hidden', 'pending') NOT NULL DEFAULT 'approved' COMMENT 'Trạng thái kiểm duyệt bài của Admin',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_housing_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 3. BẢNG QUÁN ĂN SINH VIÊN (FOOD PLACES)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `food_places`;
CREATE TABLE `food_places` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT UNSIGNED DEFAULT NULL COMMENT 'ID chủ quán đăng tin',
    `name` VARCHAR(255) NOT NULL COMMENT 'Tên quán ăn / nước uống',
    `cat` VARCHAR(50) NOT NULL COMMENT 'Phân loại (Cơm, Bún, Trà sữa, Ăn vặt)',
    `price` VARCHAR(100) NOT NULL COMMENT 'Khoảng giá (VD: 25k - 40k)',
    `address` VARCHAR(255) NOT NULL COMMENT 'Địa chỉ quán',
    `hours` VARCHAR(100) DEFAULT '06:30 - 21:00' COMMENT 'Giờ mở cửa',
    `rating` DECIMAL(3, 2) DEFAULT 4.80 COMMENT 'Điểm đánh giá trung bình',
    `phone` VARCHAR(20) DEFAULT '0905.888.777' COMMENT 'Số hotline giao hàng',
    `image_url` TEXT DEFAULT NULL COMMENT 'Link ảnh món ăn/quán',
    `status` ENUM('approved', 'hidden', 'pending') NOT NULL DEFAULT 'approved' COMMENT 'Trạng thái kiểm duyệt của Admin',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_food_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 4. BẢNG CHỢ ĐỒ CŨ SINH VIÊN (MARKETPLACE)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `marketplace`;
CREATE TABLE `marketplace` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT UNSIGNED DEFAULT NULL COMMENT 'ID người bán',
    `name` VARCHAR(255) NOT NULL COMMENT 'Tên sản phẩm cần pass / thanh lý',
    `price` VARCHAR(100) NOT NULL COMMENT 'Giá bán (VD: 60.000đ)',
    `cond` VARCHAR(100) DEFAULT 'Đã dùng - tốt' COMMENT 'Tình trạng sản phẩm',
    `cat` VARCHAR(50) NOT NULL COMMENT 'Danh mục (Sách, Đồ điện tử, Gia dụng, Xe)',
    `seller` VARCHAR(150) NOT NULL COMMENT 'Tên người bán',
    `phone` VARCHAR(20) NOT NULL COMMENT 'Số điện thoại / Zalo người bán',
    `loc` VARCHAR(255) DEFAULT 'Ký túc xá' COMMENT 'Địa điểm giao dịch',
    `image_url` TEXT DEFAULT NULL COMMENT 'Link ảnh sản phẩm',
    `status` ENUM('approved', 'hidden', 'pending') NOT NULL DEFAULT 'approved' COMMENT 'Trạng thái kiểm duyệt của Admin',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_market_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 5. BẢNG TỤ ĐIỂM VUI CHƠI GIẢI TRÍ (ENTERTAINMENT)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `entertainment`;
CREATE TABLE `entertainment` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL COMMENT 'Tên tụ điểm giải trí',
    `cat` VARCHAR(50) NOT NULL COMMENT 'Thể loại (Billiards, Net Gaming, Karaoke, Thể thao)',
    `price` VARCHAR(100) NOT NULL COMMENT 'Bảng giá dịch vụ',
    `address` VARCHAR(255) NOT NULL COMMENT 'Địa chỉ',
    `hours` VARCHAR(100) DEFAULT '24/7' COMMENT 'Thời gian hoạt động',
    `rating` DECIMAL(3, 2) DEFAULT 4.90,
    `image_url` TEXT DEFAULT NULL,
    `status` ENUM('approved', 'hidden') NOT NULL DEFAULT 'approved',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 6. BẢNG GÓC HỌC TẬP & TÀI LIỆU ÔN THI (STUDY DOCUMENTS)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `study_documents`;
CREATE TABLE `study_documents` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT UNSIGNED DEFAULT NULL,
    `title` VARCHAR(255) NOT NULL COMMENT 'Tiêu đề tài liệu / đề thi',
    `author` VARCHAR(150) NOT NULL COMMENT 'Tác giả / Nhóm chia sẻ',
    `downloads` INT UNSIGNED DEFAULT 1 COMMENT 'Số lượt tải',
    `rating` DECIMAL(3, 2) DEFAULT 5.00,
    `doc_type` VARCHAR(50) NOT NULL COMMENT 'Phân loại: Đề thi mẫu, Giáo trình, Sơ đồ tư duy, Ghép nhóm',
    `file_url` TEXT DEFAULT NULL COMMENT 'Link tải tệp PDF',
    `description` TEXT DEFAULT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_study_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 7. BẢNG MỤC YÊU THÍCH CỦA NGƯỜI DÙNG (USER FAVORITES)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `user_favorites`;
CREATE TABLE `user_favorites` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT UNSIGNED NOT NULL COMMENT 'ID người dùng đã lưu',
    `item_type` ENUM('housing', 'food', 'market', 'entertainment') NOT NULL,
    `item_id` BIGINT UNSIGNED NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY `unique_user_fav` (`user_id`, `item_type`, `item_id`),
    CONSTRAINT `fk_fav_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 8. BẢNG ĐÁNH GIÁ & BÌNH LUẬN (REVIEWS)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `reviews`;
CREATE TABLE `reviews` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `target_type` ENUM('housing', 'food', 'market', 'entertainment') NOT NULL,
    `target_id` BIGINT UNSIGNED NOT NULL,
    `rating` TINYINT UNSIGNED NOT NULL DEFAULT 5,
    `comment` TEXT NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_review_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 9. BẢNG TIN NHẮN TRỰC TUYẾN (MESSAGES)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `sender_id` BIGINT UNSIGNED NOT NULL,
    `receiver_id` BIGINT UNSIGNED NOT NULL,
    `message` TEXT NOT NULL,
    `is_read` TINYINT(1) DEFAULT 0,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_msg_sender` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_msg_receiver` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==============================================================================
-- DỮ LIỆU KHỞI TẠO MẪU (SEED DATA INSERTIONS)
-- ==============================================================================

-- 1. Tài khoản người dùng mẫu
INSERT INTO `users` (`id`, `name`, `email`, `password_hash`, `phone`, `role`, `status`, `avatar_url`) VALUES
(1, 'Ban Quản Trị', 'admin@unilife.vn', 'admin123', '0901.111.222', 'Quản trị viên', 'Active', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'),
(2, 'Nguyễn Văn Khang', 'khachhang@gmail.com', '123456', '0905.888.999', 'Khách hàng', 'Active', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'),
(3, 'Trần Thị Bích (Chủ trọ)', 'bich.tran@gmail.com', '123456', '0908.777.666', 'Chủ nhà trọ', 'Active', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'),
(4, 'Lê Văn Minh (Chủ quán)', 'minh.food@gmail.com', '123456', '0903.444.555', 'Chủ quán ăn', 'Active', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80');

-- 2. Dữ liệu phòng trọ
INSERT INTO `housing` (`id`, `user_id`, `name`, `price`, `price_num`, `area`, `address`, `dist`, `phone`, `ac`, `washer`, `wifi`, `parking`, `image_url`, `status`) VALUES
(1, 3, 'Phòng Studio Full Nội Thất Ban Công', '2.8 tr/tháng', 2.80, '25m²', '128/14 Nguyễn Văn Linh, P. Thạc Gián', '600m đến trường', '0905.123.456', 1, 1, 1, 1, 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80', 'approved'),
(2, 3, 'Ký Túc Xá Cao Cấp Box Riêng Tư', '1.3 tr/người', 1.30, 'Giường tầng box', '45 Phan Đăng Lưu, P. Hòa Cường Bắc', '400m đến trường', '0935.222.111', 1, 1, 1, 1, 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80', 'approved'),
(3, 3, 'Phòng Trọ Khép Kín Có Gác Lửng Đẹp', '2.2 tr/tháng', 2.20, '22m²', '89 Núi Thành, P. Bình Thuận', '1.1 km đến trường', '0905.777.888', 1, 0, 1, 1, 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80', 'approved');

-- 3. Dữ liệu quán ăn
INSERT INTO `food_places` (`id`, `user_id`, `name`, `cat`, `price`, `address`, `hours`, `rating`, `phone`, `image_url`, `status`) VALUES
(1, 4, 'Cơm Tấm Đêm Sinh Viên Cô Ba', 'Cơm', '25k - 35k', '142 Huỳnh Thúc Kháng', '10:00 - 23:00', 4.80, '0905.999.111', 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80', 'approved'),
(2, 4, 'Bún Bò Huế & Bún Riêu Cua Bà Ty', 'Bún/Phở', '25k - 40k', '68 Trưng Nữ Vương', '06:00 - 13:00', 4.90, '0905.444.222', 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=80', 'approved');

-- 4. Dữ liệu chợ đồ cũ
INSERT INTO `marketplace` (`id`, `user_id`, `name`, `price`, `cond`, `cat`, `seller`, `phone`, `loc`, `image_url`, `status`) VALUES
(1, 2, 'Bộ Giáo Trình Giải Tích 1 + 2 (Kèm bài giải mẫu)', '60.000đ', 'Còn mới 95%', 'Sách', 'Văn Khang', '0905.888.999', 'Ký túc xá khu A', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80', 'approved'),
(2, 2, 'Nồi Cơm Điện Mini Sunhouse 1.2L', '150.000đ', 'Dùng tốt', 'Gia dụng', 'Thành Đạt', '0914.333.222', 'Ngã tư Phan Đăng Lưu', 'https://images.unsplash.com/photo-1584269600519-112d071b35e6?auto=format&fit=crop&w=800&q=80', 'approved');
