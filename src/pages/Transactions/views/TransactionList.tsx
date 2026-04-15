import { DataTable } from "@/component/data-table";
import { transactionColumns } from "../config/transaction.table";
import { mockTransactions } from "../mocks/transaction.mock";

function TransactionList() {
  return (
    <DataTable
      columns={transactionColumns}
      data={mockTransactions}
    />
  );
}

export default TransactionList;
