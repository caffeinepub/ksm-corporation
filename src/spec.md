# Specification

## Summary
**Goal:** Rebuild and publish the company storefront as a multi-category physical-goods store with accurate categories and a working end-to-end purchasing flow.

**Planned changes:**
- Update backend `getConfig()` to return exactly 8 physical store categories (Women’s Clothing, Men’s Clothing, Children’s Clothing, Infant Clothing, Shoes, Jewelry, Accessories, Bags) with stable `id`, `title`, `description`, and `imageUrl`.
- Remove NFT/crypto-related storefront fallback data in the frontend and align `defaultConfig` to the same 8 categories/ids, ensuring all user-facing text remains English.
- Make backend checkout functional by calculating order `totalAmount` from line items, validating products and stock, and decrementing `stockCount` (setting `inStock` false at zero) on successful orders.
- Seed an initial backend product catalog across all 8 categories with required fields (including style tags) and non-zero stock so items can be browsed and purchased.
- Rebuild and publish the updated frontend + backend so the storefront is publicly accessible and works end-to-end.

**User-visible outcome:** Users can open the storefront, browse the 8 physical-item categories, view in-stock products, add items to cart, complete checkout, and receive an order confirmation with an order id.
