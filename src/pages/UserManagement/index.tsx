import PageWrapper from "@/component/PageWrapper";
import { useEffect, useState } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import AddIcon from "@/assets/icons/AddIcon";
import { TabsContent } from "@/component/ui/tabs";
import { USER_MANAGEMENT_TABS } from "./constant";
import { userManagementRoutes } from "./Routes";
import { DriversList } from "./Drivers";
import { B2CList } from "./B2C";
import { useCan } from "@/rbac";
import { MODULE } from "@/rbac/modules";

const UserManagement = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("drivers");

  const navigate = useNavigate();
  const element = useRoutes(userManagementRoutes);

  const canViewDrivers = useCan(MODULE.VEHICLE_MANAGEMENT, "view");
  const canViewB2C = useCan(MODULE.B2C, "view");
  const canCreateDrivers = useCan(MODULE.VEHICLE_MANAGEMENT, "create");
  const canCreateB2C = useCan(MODULE.B2C, "create");

  const allowedTabs = USER_MANAGEMENT_TABS.filter((tab) => {
    if (tab.value === "drivers") return canViewDrivers;
    if (tab.value === "b2c") return canViewB2C;
    return true;
  });

  // If current tab is not allowed, switch to the first allowed one.
  useEffect(() => {
    if (allowedTabs.length === 0) return;
    if (!allowedTabs.some((t) => t.value === activeTab)) {
      setActiveTab(allowedTabs[0]?.value ?? "drivers");
    }
  }, [allowedTabs, activeTab]);

  const handleActionClick = () => {
    if (activeTab === "drivers" && canCreateDrivers) {
      navigate("drivers/create");
    } else if (activeTab === "b2c" && canCreateB2C) {
      navigate("b2c/create");
    }
  };

  if (element) {
    return element;
  }

  if (allowedTabs.length === 0) {
    return (
      <div className="p-8 text-center text-text-500 subtitle-2-medium">
        You do not have permission to view user management.
      </div>
    );
  }

  const actionLabel =
    activeTab === "drivers"
      ? canCreateDrivers
        ? "Create Driver"
        : undefined
      : activeTab === "b2c"
        ? canCreateB2C
          ? "Create B2C User"
          : undefined
        : undefined;

  return (
    <PageWrapper
      title=""
      tabs={allowedTabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      isTable={true}
      searchPlaceholder={activeTab === "drivers" ? "Search drivers" : "Search user"}
      searchValue={search}
      onSearchChange={setSearch}
      actionIcon={<AddIcon />}
      onActionClick={actionLabel ? handleActionClick : undefined}
      onFilterClick={() => console.log("filter clicked")}
      actionLabel={actionLabel}
    >
      {canViewDrivers && (
        <TabsContent value="drivers">
          <DriversList search={search} />
        </TabsContent>
      )}
      {canViewB2C && (
        <TabsContent value="b2c">
          <B2CList search={search} />
        </TabsContent>
      )}
    </PageWrapper>
  );
};

export default UserManagement;