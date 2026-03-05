import type { Patient } from "~/types/patient";
import { useTable } from "~/hooks/useTable";
import { TableShell } from "./TableShell";
import { PatientsToolbar } from "../patients/PatientsToolbar";
import { ErrorState } from "../states/ErrorState";
import { LoadingState } from "../states/LoadingState";
import { EmptyState } from "../states/EmptyState";

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

export const PatientsTable = ({
  data,
  isLoading,
  isError,
  errorMessage,
  onRetry,
  onAdd,
  onEdit,
  onDelete,
  isDeleting,
}: Props) => {
  const { table } = useTable({
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
        onAdd={onAdd}
      />

      {data.length === 0 ? (
        <EmptyState onAdd={onAdd} />
      ) : (
        <TableShell table={table} />
      )}
    </div>
  );
};