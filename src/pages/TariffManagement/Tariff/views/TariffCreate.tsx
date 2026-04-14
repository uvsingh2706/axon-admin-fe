import { useNavigate } from "react-router-dom";
import { DynamicForm } from "@/component/form/DynamicForm";
import PageWrapper from "@/component/PageWrapper";
import {
  createTariffSchema,
  tariffCreateFormSections,
  type CreateTariffFormValues,
} from "../config/tariff.form";
import Breadcrumb from "@/component/Breadcrumb";
import { Pathname } from "@/utils/pathname";

interface CreateTariffProps {
  onCancel?: () => void;
}

export default function CreateTariff({ onCancel }: CreateTariffProps) {
  const navigate = useNavigate();

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate(Pathname.TARIFF_MANAGEMENT);
    }
  };

  const handleSubmit = (data: CreateTariffFormValues) => {
    console.log("Form Submitted:", data);
    handleCancel();
  };

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Tariff Management", path: Pathname.TARIFF_MANAGEMENT },
          { label: "Create Tariff" },
        ]}
      />

      <PageWrapper
        title="Create Tariff"
        showSearch={false}
        showFilter={false}
        titleClassName="heading-3-semibold"
        className="w-full"
      >
        <div className="mt-2">
          <DynamicForm
            schema={createTariffSchema}
            onSubmit={handleSubmit}
            sections={tariffCreateFormSections}
            submitLabel="Create Tariff"
            cancelLabel="Cancel"
            onCancel={handleCancel}
          />
        </div>
      </PageWrapper>
    </div>
  );
}
