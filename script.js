// --------------------- ScrollReveal ---------------------
if (typeof ScrollReveal !== "undefined") {
    ScrollReveal().reveal('body *:not(nav):not(.menu)', {
        duration: 800,
        distance: '40px',
        origin: 'bottom',
        easing: 'ease-out',
        reset: false
    });
}

// Keep scroll manual
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'; 
}

// --------------------- Cart Count ---------------------
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCount = document.getElementById("cart-count");
  if (!cartCount) return;
  if (totalQty > 0) {
    cartCount.style.display = "inline-flex";
    cartCount.textContent = totalQty;
  } else {
    cartCount.style.display = "none";
    cartCount.textContent = "0";
  }
}

// --------------------- Add to Cart ---------------------
document.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON" && e.target.textContent.includes("Add to Cart")) {
    const cartItem = e.target.closest(".cart");
    const name = cartItem.querySelector("h2").textContent;
    const price = parseFloat(cartItem.querySelector("p").textContent);
    const image = cartItem.querySelector("img").src;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name, price, image, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("✔ Item added to cart successfully!");
    updateCartCount();
  }
});

// --------------------- Render Cart Page ---------------------
window.addEventListener("load", () => {
  updateCartCount();

  const cartListEl = document.getElementById("cart-list");
  const cartTotalEl = document.getElementById("cart-total");
  const sendBtn = document.getElementById("send-order-btn");

  if (!cartListEl) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    cartListEl.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      cartListEl.innerHTML = "<li>The cart is empty</li>";
      cartTotalEl.textContent = "0 ";
      return;
    }

    cart.forEach((item, index) => {
      total += item.price * item.quantity;
      const li = document.createElement("li");
      li.style.display = "flex";
      li.style.justifyContent = "space-between";
      li.style.alignItems = "center";
      li.style.marginBottom = "10px";

      li.innerHTML = `
        <div style="display:flex;align-items:center;gap:10px;">
          <img src="${item.image}" class="cart-thumb">
          <div>
            <h3>${item.name}</h3>
            <p>${item.price} USD</p>
          </div>
        </div>
        <div style="display:flex; gap:5px; align-items:center;">
          <button class="decrease-btn" data-index="${index}" style="padding:5px 8px;">-</button>
          <span style="font-weight:600;">${item.quantity}</span>
          <button class="increase-btn" data-index="${index}" style="padding:5px 8px;">+</button>
          <button class="remove-btn" data-index="${index}" style="background:#e74c3c;color:#fff;border:none;padding:5px 8px;border-radius:4px; cursor:pointer;">Remove</button>
        </div>
      `;
      cartListEl.appendChild(li);
    });

    cartTotalEl.textContent = total.toFixed(2) + " USD";
  }

  renderCart();

  // --------------------- Increase / Decrease / Remove ---------------------
  cartListEl.addEventListener("click", (e) => {
    const index = e.target.dataset.index;
    if (e.target.classList.contains("remove-btn")) {
      cart.splice(index, 1);
    } else if (e.target.classList.contains("increase-btn")) {
      cart[index].quantity += 1;
    } else if (e.target.classList.contains("decrease-btn")) {
      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
      } else {
        cart.splice(index, 1);
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateCartCount();
  });

  // --------------------- Send Order ---------------------
if (sendBtn) {
  sendBtn.addEventListener("click", () => {
    const tableInput = document.getElementById("table-number");
    const table = tableInput?.value?.trim();

    if (!table || Number(table) < 1) { 
      alert("🚨 Please enter a valid table number"); 
      return; 
    }

    if (cart.length === 0) { 
      alert("🧺 The cart is empty"); 
      return; 
    }
        localStorage.removeItem("cart");
    cart = [];
    renderCart();
    updateCartCount();

    // Alert confirmation
    // alert(`✅ Your order has been sent to the kitchen!\nTable: ${table}`);

    // Redirect to confirmation page
    window.location.href = "confirm.html";
  });
}
});