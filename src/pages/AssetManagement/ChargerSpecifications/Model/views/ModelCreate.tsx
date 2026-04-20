import Breadcrumb from "@/component/Breadcrumb"
import { DynamicForm } from "@/component/form/DynamicForm"
import PageWrapper from "@/component/PageWrapper"
import { CreateModelSchema, CreateModelSections, type CreateModelFormValues } from "../config/model.form"
import { useNavigate } from "react-router-dom"
import { Pathname } from "@/utils/pathname"



const ModelCreate = () => {
  const navigate = useNavigate();

  const handleSubmit = (data: CreateModelFormValues) => {
    console.log("Submit Form Data:", data);
    navigate(-1);
  };

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Asset Management", path: Pathname.ASSET_MANAGEMENT },
          { label: "Charger Specifications", path: `${Pathname.ASSET_MANAGEMENT}` },
          { label: "Model", path: `${Pathname.ASSET_MANAGEMENT}` },
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
            sections={CreateModelSections}
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