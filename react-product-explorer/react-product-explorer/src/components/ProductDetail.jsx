function ProductDetail({ product, onBack }) {
  if (!product) {
    return null;
  }

  return (
    <section
      aria-labelledby="product-detail-title"
      className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-8"
    >
      <button
        type="button"
        onClick={onBack}
        className="mb-6 rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        ← Back to products
      </button>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-72 w-full rounded-xl object-cover sm:h-96"
          />
        </div>

        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-blue-600">
            {product.category}
          </p>

          <h1
            id="product-detail-title"
            className="mt-2 text-3xl font-bold text-slate-900"
          >
            {product.title}
          </h1>

          <p className="mt-4 text-3xl font-bold text-slate-900">
            ${product.price.toFixed(2)}
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