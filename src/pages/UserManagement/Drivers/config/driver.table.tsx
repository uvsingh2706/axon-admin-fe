import type { ExtendedColumnDef } from "@/component/data-table";
import type { DriverData } from "../types/driver.type";
import { Avatar, AvatarFallback, AvatarImage } from "@/component/ui/avatar";

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const a = parts[0]?.[0] ?? "";
  const b = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
  return (a + b).toUpperCase();
}

export const driverTableColumns: ExtendedColumnDef<DriverData, unknown>[] = [
  {
    accessorKey: "name",
    header: "Name",
    enableSorting: true,
    cell: ({ row }) => {
      const d = row.original;
      return (
        <div className="flex items-center gap-3 min-w-[180px]">
          <Avatar size="sm" className="bg-secondary-00">
            {d.avatarUrl ? <AvatarImage src={d.avatarUrl} alt={d.name} /> : null}
            <AvatarFallback>{initials(d.name)}</AvatarFallback>
          </Avatar>
          <span className="font-medium text-text-950">{d.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "organisationName",
    header: "Organisation Name",
    enableSorting: true,
    cell: ({ row }) => (
      <div className="flex items-center gap-3 min-w-[220px]">
        <img
          src={row.original.organisationLogo}
          alt="logo"
          className="w-6 h-6 rounded object-contain bg-white"
        />
        <span className="text-text-950">{row.original.organisationName}</span>
      </div>
    ),
  },
  { accessorKey: "pocPhone", header: "POC Phone No." },
  { accessorKey: "assignedVehicle", header: "Assigned Vehicle" },
  { accessorKey: "driverPhone", header: "Driver Phone No." },
  { accessorKey: "email", header: "Email" },
];
