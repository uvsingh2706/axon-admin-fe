import { DataTable, type ExtendedColumnDef } from "@/component/data-table";
import type { TaxData } from "../types/tax.types";

const columns: ExtendedColumnDef<TaxData, unknown>[] = [
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
  {
    accessorKey: "type",
    header: "Type",
    enableSorting: true,
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

const dummyTaxes: TaxData[] = [
  { id: "1", taxName: "star-1 3968", type: "Percentage", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "standard client 12062025" },
  { id: "2", taxName: "zaptec tax", type: "Percentage", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
  { id: "3", taxName: "zaptec tax", type: "Percentage", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
  { id: "4", taxName: "Systematic services", type: "Percentage", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
  { id: "5", taxName: "Systematic services", type: "Percentage", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "operation" },
  { id: "6", taxName: "zaptec tax", type: "Percentage", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
  { id: "7", taxName: "Systematic services", type: "Percentage", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
  { id: "8", taxName: "zaptec tax", type: "Percentage", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
  { id: "1", taxName: "star-1 3968", type: "Percentage", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "standard client 12062025" },
  { id: "2", taxName: "zaptec tax", type: "Percentage", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
  { id: "3", taxName: "zaptec tax", type: "Percentage", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
  { id: "4", taxName: "Systematic services", type: "Percentage", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
  { id: "5", taxName: "Systematic services", type: "Percentage", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "operation" },
];

export default function TaxList({ search }: { search: string }) {
  return (
    <DataTable
      columns={columns}
      data={dummyTaxes}
      search={search}
      isLink
      link={(row) => "tax/" + row.id}
    />
  );
}
