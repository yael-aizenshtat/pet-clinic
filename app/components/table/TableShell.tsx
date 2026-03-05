import type { Table } from "@tanstack/react-table";
import type { Patient } from "~/types/patient";
import { TableHeadCell } from "./TableHeadCell";
import { TableBodyRow } from "./TableBodyRow";

type Props = { table: Table<Patient> };

export const TableShell = ({ table }: Props) => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((h) => (
                  <TableHeadCell key={h.id} header={h} />
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <TableBodyRow key={row.id} row={row} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};