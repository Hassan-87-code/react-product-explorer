/** Controlled search field with an optional clear action. */
function SearchField({ value = "", onChange = () => {}, onClear = () => {} }) {
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
            className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
        />

        {value && (
          <button
            type="button"
            onClick={onClear}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-700 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchField;
