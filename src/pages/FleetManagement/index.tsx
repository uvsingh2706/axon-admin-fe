import AddIcon from "@/assets/icons/AddIcon";
import PageWrapper from "@/component/PageWrapper";
import { useState } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import { fleetRoutes } from "./Routes";
import FleetManagementList from "./views/FleetManagementList";
import { useCan } from "@/rbac";
import { MODULE } from "@/rbac/modules";

const FleetManagement = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const element = useRoutes(fleetRoutes);
  const canCreate = useCan(MODULE.FLEET_MANAGEMENT, "create");

  if (element) {
    return element;
  }
  
  return (
    <PageWrapper
      searchPlaceholder="Search Fleet"
      searchValue={search}
      onSearchChange={setSearch}
      onFilterClick={() => console.log("filter clicked")}
      actionLabel={canCreate ? "Add Fleet" : undefined}
      actionIcon={canCreate ? <AddIcon /> : undefined}
      onActionClick={canCreate ? () => navigate("create") : undefined}
      isTable={true}
    >
      <FleetManagementList search={search} />
    </PageWrapper>
  );
};

export default FleetManagement;