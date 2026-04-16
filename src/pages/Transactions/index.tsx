import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import PageWrapper from "@/component/PageWrapper";
import TransactionList from "./views/TransactionList";
import TransactionDetails from "./views/TransactionDetails";
import { cn } from "@/lib/utils";
import type { TransactionStatCard } from "./types/transaction.type";
import { statCardsData } from "./mocks/transaction.mock";

const Transactions = () => {
  return (
    <Routes>
      <Route path="/" element={<TransactionOverview />} />
      <Route path="/:id" element={<TransactionDetails />} />
    </Routes>
  );
};

const TransactionOverview = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col gap-8 bg-white p-6 rounded-lg">
      {/* Stats Section */}
      <div className="flex items-center justify-start gap-3">
        {statCardsData.map((data, index) => (
          <StatCard
            key={index}
            title={data.title}
            value={data.value}
            icon={data.icon}
            bgColor={data.bgColor}
          />
        ))}
      </div>

      {/* Table Toolbar & Content */}
      <PageWrapper
        title=""
        isTable={true}
        searchPlaceholder="Search by User Name, Invoice Id"
        searchClassName="w-[17.5rem] h-[2.5rem] rounded-[0.5rem] border opacity-100 rotate-0"
        searchValue={search}
        onSearchChange={setSearch}
        onFilterClick={() => console.log("filter clicked")}
        className="bg-transparent border-0 p-0 shadow-none"
      >
        <TransactionList />
      </PageWrapper>
    </div>
  );
};

function StatCard({ title, value, icon: Icon, bgColor }: TransactionStatCard) {
  return (
    <div
      className={cn(
        "bg-white border border-text-100/50 shadow-sm flex items-center justify-between opacity-100 rotate-0",
        "w-69 h-26 p-5 rounded-lg"
      )}
    >
      <div className="flex flex-col gap-1">
        <span className="subtitle-3-regular text-text-500">{title}</span>
        <span className="heading-2-semibold text-text-950 leading-tight">{value}</span>
      </div>
      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0", bgColor)}>
        <Icon className="w-5 h-5 text-orange-c1" />
      </div>
    </div>
  );
}

export default Transactions;
