import { DataTable } from "@/component/data-table";
import { Pathname } from "@/utils/pathname";
import { vehicleTableColumns } from "../config/vehicle.table";
import { mockVehicles } from "../mocks/vehicles.mock";

export default function VehiclesList({ search }: { search: string }) {
  return (
    <DataTable
      columns={vehicleTableColumns}
      data={mockVehicles}
      search={search}
      isLink
      link={(row) => `${Pathname.FLEET_MANAGEMENT}/${row.fleetId}/vehicles/${row.id}`}
    />
  );
}
