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
import ChargePointTable from "./ChargePointTable";
import type { ReactNode } from "react";


type InfrastructureSection = {
  title: string;
  fields?: { label: string; key: string }[];
  component?: ReactNode;
};

const getSummaryCards = (station: any) => [
  {
    title: "Total Charging Sessions",
    value: station?.sessions,
    icon: <Pump className="w-6 h-6" />,
    color: "bg-orange-50",
  },
  {
    title: "Total Revenue",
    value: station?.revenue,
    icon: <Wallet className="w-6 h-6" />,
    color: "bg-orange-50",
  },
  {
    title: "Energy Delivered (kwh)",
    value: station?.energy,
    icon: <Bolt className="w-6 h-6" />,
    color: "bg-orange-50",
  },
];

const INFRASTRUCTURE_CONFIG: InfrastructureSection[] = [
  {
    title: "Energy infrastructure & capacity",
    fields: [
      { label: "Solar", key: "solar" },
      { label: "BESS - battery energy storage system", key: "bess" },
      { label: "Non solar generation", key: "nonSolar" },
      { label: "Total installed EV charging capacity", key: "totalCapacity" },
      { label: "Total on-site load", key: "totalLoad" },
    ],
  },
  {
    title: "Charge Point",
    component: <ChargePointTable />,
  },
];

// Dummy data setup
const STATION_MAP: Record<string, any> = {
  "CS-001": {
    name: "My Home Tarkshya",
    sessions: "4",
    revenue: "₹1,200",
    energy: "1.75",
    address: "Sector 15, New Delhi, Delhi - 110015, Petrol Pump Station",
    addressLine2: "-",
    pincode: "500075",
    cityState: "Delhi, New Delhi",
    latLng: "28.6139, 77.2090",
    commissionOn: "26/06/21",
    // amenities: ["Mall", "Restaurant"],
    areaManager: {
      name: "Rahul Sharma",
      email: "rahul123@gmail.com",
      phone: "+91 98765 43210"
    },
    onSiteExecutive: {
      name: "Arjun Mehta",
      email: "arjun123@gmail.com",
      phone: "+91 87 0008 6088"
    },
    energyCapacity: {
      solar: "50 KWp",
      bess: "100 KWh",
      nonSolar: "100 KW",
      totalCapacity: "100 KW",
      totalLoad: "100 KW"
    }
  }
};



export default function StationDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Default to ID "CS-001" to show design placeholder even if routed without correct ID
  const stationId = id && STATION_MAP[id] ? id : "CS-001";
  const station = STATION_MAP[stationId];

  const handleEdit = () => {
    navigate(`${Pathname.ASSET_MANAGEMENT}/charging-stations/${stationId}/edit`);
  };

  const handleDelete = () => {
    console.log("Delete station:", stationId);
    // API deletion logic goes here
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Asset Management", path: Pathname.ASSET_MANAGEMENT },
          { label: "Charging Stations", path: Pathname.ASSET_MANAGEMENT },
          { label: station?.name },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {getSummaryCards(station).map((card, index) => (
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
        title="Charging Station Details"
        headerActions={
          <div className="flex items-center gap-3">
            <button
              onClick={handleEdit}
              className="p-2 rounded-lg hover:bg-secondary-50 transition-colors cursor-pointer"
              aria-label="Edit station"
            >
              <EditIcon className="w-5 h-5" />
            </button>
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
              description="Are you sure you want to delete this station?"
              onConfirm={handleDelete}
            />
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
                  src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=400" // will come from backend
                  alt="Charging Station"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Station Details */}
              <div className="flex flex-col gap-3">
                <h3 className="text-base font-bold text-foreground">{station?.name}</h3>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-muted-foreground">Address</span>
                  <span className="text-sm text-foreground font-medium leading-snug">{station?.address}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-muted-foreground">Commissioned Date</span>
                  <span className="text-sm text-foreground font-medium">{station?.commissionOn}</span>
                </div>
              </div>
            </div>

            {/* Support Information - boxed card */}
            <div className="flex flex-col gap-4 p-5 rounded-2xl border border-border/50 shadow-xs bg-white">
              <h4 className="text-base font-bold text-foreground">Support Information</h4>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Area Manager</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-gray-200 rounded-xl shrink-0 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" // will come from backend
                    alt="Area Manager"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-semibold text-foreground text-sm">{station?.areaManager?.name}</span>
                  <span className="text-xs text-muted-foreground">{station?.areaManager?.email}</span>
                  <span className="text-xs text-muted-foreground">{station?.areaManager?.phone}</span>
                </div>
              </div>
            </div>
          </div>


          {/* Dynamic Infrastructure Sections */}
          {INFRASTRUCTURE_CONFIG.map((section) => (
            <div key={section?.title} className="flex flex-col gap-6 p-5 pt-4">
              <h4 className="text-base font-semibold text-foreground">{section?.title}</h4>
              {section?.component ? (
                <div className="mt-2 rounded-xl bg-white">
                  {section?.component}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-y-6 gap-x-12">
                  {section?.fields?.map((field) => (
                    <div key={field?.key} className="flex flex-col gap-1">
                      <span className="text-sm text-muted-foreground">{field?.label}</span>
                      <span className="text-base font-semibold text-foreground">
                        {station?.energyCapacity?.[field?.key as keyof typeof station.energyCapacity]}
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
