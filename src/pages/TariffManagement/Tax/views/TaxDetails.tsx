import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "@/component/Breadcrumb";
import EditIcon from "@/assets/icons/EditIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import { Pathname } from "@/utils/pathname";
import PageWrapper from "@/component/PageWrapper";
import { Modal } from "@/component/Modal";
import { useState } from "react";
import { useTaxById, useDeleteTax } from "../services/tax.hooks";
import { toast } from "sonner";

import { Can, MODULE } from "@/rbac";

export default function TaxDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: taxResponse, isLoading } = useTaxById(id || "");
  const tax = taxResponse?.data;
  const { mutateAsync: deleteTax } = useDeleteTax();

  if (isLoading) {
    return <div className="p-8 text-center text-text-500 subtitle-2-medium">Loading...</div>;
  }

  if (!tax) {
    return <div className="p-8 text-center text-text-500 subtitle-2-medium">Tax not found.</div>;
  }

  const handleEdit = () => {
    navigate(`${Pathname.TARIFF_MANAGEMENT}/tax/${id}/edit`, { state: { tax } });
  };

  const handleDelete = async () => {
    if (!id) return;
    try {
      await deleteTax({ id });
      toast.success("Tax Deleted", { description: "The tax has been removed." });
      navigate(Pathname.TARIFF_MANAGEMENT);
    } catch (error) {
      toast.error("Failed to Delete", { description: "An error occurred while deleting the tax." });
      console.log(error);
    }
  };

  const taxData = [
    {
      id: 'taxName',
      label: 'Tax Name',
      value: tax.taxName,
    },
    {
      id: 'percentageValue',
      label: 'Percentage Value',
      value: `${Math.round(Number(tax.value))}%`,
    }
  ];

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Tariff Management", path: Pathname.TARIFF_MANAGEMENT },
          { label: "Tax", path: Pathname.TARIFF_MANAGEMENT },
          { label: tax.taxName },
        ]}
      />

      <PageWrapper
        title="Tax Details"
        showSearch={false}
        showFilter={false}
        titleClassName="heading-3-semibold"
        className="w-full"
        headerActions={
          <div className="flex items-center gap-3">
            <Can module={MODULE.TAX} action="update">
              <button
                onClick={handleEdit}
                className="p-2 rounded-lg hover:bg-secondary-50 transition-colors cursor-pointer"
                aria-label="Edit tax"
              >
                <EditIcon className="w-5 h-5" />
              </button>
            </Can>
            <Can module={MODULE.TAX} action="delete">
              <button
                onClick={() => setIsModalOpen(true)}
                className="p-2 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                aria-label="Delete tax"
              >
                <DeleteIcon className="w-5 h-5" />
              </button>
              <Modal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                description="Are you sure you want to delete this Tax?"
                onConfirm={handleDelete}
              />
            </Can>
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {taxData.map((item) => (
            <div key={item.id} className="flex flex-col gap-1">
              <span className="subtitle-3-regular text-text-500">{item.label}</span>
              <span className="subtitle-2-semibold text-text-950 capitalize">{item.value}</span>
            </div>
          ))}
        </div>
      </PageWrapper>  
    </div>
  );
}
