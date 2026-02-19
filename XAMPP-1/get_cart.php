<?php
require_once 'config.php';
header('Content-Type: application/json');

$userId = getUserId();
$sessionId = getSessionId();

if ($userId) {
    $stmt = $conn->prepare("SELECT ci.product_id as id, p.name, p.price, p.image_url as img, ci.quantity as qty 
                            FROM cart_items ci 
                            JOIN products p ON ci.product_id = p.id 
                            WHERE ci.user_id = ?");
    $stmt->bind_param("i", $userId);
} else {
    $stmt = $conn->prepare("SELECT ci.product_id as id, p.name, p.price, p.image_url as img, ci.quantity as qty 
                            FROM cart_items ci 
                            JOIN products p ON ci.product_id = p.id 
                            WHERE ci.session_id = ?");
    $stmt->bind_param("s", $sessionId);
}
$stmt->execute();
$result = $stmt->get_result();
$cart = $result->fetch_all(MYSQLI_ASSOC);
echo json_encode($cart);
?>