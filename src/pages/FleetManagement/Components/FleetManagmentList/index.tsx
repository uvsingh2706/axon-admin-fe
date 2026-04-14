import AddIcon from "@/assets/icons/AddIcon";
import { DataTable, type ExtendedColumnDef } from "@/component/data-table";
import PageWrapper from "@/component/PageWrapper";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
];

export const dummyData: (ChargingPointData & { [key: string]: any })[] = [
  {
    id: "CP-001",
    station: "Hub Alpha",
    connectorType: "CCS2",
    status: "Online",
    power: "150 kW",
    lastSession: "2026-04-03 09:15",
    energyDelivered: "42.5 kWh",
    organisation: "Axon Fleet Services",
    email: "fleet-a@axon.com",
    contact: "+91 87219 37813",
    tariff: "Fleet Master - ₹12/kW",
    tax: "12%",
    location: "28.6139, 77.2090",
    revenue: "₹200",
    energy: "1.75",
    totalVehicles: "3,000",
    totalDrivers: "134"
  },
  {
    id: "CP-002",
    station: "Hub Alpha",
    connectorType: "Type 2",
    status: "Charging",
    power: "22 kW",
    lastSession: "2026-04-03 10:30",
    energyDelivered: "18.2 kWh",
    organisation: "Urban Logistics",
    email: "logistics@urban.com",
    contact: "+91 99887 76655",
    tariff: "Urban Daily - ₹10/kW",
    tax: "18%",
    location: "28.7041, 77.1025",
    revenue: "₹450",
    energy: "2.80",
    totalVehicles: "1,200",
    totalDrivers: "45"
  },
  {
    id: "CP-003",
    station: "Hub Beta",
    connectorType: "CHAdeMO",
    status: "Offline",
    power: "50 kW",
    lastSession: "2026-04-02 14:00",
    energyDelivered: "0 kWh",
    organisation: "Transit Hub Global",
    email: "ops@transithub.com",
    contact: "+91 11223 34455",
    tariff: "Global Partner - ₹11/kW",
    tax: "5%",
    location: "19.0760, 72.8777",
    revenue: "₹0",
    energy: "0.00",
    totalVehicles: "500",
    totalDrivers: "12"
  },
  { id: "CP-004", station: "Hub Beta", connectorType: "CCS2", status: "Online", power: "150 kW", lastSession: "2026-04-03 08:45", energyDelivered: "67.3 kWh", revenue: "₹1200", energy: "4.50", totalVehicles: "100", totalDrivers: "80" },
  { id: "CP-005", station: "Hub Gamma", connectorType: "Type 2", status: "Online", power: "22 kW", lastSession: "2026-04-03 07:20", energyDelivered: "12.8 kWh", revenue: "₹300", energy: "1.20", totalVehicles: "50", totalDrivers: "30" },
  { id: "CP-006", station: "Hub Gamma", connectorType: "CCS2", status: "Maintenance", power: "150 kW", lastSession: "2026-04-01 16:10", energyDelivered: "0 kWh", revenue: "₹0", energy: "0", totalVehicles: "0", totalDrivers: "0" },
];


function index() {
  const [search, setSearch] = useState("")
  const navigate = useNavigate();


  return (
    <PageWrapper
      searchPlaceholder="Search Charge Point"
      searchValue={search}
      onSearchChange={setSearch}
      onFilterClick={() => console.log("filter clicked")}
      actionLabel="Add Fleet"
      actionIcon={<AddIcon />}
      onActionClick={() => navigate("create")}
      isTable={true}
    >
      <DataTable columns={columns} data={dummyData} search={search} isLink={true} link={(row) => row.id} />
    </PageWrapper>

  )

}

export default index