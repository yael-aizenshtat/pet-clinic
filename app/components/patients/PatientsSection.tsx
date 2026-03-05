import {
  usePatients,
  useCreatePatient,
  useUpdatePatient,
  useDeletePatient,
} from "~/hooks/usePatients";

import type { Patient } from "~/types/patient";
import type { PatientCreateInput } from "~/schemas/patient.schema";

import PatientsTable from "../table/PatientsTable";
import PatientModal from "./PatientModal";
import { useEffect, useState } from "react";

type ModalState =
  | { open: false; mode: "create" | "edit"; patient: null }
  | { open: true; mode: "create"; patient: null }
  | { open: true; mode: "edit"; patient: Patient };

function toFormValues(p: Patient): PatientCreateInput {
  return {
    name: p.name,
    phone: p.phone,
    petName: p.petName,
    petBirthDate: p.petBirthDate,
    petType: p.petType,
  };
}

export default function PatientsSection() {
  const { data, isLoading, isError, error, refetch } = usePatients();
  const { mutate: createPatient } = useCreatePatient();
  const { mutate: updatePatient } = useUpdatePatient();
  const { mutate: deletePatient, isPending, variables } = useDeletePatient();
  
  const patients = data ?? [];

  const [modal, setModal] = useState<ModalState>({
    open: false,
    mode: "create",
    patient: null,
  });

  const openAdd = () =>{
    setModal({ open: true, mode: "create", patient: null });

  }

  const openEdit = (p: Patient) =>{
    setModal({ open: true, mode: "edit", patient: p });
  }

  const closeModal = () =>
    setModal((prev) => ({ ...prev, open: false, patient: null }));

  const editPatient = modal.open && modal.mode === "edit" ? modal.patient : undefined;

  return (
    <>
      <PatientsTable
        data={patients}
        isLoading={isLoading}
        isError={isError}
        errorMessage={error instanceof Error ? error.message : "Something went wrong"}
        onRetry={() => refetch()}
        onAdd={openAdd}
        onEdit={openEdit}
        onDelete={(id) => deletePatient(id)}
        isDeleting={(id) => isPending && variables === id}
      />

      <PatientModal
        open={modal.open}
        mode={modal.mode}
        onClose={closeModal}
        onCreate={(values) => createPatient(values)}
        patientId={editPatient?.id}
        initialValues={editPatient ? toFormValues(editPatient) : undefined}
        onUpdate={({ id, patch }) => updatePatient({ id, patch })}
        onDelete={(id) => deletePatient(id)}
        isSubmitting={isPending || isPending}
        isDeleting={isPending}
      />
    </>
  );
}