  ---
  QA Report: ShopLab (http://localhost:3000/app/)

  Navigation Links Found

  ┌─────────────────┬───────────────────┬─────────────────────────────────┐
  │      Link       │    Destination    │             Status              │
  ├─────────────────┼───────────────────┼─────────────────────────────────┤
  │ ShopLab (brand) │ /app/index.html   │ ✅ Loads                        │
  ├─────────────────┼───────────────────┼─────────────────────────────────┤
  │ Shop            │ /app/index.html   │ ✅ Loads                        │
  ├─────────────────┼───────────────────┼─────────────────────────────────┤
  │ Cart            │ /app/cart.html    │ ✅ Loads                        │
  ├─────────────────┼───────────────────┼─────────────────────────────────┤
  │ Blog            │ /app/blog.html    │ ❌ 404                          │
  ├─────────────────┼───────────────────┼─────────────────────────────────┤
  │ Contact         │ /app/contact.html │ ⚠️ Loads but broken (see below) │
  └─────────────────┴───────────────────┴─────────────────────────────────┘

  ---
  Bugs Found

  Bug 1 — Blog link is a dead link (404)
  Clicking "Blog" navigates to /app/blog which returns a 404. The blog.html file doesn't exist.

  ---
  Bug 2 — Broken asset paths when URL lacks trailing slash
  The HTML uses relative paths (js/main.js, css/styles.css). The server redirects /app/index.html → /app (no trailing slash), which causes all assets to resolve from the site root (/js/, /css/) instead of /app/js/ and
   /app/css/. This silently breaks all JS and CSS. The same affects /app/contact — the cart badge, form handler, and styles all fail to load. The app only works when accessed as /app/ (with trailing slash).

  ---
  Bug 3 — Search rejects single-character queries
  Searching for "a" returns "No results found" even though 5 of 6 products contain the letter "a". The check if (query.length <= 1) short-circuits before any matching logic runs. A minimum of 2 characters is silently
  required with no user feedback. (main.js:21)

  ---
  Bug 4 — Cart total doesn't update when quantity changes
  With Terminal Pro License at qty=3, the per-item subtotal correctly shows $147.00, but the order total remains stuck at $52.92 (the initial qty=1 value including 8% tax). changeQty() updates the row subtotal but
  never calls updateTotals(). Only a full page refresh recalculates the total. (cart.js:66)

  Bonus: The 8% tax is added silently — there is no tax line shown to the user until checkout summary, and nothing labels it as tax.

  ---
  Bug 5 — Quick View button throws a ReferenceError and does nothing
  Clicking "Quick View" on any product fires quickView(), which calls productModal.show(productId). productModal is never defined anywhere, producing:
  ReferenceError: productModal is not defined
    at quickView (main.js:93)
  The button appears functional but silently fails — no modal, no error message to the user. (main.js:93)

  ---
  Bug 6 — Contact form accepts empty message and falsely reports success
  The message textarea has the required attribute in HTML (which provides browser-native validation when clicked normally), but the form's JS submit handler never reads or validates the message field at all. It only
  checks name and email. A form submitted without a message shows "Thanks! Your message has been sent." — the message content is never captured or sent anywhere. (contact.js:12–20)

  ---
  Console Errors Observed

  - ReferenceError: productModal is not defined — thrown every time Quick View is clicked (main.js:93)
  - No other app-level errors on the home, cart, or contact pages when assets load correctly

  ---
  Summary

  6 bugs total: 1 broken nav link, 1 systemic asset path issue, 1 broken search, 1 cart total calculation bug, 1 silent JS crash on Quick View, and 1 contact form that accepts and silently drops empty messages.

===

11m 31s
~51k tokens

11 total navigations
0 Screenshots
0 Videos