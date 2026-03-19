document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  renderCart();

  document.getElementById('checkout-btn')?.addEventListener('click', () => {
    alert('Checkout is not implemented in this demo.');
  });
});

function renderCart() {
  const cart = getCart();
  const cartContent = document.getElementById('cart-content');
  const cartEmpty = document.getElementById('cart-empty');
  const cartItems = document.getElementById('cart-items');

  if (cart.length === 0) {
    cartContent.classList.add('hidden');
    cartEmpty.classList.remove('hidden');
    return;
  }

  cartEmpty.classList.add('hidden');
  cartContent.classList.remove('hidden');
  cartItems.innerHTML = '';

  cart.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>
        <div class="qty-control">
          <button onclick="changeQty(${item.id}, -1)">−</button>
          <span id="qty-${item.id}">${item.qty}</span>
          <button onclick="changeQty(${item.id}, 1)">+</button>
        </div>
      </td>
      <td id="subtotal-${item.id}">$${(item.price * item.qty).toFixed(2)}</td>
      <td><button class="btn btn-danger" onclick="removeItem(${item.id})">Remove</button></td>
    `;
    cartItems.appendChild(row);
  });

  updateTotals();
}

function changeQty(productId, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.qty = Math.max(1, item.qty + delta);
  saveCart(cart);

  // Update qty display
  const qtyEl = document.getElementById(`qty-${productId}`);
  if (qtyEl) qtyEl.textContent = item.qty;

  // Update per-item subtotal
  const subtotalEl = document.getElementById(`subtotal-${productId}`);
  if (subtotalEl) subtotalEl.textContent = `$${(item.price * item.qty).toFixed(2)}`;

  // BUG: updateTotals() is intentionally NOT called here.
  // The cart total, tax, and grand total do not update when quantity changes.
  // Only a full page refresh recalculates them.
  updateCartBadge();
}

function removeItem(productId) {
  const cart = getCart().filter(i => i.id !== productId);
  saveCart(cart);
  renderCart();
}

function updateTotals() {
  const cart = getCart();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
  document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}
