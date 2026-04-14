import type {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  RowData,
  Updater,
} from "@tanstack/react-table";
import type { ReactNode } from "react";

export type ExtendedColumnDef<TData, TValue = unknown> = ColumnDef<TData, TValue>;

export interface DataTableProps<TData extends RowData, TValue = unknown> {
  columns: ExtendedColumnDef<TData, TValue>[];
  data: TData[];
  cellClassName?: string;
  headClassName?: string;
  tbodyClassName?: string;
  theadClassName?: string;
  wrapperClassName?: string;
  isLoading?: boolean;
  skeletonRows?: number;
  disablePagination?: boolean;
  defaultPageSize?: number;
  isServerSide?: boolean;
  pagination?: PaginationState;
  onPaginationChange?: (updater: Updater<PaginationState>) => void;
  pageCount?: number;
  totalItems?: number;
  search?: string;
  columnFilters?: ColumnFiltersState;
  isLink?: boolean;
  link?: (row: TData) => string;
  toolbar?: ReactNode;
  filterPills?: ReactNode;
  emptyIcon?: string;
  emptyMessage?: string;
}

export interface PageButtonProps {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  "aria-label"?: string;
}
