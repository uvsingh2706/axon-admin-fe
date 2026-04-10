import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "@/component/Breadcrumb";
import EditIcon from "@/assets/icons/EditIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import { Pathname } from "@/utils/pathname";
import PageWrapper from "@/component/PageWrapper";

// ─── Dummy data lookup (replace with API call) ───────────────────────────────

const TARIFF_MAP: Record<string, { name: string; value: string; serviceFee: string; tax: string }> = {
  "1": { name: "Zaptec Tariff", value: "₹23.25", serviceFee: "₹12", tax: "Tax type 1" },
  "2": { name: "Systematic Services", value: "₹23.25", serviceFee: "₹12", tax: "Tax type 1" },
  "3": { name: "Systematic Services", value: "₹23.25", serviceFee: "₹12", tax: "Tax type 1" },
  "4": { name: "Systematic Services", value: "₹23.25", serviceFee: "₹12", tax: "Tax type 1" },
  "5": { name: "Systematic Services", value: "₹23.25", serviceFee: "₹12", tax: "Tax type 1" },
  "6": { name: "Systematic Services", value: "₹23.25", serviceFee: "₹12", tax: "Tax type 1" },
  "7": { name: "Systematic Services", value: "₹23.25", serviceFee: "₹12", tax: "Tax type 1" },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function TariffDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const tariff = id ? TARIFF_MAP[id] : null;

  if (!tariff) {
    return (
      <div className="p-8 text-center text-text-500 subtitle-2-medium">
        Tariff not found.
      </div>
    );
  }

  const handleEdit = () => {
    navigate(`${Pathname.TARIFF_MANAGEMENT}/${id}/edit`);
  };

  const handleDelete = () => {
    // TODO: confirm dialog + API call
    console.log("Delete tariff:", id);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Tariff Management", path: Pathname.TARIFF_MANAGEMENT },
          { label: "Tariff", path: Pathname.TARIFF_MANAGEMENT },
          { label: tariff.name },
        ]}
      />

      {/* Detail Card */}
      <PageWrapper
        title="Tariff Details"
        showSearch={false}
        showFilter={false}
        titleClassName="heading-3-semibold"
        className="w-full"
      >
        {/* Actions Row */}
        <div className="flex items-center justify-end gap-3 mb-6">
          <button
            onClick={handleEdit}
            className="p-2 rounded-lg hover:bg-secondary-50 transition-colors cursor-pointer"
            aria-label="Edit tariff"
          >
            <EditIcon className="w-5 h-5" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
            aria-label="Delete tariff"
          >
            <DeleteIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Detail Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1">
            <span className="subtitle-3-regular text-text-500">Tariff Name</span>
            <span className="subtitle-2-semibold text-text-950">{tariff.name}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="subtitle-3-regular text-text-500">Value (per Kwh)</span>
            <span className="subtitle-2-semibold text-text-950">{tariff.value}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="subtitle-3-regular text-text-500">Service Fee</span>
            <span className="subtitle-2-semibold text-text-950">{tariff.serviceFee}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="subtitle-3-regular text-text-500">Tax</span>
            <span className="subtitle-2-semibold text-text-950">{tariff.tax}</span>
          </div>
        </div>
      </PageWrapper>
    </div>
  );
}
