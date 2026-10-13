<?php
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $sql = "SELECT id, user_id, name, cat, price, address, hours, rating, phone, image_url AS img, status, created_at FROM food_places ORDER BY id DESC";
    $result = $conn->query($sql);
    $items = [];
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $row['rating'] = floatval($row['rating']);
            if (empty($row['img'])) {
                $row['img'] = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80';
            }
            $items[] = $row;
        }
    }
    echo json_encode(['success' => true, 'food' => $items], JSON_UNESCAPED_UNICODE);
    exit();
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true) ?: $_POST;

if ($method === 'POST') {
    $name = trim($data['name'] ?? '');
    $cat = trim($data['cat'] ?? 'Cơm');
    $price = trim($data['price'] ?? '25k - 40k');
    $address = trim($data['address'] ?? '');
    $hours = trim($data['hours'] ?? '07:00 - 22:00');
    $rating = floatval($data['rating'] ?? 5.0);
    $phone = trim($data['phone'] ?? '0905.888.777');
    $img = trim($data['img'] ?? $data['image_url'] ?? 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80');
    $userId = !empty($data['user_id']) ? intval($data['user_id']) : 1;
    $status = trim($data['status'] ?? 'approved');

    if (empty($name) || empty($address)) {
        echo json_encode(['success' => false, 'message' => 'Vui lòng nhập tên và địa chỉ quán ăn!'], JSON_UNESCAPED_UNICODE);
        exit();
    }

    $stmt = $conn->prepare("INSERT INTO food_places (user_id, name, cat, price, address, hours, rating, phone, image_url, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("isssssdsss", $userId, $name, $cat, $price, $address, $hours, $rating, $phone, $img, $status);

    if ($stmt->execute()) {
        $newId = $stmt->insert_id;
        echo json_encode([
            'success' => true,
            'message' => 'Đã lưu quán ăn mới vào phpMyAdmin!',
            'item' => [
                'id' => $newId,
                'name' => $name,
                'cat' => $cat,
                'price' => $price,
                'address' => $address,
                'hours' => $hours,
                'rating' => $rating,
                'phone' => $phone,
                'img' => $img,
                'status' => $status
            ]
        ], JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(['success' => false, 'message' => 'Lỗi khi lưu quán ăn: ' . $conn->error], JSON_UNESCAPED_UNICODE);
    }
    exit();
}

if ($method === 'PUT') {
    $id = intval($data['id'] ?? 0);
    $status = trim($data['status'] ?? '');
    if ($id > 0 && !empty($status)) {
        $stmt = $conn->prepare("UPDATE food_places SET status = ? WHERE id = ?");
        $stmt->bind_param("si", $status, $id);
        $stmt->execute();
        echo json_encode(['success' => true, 'message' => 'Đã cập nhật trạng thái quán ăn!'], JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(['success' => false, 'message' => 'Thiếu ID hoặc trạng thái!'], JSON_UNESCAPED_UNICODE);
    }
    exit();
}

if ($method === 'DELETE') {
    $id = intval($data['id'] ?? $_GET['id'] ?? 0);
    if ($id > 0) {
        $stmt = $conn->prepare("DELETE FROM food_places WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        echo json_encode(['success' => true, 'message' => 'Đã xóa quán ăn khỏi CSDL phpMyAdmin!'], JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(['success' => false, 'message' => 'Thiếu ID quán ăn cần xóa!'], JSON_UNESCAPED_UNICODE);
    }
    exit();
}
