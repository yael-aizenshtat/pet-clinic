import type { Patient, PatientCreateInput } from "~/types/patient";

export const toFormValues = (p: Patient): PatientCreateInput => {
  return {
    name: p.name,
    phone: p.phone,
    petName: p.petName,
    petBirthDate: p.petBirthDate,
    petType: p.petType,
  };
};