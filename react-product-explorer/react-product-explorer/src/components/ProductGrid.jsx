import ProductCard from "./ProductCard";

/** Renders catalog cards. `products` defaults to an empty list. */
function ProductGrid({ products = [], onSelect = () => {} }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

export default ProductGrid;
