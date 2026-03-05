import { memo } from "react";
import type { Row } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import type { Patient } from "~/types/patient";

type Props = { row: Row<Patient> };

export const TableBodyRow = memo(function TableBodyRow({ row }: Props) {
  return (
    <tr className="border-b border-gray-100 last:border-0 hover:bg-gray-50/60">
      {row.getVisibleCells().map((cell) => (
        <td key={cell.id} className="px-4 py-3 text-gray-800">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  );
});