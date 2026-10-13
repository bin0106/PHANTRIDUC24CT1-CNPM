<?php
// Cấu hình CORS & Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$host = 'localhost';
$user = 'root';
$pass = '';

// Kết nối MySQL
$conn = new mysqli($host, $user, $pass);
if ($conn->connect_error) {
    echo json_encode([
        'success' => false,
        'message' => 'Lỗi kết nối MySQL: ' . $conn->connect_error
    ]);
    exit();
}
$conn->set_charset("utf8mb4");

// Đảm bảo CSDL unilife_db tồn tại
$conn->query("CREATE DATABASE IF NOT EXISTS `unilife_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
$conn->select_db('unilife_db');

// Đảm bảo bảng users tồn tại trong unilife_db
$createTableSql = "CREATE TABLE IF NOT EXISTS `users` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(150) NOT NULL,
    `email` VARCHAR(191) NOT NULL UNIQUE,
    `password_hash` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(20) DEFAULT NULL,
    `role` ENUM('Quản trị viên', 'Khách hàng', 'Chủ nhà trọ', 'Chủ quán ăn', 'Người bán đồ cũ') NOT NULL DEFAULT 'Khách hàng',
    `status` ENUM('Active', 'Banned', 'Pending') NOT NULL DEFAULT 'Active',
    `avatar_url` TEXT DEFAULT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
$conn->query($createTableSql);
