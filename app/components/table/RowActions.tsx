import type { Patient } from "~/types/patient";

type Props = {
  patient: Patient;
  onEdit: (p: Patient) => void;
  onDelete: (id: string) => void;
  deleting: boolean;
};

export function RowActions({ patient, onEdit, onDelete, deleting }: Props) {
  return (
    <div className="flex items-center justify-end gap-2">
      <button
        type="button"
        onClick={() => onEdit(patient)}
        className="rounded-lg border border-gray-200 px-2 py-1 text-xs hover:bg-gray-50"
      >
        ✏️ Edit
      </button>

      <button
        type="button"
        disabled={deleting}
        onClick={() => onDelete(patient.id)}
        className="rounded-lg border border-gray-200 px-2 py-1 text-xs hover:bg-gray-50 disabled:opacity-50"
        aria-label="Delete patient"
        title="Delete"
      >
        🗑️
      </button>
    </div>
  );
}