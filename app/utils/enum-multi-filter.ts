import type { FilterFn } from "@tanstack/react-table";
import type { Patient } from "~/types/patient";

export const enumMultiFilter: FilterFn<Patient> = (
    row,
    columnId,
    filterValue
) => {
    const selected = (filterValue ?? []) as string[];
    if (!selected.length) return true;

    const cellValue = row.getValue(columnId) as string;
    return selected.includes(cellValue);
};