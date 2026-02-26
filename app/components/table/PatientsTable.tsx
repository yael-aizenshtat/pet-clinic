import type { Patient } from "~/types/patient";
import { useTable } from "~/hooks/useTable";
import { TableShell } from "./TableShell";
import { PatientsToolbar } from "../patients/PatientsToolbar";
import { ErrorState } from "../patients/ErrorState";
import { LoadingState } from "../patients/LoadingState";
import { EmptyState } from "../patients/EmptyState";

type Props = {
  data: Patient[];
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  onRetry: () => void;
  onAdd: () => void;
  onEdit: (p: Patient) => void;
  onDelete: (id: string) => void;
  isDeleting?: (id: string) => boolean;
};

export default function PatientsTable({
  data,
  isLoading,
  isError,
  errorMessage,
  onRetry,
  onAdd,
  onEdit,
  onDelete,
  isDeleting,
}: Props) {
  const { table, globalFilter, setGlobalFilter } = useTable({
    data,
    onEdit,
    onDelete,
    isDeleting,
  });

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState message={errorMessage} onRetry={onRetry} />;

  return (
    <div className="space-y-3">
      <PatientsToolbar
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
        onAdd={onAdd}
      />

      {data.length === 0 ? (
        <EmptyState onAdd={onAdd} />
      ) : (
        <TableShell table={table} />
      )}
    </div>
  );
}