import { useEffect, useState } from "react";
import { getProductById } from "../services/productService.js";

/** Fetches one product and cancels stale detail requests when selection changes. */
export default function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (id === null) {
      setProduct(null);
      setLoading(false);
      setError("");
      return undefined;
    }

    const controller = new AbortController();
    setProduct(null);
    setLoading(true);
    setError("");

    getProductById(id, controller.signal)
      .then(setProduct)
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [id, retryCount]);

  return { product, loading, error, retry: () => setRetryCount((count) => count + 1) };
}
