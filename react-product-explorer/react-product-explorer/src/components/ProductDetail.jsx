import formatCurrency from "../utils/formatCurrency.js";

/** Full details for a selected product. */
function ProductDetail({ product = null }) {
  if (!product) {
    return null;
  }

  return (
    <section
      aria-labelledby="product-detail-title"
      className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-8"
    >
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <img
            src={product.thumbnail}
            alt={product.title}
            width="640"
            height="384"
            loading="lazy"
            className="h-72 w-full rounded-xl object-cover sm:h-96"
          />
        </div>

        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-blue-600">
            {product.category}
          </p>

          <h2
            id="product-detail-title"
            className="mt-2 text-3xl font-bold text-slate-900"
          >
            {product.title}
          </h2>

          <p className="mt-4 text-3xl font-bold text-slate-900">
            {formatCurrency(product.price)}
          </p>

          <p className="mt-4 text-slate-600">
            {product.description}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Rating</p>
              <p className="mt-1 font-semibold">
                ⭐ {product.rating}
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Stock</p>
              <p className="mt-1 font-semibold">
                {product.stock}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
