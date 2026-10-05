function ProductCard({ product, onSelect }) {
  return (
    <article className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:shadow-md">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="h-48 w-full object-cover"
      />

      <div className="p-4">
        <p className="text-sm capitalize text-slate-500">
          {product.category}
        </p>

        <h2 className="mt-1 line-clamp-2 text-lg font-semibold text-slate-900">
          {product.title}
        </h2>

        <div className="mt-3 flex items-center justify-between">
          <p className="text-xl font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </p>

          <p className="text-sm text-slate-500">
            ⭐ {product.rating}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onSelect(product.id)}
          className="mt-4 w-full rounded-lg bg-slate-900 px-4 py-2 font-medium text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          View Product
        </button>
      </div>
    </article>
  );
}

export default ProductCard;