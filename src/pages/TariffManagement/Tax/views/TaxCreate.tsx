import { useNavigate } from "react-router-dom";
import { DynamicForm } from "@/component/form/DynamicForm";
import PageWrapper from "@/component/PageWrapper";
import {
  createTaxSchema,
  taxCreateFormSections,
  type CreateTaxFormValues,
} from "../config/tax.form";
import Breadcrumb from "@/component/Breadcrumb";
import { Pathname } from "@/utils/pathname";
import { useCreateTax } from "../services/tax.hooks";
import { toast } from "sonner";

export default function TaxCreate() {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(Pathname.TARIFF_MANAGEMENT);
  };

  const { mutateAsync: createTax, isPending } = useCreateTax();

  const handleSubmit = async (data: CreateTaxFormValues) => {
    try {
      await createTax({
        taxName: data.name,
        type: data.type.toLowerCase(),
        value: Number(data.percentageValue),
      });

      toast.success("Tax Created", { description: "The tax has been successfully created." });
      handleCancel();
    } catch (error) {
      toast.error("Failed to Create", { description: "There was an error creating the tax." });
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Tariff Management", path: Pathname.TARIFF_MANAGEMENT },
          { label: "Create Tax" },
        ]}
      />

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
            sections={taxCreateFormSections}
            submitLabel={isPending ? "Creating..." : "Create Tax"}
            cancelLabel="Cancel"
            onCancel={handleCancel}
          />
        </div>
      </PageWrapper>
    </div>
  );
}
