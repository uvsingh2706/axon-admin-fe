import { useLocation, useNavigate, useParams } from "react-router-dom";
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
import { useTaxById, useUpdateTax } from "../services/tax.hooks";
import { toast } from "sonner";


export default function TaxEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const location = useLocation();
  const stateTax = location.state?.tax;

  const { data: taxRes, isLoading } = useTaxById(id || "", !stateTax && !!id);
  const tax = stateTax || taxRes?.data;

  const { mutateAsync: updateTax, isPending } = useUpdateTax();

  const [form, setForm] = useState<EditTaxFormValues>({
    name: "",
    type: "Percentage",
    percentageValue: "",
  });

  useEffect(() => {
    if (tax) {
      setForm({
        name: tax.taxName,
        type: tax.type,
        percentageValue: tax.value.toString().replace("%", "").trim(),
      });
    }
  }, [tax]);

  if (isLoading) {
    return <div className="p-8 text-center text-text-500 subtitle-2-medium">Loading...</div>;
  }

  if (!tax) {
    return <div className="p-8 text-center text-text-500 subtitle-2-medium">Tax not found.</div>;
  }

  const handleSubmit = async (data: EditTaxFormValues) => {
    if (!id) return;
    try {
      await updateTax({
        id,
        data: {
          taxName: data.name,
          type: data.type.toLowerCase(),
          value: Number(data.percentageValue),
        },
      });
      toast.success("Tax Updated", { description: "Tax details have been updated." });
      navigate(`${Pathname.TARIFF_MANAGEMENT}/tax/${id}`);
    } catch (error) {
      toast.error("Failed to Update", { description: "An error occurred while updating the tax." });
      console.log(error);
    }
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
