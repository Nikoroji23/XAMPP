// ===============================
// PRODUCT DATA
// ===============================
const products = [
  { id: 1, name: "ESP32 Dev Kit", price: 450, category: "Microcontrollers", img: "https://via.placeholder.com/280x220?text=ESP32" },
  { id: 2, name: "Arduino UNO", price: 699, category: "Microcontrollers", img: "https://via.placeholder.com/280x220?text=Arduino+UNO" },
  { id: 3, name: "Ultrasonic Sensor", price: 120, category: "Sensors", img: "https://via.placeholder.com/280x220?text=Ultrasonic" },
  { id: 4, name: "5V Power Supply", price: 300, category: "Power", img: "https://via.placeholder.com/280x220?text=Power+Supply" },
  { id: 5, name: "Raspberry Pi 4", price: 3500, category: "Microcontrollers", img: "https://via.placeholder.com/280x220?text=Raspberry+Pi" },
  { id: 6, name: "STM32F411 Board", price: 1200, category: "Microcontrollers", img: "https://via.placeholder.com/280x220?text=STM32" }
];

let cart = [];

// ===============================
// ELEMENTS
// ===============================
const grid = document.getElementById("products-grid");
const cartBox = document.getElementById("cart");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const overlay = document.getElementById("overlay");

const registerModal = document.getElementById("register-modal");
const registerBtn = document.getElementById("register-btn");
const registerForm = document.getElementById("register-form");
const registerMessage = document.getElementById("register-message");

const subscribeEmail = document.getElementById("subscribe-email");
const subscribeBtn = document.getElementById("subscribe-btn");

function formatCurrency(value) {
  return `PHP ${Number(value).toLocaleString()}`;
}

// ===============================
// LOAD PRODUCTS
// ===============================
function loadProducts(list) {
  if (!grid) return;
  grid.innerHTML = "";

  list.forEach((p) => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p class="price">${formatCurrency(p.price)}</p>
      <button class="add-btn" data-id="${p.id}">Add to Cart</button>
    `;

    grid.appendChild(card);
  });
}

// ===============================
// FILTER
// ===============================
function filterProducts(cat) {
  loadProducts(products.filter((p) => p.category === cat));
}

// ===============================
// CART FUNCTIONS
// ===============================
function addToCart(id) {
  const item = cart.find((i) => i.id === id);
  if (item) item.qty++;
  else cart.push({ ...products.find((p) => p.id === id), qty: 1 });
  renderCart();
  openCart();
}

function increaseQty(i) {
  cart[i].qty++;
  renderCart();
}

function decreaseQty(i) {
  if (cart[i].qty > 1) cart[i].qty--;
  else cart.splice(i, 1);
  renderCart();
}

function removeItem(i) {
  cart.splice(i, 1);
  renderCart();
}

// ===============================
// RENDER CART
// ===============================
function renderCart() {
  if (!cartItems || !cartTotal || !cartCount) return;

  cartItems.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
  }

  cart.forEach((item, i) => {
    total += item.price * item.qty;

    const li = document.createElement("li");
    li.classList.add("cart-item");

    li.innerHTML = `
      <span>${item.name} - ${formatCurrency(item.price)}</span>
      <div class="qty-control">
        <button class="decrease" data-index="${i}">-</button>
        <input type="text" value="${item.qty}" readonly>
        <button class="increase" data-index="${i}">+</button>
        <button class="remove-btn remove" data-index="${i}">x</button>
      </div>
    `;

    cartItems.appendChild(li);
  });

  cartTotal.innerText = Number(total).toLocaleString();
  cartCount.innerText = cart.reduce((a, b) => a + b.qty, 0);
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ===============================
// LOAD SAVED CART
// ===============================
function loadCart() {
  const saved = localStorage.getItem("cart");
  if (saved) {
    cart = JSON.parse(saved);
    renderCart();
  }
}

// ===============================
// CART OPEN / CLOSE
// ===============================
function openCart() {
  if (!cartBox || !overlay) return;
  cartBox.classList.add("open");
  overlay.classList.add("active");
}

function closeCart() {
  if (!cartBox || !overlay) return;
  cartBox.classList.remove("open");
  overlay.classList.remove("active");
}

const cartBtn = document.getElementById("cart-btn");
if (cartBtn) {
  cartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openCart();
  });
}

if (overlay) overlay.addEventListener("click", closeCart);

// ===============================
// EVENT DELEGATION
// ===============================
if (grid) {
  grid.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-btn")) {
      const id = parseInt(e.target.dataset.id, 10);
      if (Number.isNaN(id)) return;
      addToCart(id);

      e.target.innerText = "Added!";
      e.target.style.background = "#00F5FF";

      setTimeout(() => {
        e.target.innerText = "Add to Cart";
        e.target.style.background = "#2563EB";
      }, 800);
    }
  });
}

if (cartItems) {
  cartItems.addEventListener("click", (e) => {
    const index = parseInt(e.target.dataset.index, 10);
    if (Number.isNaN(index)) return;

    if (e.target.classList.contains("increase")) increaseQty(index);
    if (e.target.classList.contains("decrease")) decreaseQty(index);
    if (e.target.classList.contains("remove")) removeItem(index);
  });
}

// ===============================
// BUTTON BINDINGS
// ===============================
function scrollToProducts() {
  const section = document.querySelector(".section");
  if (section) section.scrollIntoView({ behavior: "smooth" });
}

function bindClick(id, handler) {
  const el = document.getElementById(id);
  if (!el) return;

  el.addEventListener("click", (e) => {
    e.preventDefault();
    handler();
  });
}

bindClick("shop-now-btn", scrollToProducts);
bindClick("hero-shop-now", scrollToProducts);

bindClick("explore-boards-btn", () => {
  filterProducts("Microcontrollers");
  scrollToProducts();
});

bindClick("hero-explore-boards", () => {
  filterProducts("Microcontrollers");
  scrollToProducts();
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", (e) => {
    const text = (e.target.textContent || "").trim().toLowerCase();
    if (text === "shop") {
      e.preventDefault();
      scrollToProducts();
    }
    if (text === "boards" || text === "processors") {
      e.preventDefault();
      filterProducts("Microcontrollers");
      scrollToProducts();
    }
  });
});

// ===============================
// REGISTER MODAL + REGISTER
// ===============================
if (registerBtn && registerModal) {
  const closeModalBtn = registerModal.querySelector(".close-modal");

  registerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    registerModal.style.display = "block";
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
      registerModal.style.display = "none";
    });
  }

  window.addEventListener("click", (e) => {
    if (e.target === registerModal) {
      registerModal.style.display = "none";
    }
  });
}

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(registerForm);
    if (registerMessage) registerMessage.textContent = "Registering...";

    try {
      const response = await fetch("register.php", {
        method: "POST",
        body: formData
      });
      const data = await response.json();

      if (registerMessage) {
        registerMessage.textContent = data.message || "Done.";
        registerMessage.style.color = data.success ? "#10B981" : "#EF4444";
      }

      if (data.success) registerForm.reset();
    } catch (err) {
      if (registerMessage) {
        registerMessage.textContent = "Registration request failed.";
        registerMessage.style.color = "#EF4444";
      }
    }
  });
}

// ===============================
// SUBSCRIBE
// ===============================
if (subscribeBtn && subscribeEmail) {
  subscribeBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = subscribeEmail.value.trim();

    if (!email) {
      alert("Please enter your email.");
      subscribeEmail.focus();
      return;
    }

    const body = new URLSearchParams({ email });
    try {
      const response = await fetch("subscibe.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString()
      });
      const data = await response.json();
      alert(data.message || "Subscription completed.");
      if (data.success) subscribeEmail.value = "";
    } catch (err) {
      alert("Subscription request failed.");
    }
  });
}

// ===============================
// INIT
// ===============================
loadProducts(products);
loadCart();
