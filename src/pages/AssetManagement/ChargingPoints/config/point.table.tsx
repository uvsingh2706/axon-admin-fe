import type { ExtendedColumnDef } from "@/component/data-table";
import type { ChargingPointData } from "../types/ChargingPoints.types";

export const chargingPointColumns: ExtendedColumnDef<ChargingPointData, unknown>[] = [
  { accessorKey: "chargingPointName", header: "Charging Point Name", enableSorting: true },
  { accessorKey: "oem", header: "OEM", enableSorting: true, enableColumnFilter: true },
  { accessorKey: "model", header: "Model", enableSorting: true, enableColumnFilter: true },
  { accessorKey: "station", header: "Station", enableSorting: true, enableColumnFilter: true },
  { accessorKey: "lastHeartbeatReceived", header: "Last Heartbeat Received", enableSorting: true },
  { accessorKey: "status", header: "Status", enableColumnFilter: true },
  { accessorKey: "tariff", header: "Tariff", enableSorting: true },
  { accessorKey: "connectionType", header: "Connection Type", enableSorting: true },
  { accessorKey: "publishedStatus", header: "Published Status", enableColumnFilter: true },
  { accessorKey: "updatedAt", header: "Updated At", enableSorting: true },
  { accessorKey: "updatedBy", header: "Updated By", enableSorting: true },
];
