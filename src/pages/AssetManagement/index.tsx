import AddIcon from "@/assets/icons/AddIcon";
import PageWrapper from "@/component/PageWrapper";
import { TabsContent } from "@/component/ui/tabs";
import { useEffect, useState } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import { assetRoutes } from "./Routes";
import { ChargingStationList } from "./ChargingStations";
import { ChargingPointList } from "./ChargingPoints";
import { ASSET_MANAGEMENT_TABS } from "./constant";
import { useCan } from "@/rbac";
import { MODULE } from "@/rbac/modules";
import ChargergerSpecificatoins from "./ChargerSpecifications";

const AssetManagement = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("charging-stations");
  const navigate = useNavigate();
  const element = useRoutes(assetRoutes);

  const canViewStations = useCan(MODULE.CHARGING_STATION, "view");
  const canViewPoints = useCan(MODULE.CHARGING_POINT, "view");
  const canCreateStations = useCan(MODULE.CHARGING_STATION, "create");
  const canCreatePoints = useCan(MODULE.CHARGING_POINT, "create");

  const allowedTabs = ASSET_MANAGEMENT_TABS.filter((tab) => {
    if (tab.value === "charging-stations") return canViewStations;
    if (tab.value === "charging-points") return canViewPoints;
    return true;
  });

  useEffect(() => {
    if (!allowedTabs.some((t) => t.value === activeTab)) {
      setActiveTab(allowedTabs[0]?.value ?? "charging-stations");
    }
  }, [allowedTabs, activeTab]);

  const handleActionClick = () => {
    if (activeTab === "charging-stations" && !canCreateStations) return;
    if (activeTab === "charging-points" && !canCreatePoints) return;

    if (activeTab === "charging-stations") {
      navigate("create-station");
    } else if (activeTab === "charging-points") {
      navigate("create-point");
    }
  };

  if (element) {
    return element;
  }

  if (allowedTabs.length === 0) {
    return (
      <div className="p-8 text-center text-text-500 subtitle-2-medium">
        You do not have permission to view asset management.
      </div>
    );
  }

  const actionLabel =
    activeTab === "charging-stations"
      ? canCreateStations
        ? "Add Charging Station"
        : undefined
      : canCreatePoints
        ? "Add Charging Point"
        : undefined;

  return (
    <PageWrapper
      title="Asset Management"
      tabs={allowedTabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      searchPlaceholder={activeTab === "charging-stations" ? "Search Charging Station" : "Search Charging Point"}
      searchValue={search}
      onSearchChange={setSearch}
      showFilter={false}
      onFilterClick={() => console.log("filter clicked")}
      actionLabel={actionLabel}
      actionIcon={<AddIcon />}
      onActionClick={actionLabel ? handleActionClick : undefined}
      isChargerSpecifications={activeTab === 'charger-specifications'}
    >
      {canViewStations && (
        <TabsContent value="charging-stations">
          <ChargingStationList search={search} />
        </TabsContent>
      )}

      {canViewPoints && (
        <TabsContent value="charging-points">
          <ChargingPointList search={search} />
        </TabsContent>
      )}

      <TabsContent value="charger-specifications">
        <ChargergerSpecificatoins />
      </TabsContent>
    </PageWrapper>
  );
};

export default AssetManagement;
