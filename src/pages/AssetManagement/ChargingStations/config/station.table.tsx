import type { ExtendedColumnDef } from "@/component/data-table";
import type { ChargingStationData } from "../types/ChargingStations.types";

export const chargingStationColumns: ExtendedColumnDef<ChargingStationData, unknown>[] = [
  {
    accessorKey: "stationName",
    header: "Station Name",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="font-sans font-semibold text-[14px] leading-none text-secondary-600 underline cursor-pointer hover:text-opacity-80">
        {row.original.stationName}
      </span>
    ),
  },
  { accessorKey: "address", header: "Address", enableSorting: true },
  { accessorKey: "supportPerson", header: "Support Person", enableSorting: true },
  { accessorKey: "updatedAt", header: "Updated At", enableSorting: true },
  { accessorKey: "updatedBy", header: "Updated By", enableSorting: true },
];
