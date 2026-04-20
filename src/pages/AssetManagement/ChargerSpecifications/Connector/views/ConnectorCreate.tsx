import Breadcrumb from "@/component/Breadcrumb"
import { DynamicForm } from "@/component/form/DynamicForm"
import PageWrapper from "@/component/PageWrapper"
import { CreateConnectorSchema, CreateConnectorSections, type CreateConnectorFormValues } from "../config/connector.form"
import { useNavigate } from "react-router-dom"
import { Pathname } from "@/utils/pathname"

const ConnectorCreate = () => {
  const navigate = useNavigate();

  const handleSubmit = (data: CreateConnectorFormValues) => {
    console.log("Submit Connector Form Data:", data);
    navigate(-1);
  };

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Asset Management", path: Pathname.ASSET_MANAGEMENT },
          { label: "Charger Specifications", path: `${Pathname.ASSET_MANAGEMENT}` },
          { label: "Connector", path: `${Pathname.ASSET_MANAGEMENT}` },
          { label: "Add" },
        ]}
      />

      <PageWrapper
        title="Add Connector"
        titleClassName="text-2xl font-semibold"
        isChargerSpecifications={true}
        className="w-full"
      >
          <DynamicForm<CreateConnectorFormValues>
            schema={CreateConnectorSchema}
            onSubmit={handleSubmit}
            sections={CreateConnectorSections}
            submitLabel="Add Connector"
            cancelLabel="Cancel"
            onCancel={() => navigate(-1)}
          />
      </PageWrapper>
    </div>
  )
}

export default ConnectorCreate
