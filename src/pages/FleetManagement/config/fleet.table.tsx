import type { ExtendedColumnDef } from "@/component/data-table";
// import type { FleetData } from "../types/fleet.type";
import type { FleetDTO } from "../services/Fleet.types";
import CopyIcon from "@/assets/icons/CopyIcon";

const handleCopy = (text: string) => {
  navigator.clipboard.writeText(text);
};

export const fleetColumns: ExtendedColumnDef<FleetDTO, unknown>[] = [
  {
    accessorKey: "logo",
    header: "Logo",
    cell: ({ row }) =>
      row.original.logo ? (
        <img
          src={row?.original?.logo}
          alt="logo"
          className="w-10 h-10 rounded-md object-contain"
        />
      ) : (
        "NA"
      ),
  },
  {
    accessorKey: "name",
    header: "Organisation Name",
    enableSorting: true,
    cell: ({ row }) => <span>{row?.original?.name || "NA"}</span>,
  },
  {
    accessorKey: "vehicle_type",
    header: "Vehicle Type",
    cell: ({ row }) => <span>{row?.original?.vehicle_type || "NA"}</span>,
  },
  {
    accessorKey: "flatRate",
    header: "Flat Rate",
    cell: ({ row }) => <span>{row?.original?.flatRate || "NA"}</span>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <span>{row?.original.email || "NA"}</span>,
  },
  {
    accessorKey: "contact_number",
    header: "Contact",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {row.original.contact_number ? (
          <>
            <span
              className="cursor-pointer flex items-center"
              onClick={(e) => {
                e.stopPropagation();
                handleCopy(row.original.contact_number);
              }}
            >
              <CopyIcon className="w-4 h-4" />
            </span>
            <span>{row?.original?.contact_number}</span>
          </>
        ) : (
          "NA"
        )}
      </div>
    ),
  },
  {
    accessorKey: "totalDrivers",
    header: "Total Drivers",
    cell: ({ row }) => <span>{row?.original.totalDrivers || "NA"}</span>,
  },
  {
    accessorKey: "totalVehicles",
    header: "Total Vehicles",
    cell: ({ row }) => <span>{row?.original.totalVehicles || "NA"}</span>,
  },
];
