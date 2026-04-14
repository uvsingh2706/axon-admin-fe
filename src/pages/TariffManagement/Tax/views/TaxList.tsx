import { DataTable } from "@/component/data-table";
import { taxTableColumns } from "../config/tax.table";
import { mockTaxList } from "../mocks/tax.mock";

export default function TaxList({ search }: { search: string }) {
  return (
    <DataTable
      columns={taxTableColumns}
      data={mockTaxList}
      search={search}
      isLink
      link={(row) => "tax/" + row.id}
    />
  );
}
