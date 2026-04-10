import AddIcon from "@/assets/icons/AddIcon"
import { DataTable, type ExtendedColumnDef } from "@/component/data-table"
import PageWrapper from "@/component/PageWrapper"
import { useState } from "react"


type ChargingPointData = {
  id: string;
  station: string;
  connectorType: string;
  status: "Online" | "Charging" | "Offline" | "Maintenance";
  power: string;
  lastSession: string;
  energyDelivered: string;
};

const columns: ExtendedColumnDef<ChargingPointData, unknown>[] = [
  {
    accessorKey: "id",
    header: "Point ID",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="font-sans font-semibold text-[14px] leading-none text-secondary-600 underline cursor-pointer hover:text-opacity-80">
        {row.original.id}
      </span>
    ),
  },
  {
    accessorKey: "station",
    header: "Station",
    enableSorting: true,
    enableColumnFilter: true,
    cell: ({ row }) => (
      <span className="font-sans font-semibold text-[14px] leading-none text-secondary-600 underline cursor-pointer hover:text-opacity-80">
        {row.original.station}
      </span>
    ),
  },
  {
    accessorKey: "connectorType",
    header: "Connector",
    enableColumnFilter: true,
  },
  {
    accessorKey: "status",
    header: "Status",
    enableColumnFilter: true,
    cell: ({ row }) => {
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
  },
  {
    accessorKey: "power",
    header: "Max Power",
    enableSorting: true,
  },
  {
    accessorKey: "lastSession",
    header: "Last Session",
    enableSorting: true,
  },
  {
    accessorKey: "energyDelivered",
    header: "Energy Delivered",
    enableSorting: true,
  },
  {
    accessorKey: "energyDelivered",
    header: "Energy Delivered",
    enableSorting: true,
  },
  {
    accessorKey: "energyDelivered",
    header: "Energy Delivered",
    enableSorting: true,
  },
  {
    accessorKey: "energyDelivered",
    header: "Energy Delivered",
    enableSorting: true,
  },
  {
    accessorKey: "energyDelivered",
    header: "Energy Delivered",
    enableSorting: true,
  },
];

const dummyData: ChargingPointData[] = [
  { id: "CP-001", station: "Hub Alpha", connectorType: "CCS2", status: "Online", power: "150 kW", lastSession: "2026-04-03 09:15", energyDelivered: "42.5 kWh" },
  { id: "CP-002", station: "Hub Alpha", connectorType: "Type 2", status: "Charging", power: "22 kW", lastSession: "2026-04-03 10:30", energyDelivered: "18.2 kWh" },
  { id: "CP-003", station: "Hub Beta", connectorType: "CHAdeMO", status: "Offline", power: "50 kW", lastSession: "2026-04-02 14:00", energyDelivered: "0 kWh" },
  { id: "CP-004", station: "Hub Beta", connectorType: "CCS2", status: "Online", power: "150 kW", lastSession: "2026-04-03 08:45", energyDelivered: "67.3 kWh" },
  { id: "CP-005", station: "Hub Gamma", connectorType: "Type 2", status: "Online", power: "22 kW", lastSession: "2026-04-03 07:20", energyDelivered: "12.8 kWh" },
  { id: "CP-006", station: "Hub Gamma", connectorType: "CCS2", status: "Maintenance", power: "150 kW", lastSession: "2026-04-01 16:10", energyDelivered: "0 kWh" },
  { id: "CP-007", station: "Hub Alpha", connectorType: "CCS2", status: "Charging", power: "150 kW", lastSession: "2026-04-03 11:00", energyDelivered: "35.1 kWh" },
  { id: "CP-008", station: "Hub Delta", connectorType: "Type 2", status: "Online", power: "7.4 kW", lastSession: "2026-04-03 06:50", energyDelivered: "5.6 kWh" },
  { id: "CP-009", station: "Hub Delta", connectorType: "CHAdeMO", status: "Online", power: "50 kW", lastSession: "2026-04-03 09:30", energyDelivered: "28.9 kWh" },
  { id: "CP-010", station: "Hub Epsilon", connectorType: "CCS2", status: "Offline", power: "350 kW", lastSession: "2026-04-02 22:00", energyDelivered: "0 kWh" },
  { id: "CP-011", station: "Hub Epsilon", connectorType: "CCS2", status: "Charging", power: "350 kW", lastSession: "2026-04-03 10:45", energyDelivered: "92.4 kWh" },
  { id: "CP-012", station: "Hub Gamma", connectorType: "Type 2", status: "Online", power: "22 kW", lastSession: "2026-04-03 08:10", energyDelivered: "14.7 kWh" },
];


const FleetManagement = () => {
  const [search, setSearch] =  useState("");

  

  return (
    <PageWrapper
      searchPlaceholder="Search Charge Point"
      searchValue={search}
      onSearchChange={setSearch}
      onFilterClick={() => console.log("filter clicked")}
      actionLabel="Add Fleet"
      actionIcon={<AddIcon />}
      onActionClick={() => console.log("add clicked")}
    >
      <DataTable columns={columns} data={dummyData} search={search} />
    </PageWrapper>
  )
}

export default FleetManagement