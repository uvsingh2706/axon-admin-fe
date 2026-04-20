import { DataTable } from "@/component/data-table";
import { transactionColumns } from "../config/transaction.table";
import { mockTransactions } from "../mocks/transaction.mock";
import type { TransactionListProps } from "../types/transaction.type";

function TransactionList({ search }: TransactionListProps) {

  return (
    <DataTable
      columns={transactionColumns}
      data={mockTransactions}
      search={search}
    />
  );
}

export default TransactionList;
