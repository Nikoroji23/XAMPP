<?php
require_once 'config.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
$productId = $data['product_id'] ?? 0;
$quantity = $data['quantity'] ?? 0;

if (!$productId || $quantity < 0) {
    echo json_encode(['success' => false, 'message' => 'Invalid data']);
    exit;
}

$userId = getUserId();
$sessionId = getSessionId();

if ($quantity == 0) {
    if ($userId) {
        $stmt = $conn->prepare("DELETE FROM cart_items WHERE user_id = ? AND product_id = ?");
        $stmt->bind_param("ii", $userId, $productId);
    } else {
        $stmt = $conn->prepare("DELETE FROM cart_items WHERE session_id = ? AND product_id = ?");
        $stmt->bind_param("si", $sessionId, $productId);
    }
    $stmt->execute();
} else {
    if ($userId) {
        $stmt = $conn->prepare("UPDATE cart_items SET quantity = ? WHERE user_id = ? AND product_id = ?");
        $stmt->bind_param("iii", $quantity, $userId, $productId);
    } else {
        $stmt = $conn->prepare("UPDATE cart_items SET quantity = ? WHERE session_id = ? AND product_id = ?");
        $stmt->bind_param("isi", $quantity, $sessionId, $productId);
    }
    $stmt->execute();
}

echo json_encode(['success' => true]);
?>