import type { Header } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import type { Patient } from "~/types/patient";

type Props = { header: Header<Patient, unknown> };

export function TableHeadCell({ header }: Props) {
  const canSort = header.column.getCanSort();
  const sortDir = header.column.getIsSorted(); 
  return (
    <th className="px-4 py-3 font-semibold text-white">
      {header.isPlaceholder ? null : (
        <button
          type="button"
          disabled={!canSort}
          onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
          className={`inline-flex items-center gap-1 ${
            canSort ? "cursor-pointer select-none" : "cursor-default"
          }`}
        >
          {flexRender(header.column.columnDef.header, header.getContext())}
          {sortDir === "asc" ? "▲" : sortDir === "desc" ? "▼" : ""}
        </button>
      )}
    </th>
  );
}