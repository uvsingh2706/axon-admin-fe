import PageWrapper from "@/component/PageWrapper";
import UsersList from "./views/UsersList";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@/assets/icons/AddIcon";

const UserManagement = () => {

    const [search, setSearch] = useState("");
  const navigate = useNavigate();

  return (
    <PageWrapper
      title=""
      isTable={true}
      searchPlaceholder="Search User"
      searchValue={search}
      onSearchChange={setSearch}
      actionIcon={<AddIcon/>}
      onActionClick={() => navigate('create')}
       onFilterClick={() => console.log("filter clicked")}
      actionLabel="Add User"
    >
        <UsersList />
    </PageWrapper>
  );
};

export default UserManagement;