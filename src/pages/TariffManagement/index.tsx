import AddIcon from "@/assets/icons/AddIcon";
import PageWrapper from "@/component/PageWrapper";
import { TabsContent } from "@/component/ui/tabs";
import { useState } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import { tariffRoutes } from "./Routes";
import { TariffList } from "./Tariff";
import { TaxList } from "./Tax";
import { TARIFF_MANAGEMENT_TABS } from "./constant";

const TariffManagement = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("tariff");
  const navigate = useNavigate();
  const element = useRoutes(tariffRoutes);

  const handleActionClick = () => {
    if (activeTab === "tariff") {
      navigate("create-tariff");
    } else {
      navigate("create-tax");
    }
  };

  
  if (element) {
    return element;
  }

  return (
    <PageWrapper
      tabs={TARIFF_MANAGEMENT_TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      searchPlaceholder={activeTab === "tariff" ? "Search Tariff" : "Search Tax"}
      searchValue={search}
      onSearchChange={setSearch}
      onFilterClick={() => console.log("filter clicked")}
        actionLabel={activeTab === "tariff" ? "Create Tariff" : "Create Tax"}
      actionIcon={<AddIcon />}
      onActionClick={handleActionClick}
    >
      <TabsContent value="tariff">
        <TariffList search={search} />
      </TabsContent>

      <TabsContent value="tax">
        <TaxList search={search} />
      </TabsContent>
    </PageWrapper>
  );
};

export default TariffManagement;