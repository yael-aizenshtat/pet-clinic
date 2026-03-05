import Button from "../ui/Button";

export function ErrorState({ message, onRetry }: { message?: string; onRetry: () => void }) {
  return (
    <div className="rounded-xl border border-red-200 bg-white p-6 text-sm">
      <div className="font-medium text-red-600">Failed to load</div>
      <div className="mt-1 text-gray-600 pb-6">{message ?? "Unknown error"}</div>
      <Button
        onClick={onRetry}
        className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200"
      >
        Retry
      </Button>
    </div>
  );
}