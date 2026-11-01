/** Controlled category selector. */
function CategoryFilter({ categories = [], value = "", onChange = () => {} }) {
  return (
    <div>
      <label
        htmlFor="category-filter"
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        Category
      </label>

      <select
        id="category-filter"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
      >
        <option value="">All categories</option>

        {categories.map((category) => (
          <option key={category.slug} value={category.slug}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;
