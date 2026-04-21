import { useState } from "react";
import { DataTable } from "@/component/data-table";
import { getTariffTableColumns } from "../config/tariff.table";
import { useTariffList, useDeleteTariff } from "../services/tarrif.hooks";
import { Modal } from "@/component/Modal";
import { useNavigate } from "react-router-dom";
import { Pathname } from "@/utils/pathname";
import { useMemo } from "react";

export default function TariffList({ search }: { search: string }) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const deleteTariff = useDeleteTariff();

  const { data: tariffList, isLoading } = useTariffList({ page, limit, search });

  const handleEdit = (id: string) => {
    navigate(`${Pathname.TARIFF_MANAGEMENT}/tarrif/${id}/edit`);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      deleteTariff.mutate(deleteId, {
        onSuccess: () => {
          setIsModalOpen(false);
          setDeleteId(null);
        },
      });
    }
  };

  const TarrifTableColumns = useMemo(
    () => getTariffTableColumns({ onEdit: handleEdit, onDelete: handleDeleteClick }),
    []
  );

  return (
    <>
      <DataTable
        columns={TarrifTableColumns}
        data={tariffList?.data?.tariffs ?? []}
        search={search}
        isLink
        link={(row) => "tarrif/" + row.id}
        isLoading={isLoading}
        // Assuming your DataTable accepts pagination props.
        // Adjust these if DataTable uses a different pagination interface.
        pagination={{
          pageIndex: page - 1,
          pageSize: limit,
        }}
        isServerSide={true}
        totalItems={tariffList?.data?.count || 0}
        pageCount={tariffList?.data?.count ? Math.ceil(tariffList.data.count / limit) : 1}
        onPaginationChange={(updater) => {
          const next = typeof updater === "function" ? updater({ pageIndex: page - 1, pageSize: limit }) : updater;
          setPage(next.pageIndex + 1);
          setLimit(next.pageSize);
        }}
      />
      <Modal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        description="Are you sure you want to delete this tariff?"
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
