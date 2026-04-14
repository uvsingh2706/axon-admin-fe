import type { ExtendedColumnDef } from "@/component/data-table";
import type { TariffData } from "../types/tariff.types";

export const tariffTableColumns: ExtendedColumnDef<TariffData, unknown>[] = [
  {
    accessorKey: "name",
    header: "Tariff Name",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="font-semibold text-sm text-secondary-600 underline cursor-pointer hover:text-opacity-80">
        {row.original.name}
      </span>
    ),
  },
  {
    accessorKey: "dateCreated",
    header: "Date Created",
    enableSorting: true,
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    enableSorting: true,
  },
  {
    accessorKey: "updatedBy",
    header: "Updated By",
    enableSorting: true,
  },
];
