import type {
  PatientCreateInput,
  PatientUpdateInput,
} from "~/schemas/patient.schema";

const isEqual = (a: unknown, b: unknown) => a === b;

export const buildPatch = (
  initial: PatientCreateInput,
  current: PatientCreateInput,
): PatientUpdateInput => {
  const patch: PatientUpdateInput = {};

  (Object.keys(current) as Array<keyof PatientCreateInput>).forEach((key) => {
    if (!isEqual(current[key], initial[key])) {
      patch[key] = current[key] as any;
    }
  });

  return patch;
};