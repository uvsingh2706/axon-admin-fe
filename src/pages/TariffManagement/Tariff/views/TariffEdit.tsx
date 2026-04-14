import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Breadcrumb from "@/component/Breadcrumb";
import { Pathname } from "@/utils/pathname";
import { DynamicForm } from "@/component/form/DynamicForm";
import { editTariffSchema, tariffEditFormSections } from "./TarrifEditConfig";
import type { EditTariffFormValues } from "./TarrifEditConfig";
import PageWrapper from "@/component/PageWrapper";

const TARIFF_MAP: Record<string, { name: string; value: string; serviceFee: string; tax: string }> = {
  "1": { name: "Zaptec Tariff", value: "23.25", serviceFee: "12", tax: "tax-type-1" },
  "2": { name: "Systematic Services", value: "23.25", serviceFee: "12", tax: "tax-type-1" },
  "3": { name: "Systematic Services", value: "23.25", serviceFee: "12", tax: "tax-type-1" },
  "4": { name: "Systematic Services", value: "23.25", serviceFee: "12", tax: "tax-type-1" },
  "5": { name: "Systematic Services", value: "23.25", serviceFee: "12", tax: "tax-type-1" },
  "6": { name: "Systematic Services", value: "23.25", serviceFee: "12", tax: "tax-type-1" },
  "7": { name: "Systematic Services", value: "23.25", serviceFee: "12", tax: "tax-type-1" },
};

export default function TariffEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const tariff = id ? TARIFF_MAP[id] : null;

  const [form, setForm] = useState({
    name: "",
    value: "",
    serviceFee: "",
    tax: "",
  });

  useEffect(() => {
    if (tariff) {
      setForm({
        name: tariff.name,
        value: tariff.value,
        serviceFee: tariff.serviceFee,
        tax: tariff.tax,
      });
    }
  }, [tariff]);

  if (!tariff) {
    return <div className="p-8 text-center text-text-500 subtitle-2-medium">Tariff not found.</div>;
  }

  const handleSubmit = (data: EditTariffFormValues) => {
    console.log("Update tariff:", id, data);
    navigate(`${Pathname.TARIFF_MANAGEMENT}/tarrif/${id}`);
  };

  const handleCancel = () => {
    navigate(`${Pathname.TARIFF_MANAGEMENT}/tarrif/${id}`);
  };

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Tariff Management", path: Pathname.TARIFF_MANAGEMENT },
          { label: "Tariff", path: Pathname.TARIFF_MANAGEMENT },
          { label: tariff.name, path: `${Pathname.TARIFF_MANAGEMENT}/tarrif/${id}` },
          { label: "Edit" },
        ]}
      />

      <PageWrapper
        title="Edit Tariff"
        showSearch={false}
        showFilter={false}
        titleClassName="heading-3-semibold"
        className="w-full"
      >
        {form.name && (
          <div className="mt-2">
            <DynamicForm
              schema={editTariffSchema}
              defaultValues={form}
              onSubmit={handleSubmit}
              sections={tariffEditFormSections}
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
