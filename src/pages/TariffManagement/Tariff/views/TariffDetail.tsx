import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "@/component/Breadcrumb";
import EditIcon from "@/assets/icons/EditIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import { Pathname } from "@/utils/pathname";
import PageWrapper from "@/component/PageWrapper";
import { Modal } from "@/component/Modal";
import { useState } from "react";
import { useTariffById } from "../services/tarrif.hooks";
import { format } from "date-fns";

export default function TariffDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: tariffResponse, isLoading } = useTariffById(id ?? "");
  const tariff = tariffResponse?.data;

  if (isLoading) {
    return <div className="p-8 text-center text-text-500 subtitle-2-medium">Loading…</div>;
  }

  if (!tariff) {
    return <div className="p-8 text-center text-text-500 subtitle-2-medium">Tariff not found.</div>;
  }

  const handleEdit = () => {
    navigate(`${Pathname.TARIFF_MANAGEMENT}/tarrif/${id}/edit`);
  };

  const handleDelete = () => {
    console.log("Delete tariff:", id);
    // TODO: integrate delete API
  };

  const formatCurrency = (value: string) => {
    const symbol = tariff.currency === "INR" ? "₹" : tariff.currency;
    const parsed = parseFloat(value);
    return `${symbol} ${isNaN(parsed) ? value : parsed.toFixed(2)}`;
  };

  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), "MMM dd, yyyy hh:mm a");
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Tariff Management", path: Pathname.TARIFF_MANAGEMENT },
          { label: "Tariff", path: Pathname.TARIFF_MANAGEMENT },
          { label: tariff.tariffName },
        ]}
      />

      <PageWrapper
        showSearch={false}
        showFilter={false}
        titleClassName="heading-3-semibold"
        className="w-full"
        title="Tariff Details"
        headerActions={
          <div className="flex items-center gap-3">
            <button
              onClick={handleEdit}
              className="p-2 rounded-lg hover:bg-secondary-50 transition-colors cursor-pointer"
              aria-label="Edit tariff"
            >
              <EditIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="p-2 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
              aria-label="Delete tariff"
            >
              <DeleteIcon className="w-5 h-5" />
            </button>
            <Modal
              open={isModalOpen}
              onOpenChange={setIsModalOpen}
              description="Are you sure you want to delete this Tariff?"
              onConfirm={handleDelete}
            />
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="flex flex-col gap-1">
            <span className="subtitle-3-regular text-text-500">Tariff Name</span>
            <span className="subtitle-2-semibold text-text-950 capitalize">{tariff.tariffName}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="subtitle-3-regular text-text-500">Value (per kWh)</span>
            <span className="subtitle-2-semibold text-text-950">{formatCurrency(tariff.ratePerUnit)}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="subtitle-3-regular text-text-500">Service Fee</span>
            <span className="subtitle-2-semibold text-text-950">{formatCurrency(tariff.serviceFees)}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="subtitle-3-regular text-text-500">Tax</span>
            <span className="subtitle-2-semibold text-text-950 capitalize">
              {tariff.tax
                ? `${tariff.tax.taxName} (${tariff.tax.type})`
                : "NA"}
            </span>
          </div>
        </div>
      </PageWrapper>
    </div>
  );
}
