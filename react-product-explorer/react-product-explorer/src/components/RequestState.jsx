function RequestState({ type, message, onRetry, onClear }) {
  if (type === "loading") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="grid min-h-64 place-items-center rounded-xl bg-white p-8 shadow-sm ring-1 ring-slate-200"
      >
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
          <p className="mt-4 font-medium text-slate-700">
            Loading products...
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
          className="mt-5 rounded-lg bg-slate-900 px-5 py-2 font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
          className="mt-5 rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Clear search
        </button>
      </div>
    );
  }

  return null;
}

export default RequestState;