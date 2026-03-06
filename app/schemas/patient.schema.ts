import { z } from "zod";
import { isNotFutureDate } from "~/utils/dates";

const petTypeSchema = z.enum(["Dog", "Cat", "Parrot"]);

const phoneSchema = z
  .string()
  .trim()
  .min(1, "Phone is required")
  .regex(/^[0-9]+$/, "Phone must contain only digits")
  .min(9, "Phone is too short")
  .max(10, "Phone is too long");

export const patientCreateSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  phone: phoneSchema,
  petName: z.string().trim().min(1, "Pet name is required"),
  petBirthDate: z
    .string()
    .min(4, "Birth date is required")
    .refine(isNotFutureDate, "Birth date cannot be in the future"),
  petType: petTypeSchema,
});

export const patientUpdateSchema = z.object({
    name: z.string().trim().min(1, "Name is required").optional(),
    phone: phoneSchema.optional(),
    petName: z.string().trim().min(1, "Pet name is required").optional(),
    petBirthDate: z
      .string()
      .min(4, "Birth date is required")
      .refine(isNotFutureDate, "Birth date cannot be in the future")
      .optional(),
    petType: petTypeSchema.optional(),
  })
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

export const getEmptyPatientValues = (): PatientFormValues => ({
  name: "",
  phone: "",
  petName: "",
  petBirthDate: "",
  petType: "Dog",
});