import type { ExtendedColumnDef } from "@/component/data-table";
import type { StationDTO } from "../services/stations.types";
import EditIcon from "@/assets/icons/EditIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import { Can, MODULE } from "@/rbac";
import { format } from "date-fns";

export const getStationTableColumns = ({ onEdit, onDelete }: { onEdit: (id: string) => void; onDelete: (id: string) => void; }): ExtendedColumnDef<StationDTO, unknown>[] => [
  {
    accessorKey: "name",
    header: "Station Name",
    enableSorting: true,
  },
  {
    id: "address",
    header: "Address",
    enableSorting: false,
    cell: ({ row }) => <span>{row.original.firstStreet}{row.original.secondStreet ? `, ${row.original.secondStreet}` : ""}</span>
  },
  { accessorKey: "supportPersonName", header: "Support Person", enableSorting: true },
  {
    accessorKey: "tax",
    header: "Tax",
    enableSorting: true,
    cell: ({ row }) => <span>{row.original.tax ?? "NA"}</span>
  },
  {
    accessorKey: "valuePerKwh",
    header: "Value (Per kWh)",
    enableSorting: true,
    cell: ({ row }) => <span>{row.original.valuePerKwh ?? "NA"}</span>
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    enableSorting: true,
    cell: ({ row }) => <span>{row.original.updatedAt ? format(new Date(row.original.updatedAt), "yyyy-MM-dd HH:mm:ss") : "NA"}</span>
  },
  {
    id: "actions",
    header: "Action",
    enableSorting: false,
    cell: ({ row }) => (
      <div className="flex items-center gap-4" onClick={(e) => e.stopPropagation()}>
        <Can module={MODULE.CHARGING_STATION} action="update">
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
        <Can module={MODULE.CHARGING_STATION} action="delete">
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
    )
  },
];
