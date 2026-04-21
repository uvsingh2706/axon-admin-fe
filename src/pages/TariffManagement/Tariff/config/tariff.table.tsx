import type { ExtendedColumnDef } from "@/component/data-table";
import type { TariffDTO } from "../services/tarrif.types";
import { format } from "date-fns";
import EditIcon from "@/assets/icons/EditIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import { Can, MODULE } from "@/rbac";


export const getTariffTableColumns = ({
  onEdit,
  onDelete,
}: {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}): ExtendedColumnDef<TariffDTO, unknown>[] => [
    {
      accessorKey: "tariffName",
      header: "Tariff Name",
      enableSorting: true,
      cell: ({ row }) => (
        <span className="font-semibold text-sm text-secondary-600 underline cursor-pointer hover:text-opacity-80">
          {row.original.tariffName}
        </span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Date Created",
      enableSorting: true,
      cell: ({ row }) => {
        try {
          return format(new Date(row.original.createdAt), "MMM dd, yyyy h:mm:ss a");
        } catch (e) {
          return row.original.createdAt;
        }
      }
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
      enableSorting: true,
      cell: ({ row }) => {
        try {
          return format(new Date(row.original.updatedAt), "MMM dd, yyyy h:mm:ss a");
        } catch (e) {
          return row.original.updatedAt;
        }
      }
    },
    {
      accessorKey: "updatedBy",
      header: "Updated By",
      enableSorting: true,
      cell: ({ row }) => <span>{row.original.tax?.updatedBy || "NA"}</span>,
    },
    {
      accessorKey: "tax",
      header: "Tax",
      enableSorting: true,
      cell: ({ row }) => <span>{row.original.tax?.taxName || "NA"}</span>,
    },
    {
      accessorKey: "ratePerUnit",
      header: "Value (per kWh)",
      enableSorting: true,
      cell: ({ row }) => {
        const symbol = row.original.currency === "INR" ? "₹" : row.original.currency;
        const rounded = parseFloat(row.original.ratePerUnit);
        return <span>{symbol}{isNaN(rounded) ? row.original.ratePerUnit : Math.round(rounded)}</span>;
      }
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-4" onClick={(e) => e.stopPropagation()}>
          <Can module={MODULE.TARIFF} action="update">
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
          <Can module={MODULE.TARIFF} action="delete">
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
