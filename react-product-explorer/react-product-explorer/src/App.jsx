import { useEffect, useState } from "react";
import useProducts from "./hooks/useProducts.js";
import useProduct from "./hooks/useProduct.js";
import ProductGrid from "./components/ProductGrid";
import ProductDetail from "./components/ProductDetail";
import SearchField from "./components/SearchField";
import CategoryFilter from "./components/CategoryFilter";
import SortControl from "./components/SortControl";
import RequestState from "./components/RequestState";
import { getCategories } from "./services/productService.js";

const PAGE_SIZE = 12;

/** Main catalog page and product detail route state. */
function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [skip, setSkip] = useState(0);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryError, setCategoryError] = useState("");

  const [sortBy = "", order = ""] = sort ? sort.split("-") : [];
  const { items, total, loading, error, retry } = useProducts({
    search,
    category,
    sortBy,
    order,
    limit: PAGE_SIZE,
    skip,
  });
  const { product, loading: detailLoading, error: detailError, retry: retryDetail } =
    useProduct(selectedProductId);

  useEffect(() => {
    const controller = new AbortController();
    getCategories(controller.signal)
      .then(setCategories)
      .catch((err) => {
        if (err.name !== "AbortError") setCategoryError(err.message);
      });
    return () => controller.abort();
  }, []);

  function handleSearch(value) {
    setSearch(value);
    if (value) setCategory("");
    setSkip(0);
  }

  function handleCategory(value) {
    setCategory(value);
    if (value) setSearch("");
    setSkip(0);
  }

  function handleSort(value) {
    setSort(value);
    setSkip(0);
  }

  function clearFilters() {
    setSearch("");
    setCategory("");
    setSkip(0);
  }

  const detailView = selectedProductId !== null;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const currentPage = Math.floor(skip / PAGE_SIZE) + 1;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-slate-900">
            React Product Explorer
          </h1>
          <p className="mt-2 text-slate-600">
            Browse, search, filter, and explore our homeware catalogue.
          </p>
        </div>
      </header>

      <main className="mx-auto min-h-[70vh] max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {detailView ? (
          <>
            <button
              type="button"
              onClick={() => setSelectedProductId(null)}
              className="mb-5 rounded-lg border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            >
              ← Back to products
            </button>
            {detailLoading && <RequestState type="loading" label="Loading product..." />}
            {detailError && <RequestState type="error" message={detailError} onRetry={retryDetail} />}
            {!detailLoading && !detailError && product && (
              <ProductDetail product={product} />
            )}
          </>
        ) : (
          <>
            <section
              aria-label="Product controls"
              className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
            >
              <div className="grid gap-4 md:grid-cols-3">
                <SearchField value={search} onChange={handleSearch} onClear={() => setSearch("")} />
                <CategoryFilter categories={categories} value={category} onChange={handleCategory} />
                <SortControl value={sort} onChange={handleSort} />
              </div>
              {categoryError && <p role="status" className="mt-3 text-sm text-amber-800">{categoryError} Category filters are unavailable.</p>}
            </section>

            <section aria-labelledby="products-heading" className="mt-8">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
                <div>
                  <h2 id="products-heading" className="text-2xl font-bold text-slate-900">Products</h2>
                  {!loading && !error && <p className="mt-1 text-sm text-slate-600">{total} products available</p>}
                </div>
              </div>

              {loading && <RequestState type="loading" skeleton />}
              {!loading && error && <RequestState type="error" message={error} onRetry={retry} />}
              {!loading && !error && items.length === 0 && <RequestState type="empty" onClear={clearFilters} />}
              {!loading && !error && items.length > 0 && (
                <>
                  <ProductGrid products={items} onSelect={setSelectedProductId} />
                  <nav aria-label="Product pages" className="mt-8 flex items-center justify-center gap-4">
                    <button type="button" disabled={skip === 0} onClick={() => setSkip(Math.max(0, skip - PAGE_SIZE))} className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:opacity-50">Previous</button>
                    <span aria-live="polite" className="text-sm text-slate-600">Page {currentPage} of {pageCount}</span>
                    <button type="button" disabled={skip + PAGE_SIZE >= total} onClick={() => setSkip(skip + PAGE_SIZE)} className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:opacity-50">Next</button>
                  </nav>
                </>
              )}
            </section>
          </>
        )}
      </main>

      <footer className="border-t bg-white py-6 text-center text-sm text-slate-500">
        Product data provided by DummyJSON. Create, update, and delete examples are simulated by its API.
      </footer>
    </div>
  );
}

export default App;
