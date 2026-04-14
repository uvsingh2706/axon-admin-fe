import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Breadcrumb from "@/component/Breadcrumb";
import { Pathname } from "@/utils/pathname";
import { DynamicForm } from "@/component/form/DynamicForm";
import {
  editTaxSchema,
  taxEditFormSections,
  type EditTaxFormValues,
} from "../config/tax.form";
import PageWrapper from "@/component/PageWrapper";
import { mockTaxEditById } from "../mocks/tax.mock";

export default function TaxEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const tax = id ? mockTaxEditById[id] : null;

  const [form, setForm] = useState({
    name: "",
    type: "Percentage",
    percentageValue: "",
  });

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
    return <div className="p-8 text-center text-text-500 subtitle-2-medium">Tax not found.</div>;
  }

  const handleSubmit = (data: EditTaxFormValues) => {
    console.log("Update tax:", id, data);
    navigate(`${Pathname.TARIFF_MANAGEMENT}/tax/${id}`);
  };

  const handleCancel = () => {
    navigate(`${Pathname.TARIFF_MANAGEMENT}/tax/${id}`);
  };

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Tariff Management", path: Pathname.TARIFF_MANAGEMENT },
          { label: "Tax", path: Pathname.TARIFF_MANAGEMENT },
          { label: tax.taxName, path: `${Pathname.TARIFF_MANAGEMENT}/tax/${id}` },
          { label: "Edit" },
        ]}
      />

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
              schema={editTaxSchema}
              defaultValues={form}
              onSubmit={handleSubmit}
              sections={taxEditFormSections}
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
