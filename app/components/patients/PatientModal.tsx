import {
  getEmptyPatientValues,
  patientCreateSchema,
  patientUpdateSchema,
} from "~/schemas/patient.schema";

import type {
  PatientCreateInput,
  PatientUpdateInput,
} from "~/schemas/patient.schema";

import { useEffect, useState } from "react";
import {
  getPrimaryDescription,
  getPrimaryIcon,
  getPrimaryText,
  getTitle,
} from "~/utils/state-management";
import { Trash2 } from "lucide-react";
import { buildPatch } from "~/utils/build-patch";
import { firstError } from "~/utils/first-error";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";
import { PatientForm } from "./PatientForm";

export type PatientModalMode = "create" | "edit";
type ZodFieldErrors = Partial<
  Record<keyof PatientCreateInput, string[]>
>;

export type PatientModalProps = {
  open: boolean;
  mode: PatientModalMode;
  initialValues?: PatientCreateInput;
  onClose: () => void;
  onCreate: (values: PatientCreateInput) => Promise<void> | void;
  onUpdate: (args: { id: string; patch: PatientUpdateInput }) => Promise<void> | void
  patientId?: string;
  onDelete?: (id: string) => Promise<void> | void;
  isSubmitting?: boolean;
  isDeleting?: boolean;
};

export const PatientModal = ({
  open,
  mode,
  initialValues,
  onClose,
  onCreate,
  onUpdate,
  patientId,
  onDelete,
  isSubmitting,
  isDeleting,
}: PatientModalProps) => {
  const [values, setValues] = useState<PatientCreateInput>(() =>
    mode === "edit" && initialValues ? initialValues : getEmptyPatientValues()
  );

  const [fieldErrors, setFieldErrors] = useState<ZodFieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setFieldErrors({});
    setFormError(null);
    setValues(mode === "edit" && initialValues ? initialValues : getEmptyPatientValues());
  }, [open, mode, initialValues]);

  const disabled = Boolean(isSubmitting || isDeleting);

  const handleSubmit = async () => {
    setFieldErrors({});
    setFormError(null);

    if (mode === "create") {
      const result = patientCreateSchema.safeParse(values);

      if (!result.success) {
        const flat = result.error.flatten();
        setFieldErrors(flat.fieldErrors as ZodFieldErrors);
        setFormError(flat.formErrors?.[0] ?? null);
        return;
      }

      await onCreate(result.data);
      onClose();
      return;
    }

    if (!patientId) {
      setFormError("Missing patient id");
      return;
    }

    const initial = initialValues ?? getEmptyPatientValues();
    const patch = buildPatch(initial, values);

    if (Object.keys(patch).length === 0) {
      onClose();
      return;
    }

    const result = patientUpdateSchema.safeParse(patch);

    if (!result.success) {
      const flat = result.error.flatten();
      setFieldErrors(flat.fieldErrors as ZodFieldErrors);
      setFormError(flat.formErrors?.[0] ?? null);
      return;
    }

    await onUpdate({ id: patientId, patch: result.data });
    onClose();
  };

  const handleDelete = async () => {
    if (mode !== "edit" || !onDelete) return;
    if (!patientId) {
      setFormError("Missing patient id");
      return;
    }
    await onDelete(patientId);
    onClose();
  };

  const footer = (
    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        {mode === "edit" && onDelete && (
          <Button
            variant="danger"
            size="sm"
            onClick={handleDelete}
            isLoading={isDeleting}
            disabled={isSubmitting}
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
        )}
      </div>

      <div className="flex items-center justify-end gap-2">
        <Button
          variant="secondary"
          onClick={onClose}
          disabled={disabled}
        >
          Close
        </Button>
        <Button
          onClick={handleSubmit}
          isLoading={isSubmitting}
          disabled={isDeleting}
        >
          {getPrimaryIcon(mode)}
          {getPrimaryText(mode)}
        </Button>
      </div>
    </div>
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={getTitle(mode)}
      description={getPrimaryDescription(mode)}
      footer={footer}
      size="md"
    >
      {formError && (
        <div className="mb-4 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700 ring-1 ring-rose-100">
          {formError}
        </div>
      )}

      <PatientForm
        values={values}
        onChange={setValues}
        disabled={disabled}
        errors={{
          name: firstError(fieldErrors.name),
          phone: firstError(fieldErrors.phone),
          petName: firstError(fieldErrors.petName),
          petBirthDate: firstError(fieldErrors.petBirthDate),
          petType: firstError(fieldErrors.petType),
        }}
      />
    </Modal>
  );
};