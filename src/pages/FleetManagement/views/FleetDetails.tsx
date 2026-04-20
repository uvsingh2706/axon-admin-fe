import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import Breadcrumb from "@/component/Breadcrumb";
import PageWrapper from "@/component/PageWrapper";
import { Pathname } from "@/utils/pathname";
import Wallet from "@/assets/icons/Wallet";
import Bolt from "@/assets/icons/Bolt";
import CarIcon from "@/assets/icons/CarIcon";
import User from "@/assets/icons/User";
import { Tabs, TabsList, TabsTrigger } from "@/component/ui/tabs";
import { useFleetById } from "../services/Fleet.hooks";
import { mockFleetStatsById } from "../mocks/fleet.mock";
import { FLEET_MANAGEMENT_TABS } from "../constant";
import FleetOverview from "./Overview";
import type { FleetStatCard } from "../types/fleet.type";
import type { FleetDTO } from "../services/Fleet.types";
import Vehicles from "./Vehicles";
import Drivers from "./Drivers";
import { useCan } from "@/rbac";
import { MODULE } from "@/rbac/modules";

export default function FleetDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("overview");
  const { data: fleetDetail, isLoading, isError, error } = useFleetById(id ?? "");
  const fleet = fleetDetail?.data || ((fleetDetail as any)?.id ? (fleetDetail as unknown as FleetDTO) : null);

  const canViewFleet = useCan(MODULE.FLEET_MANAGEMENT, "view");
  const canUpdateFleet = useCan(MODULE.FLEET_MANAGEMENT, "update");
  const canDeleteFleet = useCan(MODULE.FLEET_MANAGEMENT, "delete");
  const canViewVehicles = useCan(MODULE.VEHICLE_MANAGEMENT, "view");
  const canViewDrivers = useCan(MODULE.VEHICLE_MANAGEMENT, "view");

  const allowedTabs = useMemo(
    () =>
      FLEET_MANAGEMENT_TABS.filter((tab) => {
        if (tab.value === "vehicles") return canViewVehicles;
        if (tab.value === "drivers") return canViewDrivers;
        return true;
      }),
    [canViewDrivers, canViewVehicles]
  );

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && allowedTabs.some((item) => item.value === tab)) {
      setActiveTab(tab);
    }
  }, [searchParams, allowedTabs]);

  useEffect(() => {
    if (!allowedTabs.some((item) => item.value === activeTab)) {
      setActiveTab(allowedTabs[0]?.value ?? "overview");
    }
  }, [allowedTabs, activeTab]);

  if (!canViewFleet) {
    return (
      <div className="p-8 text-center text-text-500 subtitle-2-medium">
        You do not have permission to view fleet details.
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-danger subtitle-2-medium">
        Error loading fleet: {(error as any)?.message || "Unknown error"}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-8 text-center text-text-500 subtitle-2-medium">
        Loading fleet details...
      </div>
    );
  }

  // if (!fleet) {
  //   return (
  //     <div className="p-8 text-center text-text-500 subtitle-2-medium">
  //       Fleet not found.
  //     </div>
  //   );
  // }

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
      value: fleet.totalVehicles || "0",
      icon: <CarIcon className="w-5 h-5 text-primary-600" />,
      bgColor: "bg-primary-50",
    },
    {
      title: "Total Drivers",
      value: fleet.totalDrivers || "0",
      icon: <User className="w-5 h-5 text-orange-c1" />,
      bgColor: "bg-primary-50",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Fleet Management", path: Pathname.FLEET_MANAGEMENT },
          { label: fleet.name },
        ]}
      />

      <PageWrapper
        title={fleet.name}
        showSearch={false}
        showFilter={false}
        titleClassName="heading-3-semibold"
        className="w-full"
      >
        <div className="mt-2 flex flex-col gap-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6">
              {allowedTabs.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <FleetOverview
              fleet={fleet}
              statCardsData={statCardsData}
              onEdit={canUpdateFleet ? () => navigate(`${Pathname.FLEET_MANAGEMENT}/${fleet.id}/edit`) : undefined}
              onDelete={canDeleteFleet ? () => {
                console.log("Delete fleet:", id);
                navigate(Pathname.FLEET_MANAGEMENT);
              } : undefined}
            />

            <Vehicles embedded fleetId={fleet.id} />

            <Drivers embedded fleetId={fleet.id} />

          </Tabs>
        </div>
      </PageWrapper>
    </div>
  );
}
