import { DataTable } from "@/component/data-table"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pathname } from "@/utils/pathname";
import { chargingPointColumns } from "../config/point.table";
import { mockChargingPoints } from "../mocks/point.mock";

function ChargingPointList() {
  const [search] = useState("");
  const navigate = useNavigate();

  const columns = chargingPointColumns.map((column) => {
    if ((column as any).accessorKey === "id") {
      return {
        ...column,
        cell: ({ row }: any) => (
          <span
            onClick={() => navigate(`${Pathname.ASSET_MANAGEMENT}/charging-points/${row.original.id}`)}
            className="font-sans font-semibold text-[14px] leading-none text-secondary-600 underline cursor-pointer hover:text-opacity-80"
          >
            {row.original.id}
          </span>
        ),
      };
    }
    if ((column as any).accessorKey === "station") {
      return {
        ...column,
        cell: ({ row }: any) => (
          <span className="font-sans font-semibold text-[14px] leading-none text-secondary-600 underline cursor-pointer hover:text-opacity-80">
            {row.original.station}
          </span>
        ),
      };
    }
    if ((column as any).accessorKey === "status") {
      return {
        ...column,
        cell: ({ row }: any) => {
          const status = row.original.status;
          const styles: Record<string, string> = {
            Online: "bg-green-100 text-green-700",
            Charging: "bg-blue-100 text-blue-700",
            Offline: "bg-red-100 text-red-700",
            Maintenance: "bg-yellow-100 text-yellow-700",
          };
          return (
            <span className={`text-[14px] px-2 py-1 rounded-[4px] font-medium ${styles[status]}`}>
              {status}
            </span>
          );
        },
      };
    }
    return column;
  });

  return <DataTable columns={columns} data={mockChargingPoints} search={search} />;
}

export default ChargingPointList;
