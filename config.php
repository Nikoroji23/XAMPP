<?php
session_start();
require_once 'db.php';

function getUserId() {
    return $_SESSION['user_id'] ?? null;
}

function getSessionId() {
    return session_id();
}
?>