import type { PetType } from "~/schemas/patient.schema";

export type Patient = {
  id: string;
  name: string;
  phone: string;
  petName: string;
  petBirthDate: string;
  petType: PetType;
  createdAt?: string;
  updatedAt?: string;
};

export type PatientCreateInput = Omit<Patient, "id" | "createdAt" | "updatedAt">;
export type PatientUpdateInput = Partial<PatientCreateInput>;