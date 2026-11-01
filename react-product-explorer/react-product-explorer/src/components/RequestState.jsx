/** Shared loading, failure, and empty states. Optional actions are supplied by the view. */
function RequestState({ type = "", message = "", onRetry = () => {}, onClear = () => {}, label = "Loading products...", skeleton = false }) {
  if (type === "loading") {
    if (skeleton) {
      return (
        <div role="status" aria-label={label} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 12 }, (_, index) => (
            <div key={index} className="h-72 animate-pulse overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
              <div className="h-48 bg-slate-200" />
              <div className="space-y-3 p-4">
                <div className="h-3 w-1/3 rounded bg-slate-200" />
                <div className="h-4 w-2/3 rounded bg-slate-200" />
                <div className="h-5 w-1/4 rounded bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      );
    }
    return (
      <div
        role="status"
        aria-live="polite"
        className="grid min-h-64 place-items-center rounded-xl bg-white p-8 shadow-sm ring-1 ring-slate-200"
      >
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
          <p className="mt-4 font-medium text-slate-700">
            {label}
          </p>
        </div>
      </div>
    );
  }

  if (type === "error") {
    return (
      <div
        role="alert"
        className="rounded-xl bg-white p-8 text-center shadow-sm ring-1 ring-red-200"
      >
        <h2 className="text-xl font-semibold text-red-700">
          Something went wrong
        </h2>

        <p className="mt-2 text-slate-600">{message}</p>

        <button
          type="button"
          onClick={onRetry}
          className="mt-5 rounded-lg bg-slate-900 px-5 py-2 font-medium text-white hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
        >
          Try again
        </button>
      </div>
    );
  }

  if (type === "empty") {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
        <h2 className="text-xl font-semibold text-slate-900">
          No products found
        </h2>

        <p className="mt-2 text-slate-600">
          Your search returned zero products. Try another search.
        </p>

        <button
          type="button"
          onClick={onClear}
          className="mt-5 rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
        >
          Clear search
        </button>
      </div>
    );
  }

  return null;
}

export default RequestState;
