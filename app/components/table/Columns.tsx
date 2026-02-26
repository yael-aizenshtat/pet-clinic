import type { ColumnDef } from "@tanstack/react-table";
import type { Patient } from "~/types/patient";
import { calcAgeFromBirthDate } from "~/utils/dates";
import { RowActions } from "./RowActions";
import { PatientTypePill } from "../patients/PatientTypePill";

type BuildColumnsArgs = {
  onEdit: (p: Patient) => void;
  onDelete: (id: string) => void;
  isDeleting?: (id: string) => boolean;
};

export function buildPatientColumns({
  onEdit,
  onDelete,
  isDeleting,
}: BuildColumnsArgs): ColumnDef<Patient>[] {
  return [
    {
      accessorKey: "name",
      header: "Name",
      cell: (ctx) => <span className="font-medium">{ctx.getValue<string>()}</span>,
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: (ctx) => <span className="tabular-nums">{ctx.getValue<string>()}</span>,
    },
    {
      accessorKey: "petName",
      header: "Pet Name",
    },
    {
      id: "petAge",
      header: "Pet Age",
      accessorFn: (row) => calcAgeFromBirthDate(row.petBirthDate),
      cell: (ctx) => <span className="tabular-nums">{ctx.getValue<number>()}</span>,
      sortingFn: "basic",
    },
    {
      accessorKey: "petType",
      header: "Pet Type",
      cell: (ctx) => <PatientTypePill value={ctx.getValue<Patient["petType"]>()} />,
    },
    {
      id: "actions",
      header: "",
      enableSorting: false,
      cell: (ctx) => (
        <RowActions
          patient={ctx.row.original}
          onEdit={onEdit}
          onDelete={onDelete}
          deleting={isDeleting?.(ctx.row.original.id) ?? false}
        />
      ),
    },
  ];
}