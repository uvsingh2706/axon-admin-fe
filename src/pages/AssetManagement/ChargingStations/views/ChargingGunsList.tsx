import { useState, useMemo } from "react";
import { DataTable, type ExtendedColumnDef } from "@/component/data-table";
import { useChargingPointList } from "../../ChargingPoints/services/chargingpoints.hooks";
import type { ChargingPointData } from "../../ChargingPoints/services/chargingpoints.type";
import { format } from "date-fns";

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
        <div className="w-10 h-10 overflow-hidden rounded-xl bg-slate-100 flex items-center justify-center">
          <img
            src="https://cdn.globalso.com/beihaipower/GBT-Connector-1-2.jpg"
            alt={row.original.chargingPointName}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-sm text-foreground font-sans underline cursor-pointer">
            {row.original.chargingPointName}
          </span>
          <span className="text-xs text-muted-foreground">{row.original.id}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "oemId",
    header: "OEM",
    enableSorting: true,
    cell: ({ row }) => <span className="text-sm font-medium">{row.original.oemId || "NA"}</span>,
  },
  {
    accessorKey: "chargerModelId",
    header: "Model",
    enableSorting: true,
    cell: ({ row }) => <span className="text-sm font-medium">{row.original.chargerModelId || "NA"}</span>,
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
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search] = useState("");

  const { data: listResponse, isLoading } = useChargingPointList({
    page,
    limit,
    chargingStationId: stationId,
  });

  const points = listResponse?.data?.data || [];
  const totalItems = listResponse?.data?.total || 0;

  return (
    <DataTable
      columns={columns}
      data={points}
      search={search}
      isLoading={isLoading}
      isServerSide={true}
      totalItems={totalItems}
      pageCount={Math.ceil(totalItems / limit) || 1}
      pagination={{
        pageIndex: page - 1,
        pageSize: limit,
      }}
      onPaginationChange={(updater) => {
        const next = typeof updater === "function" ? updater({ pageIndex: page - 1, pageSize: limit }) : updater;
        setPage(next.pageIndex + 1);
        setLimit(next.pageSize);
      }}
      disablePagination={false}
    />
  );
}
