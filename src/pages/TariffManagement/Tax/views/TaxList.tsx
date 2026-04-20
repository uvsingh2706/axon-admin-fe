import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "@/component/data-table";
import { getTaxTableColumns } from "../config/tax.table";
import { useTaxList, useDeleteTax } from "../services/tax.hooks";
import { Modal } from "@/component/Modal";
import { Pathname } from "@/utils/pathname";
import { toast } from "sonner";

export default function TaxList({ search }: { search: string }) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: taxList, isLoading } = useTaxList({ page, limit, search });
  const { mutateAsync: deleteTax } = useDeleteTax();

  const handleEdit = (id: string) => {
    navigate(`${Pathname.TARIFF_MANAGEMENT}/tax/${id}/edit`);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteId) {
      try {
        await deleteTax({ id: deleteId });
        toast.success("Tax Deleted", { description: "The tax has been removed." });
        setIsModalOpen(false);
        setDeleteId(null);
      } catch (error) {
        toast.error("Deletion Failed", { description: "An error occurred while deleting the tax." });
        console.log("Failed to delete tax", error);
      }
    }
  };

  const TaxTableColumns = useMemo(
    () => getTaxTableColumns({ onEdit: handleEdit, onDelete: handleDeleteClick }),
    []
  );

  return (
    <>
      <DataTable
        columns={TaxTableColumns}
        data={taxList?.data?.data ?? []}
        search={search}
        isLink
        link={(row) => "tax/" + row.id}
        isLoading={isLoading}
        pagination={{
          pageIndex: page - 1,
          pageSize: limit,
        }}
      isServerSide={true}
      totalItems={taxList?.data?.meta?.total || 0}
        pageCount={taxList?.data?.meta?.totalPages || 1}
        onPaginationChange={(updater) => {
          const next = typeof updater === "function" ? updater({ pageIndex: page - 1, pageSize: limit }) : updater;
          setPage(next.pageIndex + 1);
          setLimit(next.pageSize);
        }}
      />
      <Modal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        description="Are you sure you want to delete this tax?"
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
