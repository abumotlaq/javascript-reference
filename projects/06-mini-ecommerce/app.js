
const STORAGE_KEY = "javascript-reference-mini-store-cart";

const TAX_RATE = 0.1;
const SHIPPING_COST = 10;
const FREE_SHIPPING_THRESHOLD = 100;

const products = [
  {
    id: 1,
    name: "Mechanical Keyboard",
    category: "electronics",
    price: 89.99,
    emoji: "⌨️",
    description: "Compact mechanical keyboard with tactile switches."
  },
  {
    id: 2,
    name: "Wireless Mouse",
    category: "electronics",
    price: 39.99,
    emoji: "🖱️",
    description: "Ergonomic wireless mouse with adjustable tracking."
  },
  {
    id: 3,
    name: "Laptop Stand",
    category: "office",
    price: 49.99,
    emoji: "💻",
    description: "Adjustable aluminum stand for a comfortable setup."
  },
  {
    id: 4,
    name: "Desk Lamp",
    category: "office",
    price: 29.99,
    emoji: "💡",
    description: "Minimal LED desk lamp with adjustable brightness."
  },
  {
    id: 5,
    name: "Coffee Mug",
    category: "lifestyle",
    price: 14.99,
    emoji: "☕",
    description: "Simple ceramic mug for your daily coffee."
  },
  {
    id: 6,
    name: "Notebook",
    category: "lifestyle",
    price: 12.99,
    emoji: "📓",
    description: "Hardcover notebook for notes and planning."
  },
  {
    id: 7,
    name: "Backpack",
    category: "lifestyle",
    price: 64.99,
    emoji: "🎒",
    description: "Lightweight backpack with multiple compartments."
  },
  {
    id: 8,
    name: "USB-C Hub",
    category: "electronics",
    price: 54.99,
    emoji: "🔌",
    description: "Multi-port USB-C hub for modern laptops."
  },
  {
    id: 9,
    name: "Desk Mat",
    category: "office",
    price: 24.99,
    emoji: "🖥️",
    description: "Large desk mat for keyboard and mouse setups."
  },
  {
    id: 10,
    name: "Headphones",
    category: "electronics",
    price: 119.99,
    emoji: "🎧",
    description: "Over-ear headphones with noise isolation."
  },
  {
    id: 11,
    name: "Water Bottle",
    category: "lifestyle",
    price: 19.99,
    emoji: "🧴",
    description: "Reusable insulated bottle for everyday use."
  },
  {
    id: 12,
    name: "Webcam",
    category: "electronics",
    price: 74.99,
    emoji: "📷",
    description: "Full HD webcam for calls and recordings."
  }
];

const categoryLabels = {
  all: "All",
  electronics: "Electronics",
  office: "Office",
  lifestyle: "Lifestyle"
};

const searchInput =
  document.querySelector("#searchInput");

const sortSelect =
  document.querySelector("#sortSelect");

const categoryFilters =
  document.querySelector("#categoryFilters");

const catalogMessage =
  document.querySelector("#catalogMessage");

const productGrid =
  document.querySelector("#productGrid");

const cartButton =
  document.querySelector("#cartButton");

const cartCount =
  document.querySelector("#cartCount");

const cartOverlay =
  document.querySelector("#cartOverlay");

const cartPanel =
  document.querySelector("#cartPanel");

const closeCartButton =
  document.querySelector("#closeCartButton");

const cartItems =
  document.querySelector("#cartItems");

const emptyCart =
  document.querySelector("#emptyCart");

const subtotalElement =
  document.querySelector("#subtotal");

const shippingElement =
  document.querySelector("#shipping");

const taxElement =
  document.querySelector("#tax");

const totalElement =
  document.querySelector("#total");

const checkoutButton =
  document.querySelector("#checkoutButton");

const checkoutModal =
  document.querySelector("#checkoutModal");

const closeModalButton =
  document.querySelector("#closeModalButton");

const checkoutForm =
  document.querySelector("#checkoutForm");

const checkoutError =
  document.querySelector("#checkoutError");

const toast =
  document.querySelector("#toast");

let currentCategory = "all";
let currentSearch = "";
let currentSort = "featured";
let cart = loadCart();
let toastTimeoutId = null;

const currencyFormatter =
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  });

function loadCart() {
  try {
    const savedCart =
      localStorage.getItem(STORAGE_KEY);

    if (!savedCart) {
      return [];
    }

    const parsedCart =
      JSON.parse(savedCart);

    return Array.isArray(parsedCart)
      ? parsedCart
      : [];
  } catch (error) {
    console.error(
      "Failed to load cart:",
      error
    );

    return [];
  }
}

function saveCart() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(cart)
    );
  } catch (error) {
    console.error(
      "Failed to save cart:",
      error
    );
  }
}

function formatCurrency(amount) {
  return currencyFormatter.format(amount);
}

function getProductById(productId) {
  return products.find(
    (product) => product.id === productId
  );
}

function getCartItemCount() {
  return cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );
}

function getCartSubtotal() {
  return cart.reduce(
    (total, item) => {
      const product =
        getProductById(item.productId);

      if (!product) {
        return total;
      }

      return (
        total +
        product.price * item.quantity
      );
    },
    0
  );
}

function getShippingCost(subtotal) {
  if (subtotal === 0) {
    return 0;
  }

  if (subtotal >= FREE_SHIPPING_THRESHOLD) {
    return 0;
  }

  return SHIPPING_COST;
}

function getCartTotals() {
  const subtotal =
    getCartSubtotal();

  const shipping =
    getShippingCost(subtotal);

  const tax =
    subtotal * TAX_RATE;

  const total =
    subtotal + shipping + tax;

  return {
    subtotal,
    shipping,
    tax,
    total
  };
}

function getVisibleProducts() {
  let visibleProducts = products.filter(
    (product) => {
      const matchesCategory =
        currentCategory === "all" ||
        product.category === currentCategory;

      const searchableText =
        `${product.name} ${product.description}`
          .toLowerCase();

      const matchesSearch =
        searchableText.includes(
          currentSearch.toLowerCase()
        );

      return matchesCategory && matchesSearch;
    }
  );

  visibleProducts = [...visibleProducts];

  if (currentSort === "name-asc") {
    visibleProducts.sort(
      (a, b) =>
        a.name.localeCompare(b.name)
    );
  }

  if (currentSort === "name-desc") {
    visibleProducts.sort(
      (a, b) =>
        b.name.localeCompare(a.name)
    );
  }

  if (currentSort === "price-asc") {
    visibleProducts.sort(
      (a, b) =>
        a.price - b.price
    );
  }

  if (currentSort === "price-desc") {
    visibleProducts.sort(
      (a, b) =>
        b.price - a.price
    );
  }

  return visibleProducts;
}

function renderCategoryFilters() {
  categoryFilters.replaceChildren();

  Object.entries(categoryLabels).forEach(
    ([value, label]) => {
      const button =
        document.createElement("button");

      button.type = "button";
      button.className =
        "category-button";

      if (value === currentCategory) {
        button.classList.add("active");
      }

      button.dataset.category = value;
      button.textContent = label;

      categoryFilters.appendChild(button);
    }
  );
}

function renderProducts() {
  const visibleProducts =
    getVisibleProducts();

  productGrid.replaceChildren();

  catalogMessage.hidden =
    visibleProducts.length !== 0;

  if (visibleProducts.length === 0) {
    catalogMessage.textContent =
      "No products match your search.";
    return;
  }

  catalogMessage.textContent =
    `${visibleProducts.length} product${visibleProducts.length === 1 ? "" : "s"} found.`;

  catalogMessage.hidden = false;

  const fragment =
    document.createDocumentFragment();

  visibleProducts.forEach(
    (product) => {
      const card =
        document.createElement("article");

      card.className = "product-card";

      const visual =
        document.createElement("div");

      visual.className =
        "product-visual";

      visual.textContent =
        product.emoji;

      visual.setAttribute(
        "aria-hidden",
        "true"
      );

      const content =
        document.createElement("div");

      content.className =
        "product-content";

      const category =
        document.createElement("p");

      category.className =
        "product-category";

      category.textContent =
        categoryLabels[product.category];

      const name =
        document.createElement("h2");

      name.className =
        "product-name";

      name.textContent =
        product.name;

      const description =
        document.createElement("p");

      description.className =
        "product-description";

      description.textContent =
        product.description;

      const bottom =
        document.createElement("div");

      bottom.className =
        "product-bottom";

      const price =
        document.createElement("strong");

      price.className =
        "product-price";

      price.textContent =
        formatCurrency(product.price);

      const addButton =
        document.createElement("button");

      addButton.type = "button";
      addButton.className =
        "primary-button";

      addButton.textContent =
        "Add to Cart";

      addButton.dataset.action =
        "add-to-cart";

      addButton.dataset.productId =
        String(product.id);

      bottom.append(
        price,
        addButton
      );

      content.append(
        category,
        name,
        description,
        bottom
      );

      card.append(
        visual,
        content
      );

      fragment.appendChild(card);
    }
  );

  productGrid.appendChild(fragment);
}

function addToCart(productId) {
  const existingItem =
    cart.find(
      (item) =>
        item.productId === productId
    );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      productId,
      quantity: 1
    });
  }

  saveCart();
  renderCart();

  const product =
    getProductById(productId);

  showToast(
    `${product.name} added to cart.`
  );
}

function updateCartQuantity(
  productId,
  change
) {
  const item =
    cart.find(
      (cartItem) =>
        cartItem.productId === productId
    );

  if (!item) {
    return;
  }

  item.quantity += change;

  if (item.quantity <= 0) {
    cart = cart.filter(
      (cartItem) =>
        cartItem.productId !== productId
    );
  }

  saveCart();
  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter(
    (item) =>
      item.productId !== productId
  );

  saveCart();
  renderCart();
}

function renderCart() {
  const itemCount =
    getCartItemCount();

  const totals =
    getCartTotals();

  cartCount.textContent =
    itemCount;

  cartItems.replaceChildren();

  emptyCart.hidden =
    cart.length !== 0;

  checkoutButton.disabled =
    cart.length === 0;

  if (cart.length > 0) {
    const fragment =
      document.createDocumentFragment();

    cart.forEach(
      (item) => {
        const product =
          getProductById(
            item.productId
          );

        if (!product) {
          return;
        }

        const article =
          document.createElement("article");

        article.className =
          "cart-item";

        const visual =
          document.createElement("div");

        visual.className =
          "cart-item-visual";

        visual.textContent =
          product.emoji;

        visual.setAttribute(
          "aria-hidden",
          "true"
        );

        const main =
          document.createElement("div");

        main.className =
          "cart-item-main";

        const top =
          document.createElement("div");

        top.className =
          "cart-item-top";

        const name =
          document.createElement("h3");

        name.className =
          "cart-item-name";

        name.textContent =
          product.name;

        const price =
          document.createElement("strong");

        price.className =
          "cart-item-price";

        price.textContent =
          formatCurrency(
            product.price *
            item.quantity
          );

        top.append(
          name,
          price
        );

        const controls =
          document.createElement("div");

        controls.className =
          "cart-item-controls";

        const quantityControls =
          document.createElement("div");

        quantityControls.className =
          "quantity-controls";

        const decreaseButton =
          document.createElement("button");

        decreaseButton.type = "button";
        decreaseButton.className =
          "quantity-button";

        decreaseButton.textContent =
          "−";

        decreaseButton.dataset.action =
          "decrease";

        decreaseButton.dataset.productId =
          String(product.id);

        const quantity =
          document.createElement("span");

        quantity.className =
          "quantity-value";

        quantity.textContent =
          item.quantity;

        const increaseButton =
          document.createElement("button");

        increaseButton.type = "button";
        increaseButton.className =
          "quantity-button";

        increaseButton.textContent =
          "+";

        increaseButton.dataset.action =
          "increase";

        increaseButton.dataset.productId =
          String(product.id);

        quantityControls.append(
          decreaseButton,
          quantity,
          increaseButton
        );

        const removeButton =
          document.createElement("button");

        removeButton.type = "button";
        removeButton.className =
          "remove-button";

        removeButton.textContent =
          "Remove";

        removeButton.dataset.action =
          "remove";

        removeButton.dataset.productId =
          String(product.id);

        controls.append(
          quantityControls,
          removeButton
        );

        main.append(
          top,
          controls
        );

        article.append(
          visual,
          main
        );

        fragment.appendChild(article);
      }
    );

    cartItems.appendChild(fragment);
  }

  subtotalElement.textContent =
    formatCurrency(
      totals.subtotal
    );

  shippingElement.textContent =
    totals.shipping === 0 && totals.subtotal > 0
      ? "Free"
      : formatCurrency(
          totals.shipping
        );

  taxElement.textContent =
    formatCurrency(
      totals.tax
    );

  totalElement.textContent =
    formatCurrency(
      totals.total
    );
}

function openCart() {
  cartOverlay.hidden = false;

  requestAnimationFrame(() => {
    cartPanel.classList.add("open");
  });

  cartPanel.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add(
    "cart-open"
  );
}

function closeCart() {
  cartPanel.classList.remove("open");

  cartPanel.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove(
    "cart-open"
  );

  setTimeout(() => {
    if (
      !cartPanel.classList.contains(
        "open"
      )
    ) {
      cartOverlay.hidden = true;
    }
  }, 250);
}

function openCheckoutModal() {
  if (cart.length === 0) {
    showToast(
      "Add at least one product before checkout."
    );

    return;
  }

  closeCart();

  checkoutError.hidden = true;
  checkoutError.textContent = "";

  checkoutModal.hidden = false;
}

function closeCheckoutModal() {
  checkoutModal.hidden = true;
}

function showToast(message) {
  toast.textContent = message;
  toast.hidden = false;

  clearTimeout(toastTimeoutId);

  toastTimeoutId =
    setTimeout(() => {
      toast.hidden = true;
    }, 2500);
}

function clearCheckoutError() {
  checkoutError.textContent = "";
  checkoutError.hidden = true;
}

function showCheckoutError(message) {
  checkoutError.textContent =
    message;

  checkoutError.hidden = false;
}

function completeCheckout() {
  const formData =
    new FormData(checkoutForm);

  const name =
    formData.get("name").trim();

  const email =
    formData.get("email").trim();

  const address =
    formData.get("address").trim();

  clearCheckoutError();

  if (
    !name ||
    !email ||
    !address
  ) {
    showCheckoutError(
      "Please complete all required fields."
    );

    return;
  }

  if (
    !email.includes("@")
  ) {
    showCheckoutError(
      "Please enter a valid email address."
    );

    return;
  }

  const orderTotal =
    getCartTotals().total;

  cart = [];

  saveCart();
  renderCart();

  checkoutForm.reset();
  closeCheckoutModal();

  showToast(
    `Order placed successfully. Total: ${formatCurrency(orderTotal)}.`
  );
}

productGrid.addEventListener(
  "click",
  (event) => {
    const button =
      event.target.closest(
        "[data-action='add-to-cart']"
      );

    if (!button) {
      return;
    }

    const productId =
      Number(
        button.dataset.productId
      );

    addToCart(productId);
  }
);

categoryFilters.addEventListener(
  "click",
  (event) => {
    const button =
      event.target.closest(
        "[data-category]"
      );

    if (!button) {
      return;
    }

    currentCategory =
      button.dataset.category;

    renderCategoryFilters();
    renderProducts();
  }
);

searchInput.addEventListener(
  "input",
  () => {
    currentSearch =
      searchInput.value.trim();

    renderProducts();
  }
);

sortSelect.addEventListener(
  "change",
  () => {
    currentSort =
      sortSelect.value;

    renderProducts();
  }
);

cartItems.addEventListener(
  "click",
  (event) => {
    const button =
      event.target.closest(
        "[data-action]"
      );

    if (!button) {
      return;
    }

    const productId =
      Number(
        button.dataset.productId
      );

    const action =
      button.dataset.action;

    if (action === "increase") {
      updateCartQuantity(
        productId,
        1
      );
    }

    if (action === "decrease") {
      updateCartQuantity(
        productId,
        -1
      );
    }

    if (action === "remove") {
      removeFromCart(productId);
    }
  }
);

cartButton.addEventListener(
  "click",
  openCart
);

closeCartButton.addEventListener(
  "click",
  closeCart
);

cartOverlay.addEventListener(
  "click",
  closeCart
);

checkoutButton.addEventListener(
  "click",
  openCheckoutModal
);

closeModalButton.addEventListener(
  "click",
  closeCheckoutModal
);

checkoutModal.addEventListener(
  "click",
  (event) => {
    if (
      event.target ===
      checkoutModal
    ) {
      closeCheckoutModal();
    }
  }
);

checkoutForm.addEventListener(
  "submit",
  (event) => {
    event.preventDefault();
    completeCheckout();
  }
);

document.addEventListener(
  "keydown",
  (event) => {
    if (event.key !== "Escape") {
      return;
    }

    if (!checkoutModal.hidden) {
      closeCheckoutModal();
      return;
    }

    if (
      cartPanel.classList.contains(
        "open"
      )
    ) {
      closeCart();
    }
  }
);

renderCategoryFilters();
renderProducts();
renderCart();
