import { DataTable, type ExtendedColumnDef } from "@/component/data-table";
import type { TariffData } from "../types/tariff.types";

const columns: ExtendedColumnDef<TariffData, unknown>[] = [
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

const dummyTariffs: TariffData[] = [
  { id: "1", name: "Zaptec tariff", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "standard client 12062025" },
  { id: "2", name: "Systematic services", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
  { id: "3", name: "Systematic services", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
  { id: "4", name: "Systematic services", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
  { id: "5", name: "Systematic services", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "operation" },
  { id: "6", name: "Systematic services", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
  { id: "7", name: "Systematic services", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
  { id: "8", name: "Systematic services", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
  { id: "9", name: "Systematic services", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
  { id: "10", name: "Systematic services", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
  { id: "11", name: "Systematic services", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
  { id: "12", name: "Systematic services", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
];

export default function TariffList({ search }: { search: string }) {
  return (
    <DataTable
      columns={columns}
      data={dummyTariffs}
      search={search}
      isLink
      link={(row) => "tarrif/" + row.id}
    />
  );
}
