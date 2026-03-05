import type { LoaderFunctionArgs, ActionFunctionArgs } from "react-router";
import { listPatients, createPatient } from "~/models/patient.server";
import { patientCreateSchema } from "~/schemas/patient.schema";
import { json, badRequest, methodNotAllowed } from "~/utils/http.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  if (request.method !== "GET") return methodNotAllowed();
  const patients = await listPatients();
  return json(patients);
};

export const action = async ({ request }: ActionFunctionArgs) => {
  if (request.method !== "POST") return methodNotAllowed();

  const body = await request.json().catch(() => null);
  const parsed = patientCreateSchema.safeParse(body);

  if (!parsed.success) {
    return badRequest({
      message: "Validation error",
      issues: parsed.error.flatten(),
    });
  }

  const created = await createPatient(parsed.data);
  return json(created, { status: 201 });
};