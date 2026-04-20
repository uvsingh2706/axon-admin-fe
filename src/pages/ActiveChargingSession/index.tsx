


import { useState } from "react";
import PageWrapper from "@/component/PageWrapper";
import ActiveList from "./views/ActiveCharginSessionList";
import { Modal } from "@/component/Modal";


import type { TransactionData } from "./types/activeChargingSession.type";
import { useCan } from "@/rbac";
import { MODULE } from "@/rbac/modules";


const Active = () => {
  const [search, setSearch] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<TransactionData | null>(null);
  const canViewActiveSessions = useCan(MODULE.ACTIVE_SESSION, "view");
  const canTerminateSession = useCan(MODULE.ACTIVE_SESSION, "delete");

  const handleTerminate = (data: TransactionData) => {
    if (!canTerminateSession) return;
    setSelectedSession(data);
    setIsDeleteModalOpen(true);
  };

  const onDelete = () => {
    if (!canTerminateSession) return;
    console.log("Terminating session with ID:", selectedSession?.id);
    // Add actual termination logic here
  };

  if (!canViewActiveSessions) {
    return (
      <div className="p-8 text-center text-text-500 subtitle-2-medium">
        You do not have permission to view active sessions.
      </div>
    );
  }

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
        <ActiveList onTerminate={handleTerminate} search={search} />
      </PageWrapper>

      <Modal
        open={canTerminateSession ? isDeleteModalOpen : false}
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