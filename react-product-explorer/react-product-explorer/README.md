# React Product Explorer

A responsive product catalog built with React and Vite. It uses the public [DummyJSON Products API](https://dummyjson.com/docs/products) for product data.

## Run locally

Requirements: Node.js 20.19+ or 22.12+.

```sh
npm install
Copy-Item .env.example .env.local # PowerShell
npm run dev
```

On macOS or Linux, replace the copy command with `cp .env.example .env.local`. The API URL defaults to `https://dummyjson.com`; set `VITE_API_URL` in `.env.local` only when using another compatible endpoint.

Useful commands:

```sh
npm run build
npm run preview
npm run lint
```

## Features

- Browse, search, and filter products by category.
- Sort results and paginate with DummyJSON's `limit` and `skip` parameters.
- Open product details, including a visible not-found state for invalid IDs.
- See loading, empty, and recoverable error states.
- Responsive catalog cards with keyboard-visible focus styling.

## Architecture

- `src/services/productService.js` owns API URLs, response checks, and the app's normalized product list shape.
- `src/hooks/useProducts.js` loads paginated catalog results and supports retry and request cancellation.
- `src/hooks/useProduct.js` loads the selected product and cancels stale requests when selection changes.
- `src/components/` contains the search, category, sorting, card, grid, detail, and shared request-state components.
- `src/App.jsx` coordinates filters, pagination, selected product ID, and the shared page shell.

## Data and limitations

Product content and images are provided by DummyJSON and remain subject to that service's availability and terms. DummyJSON create, update, and delete endpoints simulate changes; they do not persistently modify a real catalog. This project is a read-only explorer.

## Deployment

`.github/workflows/deploy.yml` builds the app and deploys it to GitHub Pages when changes are pushed to `main`. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**. The project base path is configured for the `react-product-explorer` repository.

## Screenshots

Capture the catalog and product detail from the running app and add them here when preparing a release.
