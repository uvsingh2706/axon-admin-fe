import type { ExtendedColumnDef } from "@/component/data-table";
import type { FleetData } from "../types/fleet.type";
import CopyIcon from "@/assets/icons/CopyIcon";

const handleCopy = (text: string) => {
  navigator.clipboard.writeText(text);
};

export const fleetColumns: ExtendedColumnDef<FleetData, unknown>[] = [
  {
    accessorKey: "logo",
    header: "Logo",
    cell: ({ row }) => (
      <img
        src={row.original.logo}
        alt="logo"
        className="w-10 h-10 rounded-md object-contain"
      />
    ),
  },
  {
    accessorKey: "organisationName",
    header: "Organisation Name",
    enableSorting: true,
  },
  {
    accessorKey: "vehicleType",
    header: "Vehicle Type",
  },
  {
    accessorKey: "flatRate",
    header: "Flat Rate",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "contact",
    header: "Contact",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span
          className="cursor-pointer flex items-center"
          onClick={(e) => {
            e.stopPropagation();
            handleCopy(row.original.contact);
          }}
        >
          <CopyIcon className="w-4 h-4" />
        </span>
        <span>{row.original.contact}</span>
      </div>
    ),
  },
  {
    accessorKey: "totalDrivers",
    header: "Total Drivers",
  },
  {
    accessorKey: "totalVehicles",
    header: "Total Vehicles",
  },
];
