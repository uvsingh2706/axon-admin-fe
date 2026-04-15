import type { ExtendedColumnDef } from "@/component/data-table";
import type { TransactionData } from "../types/transaction.type";

export const transactionColumns: ExtendedColumnDef<TransactionData, unknown>[] = [
  {
    accessorKey: "transactionId",
    header: "Transaction ID",
    enableSorting: true,
  },
  {
    accessorKey: "user",
    header: "User",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="font-semibold text-gray-900">
        {row.original.amount}
      </span>
    ),
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      let styles = 'bg-gray-100 text-gray-700';

      if (status === 'Completed') styles = 'bg-green-100 text-green-700';
      if (status === 'Pending') styles = 'bg-yellow-100 text-yellow-700';
      if (status === 'Failed') styles = 'bg-red-100 text-red-700';

      return (
        <span className={`text-[14px] px-2 py-1 rounded-[4px] font-medium ${styles}`}>
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      return <span>{new Date(row.original.date).toLocaleString()}</span>;
    }
  },
];
