import { useRef, useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown, Filter } from "lucide-react";
import type { Header } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import type { Patient } from "~/types/patient";
import { EnumFilterDropdown } from "../ui/EnumFilterDropdown";
import { TextFilterDropdown } from "../ui/TextFilterDropdown";
import { DropdownPortal } from "../ui/DropDownPortal";

type Props = { header: Header<Patient, unknown> };

export const TableHeadCell = ({ header }: Props) => {
  const canSort = header.column.getCanSort();
  const sortDir = header.column.getIsSorted();
  const canFilter = header.column.getCanFilter();

  const [showFilter, setShowFilter] = useState(false);
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const filterValue = (header.column.getFilterValue() ?? "") as string;

  const SortIcon = () => {
    return sortDir === "asc"
      ? <ArrowUp className="ml-2 h-4 w-4" />
      : sortDir === "desc"
        ? <ArrowDown className="ml-2 h-4 w-4" />
        : <ArrowUpDown className="ml-2 h-4 w-4 opacity-40" />;
  };

  if (header.isPlaceholder) return <th className="px-4 py-3" />;

  const meta = header.column.columnDef.meta as
    | {
      filterVariant?: "text" | "enum";
      enumOptions?: { value: string; label: string }[];
    }
    | undefined;

  const isEnumFilter = meta?.filterVariant === "enum" && meta.enumOptions?.length;
  const selectedEnumValues = (Array.isArray(filterValue) ? filterValue : []) as string[];

  return (
    <th className="px-4 py-3 font-semibold text-white relative">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
          className={`inline-flex items-center gap-1 ${canSort ? "cursor-pointer select-none" : "cursor-default"
            }`}
        >
          {flexRender(header.column.columnDef.header, header.getContext())}
          {canSort && SortIcon()}
        </button>

        {canFilter && (
          <button
            ref={anchorRef}
            onClick={() => setShowFilter((isShow) => !isShow)}
            className="opacity-70 hover:opacity-100"
          >
            <Filter className="w-4 h-4" />
          </button>
        )}
      </div>

      {showFilter && !isEnumFilter && (
        <DropdownPortal
          open={showFilter}
          anchorEl={anchorRef.current}
          onClose={() => setShowFilter(false)}
        >
          <TextFilterDropdown
            open={showFilter}
            onClose={() => setShowFilter(false)}
            value={filterValue}
            onChange={(v) => header.column.setFilterValue(v)}
            placeholder="Search..."
          />
        </DropdownPortal>
      )}

      {isEnumFilter && (
        <DropdownPortal
          open={showFilter}
          anchorEl={anchorRef.current}
          onClose={() => setShowFilter(false)}
        >
          <EnumFilterDropdown
            open={true}
            onClose={() => setShowFilter(false)}
            options={meta!.enumOptions!}
            value={selectedEnumValues}
            onChange={(next) => header.column.setFilterValue(next)}
            className="mt-0"
          />
        </DropdownPortal>
      )}

    </th>
  );
}