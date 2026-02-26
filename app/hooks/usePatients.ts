import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { patientsApi } from "~/services/patients.client";
import type { Patient, PatientCreateInput, PatientUpdateInput } from "~/types/patient";

const keys = {
  patients: ["patients"] as const,
};

export function usePatients(opts?: { initialData?: Patient[] }) {
    return useQuery({
      queryKey: keys.patients,
      queryFn: () => patientsApi.list(),
      initialData: opts?.initialData,
    });
  }

export function useCreatePatient() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: PatientCreateInput) => patientsApi.create(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.patients }),
  });
}

export function useUpdatePatient() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: { id: string; patch: PatientUpdateInput }) =>
      patientsApi.update(args.id, args.patch),
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.patients }),
  });
}

export function useDeletePatient() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => patientsApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.patients }),
  });
}