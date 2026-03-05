import { Plus, Stethoscope } from "lucide-react";
import { Button } from "../ui/Button";

type Props = {
  onAdd: () => void;
};

export const PatientsToolbar = ({ onAdd }: Props) => {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200">
            <Stethoscope className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Pet Clinic
          </h1>
        </div>
        <p className="text-gray-500">
          Manage your patients and their furry companions
        </p>
      </div>
      <Button
        onClick={onAdd}
        className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add New Patient
      </Button>
    </div>
  );
};