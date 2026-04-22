import { DataTable } from "@/component/data-table";
import { Pathname } from "@/utils/pathname";
import { vehicleTableColumns } from "../config/vehicle.table";
import { useVehicleList } from "../services/Vehicle.hooks";
import { useState } from "react";

export default function VehiclesList({ search, fleetId }: { search: string; fleetId: string }) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const effectiveSearch = search.trim().length >=2 ? search : undefined;

  const { data: vehicleList, isLoading } = useVehicleList({
    fleetId,
    page,
    limit,
    search: effectiveSearch
  });

  console.log(vehicleList, 'list');

  return (
    <DataTable
      columns={vehicleTableColumns}
      data={vehicleList?.data?.vehicles ?? []}
      search={search}
      isLoading={isLoading}
      isServerSide={true}
      totalItems={vehicleList?.data?.count ?? 0}
      pagination={{
        pageIndex: page - 1,
        pageSize: limit,
      }}
      pageCount={
        vehicleList?.data?.count ? Math.ceil(vehicleList.data.count / limit) : 1
      }
      onPaginationChange={(updater) => {
        const next =
          typeof updater === "function"
            ? updater({ pageIndex: page - 1, pageSize: limit })
            : updater;
        setPage(next.pageIndex + 1);
        setLimit(next.pageSize);
      }}
      isLink
      link={(row) => `${Pathname.FLEET_MANAGEMENT}/${fleetId}/vehicles/${row.id}`}
    />
  );
}
