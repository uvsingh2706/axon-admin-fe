import { DataTable } from "@/component/data-table";
import { useNavigate } from "react-router-dom";
import { fleetColumns } from "../config/fleet.table";
import { Pathname } from "@/utils/pathname";
import type { FleetData, FleetManagementListProps } from "../types/fleet.type";
import type { ExtendedColumnDef } from "@/component/data-table";
import { useFleetList } from "../services/Fleet.hooks";
import { useMemo, useState } from "react";
import type { FleetDTO } from "../services/Fleet.types";
import EditIcon from "@/assets/icons/EditIcon";

export default function FleetManagementList({ search }: FleetManagementListProps) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data: fleetList, isLoading } = useFleetList({ page, limit, search });

  const columns: ExtendedColumnDef<FleetDTO, unknown>[] = useMemo(() => {
    return fleetColumns.map((column) => {
      if ("accessorKey" in column && column.accessorKey === "name") {
        return {
          ...column,
          cell: ({ row }) =>
            row.original.name ? (
              <span
                onClick={() => navigate(`${Pathname.FLEET_MANAGEMENT}/${row.original.id}`)}
                className="font-sans font-semibold text-[14px] leading-none text-secondary-600 underline cursor-pointer hover:text-opacity-80"
              >
                {row.original.name}
              </span>
            ) : (
              "null"
            ),
        };
      }

      if ("accessorKey" in column && column.accessorKey === "actions") {
        return {
          ...column,
          cell: ({ row }) => (
            <div className="flex items-center gap-2">
              <button
                className="p-1.5 rounded-md hover:bg-secondary-50 transition-colors cursor-pointer group"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`${Pathname.FLEET_MANAGEMENT}/${row.original.id}/edit`);
                }}
              >
                <EditIcon className="w-5 h-5 text-text-400 group-hover:text-text-700" />
              </button>
            </div>
          ),
        };
      }

      return column;
    });
  }, [navigate]);

  return (
    <DataTable
      columns={columns}
      data={fleetList?.data ?? []}
      search={search}
      isLoading={isLoading}
      isServerSide={true}
      totalItems={fleetList?.meta?.total ?? 0}
      pagination={{
        pageIndex: page - 1,
        pageSize: limit,
      }}
      pageCount={
        fleetList?.meta?.total ? Math.ceil(fleetList.meta.total / limit) : 1
      }
      onPaginationChange={(updater) => {
        const next =
          typeof updater === "function"
            ? updater({ pageIndex: page - 1, pageSize: limit })
            : updater;
        setPage(next.pageIndex + 1);
        setLimit(next.pageSize);
      }}
    />

  );
}
