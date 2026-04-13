import AddIcon from "@/assets/icons/AddIcon";
import PageWrapper from "@/component/PageWrapper";
import { TabsContent } from "@/component/ui/tabs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TarrifList from "./TarrifList";
import TaxList from "./TaxList";

// ─── Tabs Configuration ───────────────────────────────────────────────────────

const TABS = [
  { value: "tariff", label: "Tariff" },
  { value: "tax", label: "Tax" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function TariffManagementList() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("tariff");
  const navigate = useNavigate();

  const handleActionClick = () => {
    if (activeTab === "tariff") {
      navigate("create");
    } else {
      navigate("create-tax");
    }
  };

  return (
    <PageWrapper
      tabs={TABS}
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
        <TarrifList search={search} />
      </TabsContent>

      <TabsContent value="tax">
        <TaxList search={search} />
      </TabsContent>
    </PageWrapper>
  );
}
