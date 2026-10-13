<?php
require_once __DIR__ . '/db.php';

// Nhận dữ liệu JSON hoặc Form-data
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data) {
    $data = $_POST;
}

$name = trim($data['name'] ?? '');
$email = strtolower(trim($data['email'] ?? ''));
$password = trim($data['password'] ?? '');
$phone = trim($data['phone'] ?? 'Chưa cập nhật');
$role = trim($data['role'] ?? 'Khách hàng');
$avatar = trim($data['avatar'] ?? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80');

if (empty($name) || empty($email) || empty($password)) {
    echo json_encode([
        'success' => false,
        'message' => 'Vui lòng cung cấp đầy đủ họ tên, email và mật khẩu!'
    ], JSON_UNESCAPED_UNICODE);
    exit();
}

// Kiểm tra email đã tồn tại trong unilife_db chưa
$checkStmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$checkStmt->bind_param("s", $email);
$checkStmt->execute();
$checkResult = $checkStmt->get_result();

if ($checkResult->num_rows > 0) {
    echo json_encode([
        'success' => false,
        'message' => 'Email này đã được đăng ký trong hệ thống UniLife!'
    ], JSON_UNESCAPED_UNICODE);
    exit();
}

// Thêm vào bảng unilife_db.users
$status = 'Active';
$insertStmt = $conn->prepare("INSERT INTO users (name, email, password_hash, phone, role, status, avatar_url) VALUES (?, ?, ?, ?, ?, ?, ?)");
$insertStmt->bind_param("sssssss", $name, $email, $password, $phone, $role, $status, $avatar);

if (!$insertStmt->execute()) {
    echo json_encode([
        'success' => false,
        'message' => 'Lỗi khi lưu tài khoản vào CSDL: ' . $conn->error
    ], JSON_UNESCAPED_UNICODE);
    exit();
}

$newId = $insertStmt->insert_id;

// Đồng bộ vào cơ sở dữ liệu `unilife` (nếu tồn tại bảng unilife.users)
try {
    $roleMap = 'customer';
    if ($role === 'Quản trị viên') {
        $roleMap = 'manager';
    }
    $syncSql = "INSERT INTO unilife.users (full_name, email, password_hash, role) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE full_name = VALUES(full_name)";
    $syncStmt = $conn->prepare($syncSql);
    if ($syncStmt) {
        $syncStmt->bind_param("ssss", $name, $email, $password, $roleMap);
        $syncStmt->execute();
    }
} catch (Exception $e) {
    // Không làm gián đoạn nếu bảng unilife phụ không tồn tại
}

echo json_encode([
    'success' => true,
    'message' => 'Đăng ký tài khoản thành công và đã lưu vào phpMyAdmin!',
    'user' => [
        'id' => $newId,
        'name' => $name,
        'email' => $email,
        'password' => $password,
        'phone' => $phone,
        'role' => $role,
        'status' => $status,
        'avatar' => $avatar,
        'joined' => date('d/m/Y')
    ]
], JSON_UNESCAPED_UNICODE);
