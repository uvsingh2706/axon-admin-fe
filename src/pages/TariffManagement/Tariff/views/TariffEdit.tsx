import { useLocation, useNavigate, useParams } from "react-router-dom";
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
import { tariffApi } from "../services/tarrif.api";
import { useQuery } from "@tanstack/react-query";
import { tariffKeys, useUpdateTariff } from "../services/tarrif.hooks";
import { useTaxList } from "../../Tax/services/tax.hooks";

export default function TariffEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const updateTariff = useUpdateTariff();

  const stateTariff = location.state?.tariff;

  const { data: tariffResponse, isLoading } = useQuery({
    queryKey: [...tariffKeys.all, "detail", id],
    queryFn: () => tariffApi.getTariffById(id ?? ""),
    enabled: !stateTariff && !!id,
  });

  const tariff = stateTariff || tariffResponse?.data;
  const { data: taxData } = useTaxList({ limit: 50, page: 1 });


  const [form, setForm] = useState<EditTariffFormValues>({
    name: "",
    value: "",
    serviceFee: "",
    tax: "",
  });

  useEffect(() => {
    if (tariff) {
      setForm({
        name: tariff.tariffName,
        value: tariff.ratePerUnit,
        serviceFee: tariff.serviceFees,
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
          options: taxData?.data?.data?.map((tax: any) => ({
            label: tax.taxName,
            value: tax.id
          })) || []
        };
      }
      return field;
    })
  }));

  const handleSubmit = (data: EditTariffFormValues) => {
    if (!id) return;

    updateTariff.mutate({
      id,
      data: {
        tariffName: data.name,
        ratePerUnit: Number(data.value),
        serviceFees: Number(data.serviceFee),
        taxId: data.tax,
        currency: tariff?.currency || "INR",
      },
    }, {
      onSuccess: () => {
        navigate(`${Pathname.TARIFF_MANAGEMENT}/tarrif/${id}`);
      }
    });
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
