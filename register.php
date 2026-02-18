<?php
include "includes/db.php";

if(isset($_POST['register'])){
  $email = $_POST['email'];
  $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

  $conn->query("INSERT INTO users(email,password) VALUES('$email','$password')");
}
?>
