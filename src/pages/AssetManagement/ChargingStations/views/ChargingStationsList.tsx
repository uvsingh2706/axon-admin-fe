import { DataTable, type ExtendedColumnDef } from "@/component/data-table"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pathname } from "@/utils/pathname";
import { type ChargingStationData } from "../types/ChargingStations.types";

const dummyData: ChargingStationData[] = [
  { id: "CS-001", stationName: "My Home Tarkshya", address: "Sector 15, New Delhi, Delhi - 110015, Petrol...", supportPerson: "Rahul Rathore", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
  { id: "CS-002", stationName: "Station 2", address: "Sector 15, New Delhi, Delhi - 110015, Petrol...", supportPerson: "Ravi Singh", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
  { id: "CS-003", stationName: "Station 2", address: "Sector 15, New Delhi, Delhi - 110015, Petrol...", supportPerson: "Maneshwar", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
  { id: "CS-004", stationName: "My Home Tarkshya", address: "Sector 15, New Delhi, Delhi - 110015, Petrol...", supportPerson: "Maneshwar", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
  { id: "CS-005", stationName: "Station 2", address: "Sector 15, New Delhi, Delhi - 110015, Petrol...", supportPerson: "Rahul Rathore", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "operation" },
  { id: "CS-006", stationName: "My Home Tarkshya", address: "Sector 15, New Delhi, Delhi - 110015, Petrol...", supportPerson: "Maneshwar", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
  { id: "CS-007", stationName: "Station 2", address: "Sector 15, New Delhi, Delhi - 110015, Petrol...", supportPerson: "Rahul Rathore", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
  { id: "CS-008", stationName: "My Home Tarkshya", address: "Sector 15, New Delhi, Delhi - 110015, Petrol...", supportPerson: "Rahul Rathore", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
  { id: "CS-009", stationName: "My Home Tarkshya", address: "Sector 15, New Delhi, Delhi - 110015, Petrol...", supportPerson: "Rahul Rathore", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
  { id: "CS-010", stationName: "Station 2", address: "Sector 15, New Delhi, Delhi - 110015, Petrol...", supportPerson: "Ravi Singh", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
  { id: "CS-011", stationName: "Station 2", address: "Sector 15, New Delhi, Delhi - 110015, Petrol...", supportPerson: "Maneshwar", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
];

function ChargingStationList() {
  const [search] = useState("");
  const navigate = useNavigate();

  const columns: ExtendedColumnDef<ChargingStationData, unknown>[] = [
    {
      accessorKey: "stationName",
      header: "Station Name",
      enableSorting: true,
      cell: ({ row }) => (
        <span
          onClick={() => navigate(`${Pathname.ASSET_MANAGEMENT}/charging-stations/${row.original.id}`)}
          className="font-sans font-semibold text-[14px] leading-none text-secondary-600 underline cursor-pointer hover:text-opacity-80"
        >
          {row.original.stationName}
        </span>
      ),
    },
    {
      accessorKey: "address",
      header: "Address",
      enableSorting: true,
    },
    {
      accessorKey: "supportPerson",
      header: "Support Person",
      enableSorting: true,
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
      enableSorting: true,
    },
    {
      accessorKey: "updatedBy",
      header: "Updated By",
      enableSorting: true,
    },
  ];

  return <DataTable columns={columns} data={dummyData} search={search} />;
}

export default ChargingStationList;
