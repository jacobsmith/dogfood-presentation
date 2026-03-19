// Shared product catalog
const PRODUCTS = [
  {
    id: 1,
    name: "Terminal Pro License",
    desc: "One-year license for Terminal Pro — the developer terminal with split panes, themes, and AI autocomplete.",
    price: 49.00,
    category: "software"
  },
  {
    id: 2,
    name: "API Monitor",
    desc: "Real-time dashboard for monitoring API health, latency, and error rates across all your endpoints.",
    price: 29.00,
    category: "software"
  },
  {
    id: 3,
    name: "Code Snippet Vault",
    desc: "Cloud-synced snippet manager. Organize, search, and share reusable code across your whole team.",
    price: 19.00,
    category: "software"
  },
  {
    id: 4,
    name: "Deploy Widget",
    desc: "One-click deploy button you can embed in any README. Works with Vercel, Railway, Render, and Fly.",
    price: 9.00,
    category: "software"
  },
  {
    id: 5,
    name: "Error Tracker Bundle",
    desc: "Lightweight error tracking SDK for JS, Python, and Go. No bloat, no vendor lock-in.",
    price: 39.00,
    category: "software"
  },
  {
    id: 6,
    name: "Dev Sticker Pack",
    desc: "12 high-quality vinyl stickers. Includes: semicolons, git blame, TODO: fix this, and more.",
    price: 12.00,
    category: "merch"
  }
];

// Cart state persisted to sessionStorage
function getCart() {
  try {
    return JSON.parse(sessionStorage.getItem('shoplab_cart') || '[]');
  } catch {
    return [];
  }
}

function saveCart(cart) {
  sessionStorage.setItem('shoplab_cart', JSON.stringify(cart));
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function updateCartBadge() {
  const badge = document.getElementById('cart-count');
  if (badge) badge.textContent = getCartCount();
}
