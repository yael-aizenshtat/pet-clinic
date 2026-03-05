import { z } from "zod";
import { isNotFutureDate } from "~/utils/dates";

export const petTypeSchema = z.enum(["Dog", "Cat", "Parrot"]);

export const patientCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(5, "Phone is too short"),
  petName: z.string().min(1, "Pet name is required"),
  petBirthDate: z
    .string()
    .min(4, "Birth date is required")
    .refine(isNotFutureDate, "Birth date cannot be in the future"),
  petType: petTypeSchema,
});

export const patientUpdateSchema = patientCreateSchema
  .partial()
  .refine((obj) => Object.keys(obj).length > 0, {
    message: "At least one field must be provided",
  });

export type PetType = z.infer<typeof petTypeSchema>;
export type PatientCreateInput = z.infer<typeof patientCreateSchema>;
export type PatientUpdateInput = z.infer<typeof patientUpdateSchema>;

export const patientFormSchema = patientCreateSchema;
export type PatientFormValues = PatientCreateInput;

export const petTypeOptions = [
  { label: "🐶 Dog", value: "Dog" },
  { label: "🐱 Cat", value: "Cat" },
  { label: "🦜 Parrot", value: "Parrot" },
] as const satisfies ReadonlyArray<{ label: string; value: PetType }>;

export function getEmptyPatientValues(): PatientFormValues {
  return {
    name: "",
    phone: "",
    petName: "",
    petBirthDate: "",
    petType: "Dog",
  };
}