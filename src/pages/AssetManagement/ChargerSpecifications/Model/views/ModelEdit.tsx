import Breadcrumb from "@/component/Breadcrumb"
import { DynamicForm } from "@/component/form/DynamicForm"
import PageWrapper from "@/component/PageWrapper"
import { CreateModelSchema, CreateModelSections, type CreateModelFormValues } from "../config/model.form"
import { useLocation, useNavigate } from "react-router-dom"
import { Pathname } from "@/utils/pathname"

const ModelEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const modelData = location.state?.modelData;

  const defaultValues = modelData ? {
    oem: modelData.oemName,
    modelName: modelData.model,
    outputMax: modelData.outputMax?.replace(' A', ''),
    chargerModelType: modelData.chargingModelType,
    currentType: modelData.currentType,
    phaseType: modelData.phaseType,
    connectors: ["type-2"],
  } : undefined;

  const handleSubmit = (data: CreateModelFormValues) => {
    console.log("Submit Edited Form Data:", data);
    navigate(-1);
  };

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Asset Management", path: Pathname.ASSET_MANAGEMENT },
          { label: "Charger Specifications", path: `${Pathname.ASSET_MANAGEMENT}` },
          { label: "Model", path: `${Pathname.ASSET_MANAGEMENT}` },
          { label: "Edit" },
        ]}
      />

      <PageWrapper
        title={`Edit Model`}
        titleClassName="text-2xl font-semibold"
        isChargerSpecifications={true}
        className="w-full"
      >
          <DynamicForm<CreateModelFormValues>
            schema={CreateModelSchema}
            onSubmit={handleSubmit}
            sections={CreateModelSections}
            defaultValues={defaultValues as Partial<CreateModelFormValues>}
            submitLabel="Save Changes"
            cancelLabel="Cancel"
            onCancel={() => navigate(-1)}
          />
      
      </PageWrapper>
    </div>
  )
}

export default ModelEdit;