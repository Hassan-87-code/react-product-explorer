function SortControl({ value, onChange }) {
  return (
    <div>
      <label
        htmlFor="sort-products"
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        Sort by
      </label>

      <select
        id="sort-products"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Default</option>
        <option value="title-asc">Title A–Z</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating-desc">Rating: High to Low</option>
      </select>
    </div>
  );
}

export default SortControl;