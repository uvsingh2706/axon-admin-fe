import { useState } from "react";
import { DataTable } from "@/component/data-table";
import { tariffTableColumns } from "../config/tariff.table";
import { useTariffList } from "../services/tarrif.hooks";

export default function TariffList({ search }: { search: string }) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  
  const { data: tariffList, isLoading } = useTariffList({ page, limit });

  return (
    <DataTable
      columns={tariffTableColumns}
      data={tariffList?.data?.tariffs ?? []}
      search={search}
      isLink
      link={(row) => "tarrif/" + row.id}
      isLoading={isLoading}
      // Assuming your DataTable accepts pagination props.
      // Adjust these if DataTable uses a different pagination interface.
      pagination={{
        pageIndex: page - 1, 
        pageSize: limit,
      }}
      pageCount={tariffList?.data?.count ? Math.ceil(tariffList.data.count / limit) : 1}
      onPaginationChange={(updater) => {
        const next = typeof updater === "function" ? updater({ pageIndex: page - 1, pageSize: limit }) : updater;
        setPage(next.pageIndex + 1);
        setLimit(next.pageSize);
      }}
    />
  );
}
