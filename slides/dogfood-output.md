  ---
  QA Report: ShopLab (localhost:3000/app) — 6 Issues Found

  Navigation Links

  - ShopLab (home logo) — ✅ loads
  - Shop — ✅ loads (redirects to home/index.html)
  - Cart — ✅ loads
  - Blog — ❌ 404 error, dead-end page with no navigation back
  - Contact — ✅ loads

  ---
  Issues Summary

  ┌───────────┬───────────────────────────────────────────────────────────────────┬──────────┐
  │     #     │                               Title                               │ Severity │
  ├───────────┼───────────────────────────────────────────────────────────────────┼──────────┤
  │ ISSUE-001 │ Blog nav link returns 404                                         │ High     │
  ├───────────┼───────────────────────────────────────────────────────────────────┼──────────┤
  │ ISSUE-002 │ Search returns "No results" for "a" — all 6 products should match │ High     │
  ├───────────┼───────────────────────────────────────────────────────────────────┼──────────┤
  │ ISSUE-003 │ Cart order summary totals frozen when quantity changes            │ Critical │
  ├───────────┼───────────────────────────────────────────────────────────────────┼──────────┤
  │ ISSUE-004 │ Contact form shows no feedback on submit; blank message accepted  │ High     │
  ├───────────┼───────────────────────────────────────────────────────────────────┼──────────┤
  │ ISSUE-005 │ Quick View button broken — JS error productModal is not defined   │ High     │
  ├───────────┼───────────────────────────────────────────────────────────────────┼──────────┤
  │ ISSUE-006 │ Persistent 404 console errors for resources on every page         │ Medium   │
  └───────────┴───────────────────────────────────────────────────────────────────┴──────────┘

  ---
  Key Findings

  - Cart totals bug (ISSUE-003, Critical): Increasing quantity to 3 shows correct row subtotal ($147.00) but the order summary stays frozen at single-unit values ($49.00 / $52.92). A customer proceeding to checkout would see the wrong amount.
  (Totals are correct on fresh page load — only the live in-place update is broken.)
  - Search completely broken (ISSUE-002): Searching "a" returns zero results even though all 6 products contain the letter "a". The feature silently fails.
  - Quick View JS crash (ISSUE-005): Clicking "Quick View" throws productModal is not defined — no modal opens. The feature is entirely non-functional.
  - Contact form dead (ISSUE-004): Submit with name + email + blank message accepts the form silently — no success banner, no error, no redirect, no validation.
  - Blog 404 (ISSUE-001): Blog is in the main nav but the page doesn't exist, and the 404 page has no navigation to get back.

  Full report with screenshots and repro videos is at dogfood-output/report.md.

===

11m 4s
~64k tokens

21 total navigations
28 Screenshots
7 Videos