import Breadcrumb from "@/component/Breadcrumb"
import { DynamicForm } from "@/component/form/DynamicForm"
import PageWrapper from "@/component/PageWrapper"
import { CreateModelSchema, getCreateModelSections, type CreateModelFormValues } from "../config/model.form"
import { useNavigate } from "react-router-dom"
import { Pathname } from "@/utils/pathname"
import { useCreateModel } from "../services/model.hooks"
import { useOEMList } from "../../OEM/services/oem.hooks"
import { useConnectorList } from "../../Connector/services/connector.hook"

const ModelCreate = () => {
  const navigate = useNavigate();
  const { mutateAsync: createModel } = useCreateModel();
  
  const { data: oemList } = useOEMList({ page: 1, limit: 100 });
  const { data: connectorList } = useConnectorList({ page: 1, limit: 100 });

  const oemOptions = oemList?.data?.oems?.map(oem => ({
    label: oem.oemName,
    value: oem.id,
  })) || [];

  const connectorOptions = connectorList?.data?.connectorMetas?.map(conn => ({
    label: conn.name,
    value: conn.id,
  })) || [];

  const handleSubmit = (data: CreateModelFormValues) => {
    // Map the form data to the expected backend payload
    const payload = {
      oem_id: data.oem,
      charger_model_name: data.modelName,
      charger_model_type: data.chargerModelType,
      current_type: data.currentType,
      phase: data.phase,
      output_max: Number(data.outputMax) || 0,
      charger_output_power: Number(data.outputMax) || 0,
      connector_ids: data.connectors,
      manual_pdf: data.manualPdf,
      spec_pdf: data.specPdf,
    };

    createModel(payload);
    navigate(-1);
  };

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Asset Management", path: Pathname.ASSET_MANAGEMENT },
          { label: "Charger Specifications", path: `${Pathname.ASSET_MANAGEMENT}` },
          { label: "Model", path: `${Pathname.ASSET_MANAGEMENT}/charger-specifications?tab=model` },
          { label: "Add" },
        ]}
      />

      <PageWrapper
        title="Add Model"
        titleClassName="text-2xl font-semibold"
        isChargerSpecifications={true}
        className="w-full"
      >
        <div className="bg-white rounded-lg p-6 border border-text-100 shadow-sm mt-4">
          <DynamicForm<CreateModelFormValues>
            schema={CreateModelSchema}
            onSubmit={handleSubmit}
            sections={getCreateModelSections(oemOptions, connectorOptions)}
            submitLabel="Add Model"
            cancelLabel="Cancel"
            onCancel={() => navigate(-1)}
          />
        </div>
      </PageWrapper>
    </div>
  )
}

export default ModelCreate