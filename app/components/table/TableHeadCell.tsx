import { useRef, useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown, Filter } from "lucide-react";
import type { Header } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import type { Patient } from "~/types/patient";
import { EnumFilterDropdown } from "../ui/EnumFilterDropdown";
import { TextFilterDropdown } from "../ui/TextFilterDropdown";
import { DropdownPortal } from "../ui/DropDownPortal";
import { cn } from "~/utils/cn";

type Props = { header: Header<Patient, unknown> };

export const TableHeadCell = ({ header }: Props) => {
  const canSort = header.column.getCanSort();
  const sortDir = header.column.getIsSorted();
  const canFilter = header.column.getCanFilter();
  const isFiltered = header.column.getIsFiltered();

  const [showFilter, setShowFilter] = useState(false);
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const filterValue = header.column.getFilterValue();

  const SortIcon = () => {
    return sortDir === "asc" ? (
      <ArrowUp className="ml-2 h-4 w-4" />
    ) : sortDir === "desc" ? (
      <ArrowDown className="ml-2 h-4 w-4" />
    ) : (
      <ArrowUpDown className="ml-2 h-4 w-4 opacity-40" />
    );
  };

  if (header.isPlaceholder) return <th className="px-4 py-3" />;

  const meta = header.column.columnDef.meta as
    | {
        filterVariant?: "text" | "enum";
        enumOptions?: { value: string; label: string }[];
      }
    | undefined;

  const isEnumFilter =
    meta?.filterVariant === "enum" && meta.enumOptions?.length;

  const selectedEnumValues = (
    Array.isArray(filterValue) ? filterValue : []
  ) as string[];

  return (
    <th className="relative px-4 py-3 font-semibold text-white">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
          className={cn(
            "inline-flex items-center gap-1",
            canSort ? "cursor-pointer select-none" : "cursor-default"
          )}
        >
          {flexRender(header.column.columnDef.header, header.getContext())}
          {canSort && <SortIcon />}
        </button>

        {canFilter && (
          <button
            type="button"
            ref={anchorRef}
            onClick={() => setShowFilter((isShow) => !isShow)}
            className={cn(
              "relative cursor-pointer rounded-md p-1 transition",
              isFiltered
                ? "bg-white/20 text-white opacity-100"
                : "opacity-70 hover:opacity-100"
            )}
            aria-label="Open filter"
          >
            <Filter className="h-4 w-4" />

            {isFiltered && (
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-amber-300" />
            )}
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
            value={typeof filterValue === "string" ? filterValue : ""}
            onChange={(v) => header.column.setFilterValue(v)}
            placeholder="Search..."
          />
        </DropdownPortal>
      )}

{showFilter && isEnumFilter && (
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
      onChange={(next) =>
        header.column.setFilterValue(next.length ? next : undefined)
      }
      className="mt-0"
    />
  </DropdownPortal>
)}
    </th>
  );
};