<?php
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $sql = "SELECT id, user_id, name, price, cond, cat, seller, phone, loc, image_url AS img, status, created_at FROM marketplace ORDER BY id DESC";
    $result = $conn->query($sql);
    $items = [];
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            if (empty($row['img'])) {
                $row['img'] = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80';
            }
            $items[] = $row;
        }
    }
    echo json_encode(['success' => true, 'market' => $items], JSON_UNESCAPED_UNICODE);
    exit();
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true) ?: $_POST;

if ($method === 'POST') {
    $name = trim($data['name'] ?? '');
    $price = trim($data['price'] ?? '50.000đ');
    $cond = trim($data['cond'] ?? 'Đã dùng - tốt');
    $cat = trim($data['cat'] ?? 'Sách');
    $seller = trim($data['seller'] ?? 'Sinh viên UniLife');
    $phone = trim($data['phone'] ?? '0909.888.999');
    $loc = trim($data['loc'] ?? 'Ký túc xá');
    $img = trim($data['img'] ?? $data['image_url'] ?? 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80');
    $userId = !empty($data['user_id']) ? intval($data['user_id']) : 1;
    $status = trim($data['status'] ?? 'approved');

    if (empty($name) || empty($price)) {
        echo json_encode(['success' => false, 'message' => 'Vui lòng nhập tên và giá sản phẩm!'], JSON_UNESCAPED_UNICODE);
        exit();
    }

    $stmt = $conn->prepare("INSERT INTO marketplace (user_id, name, price, cond, cat, seller, phone, loc, image_url, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("isssssssss", $userId, $name, $price, $cond, $cat, $seller, $phone, $loc, $img, $status);

    if ($stmt->execute()) {
        $newId = $stmt->insert_id;
        echo json_encode([
            'success' => true,
            'message' => 'Đã lưu sản phẩm chợ cũ vào phpMyAdmin!',
            'item' => [
                'id' => $newId,
                'name' => $name,
                'price' => $price,
                'cond' => $cond,
                'cat' => $cat,
                'seller' => $seller,
                'phone' => $phone,
                'loc' => $loc,
                'img' => $img,
                'status' => $status
            ]
        ], JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(['success' => false, 'message' => 'Lỗi khi lưu sản phẩm: ' . $conn->error], JSON_UNESCAPED_UNICODE);
    }
    exit();
}

if ($method === 'PUT') {
    $id = intval($data['id'] ?? 0);
    $status = trim($data['status'] ?? '');
    if ($id > 0 && !empty($status)) {
        $stmt = $conn->prepare("UPDATE marketplace SET status = ? WHERE id = ?");
        $stmt->bind_param("si", $status, $id);
        $stmt->execute();
        echo json_encode(['success' => true, 'message' => 'Đã cập nhật trạng thái tin chợ cũ!'], JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(['success' => false, 'message' => 'Thiếu ID hoặc trạng thái!'], JSON_UNESCAPED_UNICODE);
    }
    exit();
}

if ($method === 'DELETE') {
    $id = intval($data['id'] ?? $_GET['id'] ?? 0);
    if ($id > 0) {
        $stmt = $conn->prepare("DELETE FROM marketplace WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        echo json_encode(['success' => true, 'message' => 'Đã xóa sản phẩm khỏi CSDL phpMyAdmin!'], JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(['success' => false, 'message' => 'Thiếu ID sản phẩm cần xóa!'], JSON_UNESCAPED_UNICODE);
    }
    exit();
}
