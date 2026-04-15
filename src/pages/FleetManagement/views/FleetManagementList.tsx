import { DataTable } from "@/component/data-table";
import { useNavigate } from "react-router-dom";
import { fleetColumns } from "../config/fleet.table";
import { mockFleets } from "../mocks/fleet.mock";
import { Pathname } from "@/utils/pathname";
import type { FleetData, FleetManagementListProps } from "../types/fleet.type";
import type { ExtendedColumnDef } from "@/component/data-table";

export default function FleetManagementList({ search }: FleetManagementListProps) {
  const navigate = useNavigate();

  const columns: ExtendedColumnDef<FleetData, unknown>[] = fleetColumns.map((column) => {
    if ("accessorKey" in column && column.accessorKey === "organisationName") {
      return {
        ...column,
        cell: ({ row }) => (
          <span
            onClick={() => navigate(`${Pathname.FLEET_MANAGEMENT}/${row.original.id}`)}
            className="font-sans font-semibold text-[14px] leading-none text-secondary-600 underline cursor-pointer hover:text-opacity-80"
          >
            {row.original.organisationName}
          </span>
        ),
      };
    }
    return column;
  });

  return (
    <DataTable
      columns={columns}
      data={mockFleets}
      search={search}
    />
  );
}
