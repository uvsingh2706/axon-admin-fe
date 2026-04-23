import type { ExtendedColumnDef } from "@/component/data-table";
import type { DriverListItemDTO } from "../services/drivers.types";
import type { ChargingHistoryRow } from "@/pages/FleetManagement/views/Drivers/types/driver.type";
import { Avatar, AvatarFallback, AvatarImage } from "@/component/ui/avatar";
// import { ImagePlaceholderIcon } from "@/assets/icons";
import { DownloadIcon } from "@/assets/icons";

function initials(name: string | null) {
  if (!name) return "NA";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const a = parts[0]?.[0] ?? "";
  const b = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
  return (a + b).toUpperCase() || "NA";
}

export const driverTableColumns: ExtendedColumnDef<DriverListItemDTO, unknown>[] = [
  {
    accessorKey: "name",
    header: "Name",
    enableSorting: true,
    cell: ({ row }) => {
      const d = row.original;
      const fullName = `${d.customer.firstName || ""} ${d.customer.lastName || ""}`.trim() || "Unknown";
      return (
        <div className="flex items-center gap-3 min-w-[180px]">
          <Avatar size="sm" className="bg-secondary-00 border">
            {d.customer.profilePicture ? <AvatarImage src={d.customer.profilePicture} alt={fullName} /> : null}
            <AvatarFallback>{initials(fullName)}</AvatarFallback>
          </Avatar>
          <span className="font-medium text-text-950">{fullName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "organisationName",
    header: "Organisation Name",
    enableSorting: true,
    cell: ({ row }) => {
      const d = row.original;
      const fleetName = d.fleet.name || "Unknown";
      return (
        <div className="flex items-center gap-3 min-w-[220px]">
          <Avatar size="sm" className="w-6 h-6 rounded bg-secondary-00 border">
            {d.fleet.logo ? <AvatarImage src={d.fleet.logo} alt={fleetName} className="object-contain bg-white" /> : null}
            <AvatarFallback className="text-[10px] rounded">{initials(fleetName)}</AvatarFallback>
          </Avatar>

          {/* <ImagePlaceholderIcon className="w-6 h-6 rounded size-md">
            {d.fleet.logo ? <AvatarImage src={d.fleet.logo} alt={fleetName} className="object-contain bg-white" /> : null}
            <AvatarFallback className="text-[10px] rounded">{initials(fleetName)}</AvatarFallback>
          </ImagePlaceholderIcon> */}

          <span className="text-text-950">{fleetName}</span>
        </div>
      );
    }
  },
  {
    accessorKey: "pocPhone",
    header: "POC Phone No.",
    cell: ({ row }) => <span>{row.original.fleet.contact_number || "NA"}</span>
  },
  {
    accessorKey: "assignedVehicle",
    header: "Assigned Vehicle",
    cell: ({ row }) => <span>{row.original.vehicle?.model || "NA"}</span>
  },
  {
    accessorKey: "driverPhone",
    header: "Driver Phone No.",
    cell: ({ row }) => <span>{row.original.customer.mobileNumber || "NA"}</span>
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <span>{row.original.customer.email || "NA"}</span>
  },
  {
    accessorKey: "updatedBy",
    header: "Updated By",
    enableSorting: true,
    cell: ({ }) => <span>{"NA"}</span>
  },
];

export const driverTransactionsHistoryColumns: ExtendedColumnDef<ChargingHistoryRow, unknown>[] = [
  {
    accessorKey: "invoiceId",
    header: "InvoiceID",
    enableSorting: true,
    cell: ({ row }) => row.original.invoiceId || "-",
  },
  {
    accessorKey: "stationName",
    header: "Station Name",
    enableSorting: true,
  },
  {
    accessorKey: "chargingPointName",
    header: "Charging Point Name",
    enableSorting: true,
  },
  {
    accessorKey: "vehicleMake",
    header: "Vehicle Make",
    enableSorting: true,
  },
  {
    accessorKey: "dateTime",
    header: "Date & Time",
    enableSorting: true,
  },
  {
    accessorKey: "connectorId",
    header: "Connector ID",
  },
  {
    accessorKey: "ocppTxnId",
    header: "OCPP Txn ID",
  },
  {
    accessorKey: "energyConsumptionKwh",
    header: "Energy Consumption (kWh)",
  },
  {
    accessorKey: "durationHours",
    header: "Duration (hrs)",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "cpStop",
    header: "CP Stop",
  },
  {
    accessorKey: "closedBy",
    header:"Closed By",
    enableSorting: true,
  },
  {
    accessorKey: "status",
    header:"Status",
    enableSorting: true,
    cell: ({ row }) => {
      const status = row.original.status;
      const styles =
        status === "Success"
          ? "bg-green-c1 text-success"
          : status === "Failed"
            ? "bg-pink-c2 text-error"
            : "bg-gray-c2 text-gray-c3";
      if (!status) return <span>-</span>;
      return (
        <span className={`flex items-center justify-center subtitle-3-5-medium w-16 h-6 gap-2 rounded px-2 py-1 ${styles}`}>
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "id",
    header: "Action",
    cell: () => (
      <div className="flex items-center gap-3 text-secondary-500">
        <DownloadIcon className="w-4 h-4 cursor-pointer" />
      </div>
    ),
  },
];
