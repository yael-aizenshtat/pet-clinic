export function ErrorState({ message, onRetry }: { message?: string; onRetry: () => void }) {
    return (
      <div className="rounded-xl border border-red-200 bg-white p-6 text-sm">
        <div className="font-medium text-red-600">Failed to load</div>
        <div className="mt-1 text-gray-600">{message ?? "Unknown error"}</div>
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white"
        >
          Retry
        </button>
      </div>
    );
  }