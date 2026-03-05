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
import { buildPatientColumns } from "~/components/table/Columns";
import { useMemo, useState } from "react";

type UseTableArgs = {
  data: Patient[];
  onEdit: (p: Patient) => void;
  onDelete: (id: string) => void;
  isDeleting?: (id: string) => boolean;
};

export function useTable({ data, onEdit, onDelete, isDeleting }: UseTableArgs) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const columns = useMemo(
    () => buildPatientColumns({ onEdit, onDelete, isDeleting }),
    [onEdit, onDelete, isDeleting]
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters},
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return { table };
}