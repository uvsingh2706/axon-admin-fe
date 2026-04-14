import { DataTable } from "@/component/data-table";
import { tariffTableColumns } from "../config/tariff.table";
import { mockTariffList } from "../mocks/tariff.mock";

export default function TariffList({ search }: { search: string }) {
  return (
    <DataTable
      columns={tariffTableColumns}
      data={mockTariffList}
      search={search}
      isLink
      link={(row) => "tarrif/" + row.id}
    />
  );
}
