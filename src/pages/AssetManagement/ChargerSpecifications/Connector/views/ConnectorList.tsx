import { DataTable } from "@/component/data-table";
import { connectorColumns } from "../config/connector.table";
import { mockConnectorData } from "../mocks/connector.mock";

const ConnectorList = () => {
  return (
    <div className="w-full">
      <DataTable 
        columns={connectorColumns} 
        data={mockConnectorData} 
        isLink 
        link={(row) => "charger-specifications/connector/" + row.id} 
      />
    </div>
  )
}

export default ConnectorList