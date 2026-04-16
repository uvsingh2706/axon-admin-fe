
import type { ExtendedColumnDef } from "@/component/data-table";
import type { TransactionData } from "../types/transaction.type";
import Eye from "@/assets/icons/Eye";
import { DownloadIcon } from "@/assets/icons";
import UpDownIcon from "@/assets/icons/UpDownIcon";
import { Link } from "react-router-dom";
import { Pathname } from "@/utils/pathname";

export const transactionColumns: ExtendedColumnDef<TransactionData, unknown>[] = [
  {
    accessorKey: "userName",
    header: "User Name",
    cell: ({ row }) => (
      <span className="text-secondary-600 font-medium">
        {row.original.userName}
      </span>
    )
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
          ? "bg-pink-c2 text-pink-c3 w-[3.3125rem] h-[1.5625rem] flex items-center justify-center rounded"
          : "bg-blue-c1 text-blue-c2 w-[4.625rem] h-[1.5625rem] flex items-center justify-center rounded";

      return (
        <span className={`subtitle-3-5-medium ${styles}`}>
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
    accessorKey: "vehicleMake",
    header: () => <div className="flex items-center gap-2 cursor-pointer">Vehicle make <UpDownIcon className="w-3.5 h-3.5" /></div>,
    cell: ({ row }) => row.original.vehicleMake || "-",
  },
  {
    accessorKey: "chargingStation",
    header: "Charging Station",
    cell: ({ row }) => row.original.chargingStation || "-",
  },
  {
    accessorKey: "chargingPoint",
    header: "Charging Point",
    cell: ({ row }) => row.original.chargingPoint || "-",
  },
  {
    accessorKey: "ocppTxnId",
    header: "OCPP Txn ID",
    cell: ({ row }) => row.original.ocppTxnId || "-",
  },
  {
    accessorKey: "dateTime",
    header: "Date & Time",
  },
  {
    accessorKey: "duration",
    header: "Duration (hrs)",
    cell: ({ row }) => row.original.duration || "-",
  },
  {
    accessorKey: "cpStop",
    header: "CP Stop",
    cell: ({ row }) => row.original.cpStop || "-",
  },
  {
    accessorKey: "closedBy",
    header: () => <div className="flex items-center gap-2 cursor-pointer">Closed By <UpDownIcon className="w-3.5 h-3.5" /></div>,
    cell: ({ row }) => row.original.closedBy || "-",
  },
  {
    accessorKey: "energy",
    header: "Energy Consumption (kWH)",
    cell: ({ row }) => row.original.energy || "-",
  },
  {
    accessorKey: "status",
    header: () => <div className="flex items-center gap-2 cursor-pointer">Status <UpDownIcon className="w-3.5 h-3.5" /></div>,
    cell: ({ row }) => {
      const status = row.original.status;
      const styles =
        status === "Success"
          ? "bg-green-c1 text-success"
          : status === "Failed"
            ? "bg-pink-c2 text-error"
            : "bg-gray-c2 text-gray-c3";

      if (!status) return <span>-</span>;

      return (
        <span className={`flex items-center justify-center subtitle-3-5-medium w-16 h-6 gap-2 rounded px-2 py-1 ${styles}`}>
          {status}
        </span>
      );
    },
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
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3 text-secondary-500">
          <Link to={`${Pathname.TRANSACTIONS}/${row.original.id}`}>
            <Eye className="w-4 h-4 cursor-pointer" />
          </Link>
          <DownloadIcon className="w-4 h-4 cursor-pointer" />
        </div>
      );
    },
  },
];
