const filterButtons = document.querySelectorAll(".filters button");
const cards = document.querySelectorAll(".products .card");
const loading = document.getElementById("loading");
const GST_RATE = 0.00;       // 18% GST
const DISCOUNT_RATE = 0.10; // 10% discount (change anytime)
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
    const priceEl = card.querySelector(".price");
const price = parseFloat(priceEl.dataset.price);

    cart.push({ name, price });

    updateCart();
    showToast(name);
    
  });
});

function updateCart() {
  cartItems.innerHTML = "";

  let subtotal = 0;

  cart.forEach((item, index) => {
    subtotal += item.price;

    cartItems.innerHTML += `
      <div class="cart-item">
        <div>
          <p class="cart-item-name">${item.name}</p>
          <small>Rs. ${item.price.toFixed(2)}</small>
        </div>
        <button class="remove-btn" onclick="removeItem(${index})">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;
  });
  

  // 💸 Discount
  const discount = subtotal * DISCOUNT_RATE;
  // const discount = FLAT_DISCOUNT; // use this instead if flat

  // 🧾 GST
  const gst = (subtotal - discount) * GST_RATE;

  // ✅ Final total
  const total = subtotal - discount + gst;

  // UI update
  cartCount.innerText = cart.length;
  document.getElementById("cartSubtotal").innerText =
    `Subtotal: Rs. ${subtotal.toFixed(2)}`;

  document.getElementById("cartDiscount").innerText =
    `Discount: -Rs. ${discount.toFixed(2)}`;

  document.getElementById("cartGST").innerText =
    `GST (18%): Rs. ${gst.toFixed(2)}`;

  document.getElementById("cartTotal").innerHTML =
    `<strong>Total: Rs. ${total.toFixed(2)}</strong>`;

  // Save cart
  localStorage.setItem("fireflyCart", JSON.stringify(cart));
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
const checkoutBtn = document.querySelector(".checkout-btn");
const invoiceOverlay = document.getElementById("invoiceOverlay");
const invoiceItems = document.getElementById("invoiceItems");

checkoutBtn.addEventListener("click", () => {

  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  // Billing data
  const name = document.getElementById("billName").value.trim();
  const phone = document.getElementById("billPhone").value.trim();
  const address = document.getElementById("billAddress").value.trim();
  const city = document.getElementById("billCity").value.trim();

  if (!name || !phone || !address || !city) {
    alert("Please fill billing details");
    return;
  }

  // Fill invoice billing
  document.getElementById("invName").innerText = name;
  document.getElementById("invPhone").innerText = phone;
  document.getElementById("invAddress").innerText =
    `${address}, ${city}`;

  // Date & invoice number
  document.getElementById("invoiceDate").innerText =
    new Date().toLocaleDateString();

  document.getElementById("invoiceNumber").innerText =
    Math.floor(Math.random() * 100000);

  invoiceItems.innerHTML = "";

  let subtotal = 0;

  cart.forEach(item => {
    subtotal += item.price;
    invoiceItems.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td align="right">${item.price.toFixed(2)}</td>
      </tr>
    `;
  });
  function removeItem(index) {
  cart.splice(index, 1);   // remove from array
  updateCart();            // refresh cart
}


  const discount = subtotal * DISCOUNT_RATE;
  const gst = (subtotal - discount) * GST_RATE;
  const total = subtotal - discount + gst;

  document.getElementById("invSubtotal").innerText = `Rs. ${subtotal.toFixed(2)}`;
  document.getElementById("invDiscount").innerText = `-Rs. ${discount.toFixed(2)}`;
  document.getElementById("invGST").innerText = `Rs. ${gst.toFixed(2)}`;
  document.getElementById("invTotal").innerText = `Rs. ${total.toFixed(2)}`;

  invoiceOverlay.classList.add("show");
});
// Close invoice
document.getElementById("closeInvoice").addEventListener("click", () => {
  invoiceOverlay.classList.remove("show");
document.body.classList.remove("invoice-open");
});
function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

document.getElementById("whatsappOrder").addEventListener("click", () => {

  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }


  // Billing
  const name = document.getElementById("billName").value.trim();
  const phone = document.getElementById("billPhone").value.trim();
  const address = document.getElementById("billAddress").value.trim();
  const city = document.getElementById("billCity").value.trim();

  if (!name || !phone || !address || !city) {
    alert("Please fill billing details");
    return;
  }

  let message = `🧾 *New Order – Firefly Electrical*\n\n`;
  message += `👤 Name: ${name}\n`;
  message += `📞 Phone: ${phone}\n`;
  message += `📍 Address: ${address}, ${city}\n\n`;
  message += `🛒 *Items*\n`;

  let subtotal = 0;

  cart.forEach(item => {
    subtotal += item.price;
    message += `• ${item.name} - Rs. ${item.price.toFixed(2)}\n`;
  });

  const discount = subtotal * DISCOUNT_RATE;
  const gst = (subtotal - discount) * GST_RATE;
  const total = subtotal - discount + gst;

  message += `\n💰 Subtotal: Rs. ${subtotal.toFixed(2)}`;
  message += `\n🔻 Discount: Rs. ${discount.toFixed(2)}`;
  message += `\n🧾 GST (18%): Rs. ${gst.toFixed(2)}`;
  message += `\n\n✅ *Total: Rs. ${total.toFixed(2)}*`;

  const whatsappURL =
    `https://wa.me/94704000400?text=${encodeURIComponent(message)}`;

  window.open(whatsappURL, "_blank");
});
