import { useNavigate } from "react-router-dom";
import { DynamicForm } from "@/component/form/DynamicForm";
import PageWrapper from "@/component/PageWrapper";
import { createTaxSchema, taxFormSections } from "./TaxCreateConfig";
import type { CreateTaxFormValues } from "./TaxCreateConfig";
import Breadcrumb from "@/component/Breadcrumb";
import { Pathname } from "@/utils/pathname";

export default function TaxCreate() {
  const navigate = useNavigate();
  
  const handleCancel = () => {
    navigate(Pathname.TARIFF_MANAGEMENT);
  };

  const handleSubmit = (data: CreateTaxFormValues) => {
    console.log("Form Submitted:", data);
    // TODO: Add actual API call here
    handleCancel();
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Tariff Management", path: Pathname.TARIFF_MANAGEMENT },
          { label: "Create Tax" },
        ]}
      />

      {/* Form Card */}
      <PageWrapper
        title="Create Tax"
        showSearch={false}
        showFilter={false}
        titleClassName="heading-3-semibold"
        className="w-full"
      >
        <div className="mt-2">
          <DynamicForm
            schema={createTaxSchema}
            defaultValues={{ type: "Percentage", name: "", percentageValue: "" }}
            onSubmit={handleSubmit}
            sections={taxFormSections}
            submitLabel="Create Tax"
            cancelLabel="Cancel"
            onCancel={handleCancel}
          />
        </div>
      </PageWrapper>
    </div>
  );
}
