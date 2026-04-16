import PageWrapper from "@/component/PageWrapper";
import { useState } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import AddIcon from "@/assets/icons/AddIcon";
import { TabsContent } from "@/component/ui/tabs";
import { USER_MANAGEMENT_TABS } from "./constant";
import { userManagementRoutes } from "./Routes";
import { DriversList } from "./Drivers";
import { B2CList } from "./B2C";

const UserManagement = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("drivers");

  const navigate = useNavigate();
  const element = useRoutes(userManagementRoutes);

  const handleActionClick = () => {
    if (activeTab === "drivers") {
      navigate("drivers/create");
    } else {
      navigate("b2c/create");
    }
  };

  if (element) {
    return element;
  }

  return (
    <PageWrapper
      title=""
      tabs={USER_MANAGEMENT_TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      isTable={true}
      searchPlaceholder={activeTab === "drivers" ? "Search drivers" : "Search user"}
      searchValue={search}
      onSearchChange={setSearch}
      actionIcon={<AddIcon />}
      onActionClick={handleActionClick}
      onFilterClick={() => console.log("filter clicked")}
      actionLabel={activeTab === "drivers" ? "Create Driver" : ""}
    >
      <TabsContent value="drivers">
        <DriversList search={search} />
      </TabsContent>
      <TabsContent value="b2c">
        <B2CList search={search} />
      </TabsContent>
    </PageWrapper>
  );
};

export default UserManagement;