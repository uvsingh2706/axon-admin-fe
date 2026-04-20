import type { ExtendedColumnDef } from "@/component/data-table";
import type { TaxDTO } from "../services/tax.types";
import EditIcon from "@/assets/icons/EditIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import { Can, MODULE } from "@/rbac";
import { format } from "date-fns";

export const getTaxTableColumns = ({
  onEdit,
  onDelete,
}: {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}): ExtendedColumnDef<TaxDTO, unknown>[] => [
    {
      accessorKey: "taxName",
      header: "Tax Name",
      enableSorting: true,
      cell: ({ row }) => (
        <span className="font-semibold text-sm text-secondary-600 underline cursor-pointer hover:text-opacity-80">
          {row.original.taxName}
        </span>
      ),
    },

    { accessorKey: "type", header: "Type", enableSorting: true },

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
      cell: ({ row }) => <span>{row.original.updatedBy}</span>
    },

    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex items-center gap-4" onClick={(e) => e.stopPropagation()}>
          <Can module={MODULE.TAX} action="update">
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
          <Can module={MODULE.TAX} action="delete">
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
