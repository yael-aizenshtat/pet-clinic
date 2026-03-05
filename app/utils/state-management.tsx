import { Plus, Save } from "lucide-react";
import type { PatientModalMode } from "~/types/patient";

export const getTitle = (mode: PatientModalMode) =>
  mode === "create" ? "Add patient" : "Edit patient";

export const getPrimaryText = (mode: PatientModalMode) =>
  mode === "create" ? "Add" : "Save";

export const getPrimaryIcon = (mode: PatientModalMode) =>
  mode === "edit" ? (
    <Save className="w-4 h-4" />
  ) : (
    <Plus className="w-4 h-4" />
  );

export const getPrimaryDescription = (mode: PatientModalMode) =>
  mode === "create"
    ? "Create a new patient record"
    : "Update patient details";