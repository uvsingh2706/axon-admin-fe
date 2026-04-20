import { DataTable } from "@/component/data-table"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pathname } from "@/utils/pathname";
import { chargingPointColumns } from "../config/point.table";
import { mockChargingPoints } from "../mocks/point.mock";
import type { ChargingPointListProps } from "../types/ChargingPoints.types";

function ChargingPointList({ search }: ChargingPointListProps) {
  const navigate = useNavigate();

  const columns = chargingPointColumns.map((column) => {
    if ((column as any).accessorKey === "chargingPointName") {
      return {
        ...column,
        cell: ({ row }: any) => (
          <span
            className="font-sans font-semibold text-[14px] leading-none text-secondary-600 underline"
          >
            {row.original.chargingPointName}
          </span>
        ),
      };
    }
    if ((column as any).accessorKey === "station") {
      return {
        ...column,
        cell: ({ row }: any) => (
          <span className="font-sans font-medium text-[14px] leading-none">
            {row.original.station}
          </span>
        ),
      };
    }
    if ((column as any).accessorKey === "tariff") {
      return {
        ...column,
        cell: ({ row }: any) => (
          <span className="font-sans font-medium text-[14px] leading-none text-secondary-600 underline">
            {row.original.tariff}
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
            Available: "bg-green-100 text-green-700",
            Unavailable: "bg-gray-100 text-gray-700",
            Charging: "bg-blue-100 text-blue-700",
            Offline: "bg-red-100 text-red-700",
          };
          return (
            <span className={`text-[12px] px-2 py-1 rounded-[4px] font-medium ${styles[status]}`}>
              {status}
            </span>
          );
        },
      };
    }
    if ((column as any).accessorKey === "publishedStatus") {
      return {
        ...column,
        cell: ({ row }: any) => {
          const status = row.original.publishedStatus;
          const styles: Record<string, string> = {
            Yes: "bg-green-100 text-green-700",
            No: "bg-gray-100 text-gray-700",
          };
          return (
            <span className={`text-[12px] px-2 py-1 rounded-[4px] font-medium ${styles[status]}`}>
              {status}
            </span>
          );
        },
      };
    }
    return column;
  });

  return (
    <DataTable
      columns={columns}
      data={mockChargingPoints}
      search={search}
      isLink={true}
      link={(row: any) => `${Pathname.ASSET_MANAGEMENT}/charging-points/${row.id}`}
    />
  );
}

export default ChargingPointList;
