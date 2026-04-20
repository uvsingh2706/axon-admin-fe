import Breadcrumb from "@/component/Breadcrumb"
import { DynamicForm } from "@/component/form/DynamicForm"
import PageWrapper from "@/component/PageWrapper"
import { CreateConnectorSchema, CreateConnectorSections, type CreateConnectorFormValues } from "../config/connector.form"
import { useLocation, useNavigate } from "react-router-dom"
import { Pathname } from "@/utils/pathname"

const ConnectorEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const connectorData = location.state?.connectorData;

  const defaultValues = connectorData ? {
    connectorName: connectorData.connectorName,
    ioType: connectorData.ioType,
    connectorStandard: connectorData.connectorStandard,
    connectorOutput: connectorData.connectorOutput?.replace(' A', ''),
  } : undefined;

  const handleSubmit = (data: CreateConnectorFormValues) => {
    console.log("Submit Edited Connector Data:", data);
    navigate(-1);
  };

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Asset Management", path: Pathname.ASSET_MANAGEMENT },
          { label: "Charger Specifications", path: `${Pathname.ASSET_MANAGEMENT}` },
          { label: "Connector", path: `${Pathname.ASSET_MANAGEMENT}` },
          { label: "Edit" },
        ]}
      />

      <PageWrapper
        title="Edit Connector"
        titleClassName="text-2xl font-semibold"
        isChargerSpecifications={true}
        className="w-full"
      >

          <DynamicForm<CreateConnectorFormValues>
            schema={CreateConnectorSchema}
            onSubmit={handleSubmit}
            sections={CreateConnectorSections}
            defaultValues={defaultValues as Partial<CreateConnectorFormValues>}
            submitLabel="Save Changes"
            cancelLabel="Cancel"
            onCancel={() => navigate(-1)}
          />

      </PageWrapper>
    </div>
  )
}

export default ConnectorEdit;