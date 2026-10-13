<?php
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $sql = "SELECT id, user_id, name, price, price_num AS priceNum, area, address, dist AS distance, phone, ac, washer, wifi, parking, image_url AS img, status, created_at FROM housing ORDER BY id DESC";
    $result = $conn->query($sql);
    $items = [];
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $row['ac'] = (bool)$row['ac'];
            $row['washer'] = (bool)$row['washer'];
            $row['wifi'] = (bool)$row['wifi'];
            $row['parking'] = (bool)$row['parking'];
            $row['priceNum'] = (float)$row['priceNum'];
            if (empty($row['img'])) {
                $row['img'] = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80';
            }
            $items[] = $row;
        }
    }
    echo json_encode(['success' => true, 'housing' => $items], JSON_UNESCAPED_UNICODE);
    exit();
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true) ?: $_POST;

if ($method === 'POST') {
    $name = trim($data['name'] ?? '');
    $price = trim($data['price'] ?? '2.0 triệu');
    $priceNum = floatval($data['priceNum'] ?? 2.0);
    $area = trim($data['area'] ?? '20m²');
    $address = trim($data['address'] ?? '');
    $dist = trim($data['distance'] ?? $data['dist'] ?? '500m');
    $phone = trim($data['phone'] ?? '0905.123.456');
    $ac = !empty($data['ac']) ? 1 : 0;
    $washer = !empty($data['washer']) ? 1 : 0;
    $wifi = !empty($data['wifi']) ? 1 : 0;
    $parking = !empty($data['parking']) ? 1 : 0;
    $img = trim($data['img'] ?? $data['image_url'] ?? 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80');
    $userId = !empty($data['user_id']) ? intval($data['user_id']) : 1;
    $status = trim($data['status'] ?? 'approved');

    if (empty($name) || empty($address)) {
        echo json_encode(['success' => false, 'message' => 'Vui lòng nhập tên và địa chỉ phòng trọ!'], JSON_UNESCAPED_UNICODE);
        exit();
    }

    $stmt = $conn->prepare("INSERT INTO housing (user_id, name, price, price_num, area, address, dist, phone, ac, washer, wifi, parking, image_url, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("issdssssiiiiss", $userId, $name, $price, $priceNum, $area, $address, $dist, $phone, $ac, $washer, $wifi, $parking, $img, $status);

    if ($stmt->execute()) {
        $newId = $stmt->insert_id;
        echo json_encode([
            'success' => true,
            'message' => 'Đã lưu phòng trọ mới vào phpMyAdmin!',
            'item' => [
                'id' => $newId,
                'name' => $name,
                'price' => $price,
                'priceNum' => $priceNum,
                'area' => $area,
                'address' => $address,
                'distance' => $dist,
                'phone' => $phone,
                'ac' => (bool)$ac,
                'washer' => (bool)$washer,
                'wifi' => (bool)$wifi,
                'parking' => (bool)$parking,
                'img' => $img,
                'status' => $status
            ]
        ], JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(['success' => false, 'message' => 'Lỗi khi lưu phòng trọ: ' . $conn->error], JSON_UNESCAPED_UNICODE);
    }
    exit();
}

if ($method === 'PUT') {
    $id = intval($data['id'] ?? 0);
    $status = trim($data['status'] ?? '');
    if ($id > 0 && !empty($status)) {
        $stmt = $conn->prepare("UPDATE housing SET status = ? WHERE id = ?");
        $stmt->bind_param("si", $status, $id);
        $stmt->execute();
        echo json_encode(['success' => true, 'message' => 'Đã cập nhật trạng thái phòng trọ!'], JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(['success' => false, 'message' => 'Thiếu ID hoặc trạng thái!'], JSON_UNESCAPED_UNICODE);
    }
    exit();
}

if ($method === 'DELETE') {
    $id = intval($data['id'] ?? $_GET['id'] ?? 0);
    if ($id > 0) {
        $stmt = $conn->prepare("DELETE FROM housing WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        echo json_encode(['success' => true, 'message' => 'Đã xóa phòng trọ khỏi CSDL phpMyAdmin!'], JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(['success' => false, 'message' => 'Thiếu ID phòng trọ cần xóa!'], JSON_UNESCAPED_UNICODE);
    }
    exit();
}
