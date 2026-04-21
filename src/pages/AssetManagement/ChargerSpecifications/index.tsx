import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Wrapper from "@/component/Wrapper";
import DebouncedInput from "@/component/debounce-input";
import { Button } from "@/component/ui/button";
import AddIcon from "@/assets/icons/AddIcon";
import { TabsContent } from "@/component/ui/tabs";
import OEMList from "./OEM/views/OEMList";
import { CHARGER_SPEC_TABS } from "../constant";
import AddOemModal from "./OEM/views/AddOemModal";
import ModelList from "./Model/views/ModelList";
import ConnectorList from "./Connector/views/ConnectorList";
import { Pathname } from "@/utils/pathname";

export default function ChargergerSpecificatoins() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "oem";
  
  const [activeTab, setActiveTab] = useState(initialTab);
  const [search, setSearch] = useState("");
  const [isAddOemModalOpen, setAddOemModalOpen] = useState(false);

  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");
    if (tabFromUrl && tabFromUrl !== activeTab) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    setSearch(""); // Reset search when switching tabs
    setSearchParams({ tab: newTab });
  };

  const searchPlaceholder =
    activeTab === "oem"
      ? "Search OEM"
      : activeTab === "model"
        ? "Search Model"
        : "Search Connector";

  const actionLabel =
    activeTab === "oem"
      ? "Add OEM"
      : activeTab === "model"
        ? "Add Model"
        : "Add Connector";

  const searchNode = (
    <DebouncedInput
      value={search}
      onChange={setSearch}
      placeholder={searchPlaceholder}
    />
  );

  const navigate = useNavigate();

  const handleAddAction = () => {
    if (activeTab === "oem") {
      setAddOemModalOpen(true);
    } else if (activeTab === "model") {
      navigate(`${Pathname.ASSET_MANAGEMENT}/charger-specifications/model/create`);
    } else if (activeTab === "connector") {
      navigate(`${Pathname.ASSET_MANAGEMENT}/charger-specifications/connector/create`);
    }
  };

  const actionsRight = (
    <Button onClick={handleAddAction} variant="primary" isIcon={<AddIcon />}>
      {actionLabel}
    </Button>
  );

  return (
    <>
      <Wrapper
        tabs={CHARGER_SPEC_TABS}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        searchNode={searchNode}
        actionsRight={actionsRight}
        className="border-text-100" // Usually the wrapper in nested tabs fits inside its parent.
      >
        <TabsContent value="oem">
          <OEMList search={search} />
        </TabsContent>

        <TabsContent value="model">
          <ModelList search={search}/>
        </TabsContent>

        <TabsContent value="connector">
        <ConnectorList search={search} />
        </TabsContent>
      </Wrapper>

      <AddOemModal 
        open={isAddOemModalOpen} 
        onOpenChange={setAddOemModalOpen} 
      />
    </>
  );
}