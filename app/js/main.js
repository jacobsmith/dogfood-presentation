document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  renderProducts(PRODUCTS, document.getElementById('product-grid'));

  // Search
  const searchBtn = document.getElementById('search-btn');
  const searchInput = document.getElementById('search-input');

  searchBtn.addEventListener('click', runSearch);
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') runSearch();
  });

  function runSearch() {
    const query = searchInput.value.trim();
    const resultsSection = document.getElementById('search-results');
    const resultsGrid = document.getElementById('results-grid');

    // BUG: single-character queries always return empty results due to the
    // length check being > 1 instead of >= 1. Looks like validation but isn't.
    if (query.length <= 1) {
      resultsSection.classList.remove('hidden');
      resultsGrid.innerHTML = '<p style="color:#6b7280">No results found.</p>';
      return;
    }

    const lower = query.toLowerCase();
    const matches = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(lower) ||
      p.desc.toLowerCase().includes(lower) ||
      p.category.toLowerCase().includes(lower)
    );

    resultsSection.classList.remove('hidden');

    if (matches.length === 0) {
      resultsGrid.innerHTML = '<p style="color:#6b7280">No results found.</p>';
    } else {
      renderProducts(matches, resultsGrid);
    }

    resultsSection.scrollIntoView({ behavior: 'smooth' });
  }
});

function renderProducts(products, container) {
  container.innerHTML = '';
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-name">${product.name}</div>
      <div class="product-desc">${product.desc}</div>
      <div class="product-price">$${product.price.toFixed(2)}</div>
      <div class="product-actions">
        <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
        <button class="btn btn-secondary" onclick="quickView(${product.id})">Quick View</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const cart = getCart();
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, qty: 1 });
  }
  saveCart(cart);
  updateCartBadge();

  // Show brief confirmation
  const btn = event.target;
  const original = btn.textContent;
  btn.textContent = 'Added!';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = original;
    btn.disabled = false;
  }, 1000);
}

function quickView(productId) {
  // BUG: this function references an undefined variable `productModal`
  // which throws an uncaught ReferenceError in the console.
  // Visually nothing happens (no error shown to user), so it looks like a no-op.
  productModal.show(productId);
}
