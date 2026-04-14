import { useState } from "react";
import { DataTable, type ExtendedColumnDef } from "@/component/data-table";

type ChargePointData = {
  id: string;
  imageUrl: string;
  name: string;
  oem: string;
  model: string;
  // status: "Available" | "Unavailable" | "Charging" | "Maintenance";
  status: "Available" | "Unavailable";
  lastHeartbeat: string;
  connectionType: string;
};

const dummyChargePoints: ChargePointData[] = [
  {
    id: "CP-001",
    imageUrl: "https://cdn.globalso.com/beihaipower/GBT-Connector-1-2.jpg",
    name: "Zaptec",
    oem: "Zaptec",
    model: "Model 1",
    status: "Unavailable",
    lastHeartbeat: "May 18, 2023 12:07:08 PM",
    connectionType: "WIFI",
  },
  {
    id: "CP-002",
    imageUrl: "https://cdn.globalso.com/beihaipower/GBT-Connector-1-2.jpg",
    name: "Zaptec",
    oem: "Zaptec",
    model: "Model 1",
    status: "Available",
    lastHeartbeat: "May 18, 2023 12:07:08 PM",
    connectionType: "admin",
  },
];

const columns: ExtendedColumnDef<ChargePointData, unknown>[] = [
  {
    accessorKey: "name",
    header: "Charge Point",
    enableSorting: true,
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 overflow-hidden rounded-xl bg-slate-100">
          <img
            src={row.original.imageUrl}
            alt={row.original.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-sm text-foreground">{row.original.name}</span>
          <span className="text-xs text-muted-foreground">{row.original.id}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "oem",
    header: "OEM",
    enableSorting: true,
  },
  {
    accessorKey: "model",
    header: "Model",
    enableSorting: true,
  },
  {
    accessorKey: "status",
    header: "Status",
    enableSorting: true,
    cell: ({ row }) => {
      const status = row.original.status;
      const map: Record<string, string> = {
        Available: "bg-green-c1 text-emerald-700",
        // Charging: "bg-blue-100 text-blue-700",
        Unavailable: "bg-gray-100 text-gray-700",
        // Maintenance: "bg-yellow-100 text-yellow-700",
      };
      return (
        <span className={`inline-flex rounded-sm px-3 py-1 text-xs font-semibold ${map[status]}`}>
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "lastHeartbeat",
    header: "Last Heartbeat recording At",
    enableSorting: true,
  },
  {
    accessorKey: "connectionType",
    header: "Connection Type",
    enableSorting: true,
  },
];

export default function ChargePointTable() {
  const [search] = useState("");

  return (
    <DataTable
      columns={columns}
      data={dummyChargePoints}
      search={search}
      defaultPageSize={5}
      disablePagination={false}
    />
  );
}
