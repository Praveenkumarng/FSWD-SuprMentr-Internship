/* =============================================
   PRODUCT DATA
============================================= */
console.log("!!! ShopVerse Script V123 Loaded !!!");
document.body.style.borderTop = "4px solid #6c63ff";
const PRODUCTS = [
  {
    id: 1,
    name: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    category: "Electronics",
    price: 349,
    originalPrice: 399,
    rating: 4.8,
    reviews: 2341,
    badge: "hot",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
  },
  {
    id: 2,
    name: "Apple MacBook Air M2 13-inch Laptop",
    category: "Electronics",
    price: 1099,
    originalPrice: 1199,
    rating: 4.9,
    reviews: 5892,
    badge: "new",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80",
  },
  {
    id: 3,
    name: "Samsung 4K QLED Smart TV 55\"",
    category: "Electronics",
    price: 799,
    originalPrice: 1099,
    rating: 4.6,
    reviews: 1123,
    badge: "sale",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&q=80",
  },
  {
    id: 4,
    name: "Nike Air Max 270 Running Shoes",
    category: "Sports",
    price: 129,
    originalPrice: 159,
    rating: 4.5,
    reviews: 3890,
    badge: "sale",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
  },
  {
    id: 5,
    name: "Levi's 512 Slim Taper Jeans",
    category: "Clothing",
    price: 59,
    originalPrice: 79,
    rating: 4.3,
    reviews: 765,
    badge: null,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80",
  },
  {
    id: 6,
    name: "Atomic Habits — James Clear",
    category: "Books",
    price: 14,
    originalPrice: 20,
    rating: 4.9,
    reviews: 12500,
    badge: "hot",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80",
  },
  {
    id: 7,
    name: "KitchenAid Stand Mixer 5.5 Qt",
    category: "Home",
    price: 349,
    originalPrice: 449,
    rating: 4.7,
    reviews: 4210,
    badge: "sale",
    image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400&q=80",
  },
  {
    id: 8,
    name: "Yoga Elite Premium Mat — 6mm",
    category: "Sports",
    price: 68,
    originalPrice: 89,
    rating: 4.6,
    reviews: 931,
    badge: "new",
    image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=400&q=80",
  },
  {
    id: 9,
    name: "The Psychology of Money — Morgan Housel",
    category: "Books",
    price: 13,
    originalPrice: 18,
    rating: 4.8,
    reviews: 8730,
    badge: null,
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&q=80",
  },
  {
    id: 10,
    name: "Uniqlo Ultra Light Down Jacket",
    category: "Clothing",
    price: 89,
    originalPrice: 109,
    rating: 4.4,
    reviews: 2103,
    badge: "limited",
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&q=80",
  },
  {
    id: 11,
    name: "Philips Hue Smart LED Bulb Starter Kit",
    category: "Home",
    price: 179,
    originalPrice: 199,
    rating: 4.5,
    reviews: 3341,
    badge: "new",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
  },
  {
    id: 12,
    name: "iPad Pro 11-inch M2 with Apple Pencil",
    category: "Electronics",
    price: 899,
    originalPrice: 999,
    rating: 4.8,
    reviews: 6720,
    badge: "new",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80",
  },
  {
    id: 13,
    name: "Wilson Pro Staff Tennis Racket",
    category: "Sports",
    price: 220,
    originalPrice: 269,
    rating: 4.7,
    reviews: 587,
    badge: null,
    image: "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&q=80",
  },
  {
    id: 14,
    name: "Dyson V15 Detect Cordless Vacuum",
    category: "Home",
    price: 649,
    originalPrice: 749,
    rating: 4.6,
    reviews: 2980,
    badge: "sale",
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400&q=80",
  },
  {
    id: 15,
    name: "The Alchemist — Paulo Coelho",
    category: "Books",
    price: 10,
    originalPrice: 14,
    rating: 4.7,
    reviews: 19400,
    badge: null,
    image: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=400&q=80",
  },
  {
    id: 16,
    name: "Adidas Ultraboost 22 Running Shoes",
    category: "Sports",
    price: 180,
    originalPrice: 220,
    rating: 4.6,
    reviews: 4120,
    badge: "limited",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&q=80",
  },
];

/* =============================================
   CONSTANTS & STATE
============================================= */
const CATEGORIES = [
  { label: "All",         icon: "🛍️" },
  { label: "Electronics", icon: "💻" },
  { label: "Clothing",    icon: "👗" },
  { label: "Books",       icon: "📚" },
  { label: "Home",        icon: "🏠" },
  { label: "Sports",      icon: "⚽" },
];

const RATING_OPTIONS = [
  { label: "4★ & up", min: 4 },
  { label: "3★ & up", min: 3 },
  { label: "2★ & up", min: 2 },
  { label: "Any",     min: 0 },
];

let filterState = {
  search: "",
  category: "All",
  maxPrice: 1200,
  sort: "default",
  minRating: 0,
};

let cartItems = []; // Array of { id, quantity }
let wishlist = new Set();

/* =============================================
   DOM ELEMENTS
============================================= */
const grid          = document.getElementById("product-grid");
const emptyState    = document.getElementById("empty-state");
const resultsCount  = document.getElementById("results-count");
const searchInput   = document.getElementById("search-input");
const priceRange    = document.getElementById("price-range");
const priceMaxLabel = document.getElementById("price-max-label");
const priceMinLabel = document.getElementById("price-min-label");
const sortSelect    = document.getElementById("sort-select");
const clearBtn      = document.getElementById("clear-btn");
const cartCountEl   = document.getElementById("cart-count");
const cartBadge     = document.getElementById("cart-toggle-btn");
const catPillsEl    = document.getElementById("category-pills");
const ratingFilterEl= document.getElementById("rating-filter");
const toast         = document.getElementById("toast");
const sidebar       = document.getElementById("sidebar");
const toggleSidebar = document.getElementById("toggle-sidebar");

// Cart Drawer Elements
const cartDrawer    = document.getElementById("cart-drawer");
const cartOverlay   = document.getElementById("cart-overlay");
const closeCartBtn  = document.getElementById("close-cart");
const cartContainer = document.getElementById("cart-items-container");
const cartSubtotal  = document.getElementById("cart-subtotal");
const cartTotalEl   = document.getElementById("cart-total");
const checkoutBtn   = document.getElementById("checkout-btn");
const startShopping = document.getElementById("start-shopping");

/* =============================================
   INIT
============================================= */
function init() {
  buildCategoryPills();
  buildRatingOptions();
  updatePriceSlider();
  renderProducts();
  renderCart();
}

/* =============================================
   BUILD UI CONTROLS
============================================= */
function buildCategoryPills() {
  catPillsEl.innerHTML = "";
  CATEGORIES.forEach(({ label, icon }) => {
    const count = label === "All"
      ? PRODUCTS.length
      : PRODUCTS.filter(p => p.category === label).length;

    const btn = document.createElement("button");
    btn.className = "cat-pill" + (filterState.category === label ? " active" : "");
    btn.id = `cat-${label.toLowerCase()}`;
    btn.innerHTML = `
      <span class="pill-icon">${icon}</span>
      <span>${label}</span>
      <span class="cat-count">${count}</span>
    `;
    btn.addEventListener("click", () => {
      filterState.category = label;
      document.querySelectorAll(".cat-pill").forEach(p => p.classList.remove("active"));
      btn.classList.add("active");
      renderProducts();
    });
    catPillsEl.appendChild(btn);
  });
}

function buildRatingOptions() {
  ratingFilterEl.innerHTML = "";
  RATING_OPTIONS.forEach(({ label, min }) => {
    const stars = min > 0 ? "★".repeat(min) + "☆".repeat(5 - min) : "★★★★★";
    const btn = document.createElement("button");
    btn.className = "rating-option" + (filterState.minRating === min ? " active" : "");
    btn.innerHTML = `<span class="stars">${stars}</span><span>${label}</span>`;
    btn.addEventListener("click", () => {
      filterState.minRating = min;
      document.querySelectorAll(".rating-option").forEach(r => r.classList.remove("active"));
      btn.classList.add("active");
      renderProducts();
    });
    ratingFilterEl.appendChild(btn);
  });
}

/* =============================================
   FILTER HELPERS
============================================= */
function getFilteredProducts() {
  let results = PRODUCTS.slice();

  // Search
  const q = filterState.search.toLowerCase().trim();
  if (q) {
    results = results.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  // Category
  if (filterState.category !== "All") {
    results = results.filter(p => p.category === filterState.category);
  }

  // Price
  results = results.filter(p => p.price <= filterState.maxPrice);

  // Rating
  if (filterState.minRating > 0) {
    results = results.filter(p => p.rating >= filterState.minRating);
  }

  // Sort
  switch (filterState.sort) {
    case "price-asc":
      results.sort((a, b) => a.price - b.price); break;
    case "price-desc":
      results.sort((a, b) => b.price - a.price); break;
    case "rating-desc":
      results.sort((a, b) => b.rating - a.rating); break;
    case "name-asc":
      results.sort((a, b) => a.name.localeCompare(b.name)); break;
    default:
      break;
  }

  return results;
}

/* =============================================
   RENDER PRODUCTS
============================================= */
function renderProducts() {
  const products = getFilteredProducts();

  if (products.length === 0) {
    grid.innerHTML = "";
    grid.hidden = true;
    emptyState.hidden = false;
    resultsCount.innerHTML = `Showing <strong>0</strong> of ${PRODUCTS.length} products`;
    return;
  }

  grid.hidden = false;
  emptyState.hidden = true;
  resultsCount.innerHTML = `Showing <strong>${products.length}</strong> of ${PRODUCTS.length} products`;

  grid.innerHTML = products.map((p, i) => buildCard(p, i)).join("");

  // Re-attach add-to-cart listeners
  grid.querySelectorAll(".add-cart-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = Number(btn.dataset.id);
      addToCart(id);
    });
  });

  // Re-attach wishlist listeners
  grid.querySelectorAll(".wishlist-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = Number(btn.dataset.id);
      toggleWishlist(id, btn);
    });
    const id = Number(btn.dataset.id);
    if (wishlist.has(id)) btn.classList.add("liked");
  });
}

function buildCard(p, index) {
  const ratingStars = starsHtml(p.rating);
  const badgeHtml = p.badge
    ? `<span class="card-badge badge-${p.badge}">${p.badge}</span>`
    : "";
  const originalHtml = p.originalPrice > p.price
    ? `<span class="price-original">$${p.originalPrice}</span>`
    : "";

  return `
    <article class="product-card" id="card-${p.id}" aria-label="${p.name}">
      <div class="card-img-wrap">
        <img src="${p.image}" alt="${p.name}" loading="lazy" />
        ${badgeHtml}
        <button class="wishlist-btn" data-id="${p.id}" aria-label="Wishlist ${p.name}">♡</button>
      </div>
      <div class="card-body">
        <span class="card-category">${p.category}</span>
        <p class="card-name">${p.name}</p>
        <div class="card-rating">
          <span class="card-stars">${ratingStars}</span>
          <span class="card-reviews">(${p.reviews.toLocaleString()})</span>
        </div>
        <div class="card-footer">
          <div class="card-price">
            <span class="price-current">$${p.price}</span>
            ${originalHtml}
          </div>
          <button class="add-cart-btn" data-id="${p.id}">+ Add</button>
        </div>
      </div>
    </article>
  `;
}

function starsHtml(rating) {
  let html = "";
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) html += "★";
    else if (rating >= i - 0.5) html += "½";
    else html += "☆";
  }
  return html;
}

/* =============================================
   CART LOGIC
============================================= */
function toggleCart() {
  console.log("ToggleCart called. Drawer:", cartDrawer);
  if (!cartDrawer) {
    console.error("Cart drawer element not found!");
    return;
  }
  cartDrawer.classList.toggle("open");
  cartOverlay.classList.toggle("open");
  console.log("Cart drawer classes:", cartDrawer.classList.toString());
}

function addToCart(id) {
  console.log("Adding product to cart:", id);
  const existing = cartItems.find(item => item.id === id);
  if (existing) {
// ...
    existing.quantity++;
  } else {
    cartItems.push({ id, quantity: 1 });
  }

  const product = PRODUCTS.find(p => p.id === id);
  updateCartUI();
  showToast(`🛒 Added "${product.name.slice(0, 25)}…" to cart`);

  // Open cart automatically if not already open
  if (!cartDrawer.classList.contains("open")) {
    toggleCart();
  }
}

function updateQuantity(id, delta) {
  const item = cartItems.find(i => i.id === id);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(id);
  } else {
    updateCartUI();
  }
}

function removeFromCart(id) {
  cartItems = cartItems.filter(item => item.id !== id);
  updateCartUI();
}

function updateCartUI() {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  cartCountEl.textContent = totalItems;
  cartCountEl.classList.remove("bump");
  void cartCountEl.offsetWidth;
  cartCountEl.classList.add("bump");

  renderCart();
}

function renderCart() {
  if (cartItems.length === 0) {
    cartContainer.innerHTML = `
      <div class="empty-cart-msg">
        <p>Your cart is empty.</p>
        <button class="clear-btn" id="start-shopping-inner">Start Shopping</button>
      </div>
    `;
    cartSubtotal.textContent = "$0.00";
    cartTotalEl.textContent = "$0.00";
    checkoutBtn.disabled = true;

    const startBtn = document.getElementById("start-shopping-inner");
    if (startBtn) startBtn.onclick = toggleCart;
    return;
  }

  let subtotal = 0;
  cartContainer.innerHTML = cartItems.map(item => {
    const p = PRODUCTS.find(prod => prod.id === item.id);
    const itemTotal = p.price * item.quantity;
    subtotal += itemTotal;

    return `
      <div class="cart-item">
        <img src="${p.image}" alt="${p.name}" class="cart-item-img" />
        <div class="cart-item-info">
          <p class="cart-item-name">${p.name}</p>
          <p class="cart-item-price">$${p.price}</p>
          <div class="cart-item-controls">
            <button class="qty-btn" onclick="updateQuantity(${p.id}, -1)">–</button>
            <span class="item-qty">${item.quantity}</span>
            <button class="qty-btn" onclick="updateQuantity(${p.id}, 1)">+</button>
            <button class="remove-item" onclick="removeFromCart(${p.id})">Remove</button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
  cartTotalEl.textContent = `$${subtotal.toFixed(2)}`;
  checkoutBtn.disabled = false;
}

/* =============================================
   INTERACTIONS
============================================= */
function clearFilters() {
  filterState = { search: "", category: "All", maxPrice: 1200, sort: "default", minRating: 0 };
  searchInput.value = "";
  priceRange.value = priceRange.max;
  sortSelect.value = "default";
  updatePriceSlider();
  buildCategoryPills();
  buildRatingOptions();
  renderProducts();
}

/* Price slider gradient fill */
function updatePriceSlider() {
  const max = Number(priceRange.max);
  const val = Number(priceRange.value);
  const pct = (val / max) * 100;
  priceRange.style.setProperty("--pct", pct + "%");
  priceMaxLabel.textContent = "$" + val;
  priceMinLabel.textContent = "$0";
}

/* Toast helper */
let toastTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

function toggleWishlist(id, btn) {
  if (wishlist.has(id)) {
    wishlist.delete(id);
    btn.textContent = "♡";
    btn.classList.remove("liked");
  } else {
    wishlist.add(id);
    btn.textContent = "♥";
    btn.classList.add("liked");
  }
}

/* =============================================
   EVENT LISTENERS
============================================= */
searchInput.addEventListener("input", () => {
  filterState.search = searchInput.value;
  renderProducts();
});

priceRange.addEventListener("input", () => {
  filterState.maxPrice = Number(priceRange.value);
  updatePriceSlider();
  renderProducts();
});

sortSelect.addEventListener("change", () => {
  filterState.sort = sortSelect.value;
  renderProducts();
});

clearBtn.addEventListener("click", clearFilters);

toggleSidebar.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

// Cart Listeners
cartBadge.addEventListener("click", toggleCart);
closeCartBtn.addEventListener("click", toggleCart);
cartOverlay.addEventListener("click", toggleCart);
checkoutBtn.addEventListener("click", () => {
  showToast("🚀 Checkout coming soon!");
});

// Close sidebar when clicking outside on mobile
document.addEventListener("click", (e) => {
  if (
    window.innerWidth <= 900 &&
    sidebar.classList.contains("open") &&
    !sidebar.contains(e.target) &&
    !toggleSidebar.contains(e.target)
  ) {
    sidebar.classList.remove("open");
  }
});

/* =============================================
   START
============================================= */
init();
