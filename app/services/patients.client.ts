// app/services/patients.client.ts
import type { Patient, PatientCreateInput, PatientUpdateInput } from "~/types/patient";
import { fetchJson } from "~/utils/fetchJson";

export const patientsApi = {
  list(): Promise<Patient[]> {
    return fetchJson<Patient[]>("/api/patients");
  },
  create(payload: PatientCreateInput): Promise<Patient> {
    return fetchJson<Patient>("/api/patients", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  update(id: string, patch: PatientUpdateInput): Promise<Patient> {
    return fetchJson<Patient>(`/api/patients/${id}`, {
      method: "PUT",
      body: JSON.stringify(patch),
    });
  },
  remove(id: string): Promise<{ ok: true }> {
    return fetchJson<{ ok: true }>(`/api/patients/${id}`, {
      method: "DELETE",
    });
  },
};