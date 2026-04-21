import { DataTable } from "@/component/data-table";
import { modelColumns } from "../config/model.table";
import { useModelList } from "../services/model.hooks";
import { useState, useEffect } from "react";

interface ModelListProps {
  search?: string;
}

const ModelList = ({ search = "" }: ModelListProps) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Reset to first page when search changes
  useEffect(() => {
    setPage(1);
  }, [search]);
  
  const effectiveSearch = search.trim().length >= 2 ? search : undefined;
  const { data: modelList, isLoading } = useModelList({ page, limit, search: effectiveSearch });

  return (
    <div className="w-full">
      <DataTable 
        columns={modelColumns} 
        data={modelList?.data?.chargerModels ?? []}
        search={search}
        isLink 
        link={(row) => "charger-specifications/model/" + row.id} 
        isLoading={isLoading}
        pagination={{
          pageIndex: page - 1,
          pageSize: limit,
        }}
        isServerSide={true}
        totalItems={modelList?.data?.totalCount || 0}
        pageCount={modelList?.data?.totalCount ? Math.ceil(modelList.data.totalCount / limit) : 1}
        onPaginationChange={(updater) => {
          const next = typeof updater === "function" ? updater({ pageIndex: page - 1, pageSize: limit }) : updater;
          setPage(next.pageIndex + 1);
          setLimit(next.pageSize);
        }}
      />
    </div>
  )
}

export default ModelList;