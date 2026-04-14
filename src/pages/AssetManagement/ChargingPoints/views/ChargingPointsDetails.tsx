import { useState, type ReactNode } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

type PointSummaryCard = {
  title: string;
  value: string;
  icon: ReactNode;
  color: string;
};

type PointField = {
  label: string;
  key: string;
};

type PointDocument = {
  id: string;
  title: string;
  size: string;
  uploadedAt: string;
};

type PointDetailsData = {
  stationName: string;
  chargingTransactions: string;
  totalRevenue: string;
  fields: Record<string, string>;
  documents: PointDocument[];
};

const POINT_DETAIL_FIELDS: PointField[] = [
  { label: "Configuration URL", key: "configurationUrl" },
  { label: "Charging Point ID", key: "chargingPointId" },
  { label: "Serial Number", key: "serialNumber" },
  { label: "Charging Station", key: "chargingStation" },
  { label: "Communication Protocol (Version)", key: "protocolVersion" },
  { label: "OEM", key: "oem" },
  { label: "Commissioned on", key: "commissionedOn" },
  { label: "Model", key: "model" },
  { label: "Type", key: "type" },
  { label: "Published", key: "published" },
  { label: "Firmware Version", key: "firmwareVersion" },
];

const POINT_MAP: Record<string, PointDetailsData> = {
  "CP-001": {
    stationName: "My Home Tarkshya",
    chargingTransactions: "2",
    totalRevenue: "₹200",
    fields: {
      configurationUrl: "ws://c-be-uel.ioncharge.tech/ocpp/smart3.t3test",
      chargingPointId: "smart3.t3test",
      serialNumber: "ME250461",
      chargingStation: "My Home Tarkshya",
      protocolVersion: "ocpp1.6",
      oem: "EVRE",
      commissionedOn: "March 10, 2026 12:00:00 AM",
      model: "Model 1",
      type: "March 10, 2026 12:00:00 AM",
      published: "True",
      firmwareVersion: "4.0.1",
    },
    documents: [
      { id: "doc-1", title: "User Manual PDF", size: "1.2MB", uploadedAt: "24/01/25" },
      { id: "doc-2", title: "Specification PDF", size: "1.2MB", uploadedAt: "U24/01/25" },
    ],
  },
};

const getSummaryCards = (point: PointDetailsData): PointSummaryCard[] => [
  {
    title: "Charging Transactions",
    value: point?.chargingTransactions,
    icon: <MoneyIcon className="w-6 h-6" />,
    color: "bg-orange-50",
  },
  {
    title: "Total Revenue",
    value: point?.totalRevenue,
    icon: <Wallet className="w-6 h-6" />,
    color: "bg-orange-50",
  },
];

export default function PointDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pointId = id && POINT_MAP[id] ? id : "CP-001";
  const point = POINT_MAP[pointId];

  const handleEdit = () => {
    navigate(`${Pathname.ASSET_MANAGEMENT}/charging-points/${pointId}/edit`);
  };

  const handleDelete = () => {
    console.log("Delete charging point:", pointId);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Asset Management", path: Pathname.ASSET_MANAGEMENT },
          { label: "Charging Points", path: Pathname.ASSET_MANAGEMENT },
          { label: point?.stationName },
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
        showSearch={false}
        showFilter={false}
        titleClassName="heading-3-semibold"
        className="w-full mt-4"
        title="Charging Point Details"
        headerActions={
          <div className="flex items-center gap-3">
            <button
              onClick={handleEdit}
              className="p-2 rounded-lg hover:bg-secondary-50 transition-colors cursor-pointer"
              aria-label="Edit charging point"
            >
              <EditIcon className="w-5 h-5" />
            </button>
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
              description="Are you sure you want to delete this charging point?"
              onConfirm={handleDelete}
            />
          </div>
        }
      >
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
          {POINT_DETAIL_FIELDS?.map((field) => (
            <div key={field?.key} className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">{field?.label}</span>
              <span
                className={`text-sm font-medium ${
                  field?.key === "published" && point?.fields?.[field?.key] === "True" ? "text-green-600" : "text-foreground"
                }`}
              >
                {point?.fields?.[field?.key]}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h4 className="text-base font-semibold text-foreground mb-4">Documents</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {point?.documents?.map((doc) => (
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
                  className="flex h-10 w-10 items-center justify-center rounded-2xl  text-secondary-600 cursor-pointer"
                  aria-label={`Download ${doc?.title}`}
                >
                  <DownloadIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </PageWrapper>
    </div>
  );
}
