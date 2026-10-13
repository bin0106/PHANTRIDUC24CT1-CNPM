<?php
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $sql = "SELECT id, user_id, title, author, downloads, rating, doc_type AS type, file_url, description AS `desc`, DATE_FORMAT(created_at, '%d/%m/%Y') AS `date` FROM study_documents ORDER BY id DESC";
    $result = $conn->query($sql);
    $items = [];
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $row['rating'] = floatval($row['rating']);
            $row['downloads'] = intval($row['downloads']);
            $items[] = $row;
        }
    }
    echo json_encode(['success' => true, 'study' => $items], JSON_UNESCAPED_UNICODE);
    exit();
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true) ?: $_POST;

if ($method === 'POST') {
    $title = trim($data['title'] ?? '');
    $author = trim($data['author'] ?? 'Thành viên UniLife');
    $docType = trim($data['type'] ?? $data['doc_type'] ?? 'Tài liệu ôn tập');
    $desc = trim($data['desc'] ?? $data['description'] ?? 'Tài liệu học tập chia sẻ cho sinh viên.');
    $downloads = intval($data['downloads'] ?? 1);
    $rating = floatval($data['rating'] ?? 5.0);
    $fileUrl = trim($data['file_url'] ?? '');
    $userId = !empty($data['user_id']) ? intval($data['user_id']) : 1;

    if (empty($title)) {
        echo json_encode(['success' => false, 'message' => 'Vui lòng nhập tiêu đề tài liệu!'], JSON_UNESCAPED_UNICODE);
        exit();
    }

    $stmt = $conn->prepare("INSERT INTO study_documents (user_id, title, author, downloads, rating, doc_type, file_url, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("issidsss", $userId, $title, $author, $downloads, $rating, $docType, $fileUrl, $desc);

    if ($stmt->execute()) {
        $newId = $stmt->insert_id;
        echo json_encode([
            'success' => true,
            'message' => 'Đã lưu tài liệu học tập vào phpMyAdmin!',
            'item' => [
                'id' => $newId,
                'title' => $title,
                'author' => $author,
                'downloads' => $downloads,
                'rating' => $rating,
                'type' => $docType,
                'desc' => $desc,
                'date' => date('d/m/Y')
            ]
        ], JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(['success' => false, 'message' => 'Lỗi khi lưu tài liệu: ' . $conn->error], JSON_UNESCAPED_UNICODE);
    }
    exit();
}

if ($method === 'DELETE') {
    $id = intval($data['id'] ?? $_GET['id'] ?? 0);
    if ($id > 0) {
        $stmt = $conn->prepare("DELETE FROM study_documents WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        echo json_encode(['success' => true, 'message' => 'Đã xóa tài liệu khỏi phpMyAdmin!'], JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(['success' => false, 'message' => 'Thiếu ID tài liệu cần xóa!'], JSON_UNESCAPED_UNICODE);
    }
    exit();
}
