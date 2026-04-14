import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Breadcrumb from "@/component/Breadcrumb";
import { Pathname } from "@/utils/pathname";
import Wallet from "@/assets/icons/Wallet";
import Bolt from "@/assets/icons/Bolt";
import CarIcon from "@/assets/icons/CarIcon";
import User from "@/assets/icons/User";
import EditIcon from "@/assets/icons/EditIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import ImagePlaceholderIcon from "@/assets/icons/ImagePlaceholderIcon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/component/ui/tabs";
import CopyIcon from "@/assets/icons/CopyIcon";
import { Modal } from "@/component/Modal";



import { cn } from "@/lib/utils";


import { dummyData } from "../FleetManagmentList";

export default function FleetDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Dynamic data fetching based on URL ID
  const fleetData = dummyData.find(item => item.id === id) || {
    id: id || "N/A",
    logo: "",
    organisationName: "N/A",
    vehicleType: "N/A",
    flatRate: "N/A",
    email: "N/A",
    contact: "N/A",
    totalDrivers: "0",
    totalVehicles: "0"
  };

  // Map to the format used in UI
  const details = {
    name: fleetData.organisationName,
    logo: fleetData.logo,
    revenue: "₹0",
    energy: "0",
    vehicles: fleetData.totalVehicles,
    drivers: fleetData.totalDrivers,
    email: fleetData.email,
    vehicleType: fleetData.vehicleType,
    contact: fleetData.contact,
    tariff: fleetData.flatRate,
  };

  const TABS = [
    { value: "overview", label: "Overview" },
    { value: "vehicles", label: "Vehicles" },
    { value: "drivers", label: "Drivers" },
  ];

  const statCardsData = [
    {
      title: "Total Revenue",
      value: details.revenue,
      icon: <Wallet className="w-5 h-5 text-primary-600" />,
      bgColor: "bg-primary-50",
    },
    {
      title: "Energy Delivered (kwh)",
      value: details.energy,
      icon: <Bolt className="w-5 h-5 text-primary-600" />,
      bgColor: "bg-primary-50",
    },
    {
      title: "Total Vehicles",
      value: details.vehicles,
      icon: <CarIcon className="w-5 h-5 text-primary-600" />,
      bgColor: "bg-primary-50",
    },
    {
      title: "Total Drivers",
      value: details.drivers,
      icon: <User className="w-5 h-5 text-orange-c1" />,
      bgColor: "bg-primary-50",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* 1. Breadcrumb navigation */}
      <Breadcrumb
        items={[
          { label: "Fleet Management", path: Pathname.FLEET_MANAGEMENT },
          { label: details.name },
        ]}
      />

      {/* 2. Detail Summary section mimicking PageWrapper styling */}
      <div className="bg-white rounded-lg p-6 shadow-sm flex flex-col gap-6">
        {/* Header with Title */}
        <div className="flex items-center justify-between">
          <h1 className="heading-3-semibold text-text-950">{details.name}</h1>
        </div>

        {/* Tabs Component */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            {TABS.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview">
            <div className="flex flex-col gap-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {statCardsData.map((data, index) => (
                  <StatCard
                    key={index}
                    title={data.title}
                    value={data.value}
                    icon={data.icon}
                    bgColor={data.bgColor}
                  />
                ))}
              </div>


              {/* Fleet Overview Section */}
              <div className="flex flex-col gap-6 pt-4">
                <div className="flex items-center justify-between border-b border-text-100 pb-2">
                  <h2 className="heading-4-semibold text-text-950">Fleet Overview</h2>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* Logo Box */}
                  <div className="w-27 h-27 rounded-xl border border-text-100 flex items-center justify-center overflow-hidden shrink-0 bg-white">
                    {details.logo ? (
                      <img src={details.logo} alt={details.name} className="w-full h-full object-contain p-2" />
                    ) : (
                      <ImagePlaceholderIcon className="w-full h-full" />
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="flex flex-col flex-1 gap-6 w-full">
                    {/* Title and Actions Row */}
                    <div className="flex items-start justify-between w-full">
                      <h3 className="heading-3-semibold text-text-950">{details.name}</h3>
                      <div className="flex items-center gap-3">
                        <button
                          className="p-1.5 rounded-md hover:bg-secondary-50 transition-colors cursor-pointer group"
                          title="Edit"
                          onClick={() => navigate(`${Pathname.FLEET_MANAGEMENT}/${id}/edit`)}
                        >
                          <EditIcon className="w-5 h-5 text-text-400 group-hover:text-text-700" />
                        </button>
                        <Modal
                          trigger={
                            <button className="p-1.5 rounded-md hover:bg-danger/5 transition-colors cursor-pointer group" title="Delete">
                              <DeleteIcon className="w-5 h-5 text-text-400 group-hover:text-danger" />
                            </button>
                          }
                          description="Are you sure you want to delete this organisation?"
                          onConfirm={() => {
                            // Your delete logic would go here
                            console.log("Delete organisation:", id);
                          }}
                          confirmLabel="Delete"
                          cancelLabel="Cancel"
                        />
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 w-full">
                      <DetailField label="Vehicle Type" value={details.vehicleType} />
                      <DetailField label="Email" value={details.email} isCopyable />
                      <DetailField label="Contact" value={details.contact} />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </TabsContent>

          <TabsContent value="vehicles">
            <div className="h-40 flex flex-col items-center justify-center text-text-500 border-2 border-dashed border-secondary-00 rounded-xl bg-secondary-00/10">
              <span className="subtitle-2-medium">No Vehicles Assigned</span>
            </div>
          </TabsContent>

          <TabsContent value="drivers">
            <div className="h-40 flex flex-col items-center justify-center text-text-500 border-2 border-dashed border-secondary-00 rounded-xl bg-secondary-00/10">
              <span className="subtitle-2-medium">No Drivers Found</span>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}


// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ title, value, icon, bgColor }: { title: string; value: string; icon: React.ReactNode; bgColor: string }) {
  return (
    <div className={cn(
      "bg-white border border-text-100 rounded-[0.625rem] flex items-center justify-between shadow-sm",
      "w-56 h-24 p-5"
    )}>
      <div className="flex flex-col gap-1">
        <span className="subtitle-3-regular text-text-500">{title}</span>
        <span className="heading-2-semibold text-text-950 leading-tight">{value}</span>
      </div>
      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0", bgColor)}>
        {icon}
      </div>
    </div>
  );
}

function DetailField({ label, value, isCopyable }: { label: string; value: string; isCopyable?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="subtitle-3-regular text-text-500 leading-none">{label}</span>
      <div className="flex items-center gap-2 h-5">
        <span className="subtitle-2-semibold text-text-950 whitespace-nowrap overflow-hidden text-ellipsis">{value}</span>
        {isCopyable && (
          <button
            className="text-text-400 hover:text-secondary-600 transition-colors cursor-pointer"
            title="Copy"
            onClick={() => navigator.clipboard.writeText(value)}
          >
            <CopyIcon className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}