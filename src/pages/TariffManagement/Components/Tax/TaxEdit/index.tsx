import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Breadcrumb from "@/component/Breadcrumb";
import { Pathname } from "@/utils/pathname";
import { DynamicForm } from "@/component/form/DynamicForm";
import { createTaxSchema, taxFormSections } from "../TaxCreate/TaxCreateConfig";
import type { CreateTaxFormValues } from "../TaxCreate/TaxCreateConfig";
import PageWrapper from "@/component/PageWrapper";

// ─── Dummy data lookup (replace with API call) ───────────────────────────────

const TAX_MAP: Record<string, { taxName: string; type: string; percentageValue: string }> = {
  "1": { taxName: "star-1 3968", type: "Percentage", percentageValue: "18" },
  "2": { taxName: "zaptec tax", type: "Percentage", percentageValue: "18" },
  "3": { taxName: "zaptec tax", type: "Percentage", percentageValue: "18" },
  "4": { taxName: "Systematic services", type: "Percentage", percentageValue: "18" },
  "5": { taxName: "Systematic services", type: "Percentage", percentageValue: "18" },
  "6": { taxName: "zaptec tax", type: "Percentage", percentageValue: "18" },
  "7": { taxName: "Systematic services", type: "Percentage", percentageValue: "18" },
  "8": { taxName: "zaptec tax", type: "Percentage", percentageValue: "18" },
};

export default function TaxEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const tax = id ? TAX_MAP[id] : null;

  const [form, setForm] = useState({
    name: "",
    type: "Percentage",
    percentageValue: "",
  });

  // Pre-fill form with existing tax data
  useEffect(() => {
    if (tax) {
      setForm({
        name: tax.taxName,
        type: tax.type,
        percentageValue: tax.percentageValue.replace("%", "").trim(),
      });
    }
  }, [tax]);

  if (!tax) {
    return (
      <div className="p-8 text-center text-text-500 subtitle-2-medium">
        Tax not found.
      </div>
    );
  }

  const handleSubmit = (data: CreateTaxFormValues) => {
    // TODO: API call to update tax
    console.log("Update tax:", id, data);
    navigate(`${Pathname.TARIFF_MANAGEMENT}/tax/${id}`);
  };

  const handleCancel = () => {
    navigate(`${Pathname.TARIFF_MANAGEMENT}/tax/${id}`);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Tariff Management", path: Pathname.TARIFF_MANAGEMENT },
          { label: "Tax", path: Pathname.TARIFF_MANAGEMENT },
          { label: tax.taxName, path: `${Pathname.TARIFF_MANAGEMENT}/tax/${id}` },
          { label: "Edit" },
        ]}
      />

      {/* Form Card */}
        <PageWrapper
          title="Edit Tax"
          showSearch={false}
          showFilter={false}
          titleClassName="heading-3-semibold"
          className="w-full"
        >
          {form.name && (
            <div className="mt-2">
              <DynamicForm
                schema={createTaxSchema}
                defaultValues={form}
                onSubmit={handleSubmit}
                sections={taxFormSections}
                submitLabel="Save Changes"
                cancelLabel="Cancel"
                onCancel={handleCancel}
              />
            </div>
          )}
        </PageWrapper>
    </div>
  );
}
