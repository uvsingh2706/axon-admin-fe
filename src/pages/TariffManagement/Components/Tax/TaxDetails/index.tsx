import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "@/component/Breadcrumb";
import EditIcon from "@/assets/icons/EditIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import { Pathname } from "@/utils/pathname";
import PageWrapper from "@/component/PageWrapper";
import { Modal } from "@/component/Modal";
import { useState } from "react";

// ─── Dummy data lookup (replace with API call) ───────────────────────────────

const TAX_MAP: Record<string, { taxName: string; type: string; percentageValue: string }> = {
  "1": { taxName: "star-1 3968", type: "Percentage", percentageValue: "18%" },
  "2": { taxName: "zaptec tax", type: "Percentage", percentageValue: "18%" },
  "3": { taxName: "zaptec tax", type: "Percentage", percentageValue: "18%" },
  "4": { taxName: "Systematic services", type: "Percentage", percentageValue: "18%" },
  "5": { taxName: "Systematic services", type: "Percentage", percentageValue: "18%" },
  "6": { taxName: "zaptec tax", type: "Percentage", percentageValue: "18%" },
  "7": { taxName: "Systematic services", type: "Percentage", percentageValue: "18%" },
  "8": { taxName: "zaptec tax", type: "Percentage", percentageValue: "18%" },
};

export default function TaxDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tax = id ? TAX_MAP[id] : null;

  if (!tax) {
    return (
      <div className="p-8 text-center text-text-500 subtitle-2-medium">
        Tax not found.
      </div>
    );
  }

  const handleEdit = () => {
    navigate(`${Pathname.TARIFF_MANAGEMENT}/tax/${id}/edit`);
  };

  const handleDelete = () => {
    // TODO: confirm dialog + API call
    console.log("Delete tax:", id);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Tariff Management", path: Pathname.TARIFF_MANAGEMENT },
          { label: "Tax", path: Pathname.TARIFF_MANAGEMENT },
          { label: tax.taxName },
        ]}
      />

      {/* Detail Card */}
      <PageWrapper
        title="Tax Details"
        showSearch={false}
        showFilter={false}
        titleClassName="heading-3-semibold"
        className="w-full"
        headerActions={
          <div className="flex items-center gap-3">
            <button
              onClick={handleEdit}
              className="p-2 rounded-lg hover:bg-secondary-50 transition-colors cursor-pointer"
              aria-label="Edit tax"
            >
              <EditIcon className="w-5 h-5" />
            </button>
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
          </div>
        }
      >
        {/* Detail Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="flex flex-col gap-1">
            <span className="subtitle-3-regular text-text-500">Tax Name</span>
            <span className="subtitle-2-semibold text-text-950">{tax.taxName}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="subtitle-3-regular text-text-500">Percentage Value</span>
            <span className="subtitle-2-semibold text-text-950">{tax.percentageValue}</span>
          </div>
        </div>
      </PageWrapper>
    </div>
  );
}
