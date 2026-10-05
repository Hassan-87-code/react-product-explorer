import { useEffect, useState } from "react";
import useProducts from "./hooks/useProducts.js";
import ProductGrid from "./components/ProductGrid";
import ProductDetail from "./components/ProductDetail";
import SearchField from "./components/SearchField";
import CategoryFilter from "./components/CategoryFilter";
import SortControl from "./components/SortControl";
import RequestState from "./components/RequestState";
import { getProductById } from "./services/productService";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [categories, setCategories] = useState([]);

  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState("");

  const sortParts = sort ? sort.split("-") : ["", ""];

  const sortBy = sortParts[0];
  const order = sortParts[1];

  const {
    items,
    total,
    loading,
    error,
  } = useProducts({
    search,
    category,
    sortBy,
    order,
  });

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(`${API_URL}/products/categories`);

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();

        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchCategories();
  }, []);

  function handleSearch(value) {
    setSearch(value);

    if (value) {
      setCategory("");
    }

    setSelectedProduct(null);
  }

  function handleCategory(value) {
    setCategory(value);

    if (value) {
      setSearch("");
    }

    setSelectedProduct(null);
  }

  function handleSort(value) {
    setSort(value);
  }

  async function handleSelectProduct(id) {
    try {
      setDetailLoading(true);
      setDetailError("");
      setSelectedProduct(null);

      const product = await getProductById(id);

      setSelectedProduct(product);
    } catch (err) {
      setDetailError(err.message);
    } finally {
      setDetailLoading(false);
    }
  }

  function handleClearSearch() {
    setSearch("");
  }

  function handleRetry() {
    window.location.reload();
  }

  return (
    <main className="min-h-screen bg-slate-50">
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

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {selectedProduct ? (
          <ProductDetail
            product={selectedProduct}
            onBack={() => setSelectedProduct(null)}
          />
        ) : (
          <>
            <section
              aria-label="Product controls"
              className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
            >
              <div className="grid gap-4 md:grid-cols-3">
                <SearchField
                  value={search}
                  onChange={handleSearch}
                  onClear={handleClearSearch}
                />

                <CategoryFilter
                  categories={categories}
                  value={category}
                  onChange={handleCategory}
                />

                <SortControl
                  value={sort}
                  onChange={handleSort}
                />
              </div>
            </section>

            <section className="mt-8">
              {loading && (
                <RequestState type="loading" />
              )}

              {!loading && error && (
                <RequestState
                  type="error"
                  message={error}
                  onRetry={handleRetry}
                />
              )}

              {!loading && !error && items.length === 0 && (
                <RequestState
                  type="empty"
                  onClear={handleClearSearch}
                />
              )}

              {!loading && !error && items.length > 0 && (
                <>
                  <div className="mb-5 flex items-center justify-between">
                    <p className="text-sm text-slate-600">
                      Showing{" "}
                      <span className="font-semibold text-slate-900">
                        {total}
                      </span>{" "}
                      products
                    </p>
                  </div>

                  <ProductGrid
                    products={items}
                    onSelect={handleSelectProduct}
                  />
                </>
              )}
            </section>

            {detailLoading && (
              <div className="mt-6 rounded-lg bg-white p-4 text-center">
                Loading product details...
              </div>
            )}

            {detailError && (
              <div
                role="alert"
                className="mt-6 rounded-lg bg-red-50 p-4 text-red-700"
              >
                {detailError}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}

export default App;