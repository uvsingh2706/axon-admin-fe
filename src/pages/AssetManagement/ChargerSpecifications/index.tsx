import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [activeTab, setActiveTab] = useState("oem");
  const [localSearch, setLocalSearch] = useState("");
  const [isAddOemModalOpen, setAddOemModalOpen] = useState(false);

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
      value={localSearch}
      onChange={setLocalSearch}
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
        onTabChange={setActiveTab}
        searchNode={searchNode}
        actionsRight={actionsRight}
        className="border-text-100" // Usually the wrapper in nested tabs fits inside its parent.
      >
        <TabsContent value="oem">
          <OEMList />
        </TabsContent>

        <TabsContent value="model">
          <ModelList/>
        </TabsContent>

        <TabsContent value="connector">
        <ConnectorList/>
        </TabsContent>
      </Wrapper>

      <AddOemModal 
        open={isAddOemModalOpen} 
        onOpenChange={setAddOemModalOpen} 
      />
    </>
  );
}