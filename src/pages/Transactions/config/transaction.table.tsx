
import type { ExtendedColumnDef } from "@/component/data-table";
import type { TransactionData } from "../types/transaction.type";
import Eye from "@/assets/icons/Eye";
import { DownloadIcon } from "@/assets/icons";

export const transactionColumns: ExtendedColumnDef<TransactionData, unknown>[] = [
  {
    accessorKey: "userName",
    header: "User Name",
  },
  {
    accessorKey: "invoiceId",
    header: "Invoice ID",
  },
  {
    accessorKey: "userType",
    header: "User Type",
    cell: ({ row }) => {
      const type = row.original.userType;

      const styles =
        type === "Driver"
          ? "bg-pink-c2 text-pink-c3"
          : "bg-blue-c1 text-blue-c2";

      return (
        <span className={`subtitle-3-5-medium px-2 py-1 rounded-md ${styles}`}>
          {type}
        </span>
      );
    },
  },
  {
    accessorKey: "invoiceType",
    header: "Invoice Type",
  },
  {
    accessorKey: "entryType",
    header: "Entry Type",
  },
  {
    accessorKey: "chargingStation",
    header: "Charging Station",
  },
  {
    accessorKey: "chargingPoint",
    header: "Charging Point",
  },
  {
    accessorKey: "dateTime",
    header: "Date & Time",
  },
  {
    accessorKey: "duration",
    header: "Duration (hrs)",
  },
  {
    accessorKey: "energy",
    header: "Energy Consumption (kWh)",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <span className="subtitle-3-medium text-text-950 leading-none tracking-normal">
        ₹{row.original.amount}
      </span>
    ),
  },
  {
    accessorKey: "id",
    header: "Action",
    cell: () => {
      return (
        <div className="flex items-center gap-3">
          <Eye className="w-4 h-4 cursor-pointer" />
          <DownloadIcon className="w-4 h-4 cursor-pointer" />
        </div>
      );
    },
  },
];
