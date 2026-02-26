import { z } from "zod";

export const petTypeSchema = z.enum(["Dog", "Cat", "Parrot"]);

export const patientCreateSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(5),
  petName: z.string().min(1),
  petBirthDate: z.string().min(4), 
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