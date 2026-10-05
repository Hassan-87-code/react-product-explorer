import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";

function useProducts({
  search = "",
  category = "",
  sortBy = "",
  order = "",
  limit = 12,
  skip = 0,
} = {}) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts({
          search,
          category,
          sortBy,
          order,
          limit,
          skip,
          signal: controller.signal,
        });

        setItems(data.items);
        setTotal(data.total);
      } catch (err) {
        if (err.name === "AbortError") {
          return;
        }

        setItems([]);
        setTotal(0);
        setError(err.message);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      controller.abort();
    };
  }, [search, category, sortBy, order, limit, skip]);

  return {
    items,
    total,
    loading,
    error,
  };
}

export default useProducts;