import type { Table } from "@tanstack/react-table";
import type { Patient } from "~/types/patient";

export function PaginationBar({ table }: { table: Table<Patient> }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-sm text-gray-600">
        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="rounded-lg border border-gray-200 px-3 py-1 text-sm disabled:opacity-50"
        >
          Prev
        </button>
        <button
          type="button"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="rounded-lg border border-gray-200 px-3 py-1 text-sm disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}