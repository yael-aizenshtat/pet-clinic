import { Plus, Save } from "lucide-react";
import type { PatientModalMode } from "~/types/patient";

export function getTitle(mode: PatientModalMode) {
    return mode === "create" ? "Add patient" : "Edit patient";
  }
  
  export function getPrimaryText(mode: PatientModalMode) {
    return mode === "create" ? "Add" : "Save";
  }
  
  export function getPrimaryIcon(mode: PatientModalMode) {
    return mode === "edit" ? (
      <Save className="w-4 h-4" />
    ) : (
      <Plus className="w-4 h-4" />
    )
  }

  export function getPrimaryDescription(mode: PatientModalMode) {
    return mode === "create" ? "Create a new patient record" : "Update patient details";
  }