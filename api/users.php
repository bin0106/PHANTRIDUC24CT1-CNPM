<?php
require_once __DIR__ . '/db.php';

$sql = "SELECT id, name, email, password_hash AS password, phone, role, status, avatar_url AS avatar, DATE_FORMAT(created_at, '%d/%m/%Y') AS joined FROM users ORDER BY id ASC";
$result = $conn->query($sql);

$users = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        if (empty($row['avatar'])) {
            $row['avatar'] = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80';
        }
        $users[] = $row;
    }
}

echo json_encode([
    'success' => true,
    'users' => $users
], JSON_UNESCAPED_UNICODE);
