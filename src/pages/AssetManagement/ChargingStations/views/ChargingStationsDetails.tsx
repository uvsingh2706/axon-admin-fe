import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "@/component/Breadcrumb";
import PageWrapper from "@/component/PageWrapper";
import { Modal } from "@/component/Modal";
import EditIcon from "@/assets/icons/EditIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import { Pathname } from "@/utils/pathname";
import Bolt from "@/assets/icons/Bolt";
import Pump from "@/assets/icons/Pump";
import Wallet from "@/assets/icons/Wallet";
import ChargePointTable from "./ChargingGunsList";
import type { ReactNode } from "react";
import { useStationById, useDeleteStation } from "../services/stations.hooks";
import { Can, MODULE } from "@/rbac";
import { toast } from "sonner";
import { format } from "date-fns";

type InfrastructureSection = {
  title: string;
  fields?: { label: string; key: string }[];
  component?: ReactNode;
};

const getSummaryCards = (station: any) => [
  {
    title: "Total Charging Sessions",
    value: station?.totalSessions || "NA",
    icon: <Pump className="w-6 h-6" />,
    color: "bg-orange-50",
  },
  {
    title: "Total Revenue",
    value: station?.totalRevenue ? `₹ ${station.totalRevenue}` : "NA",
    icon: <Wallet className="w-6 h-6" />,
    color: "bg-orange-50",
  },
  {
    title: "Energy Delivered (kwh)",
    value: station?.totalEnergy || "NA",
    icon: <Bolt className="w-6 h-6" />,
    color: "bg-orange-50",
  },
];



export default function StationDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: stationResponse, isLoading } = useStationById(id || "");
  const station = stationResponse?.data;
  const { mutateAsync: deleteStation } = useDeleteStation();

  const handleEdit = () => {
    navigate(`${Pathname.ASSET_MANAGEMENT}/charging-stations/${id}/edit`, { state: { station } });
  };

  const handleDelete = async () => {
    if (!id) return;
    try {
      await deleteStation({ id });
      toast.success("Success", { description: "Station deleted successfully" });
      setIsModalOpen(false);
      navigate(`${Pathname.ASSET_MANAGEMENT}`);
    } catch (error) {
      toast.error("Error", { description: "Failed to delete station" });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <span className="subtitle-2-medium text-text-500">Loading station details...</span>
      </div>
    );
  }

  if (!station) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <span className="subtitle-2-medium text-text-500">Station not found.</span>
      </div>
    );
  }

  const fullAddress = [
    station.firstStreet,
    station.secondStreet,
    station.city,
    station.state,
    station.pinCode
  ].filter(Boolean).join(", ");

  const INFRASTRUCTURE_CONFIG: InfrastructureSection[] = [
    {
      title: "Energy infrastructure & capacity",
      fields: [
        { label: "Solar", key: "solarPanel" },
        { label: "BESS - battery energy storage system", key: "bess" },
        { label: "Non solar generation", key: "nonSolarGeneration" },
        { label: "Total installed EV charging capacity", key: "chargingCapacity" },
        { label: "Total on-site load", key: "totalLoad" },
      ],
    },
    {
      title: "Charge Point",
      component: <ChargePointTable stationId={id || ""} />,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Asset Management", path: Pathname.ASSET_MANAGEMENT },
          { label: "Charging Stations", path: Pathname.ASSET_MANAGEMENT },
          { label: station.name },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {getSummaryCards(station).map((card, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 border border-border/50 shadow-xs flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <span className="text-muted-foreground text-sm font-semibold">{card.title}</span>
              <span className="text-3xl font-semibold text-foreground">{card.value}</span>
            </div>
            <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center`}>
              {card.icon}
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
        title="Charging Station Details"
        headerActions={
          <div className="flex items-center gap-3">
            <Can module={MODULE.CHARGING_STATION} action="update">
              <button
                onClick={handleEdit}
                className="p-2 rounded-lg hover:bg-secondary-50 transition-colors cursor-pointer"
                aria-label="Edit station"
              >
                <EditIcon className="w-5 h-5" />
              </button>
            </Can>
            <Can module={MODULE.CHARGING_STATION} action="delete">
              <button
                onClick={() => setIsModalOpen(true)}
                className="p-2 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                aria-label="Delete station"
              >
                <DeleteIcon className="w-5 h-5" />
              </button>
              <Modal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                description="Are you sure you want to delete this Charging Station?"
                onConfirm={handleDelete}
              />
            </Can>
          </div>
        }
      >
        <div className="flex flex-col gap-0 mt-2">

          {/* Top Info Row: Station Info & Support Info - flat, no inner cards */}
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-5">

            {/* Station Information - boxed card */}
            <div className="flex flex-row gap-5 p-5 rounded-2xl border border-border/50 shadow-xs bg-white">
              <div className="shrink-0 w-36 h-36 bg-gray-200 rounded-xl overflow-hidden">
                <img
                  src={station.image || "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=400"}
                  alt="Charging Station"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Station Details */}
              <div className="flex flex-col gap-3">
                <h3 className="text-base font-bold text-foreground">{station.name}</h3>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-muted-foreground">Address</span>
                  <span className="text-sm text-foreground font-medium leading-snug">{fullAddress}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-muted-foreground">Commissioned Date</span>
                  <span className="text-sm text-foreground font-medium">
                    {station.commissionedOn ? format(new Date(station.commissionedOn), "MMM dd, yyyy") : "NA"}
                  </span>
                </div>
              </div>
            </div>

            {/* Support Information - boxed card */}
            <div className="flex flex-col gap-4 p-5 rounded-2xl border border-border/50 shadow-xs bg-white">
              <h4 className="text-base font-bold text-foreground">Support Information</h4>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Support Person</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-gray-200 rounded-xl shrink-0 overflow-hidden">
                  <img
                    src={station.supportPersonImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"}
                    alt="Support Person"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-semibold text-foreground text-sm">{station.supportPersonName || "NA"}</span>
                  <span className="text-xs text-muted-foreground">{station.supportPersonEmail || "NA"}</span>
                  <span className="text-xs text-muted-foreground">{station.supportPersonNumber || "NA"}</span>
                </div>
              </div>
            </div>
          </div>


          {/* Dynamic Infrastructure Sections */}
          {INFRASTRUCTURE_CONFIG.map((section) => (
            <div key={section.title} className="flex flex-col gap-6 p-5 pt-4">
              <h4 className="text-base font-semibold text-foreground">{section.title}</h4>
              {section.component ? (
                <div className="mt-2 rounded-xl bg-white">
                  {section.component}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-y-6 gap-x-12">
                  {section.fields?.map((field) => (
                    <div key={field.key} className="flex flex-col gap-1">
                      <span className="text-sm text-muted-foreground">{field.label}</span>
                      <span className="text-base font-semibold text-foreground">
                        {(station as any)[field.key] || "NA"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

        </div>

      </PageWrapper>
    </div>
  );
}
