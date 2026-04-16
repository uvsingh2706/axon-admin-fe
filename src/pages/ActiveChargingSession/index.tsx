


import { useState } from "react";
import PageWrapper from "@/component/PageWrapper";
import ActiveList from "./views/ActiveCharginSessionList";
import { Modal } from "@/component/Modal";


import type { TransactionData } from "./types/activeChargingSession.type";


const Active = () => {
  const [search, setSearch] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<TransactionData | null>(null);

  const handleTerminate = (data: TransactionData) => {
    setSelectedSession(data);
    setIsDeleteModalOpen(true);
  };

  const onDelete = () => {
    console.log("Terminating session with ID:", selectedSession?.id);
    // Add actual termination logic here
  };

  return (
    <div className="">
      {/* Table Toolbar & Content */}
      <PageWrapper
        title=""
        isTable={true}
        searchPlaceholder="Search by User, OCPP Txn ID, Charging Station"
        searchClassName=""
        searchValue={search}
        onSearchChange={setSearch}
        onFilterClick={() => console.log("filter clicked")}
        className=""
      >
        <ActiveList onTerminate={handleTerminate} />
      </PageWrapper>

      <Modal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        description={`Are you sure you want to terminate the session ${selectedSession?.ocppTxnId}?`}
        onConfirm={() => {
          setIsDeleteModalOpen(false);
          onDelete();
        }}
        confirmLabel="Terminate Session"
        cancelLabel="Cancel"
        confirmClassName="w-40 h-10 rounded-md py-2.5 px-4 gap-1"
        cancelClassName="w-24 h-10 rounded-md border border-text-100 py-2.5 px-4 gap-1"
      />
    </div>
  );
};

export default Active;