import type { PatientCreateInput, PatientUpdateInput } from "~/schemas/patient.schema";

function isEqual(a: unknown, b: unknown) {
    return a === b;
}

export function buildPatch(
    initial: PatientCreateInput,
    current: PatientCreateInput
): PatientUpdateInput {
    const patch: PatientUpdateInput = {};

    (Object.keys(current) as Array<keyof PatientCreateInput>).forEach((key) => {
        if (!isEqual(current[key], initial[key])) {
            patch[key] = current[key] as any;
        }
    });

    return patch;
}