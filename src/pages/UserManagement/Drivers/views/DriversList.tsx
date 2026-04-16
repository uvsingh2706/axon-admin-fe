import { DataTable } from "@/component/data-table";
import { driverTableColumns } from "../config/driver.table";
import { mockDriverList } from "../mocks/driver.mock";

export default function DriversList({ search }: { search?: string }) {
  return (
    <DataTable
      columns={driverTableColumns}
      data={mockDriverList}
      search={search}
      isLink
      link={(row) => "drivers/" + row.id}
    />
  );
}

