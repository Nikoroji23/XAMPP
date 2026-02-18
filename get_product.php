<?php
require_once 'config.php';
header('Content-Type: application/json');

$result = $conn->query("SELECT id, name, price, category, image_url as img FROM products");
$products = $result->fetch_all(MYSQLI_ASSOC);
echo json_encode($products);
?>