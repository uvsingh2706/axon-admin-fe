import { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import Breadcrumb from "@/component/Breadcrumb";
import PageWrapper from "@/component/PageWrapper";
import { Pathname } from "@/utils/pathname";
import Wallet from "@/assets/icons/Wallet";
import Bolt from "@/assets/icons/Bolt";
import CarIcon from "@/assets/icons/CarIcon";
import User from "@/assets/icons/User";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/component/ui/tabs";
import { getFleetById, mockFleetStatsById } from "../mocks/fleet.mock";
import { FLEET_MANAGEMENT_TABS } from "../constant";
import FleetOverview from "./Overview";
import type { FleetStatCard } from "../types/fleet.type";
import Vehicles from "./Vehicles";

export default function FleetDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("overview");
  const fleet = getFleetById(id);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && FLEET_MANAGEMENT_TABS.some((item) => item.value === tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  if (!fleet) {
    return (
      <div className="p-8 text-center text-text-500 subtitle-2-medium">
        Fleet not found.
      </div>
    );
  }

  const fleetStats = mockFleetStatsById[fleet.id] ?? {
    availableBalance: "₹0",
    energyDelivered: "0",
  };

  const statCardsData: FleetStatCard[] = [
    {
      title: "Available Balance",
      value: fleetStats.availableBalance,
      icon: <Wallet className="w-5 h-5 text-primary-600" />,
      bgColor: "bg-primary-50",
    },
    {
      title: "Energy Delivered (kwh)",
      value: fleetStats.energyDelivered,
      icon: <Bolt className="w-5 h-5 text-primary-600" />,
      bgColor: "bg-primary-50",
    },
    {
      title: "Total Vehicles",
      value: fleet.totalVehicles,
      icon: <CarIcon className="w-5 h-5 text-primary-600" />,
      bgColor: "bg-primary-50",
    },
    {
      title: "Total Drivers",
      value: fleet.totalDrivers,
      icon: <User className="w-5 h-5 text-orange-c1" />,
      bgColor: "bg-primary-50",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Fleet Management", path: Pathname.FLEET_MANAGEMENT },
          { label: fleet.organisationName },
        ]}
      />

      <PageWrapper
        title={fleet.organisationName}
        showSearch={false}
        showFilter={false}
        titleClassName="heading-3-semibold"
        className="w-full"
      >
        <div className="mt-2 flex flex-col gap-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6">
              {FLEET_MANAGEMENT_TABS.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <FleetOverview
              fleet={fleet}
              statCardsData={statCardsData}
              onEdit={() => navigate(`${Pathname.FLEET_MANAGEMENT}/${fleet.id}/edit`)}
              onDelete={() => {
                console.log("Delete fleet:", id);
                navigate(Pathname.FLEET_MANAGEMENT);
              }}
            />

            <Vehicles embedded fleetId={fleet.id} />

            <TabsContent value="drivers">
              <div className="h-40 flex flex-col items-center justify-center text-text-500 border-2 border-dashed border-secondary-00 rounded-xl bg-secondary-00/10">
                <span className="subtitle-2-medium">No Drivers Found</span>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </PageWrapper>
    </div>
  );
}
