export function EmptyState({ onAdd }: { onAdd: () => void }) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
        <div className="text-sm text-gray-600">No patients yet</div>
        <button
          type="button"
          onClick={onAdd}
          className="mt-4 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white"
        >
          + Add first patient
        </button>
      </div>
    );
  }