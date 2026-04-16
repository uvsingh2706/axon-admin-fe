import AddIcon from "@/assets/icons/AddIcon";
import PageWrapper from "@/component/PageWrapper";
import { TabsContent } from "@/component/ui/tabs";
import { useEffect, useState } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import { tariffRoutes } from "./Routes";
import { TariffList } from "./Tariff";
import { TaxList } from "./Tax";
import { TARIFF_MANAGEMENT_TABS } from "./constant";
import { useCan } from "@/rbac";
import { MODULE } from "@/rbac/modules";

const TariffManagement = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("tariff");
  const navigate = useNavigate();
  const element = useRoutes(tariffRoutes);

  const canViewTariff = useCan(MODULE.TARIFF, "view");
  const canViewTax = useCan(MODULE.TAX, "view");
  const canCreateTariff = useCan(MODULE.TARIFF, "create");
  const canCreateTax = useCan(MODULE.TAX, "create");

  const handleActionClick = () => {
    if (activeTab === "tariff" && canCreateTariff) {
      navigate("create-tariff");
    } else if (activeTab === "tax" && canCreateTax) {
      navigate("create-tax");
    }
  };

  const allowedTabs = TARIFF_MANAGEMENT_TABS.filter((tab) => {
    if (tab.value === "tariff") return canViewTariff;
    if (tab.value === "tax") return canViewTax;
    return true;
  });

  useEffect(() => {
    if (allowedTabs.length === 0) return;
    if (!allowedTabs.some((t) => t.value === activeTab)) {
      setActiveTab(allowedTabs[0]?.value ?? "tariff");
    }
  }, [allowedTabs, activeTab]);

  if (element) {
    return element;
  }

  if (allowedTabs.length === 0) {
    return (
      <div className="p-8 text-center text-text-500 subtitle-2-medium">
        You do not have permission to view tariff management.
      </div>
    );
  }

  const actionLabel =
    activeTab === "tariff"
      ? canCreateTariff
        ? "Create Tariff"
        : undefined
      : activeTab === "tax"
        ? canCreateTax
          ? "Create Tax"
          : undefined
        : undefined;

  return (
    <PageWrapper
      tabs={allowedTabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      searchPlaceholder={activeTab === "tariff" ? "Search Tariff" : "Search Tax"}
      searchValue={search}
      onSearchChange={setSearch}
      // onFilterClick={() => console.log("filter clicked")}
      actionLabel={actionLabel}
      actionIcon={<AddIcon />}
      onActionClick={actionLabel ? handleActionClick : undefined}
    >
      {canViewTariff && (
        <TabsContent value="tariff">
          <TariffList search={search} />
        </TabsContent>
      )}

      {canViewTax && (
        <TabsContent value="tax">
          <TaxList search={search} />
        </TabsContent>
      )}
    </PageWrapper>
  );
};

export default TariffManagement;