import type { PetType } from "~/schemas/patient.schema";

export function PatientTypePill({ value }: { value: PetType }) {
  return (
    <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-2 py-1 text-xs">
      {value}
    </span>
  );
}