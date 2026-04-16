import type { ExtendedColumnDef } from "@/component/data-table";
import type { TariffDTO } from "../services/tarrif.types";
import { format } from "date-fns";
import EditIcon from "@/assets/icons/EditIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";

export const tariffTableColumns: ExtendedColumnDef<TariffDTO, unknown>[] = [
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
    id: "updatedBy",
    header: "Updated By",
    enableSorting: true,
    cell: () => <span className="text-gray-500">NA</span>,
  },
  {
    id: "tax",
    header: "Tax",
    enableSorting: true,
    cell: () => <span className="text-gray-500">NA</span>,
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
    cell: () => (
      <div className="flex items-center gap-4">
        <button className="text-secondary-600 hover:opacity-80 transition-opacity">
          <EditIcon className="w-4 h-4 cursor-pointer" />
        </button>
        <button className="text-red-500 hover:opacity-80 transition-opacity">
          <DeleteIcon className="w-4 h-4 cursor-pointer" />
        </button>
      </div>
    ),
  },
];
