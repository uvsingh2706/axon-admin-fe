import { DataTable } from "@/component/data-table";
import { connectorColumns } from "../config/connector.table";
import { useConnectorList } from "../services/connector.hook";
import { useState, useEffect } from "react";

interface ConnectorListProps {
  search?: string;
}

const ConnectorList = ({ search = "" }: ConnectorListProps) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Reset to first page when search changes
  useEffect(() => {
    setPage(1);
  }, [search]);

  const effectiveSearch = search.trim().length >= 2 ? search : undefined;
  const { data: connectorList, isLoading } = useConnectorList({ page, limit, search: effectiveSearch });

  return (
    <div className="w-full">
      <DataTable 
        columns={connectorColumns} 
        data={connectorList?.data?.connectorMetas ?? []}
        search={search}
        isLink 
        link={(row) => "charger-specifications/connector/" + row.id} 
        isLoading={isLoading}
        pagination={{
          pageIndex: page - 1,
          pageSize: limit,
        }}
        isServerSide={true}
        totalItems={connectorList?.data?.totalCount || 0}
        pageCount={connectorList?.data?.totalCount ? Math.ceil(connectorList.data.totalCount / limit) : 1}
        onPaginationChange={(updater) => {
          const next = typeof updater === "function" ? updater({ pageIndex: page - 1, pageSize: limit }) : updater;
          setPage(next.pageIndex + 1);
          setLimit(next.pageSize);
        }}
      />
    </div>
  )
}

export default ConnectorList