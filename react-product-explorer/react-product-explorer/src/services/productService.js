const API_URL = import.meta.env.VITE_API_URL;

export async function getProducts({
  search = "",
  category = "",
  sortBy = "",
  order = "",
  limit = 12,
  skip = 0,
  signal,
} = {}) {
  let endpoint = "/products";

  if (search) {
    endpoint = "/products/search";
  } else if (category) {
    endpoint = "/products/category/" + encodeURIComponent(category);
  }

  const params = new URLSearchParams();

  params.set("limit", limit);
  params.set("skip", skip);

  if (search) {
    params.set("q", search);
  }

  if (!category && sortBy) {
    params.set("sortBy", sortBy);
  }

  if (!category && order) {
    params.set("order", order);
  }

  const response = await fetch(
    API_URL + endpoint + "?" + params.toString(),
    { signal }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products (" + response.status + ")");
  }

  const data = await response.json();

  return {
    items: data.products ?? [],
    total: data.total ?? 0,
    skip: data.skip ?? 0,
    limit: data.limit ?? limit,
  };
}

export async function getProductById(id, signal) {
  const response = await fetch(API_URL + "/products/" + id, {
    signal,
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Product not found.");
    }

    throw new Error("Failed to fetch product (" + response.status + ")");
  }

  return response.json();
}

export async function getCategories(signal) {
  const response = await fetch(API_URL + "/products/categories", {
    signal,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch categories.");
  }

  return response.json();
}
```
