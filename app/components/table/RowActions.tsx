import { memo } from "react";
import type { Patient } from "~/types/patient";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/Button";

type Props = {
  patient: Patient;
  onEdit: (p: Patient) => void;
  onDelete: (id: string) => void;
  deleting: boolean;
};

export const RowActions = memo(
  ({ patient, onEdit, onDelete, deleting }: Props) => {
    return (
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          disabled={deleting}
          onClick={() => onEdit(patient)}
          className="text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
        >
          <Pencil className="w-4 h-4 mr-1" /> Edit
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(patient.id)}
          className="text-gray-600 hover:text-red-600 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4 mr-1" /> Delete
        </Button>
      </div>
    );
  },
);