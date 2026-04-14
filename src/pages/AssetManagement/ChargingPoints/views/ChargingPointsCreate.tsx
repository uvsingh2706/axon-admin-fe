import { useNavigate } from "react-router-dom";
import { DynamicForm } from "@/component/form/DynamicForm";
import PageWrapper from "@/component/PageWrapper";
import {
  createPointSchema,
  pointCreateFormSections,
  type CreatePointFormValues,
} from "../config/point.form";
import Breadcrumb from "@/component/Breadcrumb";
import { Pathname } from "@/utils/pathname";

export default function PointCreate() {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(Pathname.ASSET_MANAGEMENT);
  };

  const handleSubmit = (data: CreatePointFormValues) => {
    console.log("Form Submitted:", data);
    handleBack();
  };

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Asset Management", path: Pathname.ASSET_MANAGEMENT },
          { label: "Charging Points", path: Pathname.ASSET_MANAGEMENT },
          { label: "Add Charging Point" },
        ]}
      />

      <PageWrapper
        title="Add Charging Point"
        showSearch={false}
        showFilter={false}
        titleClassName="heading-3-semibold"
        className="w-full"
      >
        <div className="mt-2 text-left">
          <DynamicForm
            schema={createPointSchema}
            onSubmit={handleSubmit}
            sections={pointCreateFormSections}
            submitLabel="Save"
            cancelLabel="Cancel"
            onCancel={handleBack}
            // defaultValues={{ isPublic: true }}
          />
        </div>
      </PageWrapper>
    </div>
  );
}
