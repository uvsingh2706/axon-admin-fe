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
import { useTariffById } from "../services/tarrif.hooks";
import { useTaxList } from "../../Tax/services/Tax.hooks";

export default function TariffEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: tariffResponse, isLoading } = useTariffById(id || "");
  const { data: taxData } = useTaxList({ limit: 50, page: 1 });
  const tariff = tariffResponse?.data;

  const [form, setForm] = useState({
    name: "",
    value: "",
    serviceFee: "",
    tax: "",
  });

  useEffect(() => {
    if (tariff) {
      setForm({
        name: tariff.tariffName,
        value: tariff.ratePerUnit.toString(),
        serviceFee: tariff.serviceFees.toString(),
        tax: tariff.taxId,
      });
    }
  }, [tariff]);

  if (isLoading) {
    return <div className="p-8 text-center text-text-500 subtitle-2-medium">Loading...</div>;
  }

  if (!tariff) {
    return <div className="p-8 text-center text-text-500 subtitle-2-medium">Tariff not found.</div>;
  }

  const dynamicSections = tariffEditFormSections.map(section => ({
    ...section,
    fields: section.fields.map(field => {
      if (field.name === "tax") {
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
          { label: tariff.tariffName, path: `${Pathname.TARIFF_MANAGEMENT}/tarrif/${id}` },
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
              sections={dynamicSections}
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
