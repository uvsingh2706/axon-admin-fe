import type { ExtendedColumnDef } from "@/component/data-table";

export const vehicleTableColumns: ExtendedColumnDef<any, unknown>[] = [
  {
    accessorKey: "make",
    header: "Vehicle Name",
    cell: ({ row }) => (
      <span className="font-semibold text-sm text-secondary-600 underline cursor-pointer hover:text-opacity-80">
        {row.original?.make || "N/A"}
      </span>
    ),
  },
  { accessorKey: "model", header: "Model", cell: ({ row }) => row.original?.model || "N/A" },
  { accessorKey: "id", header: "Vehicle ID", cell: ({ row }) => row.original?.vehicleId || row.original?.id || "N/A" },
  {
    accessorKey: "registrationNumber",
    header: "Registration Number",
    cell: ({ row }) => row.original?.registrationNumber || "N/A",
  },
  { accessorKey: "connectorType", header: "Connector Type", cell: ({ row }) => row.original?.connectorType || "N/A" },
];
