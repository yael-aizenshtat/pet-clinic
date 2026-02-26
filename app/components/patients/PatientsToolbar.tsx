import { Button } from "../ui/Button";
import { GlobalSearchInput } from "./GlobalSearchInput";
import { Plus } from "lucide-react";

type Props = {
    globalFilter: string;
    onGlobalFilterChange: (v: string) => void;
    onAdd: () => void;
};

export function PatientsToolbar({ globalFilter, onGlobalFilterChange, onAdd }: Props) {
    return (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <GlobalSearchInput value={globalFilter} onChange={onGlobalFilterChange} />
            <Button
                onClick={onAdd}
                className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200"
            >
                <Plus className="w-4 h-4 mr-2" />
                Add Patient
            </Button>
        </div>
    );
}