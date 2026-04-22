import { DataTable } from "@/component/data-table"
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Pathname } from "@/utils/pathname";
import { getStationTableColumns } from "../config/station.table";
import { useStationList, useDeleteStation } from "../services/stations.hooks";
import { Modal } from "@/component/Modal";
import { toast } from "sonner";
import type { ChargingStationListProps } from "../types/ChargingStations.types";

function ChargingStationList({ search }: ChargingStationListProps) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const effectiveSearch = search.trim().length >= 2 ? search : undefined;
  const { data: listResponse, isLoading } = useStationList({ page, limit, search: effectiveSearch });
  const stations = listResponse?.data?.data || [];
  const totalItems = listResponse?.data?.total || 0;

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [stationToDelete, setStationToDelete] = useState<string | null>(null);
  const { mutateAsync: deleteStation } = useDeleteStation();

  const handleEdit = (id: string) => {
    const station = stations.find((s) => s.id === id);
    navigate(`${Pathname.ASSET_MANAGEMENT}/charging-stations/${id}/edit`, { state: { station } });
  };

  const handleDeleteClick = (id: string) => {
    setStationToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!stationToDelete) return;
    try {
      await deleteStation({ id: stationToDelete });
      toast.success("Success", { description: "Station deleted successfully" });
      setDeleteModalOpen(false);
      setStationToDelete(null);
    } catch (error) {
      toast.error("Error", { description: "Failed to delete station" });
    }
  };

  const columns = useMemo(
    () => getStationTableColumns({ onEdit: handleEdit, onDelete: handleDeleteClick }),
    []
  );

  return (
    <>
      <DataTable
        columns={columns}
        data={stations}
        search={search}
        isLoading={isLoading}
        isLink
        link={(row) => "charging-stations/" + row.id}
        pagination={{
          pageIndex: page - 1,
          pageSize: limit,
        }}
        isServerSide={true}
        totalItems={totalItems}
        pageCount={Math.ceil(totalItems / limit) || 1}
        onPaginationChange={(updater) => {
          const next = typeof updater === "function" ? updater({ pageIndex: page - 1, pageSize: limit }) : updater;
          setPage(next.pageIndex + 1);
          setLimit(next.pageSize);
        }}
      />
      <Modal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={handleConfirmDelete}
        description="Are you sure you want to delete this Charging Station?"
      />
    </>
  );
}

export default ChargingStationList;
