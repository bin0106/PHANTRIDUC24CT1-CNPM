<?php
require_once __DIR__ . '/db.php';

// Tự động đảm bảo bảng entertainment tồn tại trong CSDL
$conn->query("CREATE TABLE IF NOT EXISTS `entertainment` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `cat` VARCHAR(50) NOT NULL,
    `price` VARCHAR(100) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `hours` VARCHAR(100) DEFAULT '24/7',
    `rating` DECIMAL(3, 2) DEFAULT 4.90,
    `image_url` TEXT DEFAULT NULL,
    `status` ENUM('approved', 'hidden') NOT NULL DEFAULT 'approved',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

$method = $_SERVER['REQUEST_METHOD'];

// GET: Lấy danh sách tụ điểm vui chơi
if ($method === 'GET') {
    $sql = "SELECT id, name, cat, price, address, hours, rating, image_url AS img, status, created_at FROM entertainment ORDER BY id DESC";
    $result = $conn->query($sql);
    $items = [];
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $row['rating'] = (float)$row['rating'];
            if (empty($row['img'])) {
                $row['img'] = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80';
            }
            $items[] = $row;
        }
    }
    echo json_encode(['success' => true, 'entertainment' => $items], JSON_UNESCAPED_UNICODE);
    exit();
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true) ?: $_POST;

// DELETE: Xóa địa điểm vui chơi
if ($method === 'DELETE' || ($method === 'POST' && isset($data['action']) && $data['action'] === 'delete')) {
    $id = intval($data['id'] ?? 0);
    if ($id <= 0) {
        echo json_encode(['success' => false, 'message' => 'ID không hợp lệ để xóa!'], JSON_UNESCAPED_UNICODE);
        exit();
    }
    $stmt = $conn->prepare("DELETE FROM entertainment WHERE id = ?");
    $stmt->bind_param("i", $id);
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Đã xóa địa điểm vui chơi thành công khỏi phpMyAdmin!', 'id' => $id], JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(['success' => false, 'message' => 'Lỗi khi xóa khỏi CSDL: ' . $conn->error], JSON_UNESCAPED_UNICODE);
    }
    exit();
}

// POST: Thêm mới địa điểm vui chơi
if ($method === 'POST') {
    $name = trim($data['name'] ?? '');
    $cat = trim($data['cat'] ?? 'Giải trí');
    $price = trim($data['price'] ?? 'Miễn phí');
    $address = trim($data['address'] ?? '');
    $hours = trim($data['hours'] ?? '08:00 - 23:00');
    $rating = floatval($data['rating'] ?? 4.8);
    $img = trim($data['img'] ?? $data['image_url'] ?? 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80');
    $status = trim($data['status'] ?? 'approved');

    if (empty($name) || empty($address)) {
        echo json_encode(['success' => false, 'message' => 'Vui lòng nhập tên và địa chỉ tụ điểm vui chơi!'], JSON_UNESCAPED_UNICODE);
        exit();
    }

    $stmt = $conn->prepare("INSERT INTO entertainment (name, cat, price, address, hours, rating, image_url, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssdss", $name, $cat, $price, $address, $hours, $rating, $img, $status);

    if ($stmt->execute()) {
        $newId = $stmt->insert_id;
        echo json_encode([
            'success' => true,
            'message' => 'Đã thêm địa điểm vui chơi mới vào phpMyAdmin!',
            'item' => [
                'id' => $newId,
                'name' => $name,
                'cat' => $cat,
                'price' => $price,
                'address' => $address,
                'hours' => $hours,
                'rating' => $rating,
                'img' => $img,
                'status' => $status
            ]
        ], JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(['success' => false, 'message' => 'Lỗi khi thêm vào CSDL: ' . $conn->error], JSON_UNESCAPED_UNICODE);
    }
    exit();
}
