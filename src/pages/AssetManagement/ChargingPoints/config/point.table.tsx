import type { ExtendedColumnDef } from "@/component/data-table";
import type { ChargingPointData } from "../services/chargingpoints.type";
import EditIcon from "@/assets/icons/EditIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import { Can, MODULE } from "@/rbac";
import { format } from "date-fns";

export const getChargingPointColumns = ({ onEdit, onDelete }: { onEdit: (id: string) => void; onDelete: (id: string) => void; }): ExtendedColumnDef<ChargingPointData, unknown>[] => [
  {
    accessorKey: "chargingPointName",
    header: "Charging Point Name",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="font-sans font-semibold text-[14px] leading-none text-secondary-600 underline cursor-pointer">
        {row.original.chargingPointName}
      </span>
    ),
  },
  {
    accessorKey: "oemId",
    header: "OEM",
    enableSorting: true,
    enableColumnFilter: true,
    cell: ({ row }) => <span className="font-sans font-medium text-[14px]">{row.original.oem?.oemName || row.original.oemId || "NA"}</span>,
  },
  {
    accessorKey: "chargerModelId",
    header: "Model",
    enableSorting: true,
    enableColumnFilter: true,
    cell: ({ row }) => <span className="font-sans font-medium text-[14px]">{row.original.chargerModel?.chargerModelName || row.original.chargerModelId || "NA"}</span>,
  },
  {
    accessorKey: "chargingStationId",
    header: "Station",
    enableSorting: true,
    enableColumnFilter: true,
    cell: ({ row }) => <span className="font-sans font-medium text-[14px]">{row.original.chargingStation?.name || row.original.chargingStationId || "NA"}</span>,
  },

  {
    accessorKey: "lastHeartBeatReceivedAt",
    header: "Last Heartbeat Received",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="font-sans text-[14px]">
        {row.original.lastHeartBeatReceivedAt ? format(new Date(row.original.lastHeartBeatReceivedAt), "MMM dd, yyyy HH:mm") : "NA"}
      </span>
    ),
  },

  {
    accessorKey: "status",
    header: "Status",
    enableSorting: true,
    enableColumnFilter: true,
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
        <span className={`text-[12px] px-2 py-1 rounded-[4px] font-medium ${styles[mappedStatus] || "bg-gray-100 text-gray-700"}`}>
          {mappedStatus}
        </span>
      );
    },
  },
  {
    accessorKey: "tariffId",
    header: "Tariff",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="font-sans font-medium text-[14px] leading-none text-secondary-600 underline">
        {row.original.tariff?.tariffName || row.original.tariffId || "NA"}
      </span>
    ),
  },

  {
    accessorKey: "connectionType",
    header: "Connection Type",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="font-sans font-medium text-[14px]">{row.original.connectionType || "NA"}</span>
    )
  },

  {
    accessorKey: "isPublished",
    header: "Published",
    enableSorting: true,
    enableColumnFilter: true,
    cell: ({ row }) => {
      const status = row.original.isPublished ? "Yes" : "No";
      const styles: Record<string, string> = {
        Yes: "bg-green-100 text-green-700",
        No: "bg-gray-100 text-gray-700",
      };
      return (
        <span className={`text-[12px] px-2 py-1 rounded-[4px] font-medium ${styles[status]}`}>
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="font-sans text-[14px]">
        {row.original.updatedAt ? format(new Date(row.original.updatedAt), "yyyy-MM-dd HH:mm:ss") : "NA"}
      </span>
    ),
  },
  {
    accessorKey: "updatedBy",
    header: "Updated By",
    enableSorting: true,
    cell: ({ row }) => <span className="font-sans text-[14px]">{row.original.updatedBy || "NA"}</span>,
  },
  {
    id: "actions",
    header: "Action",
    enableSorting: false,
    cell: ({ row }) => (
      <div className="flex items-center gap-4" onClick={(e) => e.stopPropagation()}>
        <Can module={MODULE.CHARGING_POINT} action="update">
          <button
            className="text-secondary-600 hover:opacity-80 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(row.original.id);
            }}
          >
            <EditIcon className="w-4 h-4 cursor-pointer" />
          </button>
        </Can>
        <Can module={MODULE.CHARGING_POINT} action="delete">
          <button
            className="text-red-500 hover:opacity-80 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(row.original.id);
            }}
          >
            <DeleteIcon className="w-4 h-4 cursor-pointer" />
          </button>
        </Can>
      </div>
    ),
  },
];
