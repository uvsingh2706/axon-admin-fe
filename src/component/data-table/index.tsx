import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  getPaginationRowModel,
  type PaginationState,
  type Updater,
  type ColumnFiltersState,
  getFilteredRowModel,
  type FilterFn,
  type RowData,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/component/ui/table";
import { Skeleton } from "@/component/ui/skeleton";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";
import UpDownIcon from "@/assets/icons/UpDownIcon";
import type {
  DataTableProps,
  ExtendedColumnDef,
  PageButtonProps,
} from "./DataTable.types";
export type { DataTableProps, ExtendedColumnDef, PageButtonProps } from "./DataTable.types";

// ─── Stable empty fallbacks ───────────────────────────────────────────────────
// These are module-level constants so they are the SAME reference on every render.
// Passing [] inline as a prop creates a new array every render → infinite loop.

const EMPTY_COLUMN_FILTERS: ColumnFiltersState = [];

// ─── Global fuzzy-style filter across all string columns ─────────────────────

const globalSearchFilter: FilterFn<unknown> = (
  row,
  _columnId,
  filterValue: string
) => {
  const search = filterValue.toLowerCase().trim();
  if (!search) return true;
  return row.getAllCells().some((cell) => {
    const val = cell.getValue();
    return val != null && String(val).toLowerCase().includes(search);
  });
};

// Mark so TanStack picks it up
globalSearchFilter.autoRemove = (val: string) => !val?.trim();

// ─── Component ────────────────────────────────────────────────────────────────

export function DataTable<TData extends RowData, TValue = unknown>({
  columns,
  data,
  cellClassName,
  headClassName,
  tbodyClassName,
  theadClassName,
  wrapperClassName,
  isLoading = false,
  skeletonRows = 10,
  disablePagination = false,
  defaultPageSize = 10,
  isServerSide = false,
  pagination: externalPagination,
  onPaginationChange,
  pageCount,
  totalItems,
  search,
  columnFilters,
  isLink = false,
  link,
  toolbar,
  filterPills,
  emptyIcon = "📭",
  emptyMessage = "No results found.",
}: DataTableProps<TData, TValue>) {
  const navigate = useNavigate();

  // ── Internal pagination (client-side) ──────────────────────────────────────
  const [sorting, setSorting] = useState<SortingState>([]);
  const [internalPagination, setInternalPagination] = useState<PaginationState>(
    () => ({ pageIndex: 0, pageSize: defaultPageSize })
  );

  // ── Stable resolved values ─────────────────────────────────────────────────
  // Use the caller's columnFilters only if provided; otherwise fall back to the
  // module-level empty constant so the reference never changes.
  const resolvedColumnFilters = columnFilters ?? EMPTY_COLUMN_FILTERS;

  // Resolved pagination state
  const resolvedPagination = isServerSide
    ? (externalPagination ?? internalPagination)
    : internalPagination;

  // ── Stable onPaginationChange ──────────────────────────────────────────────
  // Wrap the external handler in useCallback so the table's internal reference
  // stays stable across renders.  For client-side we always use setInternalPagination.
  const stableOnPaginationChange = useCallback(
    (updater: Updater<PaginationState>) => {
      if (isServerSide && onPaginationChange) {
        onPaginationChange(updater);
      } else {
        setInternalPagination((prev) =>
          typeof updater === "function" ? updater(prev) : updater
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isServerSide, onPaginationChange]
  );

  // ── Reset to page 0 when search or columnFilters change (client-side) ──────
  const prevSearch = useRef(search);
  const prevFilters = useRef(resolvedColumnFilters);
  useEffect(() => {
    if (isServerSide) return;
    if (
      prevSearch.current !== search ||
      prevFilters.current !== resolvedColumnFilters
    ) {
      setInternalPagination((p) => ({ ...p, pageIndex: 0 }));
      prevSearch.current = search;
      prevFilters.current = resolvedColumnFilters;
    }
  }, [search, resolvedColumnFilters, isServerSide]);

  // ── Table instance ─────────────────────────────────────────────────────────
  // useMemo on the options object is NOT needed — useReactTable is already
  // optimised.  What matters is that the VALUES we pass in are stable.
  const table = useReactTable<TData>({
    data,
    columns,
    filterFns: {
      globalSearch: globalSearchFilter,
    },
    state: {
      sorting,
      pagination: resolvedPagination,
      // Server-side: let the server handle filtering; pass undefined so TanStack
      // doesn't try to filter locally and trigger spurious recalculations.
      globalFilter: isServerSide ? undefined : (search ?? ""),
      columnFilters: isServerSide ? EMPTY_COLUMN_FILTERS : resolvedColumnFilters,
    },
    onSortingChange: setSorting,
    onPaginationChange: stableOnPaginationChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: isServerSide,
    manualFiltering: isServerSide,
    // Only auto-reset page when the data itself changes (not on every render).
    autoResetPageIndex: !isServerSide,
    pageCount: isServerSide ? (pageCount ?? -1) : undefined,
    // globalFilterFn: globalSearchFilter,
  });

  // ── Pagination display math ────────────────────────────────────────────────
  const { pageIndex, pageSize } = table.getState().pagination;
  const totalRecords = isServerSide
    ? (totalItems ?? 0)
    : table.getFilteredRowModel().rows.length;
  const startRow = totalRecords === 0 ? 0 : pageIndex * pageSize + 1;
  const endRow = Math.min((pageIndex + 1) * pageSize, totalRecords);

  // ── Page numbers (stable — recomputed only when pageIndex / pageCount change)
  const pageNumbers = useMemo(
    () => buildPageNumbers(pageIndex, table.getPageCount()),
    [pageIndex, table.getPageCount()]
  );

  // ── Row click handler ──────────────────────────────────────────────────────
  const handleRowClick = useCallback(
    (row: TData) => {
      if (isLink && link) navigate(link(row));
    },
    [isLink, link, navigate]
  );

  // ── Skeleton rows (stable array) ───────────────────────────────────────────
  const skeletonRowArray = useMemo(
    () => Array.from({ length: skeletonRows }),
    [skeletonRows]
  );
  const skeletonCellArray = useMemo(
    () => Array.from({ length: columns.length }),
    [columns.length]
  );

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className={cn("w-full flex flex-col gap-4", wrapperClassName)}>
      {/* Toolbar */}
      {toolbar && <div className="w-full">{toolbar}</div>}

      {/* Active filter pills */}
      {filterPills && (
        <div className="flex items-center gap-2 flex-wrap">{filterPills}</div>
      )}

      {/* Grid */}
      <div className="border border-secondary-00 rounded-xl overflow-x-auto bg-white shadow-sm w-full">
        <Table className="w-full min-w-max">
          <TableHeader className={theadClassName}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{ width: header.column.getSize() }}
                    onClick={
                      header.column.columnDef.enableSorting
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                    className={cn(
                      "font-semibold text-sm first:pl-6 last:pr-6 py-4 px-4",
                      "border-y border-secondary-00 bg-secondary-00",
                      "text-text-950 whitespace-nowrap select-none",
                      header.column.columnDef.enableSorting && "cursor-pointer",
                      headClassName
                    )}
                  >
                    <div className="flex items-center gap-1.5">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {header.column.columnDef.enableSorting && (
                        <UpDownIcon className="h-3.5 w-3.5 shrink-0 text-[#98A2B3]" />
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody className={tbodyClassName}>
            {isLoading ? (
              // ── Skeleton rows ─────────────────────────────────────────────
              skeletonRowArray.map((_, i) => (
                <TableRow key={`skel-row-${i}`}>
                  {skeletonCellArray.map((_, j) => (
                    <TableCell
                      key={`skel-cell-${j}`}
                      className={cn(
                        "first:pl-6 last:pr-6 py-4 px-4 border-b border-secondary-00",
                        cellClassName
                      )}
                    >
                      <Skeleton className="w-full h-8 rounded bg-neutral-100" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows.length ? (
              // ── Data rows ──────────────────────────────────────────────────
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                  onClick={() => handleRowClick(row.original)}
                  className={cn(
                    "transition-colors hover:bg-[#FAFAFA]",
                    isLink && "cursor-pointer"
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        "font-medium text-sm first:pl-6 last:pr-6 py-4 px-4",
                        "border-b border-secondary-00 text-text-950 whitespace-nowrap",
                        cellClassName
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              // ── Empty state ────────────────────────────────────────────────
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center"
                >
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-4xl">{emptyIcon}</span>
                    <span className="text-sm text-muted-foreground">
                      {emptyMessage}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {!disablePagination && (
        <div className="flex items-center justify-between py-2 w-full flex-col sm:flex-row gap-4">
          <p className="text-sm text-[#475467]">
            Showing{" "}
            <strong className="font-semibold text-[#101828]">
              {startRow} – {endRow}
            </strong>{" "}
            of{" "}
            <strong className="font-semibold text-[#101828]">
              {totalRecords}
            </strong>{" "}
            results
          </p>

          <div className="flex items-center gap-1">
            <PageButton
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              aria-label="Previous page"
            >
              <ArrowLeftIcon className="h-3 w-1.5" />
            </PageButton>

            {pageNumbers.map((page, i) =>
              page === "..." ? (
                <span
                  key={`dots-${i}`}
                  className="px-1.5 text-sm text-[#475467]"
                >
                  …
                </span>
              ) : (
                <PageButton
                  key={`page-${page}`}
                  active={pageIndex === Number(page) - 1}
                  onClick={() => table.setPageIndex(Number(page) - 1)}
                  aria-label={`Page ${page}`}
                >
                  {page}
                </PageButton>
              )
            )}

            <PageButton
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              aria-label="Next page"
            >
              <ArrowRightIcon className="h-3 w-1.5" />
            </PageButton>
          </div>
        </div>
      )}
    </div>
  );
}


function PageButton({
  children,
  onClick,
  disabled,
  active,
  "aria-label": ariaLabel,
}: PageButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-current={active ? "page" : undefined}
      className={cn(
        "h-8 w-8 flex items-center justify-center rounded-md text-sm font-medium",
        "transition-colors disabled:opacity-40 disabled:cursor-not-allowed",
        active
          ? " text-[#101828] border border-[#D3D3D4]"
          : "text-[#475467] hover:bg-[#F9FAFB] cursor-pointer"
      )}
    >
      {children}
    </button>
  );
}


function buildPageNumbers(
  currentIndex: number,
  total: number
): (number | "...")[] {
  if (total <= 0) return [];
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const current = currentIndex + 1; // convert to 1-based
  const pages: (number | "...")[] = [1];

  if (current > 3) pages.push("...");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push("...");
  if (total > 1) pages.push(total);

  return pages;
}