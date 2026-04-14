import AddIcon from "@/assets/icons/AddIcon";
import PageWrapper from "@/component/PageWrapper";
import { TabsContent } from "@/component/ui/tabs";
import { useState } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import { assetRoutes } from "./Routes";
import { ChargingStationList } from "./ChargingStations";
import { ChargingPointList } from "./ChargingPoints";
import {ASSET_MANAGEMENT_TABS} from "./constant"

const AssetManagement = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("charging-stations");
  const navigate = useNavigate();
  const element = useRoutes(assetRoutes);

  const handleActionClick = () => {
    if (activeTab === "charging-stations") {
      navigate("create-station");
    } else {
      navigate("create-point");
    }
  };

  if (element) {
    return element;
  }

  return (
    <PageWrapper
      title="Asset Management"
      tabs={ASSET_MANAGEMENT_TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      searchPlaceholder={activeTab === "charging-stations" ? "Search Charging Station" : "Search Charging Point"}
      searchValue={search}
      onSearchChange={setSearch}
      showFilter={false}
      onFilterClick={() => console.log("filter clicked")}
      actionLabel={activeTab === "charging-stations" ? "Add Charging Station" : "Add Charging Point"}
      actionIcon={<AddIcon />}
      onActionClick={handleActionClick}
    >
      <TabsContent value="charging-stations">
        <ChargingStationList />
      </TabsContent>

      <TabsContent value="charging-points">
        <ChargingPointList />
      </TabsContent>
    </PageWrapper>
  );
};

export default AssetManagement;
