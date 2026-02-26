import * as React from "react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  type ColumnFiltersState,
  useReactTable,
} from "@tanstack/react-table";
import type { Patient } from "~/types/patient";
import { buildPatientColumns } from "~/components/table/columns";

type UseTableArgs = {
  data: Patient[];
  onEdit: (p: Patient) => void;
  onDelete: (id: string) => void;
  isDeleting?: (id: string) => boolean;
};

export function useTable({ data, onEdit, onDelete, isDeleting }: UseTableArgs) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const columns = React.useMemo(
    () => buildPatientColumns({ onEdit, onDelete, isDeleting }),
    [onEdit, onDelete, isDeleting]
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters, globalFilter },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,

    globalFilterFn: (row, _columnId, value) => {
      const q = String(value ?? "").toLowerCase().trim();
      if (!q) return true;

      const p = row.original;
      const haystack = `${p.name} ${p.phone} ${p.petName} ${p.petType}`.toLowerCase();
      return haystack.includes(q);
    },

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return { table, globalFilter, setGlobalFilter };
}