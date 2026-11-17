<?php
require_once __DIR__ . '/db.php';

// Tiếp nhận tham số bộ lọc từ GET request (tìm kiếm Tên, SĐT, Email, Vai trò, Trạng thái)
$search = trim($_GET['search'] ?? $_GET['q'] ?? '');
$filterRole = trim($_GET['role'] ?? '');
$filterStatus = trim($_GET['status'] ?? '');

$conditions = [];
$params = [];
$types = '';

// Bộ lọc theo Tên, Số điện thoại hoặc Email
if (!empty($search)) {
    $conditions[] = "(name LIKE ? OR phone LIKE ? OR email LIKE ?)";
    $like = '%' . $search . '%';
    $params[] = $like;
    $params[] = $like;
    $params[] = $like;
    $types .= 'sss';
}

// Bộ lọc theo Vai trò (Khách hàng, Chủ nhà trọ, Chủ quán ăn, Người bán đồ cũ, Quản trị viên)
if (!empty($filterRole) && $filterRole !== 'all') {
    $conditions[] = "role = ?";
    $params[] = $filterRole;
    $types .= 's';
}

// Bộ lọc theo Trạng thái hoạt động (Active, Banned)
if (!empty($filterStatus) && $filterStatus !== 'all') {
    $conditions[] = "status = ?";
    $params[] = $filterStatus;
    $types .= 's';
}

$sql = "SELECT id, name, email, password_hash AS password, phone, role, status, avatar_url AS avatar, DATE_FORMAT(created_at, '%d/%m/%Y') AS joined FROM users";

if (count($conditions) > 0) {
    $sql .= " WHERE " . implode(" AND ", $conditions);
}
$sql .= " ORDER BY id ASC";

if (count($params) > 0) {
    $stmt = $conn->prepare($sql);
    $stmt->bind_param($types, ...$params);
    $stmt->execute();
    $result = $stmt->get_result();
} else {
    $result = $conn->query($sql);
}

$users = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        if (empty($row['avatar'])) {
            $row['avatar'] = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80';
        }
        $users[] = $row;
    }
}

// Thống kê đếm số lượng người dùng theo từng vai trò (role) trong CSDL
$countSql = "SELECT role, COUNT(*) AS count FROM users GROUP BY role";
$countResult = $conn->query($countSql);
$roleCounts = [
    'Quản trị viên' => 0,
    'Khách hàng' => 0,
    'Chủ nhà trọ' => 0,
    'Chủ quán ăn' => 0,
    'Người bán đồ cũ' => 0,
    'total' => 0
];
if ($countResult) {
    while ($r = $countResult->fetch_assoc()) {
        $roleCounts[$r['role']] = (int)$r['count'];
        $roleCounts['total'] += (int)$r['count'];
    }
}

echo json_encode([
    'success' => true,
    'users' => $users,
    'roleCounts' => $roleCounts,
    'filteredCount' => count($users),
    'filtersApplied' => [
        'search' => $search,
        'role' => $filterRole,
        'status' => $filterStatus
    ]
], JSON_UNESCAPED_UNICODE);
