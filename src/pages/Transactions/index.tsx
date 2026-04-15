import PageWrapper from "@/component/PageWrapper";
import TransactionList from "./views/TransactionList";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@/assets/icons/AddIcon";

const Transactions = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  return (
    <PageWrapper
      title=""
      isTable={true}
      searchPlaceholder="Search Transaction"
      searchValue={search}
      onSearchChange={setSearch}
      actionIcon={<AddIcon />}
      onActionClick={() => navigate("create")}
      onFilterClick={() => console.log("filter clicked")}
      actionLabel="Add Transaction"
    >
      <TransactionList />
    </PageWrapper>
  );
};

export default Transactions;