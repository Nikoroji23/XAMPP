<?php
require_once 'config.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
$productId = $data['product_id'] ?? 0;
$quantity = $data['quantity'] ?? 1;

if (!$productId) {
    echo json_encode(['success' => false, 'message' => 'Invalid product']);
    exit;
}

$userId = getUserId();
$sessionId = getSessionId();

if ($userId) {
    $stmt = $conn->prepare("SELECT id, quantity FROM cart_items WHERE user_id = ? AND product_id = ?");
    $stmt->bind_param("ii", $userId, $productId);
} else {
    $stmt = $conn->prepare("SELECT id, quantity FROM cart_items WHERE session_id = ? AND product_id = ?");
    $stmt->bind_param("si", $sessionId, $productId);
}
$stmt->execute();
$result = $stmt->get_result();
$existing = $result->fetch_assoc();

if ($existing) {
    $newQty = $existing['quantity'] + $quantity;
    $update = $conn->prepare("UPDATE cart_items SET quantity = ? WHERE id = ?");
    $update->bind_param("ii", $newQty, $existing['id']);
    $update->execute();
} else {
    if ($userId) {
        $insert = $conn->prepare("INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)");
        $insert->bind_param("iii", $userId, $productId, $quantity);
    } else {
        $insert = $conn->prepare("INSERT INTO cart_items (session_id, product_id, quantity) VALUES (?, ?, ?)");
        $insert->bind_param("sii", $sessionId, $productId, $quantity);
    }
    $insert->execute();
}

echo json_encode(['success' => true, 'message' => 'Added to cart']);
?>