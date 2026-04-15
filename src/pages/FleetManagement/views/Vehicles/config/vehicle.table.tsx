import type { ExtendedColumnDef } from "@/component/data-table";
import type { VehicleData } from "../types/vehicle.type";

export const vehicleTableColumns: ExtendedColumnDef<VehicleData, unknown>[] = [
  {
    accessorKey: "vehicleName",
    header: "Vehicle Name",
    cell: ({ row }) => (
      <span className="font-semibold text-sm text-secondary-600 underline cursor-pointer hover:text-opacity-80">
        {row.original.vehicleName}
      </span>
    ),
  },
  { accessorKey: "model", header: "Model" },
  { accessorKey: "vehicleId", header: "Vehicle ID" },
  {
    accessorKey: "registrationNumber",
    header: "Registration Number",
  },
  { accessorKey: "connectorType", header: "Connector Type" },
];
