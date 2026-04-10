import { useState } from "react"
import PageWrapper from "@/component/PageWrapper"
import { TabsContent } from "@/component/ui/tabs"
import AddIcon from "@/assets/icons/AddIcon";
import { useNavigate } from "react-router-dom";
import { Pathname } from "@/utils/pathname";
import ChargingPointList from "./ChargingPointList";
import CharginStationList from "./ChargingStationList";




export default function AssetList() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState("charging-stations");
  const navigate = useNavigate();

  const TABS = [
    { value: "charging-stations", label: "Charging Stations" },
    { value: "charging-points", label: "Charging Points" },
  ];

  const handleActionClick = () => {
    if (activeTab === "charging-stations") {
      navigate(`${Pathname.ASSET_MANAGEMENT}/create-station`);
    } else {
      navigate(`${Pathname.ASSET_MANAGEMENT}/create-point`);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <PageWrapper
        title="Asset Management"
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchPlaceholder="Search Charge Point"
        showFilter={false}
        searchValue={search}
        onSearchChange={setSearch}
        onFilterClick={() => console.log("filter clicked")}
        actionLabel={activeTab === "charging-stations" ? "Add Charging Station" : "Add Charging Point"}
        actionIcon={<AddIcon />}
        onActionClick={handleActionClick}
      >
        <TabsContent value="charging-stations">
          <CharginStationList/>
        </TabsContent>
        <TabsContent value="charging-points">
          <ChargingPointList/>
        </TabsContent>
      </PageWrapper>
    </div>
  )
}
