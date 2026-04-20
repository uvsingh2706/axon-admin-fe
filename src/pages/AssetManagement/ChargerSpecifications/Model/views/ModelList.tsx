import { DataTable } from "@/component/data-table";
import { modelColumns } from "../config/model.table";
import { mockModelData } from "../mocks/model.mock";

const ModelList = () => {
  return (
    <div className="w-full">
        <DataTable columns={modelColumns} data={mockModelData} isLink link={(row) => "charger-specifications/model/" + row.id} />
    </div>
  )
}

export default ModelList;