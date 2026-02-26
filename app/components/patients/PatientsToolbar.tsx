import { GlobalSearchInput } from "./GlobalSearchInput";

type Props = {
  globalFilter: string;
  onGlobalFilterChange: (v: string) => void;
  onAdd: () => void;
};

export function PatientsToolbar({ globalFilter, onGlobalFilterChange, onAdd }: Props) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <GlobalSearchInput value={globalFilter} onChange={onGlobalFilterChange} />

      <button
        type="button"
        onClick={onAdd}
        className="inline-flex items-center justify-center rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90"
      >
        + Add new patient
      </button>
    </div>
  );
}