import type { ExtendedColumnDef } from "@/component/data-table";
import type { TaxData } from "../types/tax.types";

export const taxTableColumns: ExtendedColumnDef<TaxData, unknown>[] = [
  {
    accessorKey: "taxName",
    header: "Tax Name",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="font-semibold text-sm text-secondary-600 underline cursor-pointer hover:text-opacity-80">
        {row.original.taxName}
      </span>
    ),
  },
  { accessorKey: "type", header: "Type", enableSorting: true },
  { accessorKey: "dateCreated", header: "Date Created", enableSorting: true },
  { accessorKey: "updatedAt", header: "Updated At", enableSorting: true },
  { accessorKey: "updatedBy", header: "Updated By", enableSorting: true },
];
