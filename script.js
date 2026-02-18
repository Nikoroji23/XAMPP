// --- Product Data (unchanged) ---
const products = [
  {id:1, name:"ESP32 Dev Kit", price:450, category:"Microcontrollers", img:"https://via.placeholder.com/280x220?text=ESP32"},
  {id:2, name:"Arduino UNO", price:699, category:"Microcontrollers", img:"https://via.placeholder.com/280x220?text=Arduino+UNO"},
  {id:3, name:"Ultrasonic Sensor", price:120, category:"Sensors", img:"https://via.placeholder.com/280x220?text=Ultrasonic"},
  {id:4, name:"5V Power Supply", price:300, category:"Power", img:"https://via.placeholder.com/280x220?text=Power+Supply"},
  {id:5, name:"Raspberry Pi 4", price:3500, category:"Microcontrollers", img:"https://via.placeholder.com/280x220?text=Raspberry+Pi"},
  {id:6, name:"STM32F411 Board", price:1200, category:"Microcontrollers", img:"https://via.placeholder.com/280x220?text=STM32"}
];

let cart = [];

const grid = document.getElementById("products-grid");
const cartBox = document.getElementById("cart");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const overlay = document.getElementById("overlay");

// --- Cart functions (unchanged) ---
function openCart() {
  cartBox.classList.add("open");
  overlay.classList.add("active");
}
function closeCart() {
  cartBox.classList.remove("open");
  overlay.classList.remove("active");
}
document.getElementById("cart-btn").onclick = (e) => {
  e.preventDefault();
  openCart();
};

function loadProducts(list){
  grid.innerHTML = "";
  list.forEach(p=>{
    grid.innerHTML += `
      <div class="product-card">
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p class="price">₱${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;
  });
}

function filterProducts(cat){
  loadProducts(products.filter(p=>p.category===cat));
}

function addToCart(id){
  const item = cart.find(i=>i.id===id);
  if(item) item.qty++;
  else cart.push({...products.find(p=>p.id===id), qty:1});
  renderCart();
  openCart();
}

function increaseQty(i){
  cart[i].qty++;
  renderCart();
}
function decreaseQty(i){
  if(cart[i].qty > 1){
    cart[i].qty--;
  } else {
    removeItem(i);
  }
  renderCart();
}
function removeItem(i){
  cart.splice(i,1);
  renderCart();
  if(cart.length === 0) closeCart();
}
function renderCart(){
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item,i)=>{
    total += item.price * item.qty;
    cartItems.innerHTML += `
      <li class="cart-item">
        <span>${item.name} – ₱${item.price}</span>
        <div class="qty-control">
          <button onclick="decreaseQty(${i})">-</button>
          <input type="text" value="${item.qty}" readonly>
          <button onclick="increaseQty(${i})">+</button>
          <button class="remove-btn" onclick="removeItem(${i})">×</button>
        </div>
      </li>
    `;
  });
  cartTotal.innerText = total;
  cartCount.innerText = cart.reduce((a,b)=>a+b.qty,0);
}
loadProducts(products);

// --- New Functionality: Registration Modal ---
const modal = document.getElementById('register-modal');
const registerBtn = document.getElementById('register-btn');
const closeModal = document.querySelector('.close-modal');
const registerForm = document.getElementById('register-form');
const registerMessage = document.getElementById('register-message');

registerBtn.onclick = () => {
  modal.style.display = 'block';
};
closeModal.onclick = () => {
  modal.style.display = 'none';
  registerMessage.innerHTML = ''; // clear previous messages
};
window.onclick = (e) => {
  if (e.target == modal) {
    modal.style.display = 'none';
    registerMessage.innerHTML = '';
  }
};

// Handle registration form submission with AJAX
registerForm.onsubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(registerForm);
  const response = await fetch('register.php', {
    method: 'POST',
    body: formData
  });
  const result = await response.json();
  registerMessage.innerHTML = result.message;
  registerMessage.style.color = result.success ? '#00F5FF' : '#FF6B6B';
  if (result.success) {
    registerForm.reset();
    setTimeout(() => {
      modal.style.display = 'none';
      registerMessage.innerHTML = '';
    }, 2000);
  }
};

// --- Newsletter Subscription ---
const subscribeBtn = document.getElementById('subscribe-btn');
const subscribeEmail = document.getElementById('subscribe-email');

subscribeBtn.onclick = async () => {
  const email = subscribeEmail.value.trim();
  if (!email) {
    alert('Please enter an email address.');
    return;
  }
  // Simple email validation
  if (!/\S+@\S+\.\S+/.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }
  // Send to a new script (subscribe.php)
  const response = await fetch('subscribe.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'email=' + encodeURIComponent(email)
  });
  const result = await response.json();
  if (result.success) {
    alert('Thank you for subscribing!');
    subscribeEmail.value = '';
  } else {
    alert(result.message);
  }
};

// --- Make "Shop Now" and "Explore Boards" scroll to products ---
document.getElementById('shop-now-btn').onclick = () => {
  document.querySelector('.section').scrollIntoView({ behavior: 'smooth' });
};
document.getElementById('explore-boards-btn').onclick = () => {
  // Filter to 'Microcontrollers' and scroll
  filterProducts('Microcontrollers');
  document.querySelector('.section').scrollIntoView({ behavior: 'smooth' });
};

// --- Make category cards functional (already have onclick in HTML, but ensure filter works) ---
// (No extra code needed – they call filterProducts directly)

// --- Make "Shop", "Boards", "Processors" navbar links functional ---
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', (e) => {
    const text = e.target.innerText.toLowerCase();
    if (text === 'shop') {
      document.querySelector('.section').scrollIntoView({ behavior: 'smooth' });
    } else if (text === 'boards') {
      filterProducts('Microcontrollers');
      document.querySelector('.section').scrollIntoView({ behavior: 'smooth' });
    } else if (text === 'processors') {
      filterProducts('Microcontrollers'); // or a separate category if you have one
      document.querySelector('.section').scrollIntoView({ behavior: 'smooth' });
    }
  });
});