const filterButtons = document.querySelectorAll(".filters button");
const cards = document.querySelectorAll(".products .card");
const loading = document.getElementById("loading");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {

    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    // 🔥 SHOW LOADING
    loading.style.display = "grid";
    cards.forEach(card => card.style.display = "none");

    // Simulate loading delay (like Facebook)
    setTimeout(() => {

      loading.style.display = "none";

      cards.forEach(card => {
        const category = card.dataset.category || "";

        if (filter === "all" || category.includes(filter)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });

    }, 700); // 0.7s loading animation

  });
});
const cartButtons = document.querySelectorAll(".cart-btn");
const cartSidebar = document.getElementById("cartSidebar");
const cartIcon = document.getElementById("cartIcon");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const toast = document.getElementById("toast");

let cart = JSON.parse(localStorage.getItem("fireflyCart")) || [];

cartButtons.forEach(button => {
  button.addEventListener("click", (e) => {

    const card = e.target.closest(".card");
    flyToCart(card);

    const name = card.querySelector("h3").innerText;
    const price = card.querySelector(".price").innerText;

    cart.push({ name, price });

    updateCart();
    showToast(name);
    
  });
});

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const numericPrice = parseFloat(item.price.replace(/[^\d.]/g, "")) || 0;
    total += numericPrice;

    cartItems.innerHTML += `
      <div class="cart-item">
        <div>
          <p class="cart-item-name">${item.name}</p>
          <small>${item.price}</small>
        </div>
        <button class="remove-btn" onclick="removeItem(${index})">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;
  });

  cartCount.innerText = cart.length;
  document.getElementById("cartTotal").innerText = 
    "Total: Rs. " + total.toFixed(2);
    localStorage.setItem("fireflyCart", JSON.stringify(cart));
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}


cartIcon.addEventListener("click", () => {
  cartSidebar.classList.add("active");
});

closeCart.addEventListener("click", () => {
  cartSidebar.classList.remove("active");
});

function showToast(productName) {
  const toastText = document.getElementById("toastText");
  toastText.innerText = productName + " added to cart";

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

function flyToCart(card) {

  const img = card.querySelector("img");
  const cart = document.getElementById("cartIcon");

  const imgRect = img.getBoundingClientRect();
  const cartRect = cart.getBoundingClientRect();

  // Clone image
  const flyingImg = img.cloneNode(true);
  flyingImg.classList.add("flying-img");

  document.body.appendChild(flyingImg);

  // Starting position
  flyingImg.style.left = imgRect.left + "px";
  flyingImg.style.top = imgRect.top + "px";
  flyingImg.style.width = imgRect.width + "px";
  flyingImg.style.height = imgRect.height + "px";

  // Trigger reflow
  void flyingImg.offsetWidth;

  // Ending position
  flyingImg.style.left = cartRect.left + "px";
  flyingImg.style.top = cartRect.top + "px";
  flyingImg.style.width = "20px";
  flyingImg.style.height = "20px";
  flyingImg.style.opacity = "0.5";

  // Remove after animation
  setTimeout(() => {
    flyingImg.remove();

    // Cart bounce after landing
    cart.classList.remove("bounce");
    void cart.offsetWidth;
    cart.classList.add("bounce");

  }, 800);
}
document.getElementById("clearCart").addEventListener("click", () => {
  cart = [];
  updateCart();
});

// Restore cart when page loads
updateCart();
