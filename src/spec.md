# Specification

## Summary
**Goal:** Improve the homepage into a fuller landing page and make key storefront content (including the brand/store name) configurable via a minimal Motoko backend API.

**Planned changes:**
- Expand the homepage into a single scrollable landing page by adding three responsive sections below the existing hero: Featured Collections, trust/“Why shop with us” highlights, and a newsletter/signup CTA.
- Add stable anchor ids to each homepage section (including existing category sections) and update header navigation to scroll to the correct section; provide a working mobile navigation menu exposing the same links.
- Implement a minimal Motoko canister query API that returns storefront configuration (store/brand name, hero headline/description, and homepage category definitions).
- Update the frontend to fetch storefront configuration with React Query and render the hero, category grid, and store/brand name from the returned data, with safe fallback to existing hardcoded defaults on failure.
- Ensure the configured store/brand name is used consistently in visible UI text and accessible labels/alt text, while keeping existing KSM logo assets unchanged and still loaded from `/assets/generated/`.

**User-visible outcome:** The homepage becomes a complete, scrollable, responsive landing page with reliable section navigation (including on mobile), and the displayed store name, hero text, and categories can be driven by backend configuration (defaulting gracefully if the backend is unavailable).
