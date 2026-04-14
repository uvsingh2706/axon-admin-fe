import type { ExtendedColumnDef } from "@/component/data-table";
import type { ChargingPointData } from "../types/ChargingPoints.types";

export const chargingPointColumns: ExtendedColumnDef<ChargingPointData, unknown>[] = [
  { accessorKey: "id", header: "Point ID", enableSorting: true },
  { accessorKey: "station", header: "Station", enableSorting: true, enableColumnFilter: true },
  { accessorKey: "connectorType", header: "Connector", enableColumnFilter: true },
  { accessorKey: "status", header: "Status", enableColumnFilter: true },
  { accessorKey: "power", header: "Max Power", enableSorting: true },
  { accessorKey: "lastSession", header: "Last Session", enableSorting: true },
  { accessorKey: "energyDelivered", header: "Energy Delivered", enableSorting: true },
];
