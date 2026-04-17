import { DataTable } from "@/component/data-table"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pathname } from "@/utils/pathname";
import { chargingStationColumns } from "../config/station.table";
import { mockChargingStations } from "../mocks/station.mock";

function ChargingStationList() {
  const [search] = useState("");
  const navigate = useNavigate();

  const columns = chargingStationColumns.map((column) =>
    (column as any)?.accessorKey === "stationName"
      ? {
          ...column,
          cell: ({ row }: any) => (
            <span
              onClick={() => navigate(`${Pathname.ASSET_MANAGEMENT}/charging-stations/${row.original.id}`)}
              className="font-sans font-semibold text-[14px] leading-none text-secondary-600 underline cursor-pointer hover:text-opacity-80"
            >
              {row.original.stationName}
            </span>
          ),
        }
      : column
  );

  return <DataTable columns={columns} data={mockChargingStations} search={search} />;
}

export default ChargingStationList;
