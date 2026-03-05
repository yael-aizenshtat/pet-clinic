import { Plus } from "lucide-react";
import { Button } from "../ui/Button";

export const EmptyState = ({ onAdd }: { onAdd: () => void }) => (
  <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
    <div className="text-sm text-gray-600 pb-6">No patients yet</div>
    <Button
      onClick={onAdd}
      className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200"
    >
      <Plus className="w-4 h-4 mr-2" />
      Add First Patient
    </Button>
  </div>
);