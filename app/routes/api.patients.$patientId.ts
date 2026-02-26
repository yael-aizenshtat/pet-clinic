import type { LoaderFunctionArgs, ActionFunctionArgs } from "react-router";
import {
  getPatientById,
  updatePatient,
  deletePatient,
} from "~/models/patient.server";
import { patientUpdateSchema } from "~/schemas/patient.schema";
import {
  json,
  badRequest,
  notFound,
  methodNotAllowed,
} from "~/utils/http.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
  if (request.method !== "GET") return methodNotAllowed();

  const id = params.patientId;
  if (!id) return notFound({ message: "Missing patientId" });

  const patient = await getPatientById(id);
  if (!patient) return notFound({ message: "Patient not found" });

  return json(patient);
}

export async function action({ request, params }: ActionFunctionArgs) {
  const id = params.patientId;
  if (!id) return notFound({ message: "Missing patientId" });

  if (request.method === "PUT" || request.method === "PATCH") {
    const body = await request.json().catch(() => null);
    const parsed = patientUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return badRequest({
        message: "Validation error",
        issues: parsed.error.flatten(),
      });
    }

    const updated = await updatePatient(id, parsed.data);
    if (!updated) return notFound({ message: "Patient not found" });

    return json(updated);
  }

  if (request.method === "DELETE") {
    const ok = await deletePatient(id);
    if (!ok) return notFound({ message: "Patient not found" });
    return json({ ok: true });
  }

  return methodNotAllowed();
}