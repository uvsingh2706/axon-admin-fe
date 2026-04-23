import { useMemo, useState } from "react";
import { DataTable } from "@/component/data-table";
import { driverTableColumns } from "../config/driver.table";
import { useDriversList } from "../services/drivers.hooks";
import type { DriverListItemDTO } from "../services/drivers.types";

export default function DriversList({ search }: { search?: string }) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const effectiveSearch = search?.trim() && search.trim().length > 2 ? search : undefined
  const { data: driversList, isLoading } = useDriversList({ page, limit, search: effectiveSearch });

  const tableData: DriverListItemDTO[] = useMemo(() => {
    return driversList?.data?.data ?? [];
  }, [driversList?.data?.data]);

  return (
    <DataTable
      columns={driverTableColumns}
      data={tableData}
      search={search}
      isLink
      link={(row) => "drivers/" + row.id}
      isLoading={isLoading}
      pagination={{
        pageIndex: page - 1,
        pageSize: limit,
      }}
      isServerSide={true}
      totalItems={driversList?.data?.meta?.total || 0}
      pageCount={driversList?.data?.meta?.totalPages || 1}
      onPaginationChange={(updater) => {
        const next = typeof updater === "function" ? updater({ pageIndex: page - 1, pageSize: limit }) : updater;
        setPage(next.pageIndex + 1);
        setLimit(next.pageSize);
      }}
    />
  );
}

