import { useDeletePatient, usePatients } from "~/hooks/usePatients";
import type { Patient } from "~/types/patient";
import PatientsTable from "../table/PatientsTable";

type Props = {
  onOpenAdd: () => void;
  onOpenEdit: (p: Patient) => void;
};

export default function PatientsSection({ onOpenAdd, onOpenEdit }: Props) {
  const { data, isLoading, isError, error, refetch } = usePatients();
  const del = useDeletePatient();

  const patients = data ?? [];

  return (
    <PatientsTable
      data={patients}
      isLoading={isLoading}
      isError={isError}
      errorMessage={error instanceof Error ? error.message : "Something went wrong"}
      onRetry={() => refetch()}
      onAdd={onOpenAdd}
      onEdit={onOpenEdit}
      onDelete={(id) => del.mutate(id)}
      isDeleting={(id) => del.isPending && del.variables === id}
    />
  );
}