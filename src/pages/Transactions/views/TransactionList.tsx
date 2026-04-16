import { DataTable } from "@/component/data-table";
import { transactionColumns } from "../config/transaction.table";
import { mockTransactions } from "../mocks/transaction.mock";
import { Pathname } from "@/utils/pathname";

function TransactionList() {
  return (
    <DataTable
      columns={transactionColumns}
      data={mockTransactions}
      isLink={true}
      link={(row) => `${Pathname.TRANSACTIONS}/${row.id}`}
    />
  );
}

export default TransactionList;
