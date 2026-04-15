import AddIcon from "@/assets/icons/AddIcon";
import PageWrapper from "@/component/PageWrapper";
import { useState } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import { fleetRoutes } from "./Routes";
import FleetManagementList from "./views/FleetManagementList";

const FleetManagement = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const element = useRoutes(fleetRoutes);

  if (element) {
    return element;
  }
  
  return (
    <PageWrapper
      searchPlaceholder="Search Fleet"
      searchValue={search}
      onSearchChange={setSearch}
      onFilterClick={() => console.log("filter clicked")}
      actionLabel="Add Fleet"
      actionIcon={<AddIcon />}
      onActionClick={() => navigate("create")}
      isTable={true}
    >
      <FleetManagementList search={search} />
    </PageWrapper>
  );
};

export default FleetManagement;