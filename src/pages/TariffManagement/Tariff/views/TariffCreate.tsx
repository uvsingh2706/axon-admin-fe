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
import { useCreateTariff } from "../services/tarrif.hooks";
import { useTaxList } from "../../Tax/services/tax.hooks";
import { toast } from "sonner";

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

  const { mutateAsync: createTariff, isPending } = useCreateTariff();
  const { data: taxData } = useTaxList({ limit: 50, page: 1 });

  const dynamicSections = tariffCreateFormSections.map(section => ({
    ...section,
    fields: section.fields.map(field => {
      if (field.name === "taxType") {
        return {
          ...field,
          options: taxData?.data?.data?.map(tax => ({
            label: tax.taxName,
            value: tax.id
          })) || []
        };
      }
      return field;
    })
  }));

  const handleSubmit = async (data: CreateTariffFormValues) => {
    try {
      await createTariff({
        tariffName: data.name,
        ratePerUnit: Number(data.valuePerKwh),
        serviceFees: Number(data.serviceFee),
        currency: "INR",
        taxId: data.taxType,
      });
      toast.success("Tariff Created", { description: "The tariff has been successfully created." });
      handleCancel();
    } catch (error) {
      toast.error("Failed to Create", { description: "There was an error creating the tariff." });
      console.log(error);
    }
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
            sections={dynamicSections}
            submitLabel={isPending ? "Creating..." : "Create Tariff"}
            cancelLabel="Cancel"
            onCancel={handleCancel}
          />
        </div>
      </PageWrapper>
    </div>
  );
}
