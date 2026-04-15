import { DataTable } from "@/component/data-table";
import { Pathname } from "@/utils/pathname";
import { driverTableColumns } from "../config/driver.table";
import { getDriversByFleetId } from "../mocks/driver.mock";

export default function DriverList({ search, fleetId }: { search: string; fleetId: string }) {
  const data = getDriversByFleetId(fleetId);
  return (
    <DataTable
      columns={driverTableColumns}
      data={data}
      search={search}
      isLink
      link={(row) => `${Pathname.FLEET_MANAGEMENT}/${row.fleetId}/drivers/${row.id}`}
    />
  );
}

