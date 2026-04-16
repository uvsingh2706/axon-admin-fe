import { DataTable } from "@/component/data-table";
import { getTransactionColumns } from "../config/activeChargingSession.table";
import { mockTransactions } from "../mocks/activeChargingSession.mock";

import type { TransactionData } from "../types/activeChargingSession.type";

interface ActiveListProps {
    onTerminate: (data: TransactionData) => void;
}

function ActiveList({ onTerminate }: ActiveListProps) {
    return (
        <DataTable
            columns={getTransactionColumns(onTerminate)}
            data={mockTransactions}
        />
    );
}

export default ActiveList;
