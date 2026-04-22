import { useState } from "react";
import { DataTable } from "@/component/data-table";
import { Pathname } from "@/utils/pathname";
import { driverTableColumns } from "../config/driver.table";
import { useDriverList } from "../services/driver.hooks";

export default function DriverList({ search, fleetId }: { search: string; fleetId: string }) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data: driverResponse, isLoading } = useDriverList({
    fleetId,
    page,
    limit,
    search: search.length >= 2 ? search : undefined,
  });

  const drivers = driverResponse?.data?.data ?? [];
  const meta = driverResponse?.data?.meta;

  return (
    <DataTable
      columns={driverTableColumns}
      data={drivers}
      search={search}
      isLoading={isLoading}
      isServerSide={true}
      totalItems={meta?.total ?? 0}
      pagination={{
        pageIndex: page - 1,
        pageSize: limit,
      }}
      pageCount={meta?.totalPages ?? 1}
      onPaginationChange={(updater) => {
        const next =
          typeof updater === "function"
            ? updater({ pageIndex: page - 1, pageSize: limit })
            : updater;
        setPage(next.pageIndex + 1);
        setLimit(next.pageSize);
      }}
      isLink
      link={(row) => `${Pathname.FLEET_MANAGEMENT}/${row.fleet?.id || fleetId}/drivers/${row.id}`}
    />
  );
}

