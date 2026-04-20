import { DataTable } from "@/component/data-table";
import { getTransactionColumns } from "../config/activeChargingSession.table";
import { mockTransactions } from "../mocks/activeChargingSession.mock";
import type { ActiveListProps } from "../types/activeChargingSession.type";



function ActiveList({ onTerminate, search }: ActiveListProps) {
    return (
        <DataTable
            columns={getTransactionColumns(onTerminate)}
            data={mockTransactions}
            search={search}
        />
    );
}

export default ActiveList;
