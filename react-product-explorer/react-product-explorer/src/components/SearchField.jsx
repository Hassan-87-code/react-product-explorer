function SearchField({ value, onChange, onClear }) {
  return (
    <div className="w-full">
      <label
        htmlFor="product-search"
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        Search products
      </label>

      <div className="flex gap-2">
        <input
          id="product-search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search for products..."
          className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />

        {value && (
          <button
            type="button"
            onClick={onClear}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchField;