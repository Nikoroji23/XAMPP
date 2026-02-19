<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>NeuroBit Labs</title>

<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Inter:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css">
</head>

<body>

<!-- OVERLAY (add this before container) -->
<div class="cart-overlay" id="overlay" onclick="closeCart()"></div>

<div class="container">

  <!-- NAVBAR -->
  <div class="navbar">
    <div class="logo">NeuroBit Labs</div>
    <div class="nav-links">
      <a href="#">Shop</a>
      <a href="#">Boards</a>
      <a href="#">Processors</a>
      <a href="javascript:void(0)" id="register-btn">Register</a>
      <a href="" id="cart-btn">Cart (<span id="cart-count">0</span>)</a>
      
    </div>
  </div>

 <!-- HERO -->
<div class="hero">
  <div class="hero-text">
    <h1>Next-Gen Microcontrollers for Makers & Innovators</h1>
    <p>Discover high-performance processors, dev boards, and embedded solutions built for creators.</p>
    <a href="javascript:void(0)" class="btn btn-primary" id="hero-shop-now">Shop Now</a>
    <a href="javascript:void(0)" class="btn btn-secondary" id="hero-explore-boards">Explore Boards</a>
  </div>
  <img src="/neurobit/img/micrologo.jpg" class="hero-image" alt="NeuroBit Logo" onerror="this.src='https://via.placeholder.com/400x400?text=NeuroBit'">
</div>

<!-- FEATURED CATEGORIES -->
<section class="section section-light">
  <h2>Featured Categories</h2>
  <div class="category-grid">
    <div class="category-card" onclick="filterProducts('Microcontrollers')">Microcontrollers</div>
    <div class="category-card" onclick="filterProducts('Sensors')">Sensors</div>
    <div class="category-card" onclick="filterProducts('Power')">Power Supply</div>
    <div class="category-card" onclick="filterProducts('Tools')">Tools</div>
  </div>
</section>

<!-- PRODUCTS -->
<section class="section">
  <h2>Best Sellers</h2>
  <div id="products-grid" class="products-grid"></div>
</section>

<!-- CART SIDEBAR (only one) -->
<aside class="cart-sidebar" id="cart">
  <h3>Your Cart</h3>
  <ul id="cart-items"></ul>
  <div class="cart-total">
    Total: ₱<span id="cart-total">0</span>
  </div>
  <button class="close-cart" onclick="closeCart()">Close</button>
</aside>

<!-- CTA -->
<div class="cta">
  <h2>Join the Neuro Community</h2>
  <a href="#" class="btn btn-primary" id="shop-now-btn">Shop Now</a>
  <a href="#" class="btn btn-secondary" id="explore-boards-btn">Explore Boards</a>
  <p style="margin:20px 0;color:#9CA3AF;">Subscribe for updates & exclusive offers</p>
  <input type="email" id="subscribe-email" placeholder="Enter your email">
  <button id="subscribe-btn" class="btn btn-primary">Subscribe</button>
</div>

<!-- FOOTER -->
<div class="footer">
  © 2026 NeuroBit Labs — Powering the Next Generation of Innovation.
</div>

<script src="script.js"></script>
<!-- Registration Modal -->
<div id="register-modal" class="modal">
  <div class="modal-content">
    <span class="close-modal">&times;</span>
    <h2>Create an Account</h2>
    <form id="register-form">
      <input type="email" name="email" placeholder="Email" required>
      <input type="password" name="password" placeholder="Password (min. 6 characters)" required>
      <a href ="#" type="submit" class="btn btn-primary">Register</button>
    </form>
    <div id="register-message"></div>
  </div>
</div>
</body>
</html>