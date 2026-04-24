import { useState } from "react";
import { DataTable, type ExtendedColumnDef } from "@/component/data-table";
import { useChargingPointlistbyID } from "../services/stations.hooks";
import type { ChargingPointData } from "../../ChargingPoints/services/chargingpoints.type";
import { format } from "date-fns";
import connectorsImg from "@/assets/images/connectors.png"

interface ChargePointTableProps {
  stationId: string;
}

const columns: ExtendedColumnDef<ChargingPointData, unknown>[] = [
  {
    accessorKey: "chargingPointName",
    header: "Charge Point",
    enableSorting: true,
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 overflow-hidden rounded-xl flex items-center justify-center">
          <img
            src={connectorsImg}
            alt={row.original.chargingPointName}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-sm text-foreground cursor-pointer">
            {row.original.chargingPointName}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "oemId",
    header: "OEM",
    enableSorting: true,
    cell: ({ row }) => <span className="text-sm font-medium">{row.original.oem?.oemName || "NA"}</span>,
  },
  {
    accessorKey: "chargerModelId",
    header: "Model",
    enableSorting: true,
    cell: ({ row }) => <span className="text-sm font-medium">{row.original.chargerModel?.chargerModelName || "NA"}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    enableSorting: true,
    cell: ({ row }) => {
      const status = row.original.status as string;
      const statusMap: Record<string, string> = {
        available: "Available",
        unavailable: "Unavailable",
        charging: "Charging",
        offline: "Offline",
      };
      const mappedStatus = statusMap[status?.toLowerCase()] || status || "Unknown";
      const styles: Record<string, string> = {
        Available: "bg-green-100 text-green-700",
        Unavailable: "bg-gray-100 text-gray-700",
        Charging: "bg-blue-100 text-blue-700",
        Offline: "bg-red-100 text-red-700",
      };
      return (
        <span className={`inline-flex rounded-sm px-3 py-1 text-xs font-semibold ${styles[mappedStatus] || "bg-gray-100 text-gray-700"}`}>
          {mappedStatus}
        </span>
      );
    },
  },
  {
    accessorKey: "lastHeartBeatReceivedAt",
    header: "Last Heartbeat recording At",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-sm">
        {row.original.lastHeartBeatReceivedAt ? format(new Date(row.original.lastHeartBeatReceivedAt), "MMM dd, yyyy HH:mm") : "NA"}
      </span>
    ),
  },
  {
    accessorKey: "connectionType",
    header: "Connection Type",
    enableSorting: true,
    cell: ({ row }) => <span className="text-sm">{row.original.connectionType || "NA"}</span>,
  },
];

export default function ChargePointTable({ stationId }: ChargePointTableProps) {
  const [search] = useState("");

  const { data: listResponse, isLoading } = useChargingPointlistbyID(stationId);

  const points = listResponse?.data?.chargingPoints || [];

  return (
    <DataTable
      columns={columns}
      data={points}
      search={search}
      isLoading={isLoading}
      defaultPageSize={20}
      disablePagination={false}
    />
  );
}
