import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Breadcrumb from "@/component/Breadcrumb";
import { Pathname } from "@/utils/pathname";
import { DynamicForm } from "@/component/form/DynamicForm";
import {
  editTariffSchema,
  tariffEditFormSections,
  type EditTariffFormValues,
} from "../config/tariff.form";
import PageWrapper from "@/component/PageWrapper";
import { mockTariffEditById } from "../mocks/tariff.mock";

export default function TariffEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const tariff = id ? mockTariffEditById[id] : null;

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
