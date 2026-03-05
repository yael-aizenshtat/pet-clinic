import { petTypeOptions, type PatientFormValues } from "~/schemas/patient.schema";
import { Calendar, PawPrint, Phone, User } from "lucide-react";
import { Field } from "../ui/Field";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";

export type PatientFormProps = {
  values: PatientFormValues;
  onChange: (next: PatientFormValues) => void;
  errors?: Partial<Record<keyof PatientFormValues, string>>;
  disabled?: boolean;
};

export const PatientForm = ({
  values,
  onChange,
  errors,
  disabled,
}: PatientFormProps) => {
  const set = <K extends keyof PatientFormValues>(
    key: K,
    value: PatientFormValues[K],
  ) => onChange({ ...values, [key]: value });

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Field label="Name" htmlFor="name" icon={User}>
        <Input
          id="name"
          name="name"
          value={values.name}
          onChange={(e) => set("name", e.target.value)}
          disabled={disabled}
          error={errors?.name}
          autoComplete="name"
        />
      </Field>

      <Field label="Phone" htmlFor="phone" icon={Phone}>
        <Input
          id="phone"
          name="phone"
          value={values.phone}
          onChange={(e) => set("phone", e.target.value)}
          disabled={disabled}
          error={errors?.phone}
          inputMode="tel"
          autoComplete="tel"
        />
      </Field>

      <Field label="Pet Name" htmlFor="petName" icon={PawPrint}>
        <Input
          id="petName"
          name="petName"
          value={values.petName}
          onChange={(e) => set("petName", e.target.value)}
          disabled={disabled}
          error={errors?.petName}
        />
      </Field>

      <Field label="Pet Birth Date" htmlFor="petBirthDate" icon={Calendar}>
        <Input
          id="petBirthDate"
          name="petBirthDate"
          type="date"
          value={values.petBirthDate}
          onChange={(e) => set("petBirthDate", e.target.value)}
          disabled={disabled}
          error={errors?.petBirthDate}
        />
      </Field>

      <div className="sm:col-span-2">
        <Field label="Pet Type" htmlFor="petType">
          <Select
            id="petType"
            name="petType"
            value={values.petType}
            onChange={(e) => set("petType", e.target.value as PatientFormValues["petType"])}
            disabled={disabled}
            error={errors?.petType}
            options={petTypeOptions.map((o) => ({ label: o.label, value: o.value }))}
          />
        </Field>
      </div>
    </div>
  );
};