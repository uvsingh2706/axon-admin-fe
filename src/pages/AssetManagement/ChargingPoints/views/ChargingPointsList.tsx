import { DataTable } from "@/component/data-table"
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Pathname } from "@/utils/pathname";
import { getChargingPointColumns } from "../config/point.table";
import { useChargingPointList, useDeleteChargingPoint } from "../services/chargingpoints.hooks";
import { Modal } from "@/component/Modal";
import { toast } from "sonner";
import type { ChargingPointListProps } from "../types/ChargingPoints.types";

function ChargingPointList({ search }: ChargingPointListProps) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data: listResponse, isLoading } = useChargingPointList({ page, limit });
  const points = listResponse?.data?.data || [];
  const totalItems = listResponse?.data?.total || 0;

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [pointToDelete, setPointToDelete] = useState<string | null>(null);
  const { mutateAsync: deletePoint, isPending: isDeleting } = useDeleteChargingPoint();

  const handleEdit = (id: string) => {
    navigate(`${Pathname.ASSET_MANAGEMENT}/charging-points/${id}/edit`);
  };

  const handleDeleteClick = (id: string) => {
    setPointToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!pointToDelete || isDeleting) return;
    try {
      await deletePoint({ id: pointToDelete });
      toast.success("Success", { description: "Charging point deleted successfully" });
      setDeleteModalOpen(false);
      setPointToDelete(null);
    } catch (error) {
      toast.error("Error", { description: "Failed to delete charging point" });
    }
  };

  const columns = useMemo(
    () => getChargingPointColumns({ onEdit: handleEdit, onDelete: handleDeleteClick }),
    []
  );

  return (
    <>
      <DataTable
        columns={columns}
        data={points}
        search={search}
        isLoading={isLoading}
        isLink={true}
        link={(row: any) => `${Pathname.ASSET_MANAGEMENT}/charging-points/${row.id}`}
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
        description="Are you sure you want to delete this Charging Point?"
      />
    </>
  );
}

export default ChargingPointList;
