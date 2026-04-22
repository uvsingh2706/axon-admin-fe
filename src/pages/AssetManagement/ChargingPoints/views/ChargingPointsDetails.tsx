import { useState, type ReactNode } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Breadcrumb from "@/component/Breadcrumb";
import PageWrapper from "@/component/PageWrapper";
import { Modal } from "@/component/Modal";
import EditIcon from "@/assets/icons/EditIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import MoneyIcon from "@/assets/icons/MoneyIcon";
import Wallet from "@/assets/icons/Wallet";
import { FileTypeIcon } from "@/assets/icons/FileTypeIcon";
import { DownloadIcon } from "@/assets/icons/DownloadIcon";
import { Pathname } from "@/utils/pathname";
import { Can, MODULE } from "@/rbac";
import { useChargingPointById, useDeleteChargingPoint } from "../services/chargingpoints.hooks";
import { toast } from "sonner";
import { format } from "date-fns";
import type { ChargingPointData } from "../services/chargingpoints.type";

type PointSummaryCard = {
  title: string;
  value: string;
  icon: ReactNode;
  color: string;
};

const getSummaryCards = (point: any): PointSummaryCard[] => [
  {
    title: "Charging Transactions",
    value: point?.totalTransactions || "NA",
    icon: <MoneyIcon className="w-6 h-6" />,
    color: "bg-orange-50",
  },
  {
    title: "Total Revenue",
    value: point?.totalRevenue ? `₹ ${point.totalRevenue}` : "NA",
    icon: <Wallet className="w-6 h-6" />,
    color: "bg-orange-50",
  },
];

const getPointDetailFields = (point: ChargingPointData) => [
  { label: "Configuration URL", value: point.configurationUrl || "NA" },
  { label: "Charging Point ID", value: point.chargingPointId || "NA" },
  { label: "Serial Number", value: point.serialNumber || "NA" },
  { label: "Charging Station", value: point.chargingStation?.name || point.chargingStationId || "NA" },
  { label: "Communication Protocol (Version)", value: point.communicationProtocol || "NA" },
  { label: "OEM", value: point.oem?.oemName || point.oemId || "NA" },
  { label: "Commissioned on", value: point.commissionedOn ? format(new Date(point.commissionedOn), "MMM dd, yyyy") : "NA" },
  { label: "Model", value: point.chargerModel?.chargerModelName || point.chargerModelId || "NA" },
  { label: "Connection Type", value: point.connectionType || "NA" },
  { label: "Published", value: point.isPublished ? "Yes" : "No", isPublished: point.isPublished },
  { label: "Firmware Version", value: point.firmwareVersion || "NA" },
];

export default function PointDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const statePoint = location.state?.point;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: pointResponse, isLoading } = useChargingPointById(id || "", !statePoint && !!id);
  const point = statePoint || pointResponse?.data;
  const { mutateAsync: deletePoint, isPending: isDeleting } = useDeleteChargingPoint();

  const handleEdit = () => {
    navigate(`${Pathname.ASSET_MANAGEMENT}/charging-points/${id}/edit`, { state: { point } });
  };

  const handleDelete = async () => {
    if (!id || isDeleting) return;
    try {
      await deletePoint({ id });
      toast.success("Success", { description: "Charging point deleted successfully" });
      setIsModalOpen(false);
      navigate(`${Pathname.ASSET_MANAGEMENT}/charging-points`);
    } catch (error) {
      toast.error("Error", { description: "Failed to delete charging point" });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <span className="subtitle-2-medium text-text-500">Loading charging point details...</span>
      </div>
    );
  }

  if (!point) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <span className="subtitle-2-medium text-text-500">Charging point not found.</span>
      </div>
    );
  }

  const pointDetailFields = getPointDetailFields(point);

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Asset Management", path: Pathname.ASSET_MANAGEMENT },
          { label: "Charging Points", path: Pathname.ASSET_MANAGEMENT },
          { label: point?.chargingPointName || "Point Details" },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {getSummaryCards(point).map((card, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 border border-border/50 shadow-xs flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <span className="text-muted-foreground text-sm font-semibold">{card?.title}</span>
              <span className="text-3xl font-semibold text-foreground">{card?.value}</span>
            </div>
            <div className={`w-12 h-12 rounded-xl ${card?.color} flex items-center justify-center`}>
              {card?.icon}
            </div>
          </div>
        ))}
      </div>

      <PageWrapper
        isChargerSpecifications={false}
        showSearch={false}
        showFilter={false}
        titleClassName="heading-3-semibold"
        className="w-full mt-4"
        title="Charging Point Details"
        headerActions={
          <div className="flex items-center gap-3">
            <Can module={MODULE.CHARGING_POINT} action="update">
              <button
                onClick={handleEdit}
                className="p-2 rounded-lg hover:bg-secondary-50 transition-colors cursor-pointer"
                aria-label="Edit charging point"
              >
                <EditIcon className="w-5 h-5" />
              </button>
            </Can>
            <Can module={MODULE.CHARGING_POINT} action="delete">
              <button
                onClick={() => setIsModalOpen(true)}
                className="p-2 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                aria-label="Delete charging point"
              >
                <DeleteIcon className="w-5 h-5" />
              </button>
              <Modal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                description="Are you sure you want to delete this Charging Point?"
                onConfirm={handleDelete}
              />
            </Can>
          </div>
        }
      >
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
          {pointDetailFields.map((field) => (
            <div key={field.label} className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">{field.label}</span>
              <span
                className={`text-sm font-medium ${field.isPublished ? "text-green-600" : "text-foreground"
                  }`}
              >
                {field.value}
              </span>
            </div>
          ))}
        </div>

        {/* Documents Section*/}
        <div className="mt-8">
          <h4 className="text-base font-semibold text-foreground mb-4">Documents</h4>
          {(point as any)?.documents?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(point as any).documents.map((doc: any) => (
                <div
                  key={doc?.id}
                  className="flex items-center justify-between rounded-xl border border-border/50 bg-secondary-00 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white shadow-sm">
                      <FileTypeIcon className="h-6 w-6" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-foreground">{doc?.title}</span>
                      <span className="text-xs text-muted-foreground">
                        {doc?.size} • {`Uploaded: `} {doc?.uploadedAt}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-2xl text-secondary-600 cursor-pointer"
                    aria-label={`Download ${doc?.title}`}
                  >
                    <DownloadIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center rounded-xl border border-dashed border-border/50 bg-secondary-00 py-8">
              <span className="text-sm text-muted-foreground">No documents available</span>
            </div>
          )}
        </div>
      </PageWrapper>
    </div>
  );
}
