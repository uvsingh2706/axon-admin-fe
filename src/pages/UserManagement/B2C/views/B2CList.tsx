import { DataTable } from "@/component/data-table";
import { b2cTableColumns } from "../config/b2c.table";
import { mockB2CUsers } from "../mocks/b2c.mock";

export default function B2CList({ search }: { search?: string }) {
  return (
    <DataTable
      columns={b2cTableColumns}
      data={mockB2CUsers}
      search={search}
      isLink
      link={(row) => "b2c/" + row.id}
    />
  );
}

