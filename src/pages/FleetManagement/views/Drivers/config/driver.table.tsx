import type { ExtendedColumnDef } from "@/component/data-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/component/ui/avatar";
import type { DriverData } from "../types/driver.type";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

export const driverTableColumns: ExtendedColumnDef<DriverData, unknown>[] = [
  {
    accessorKey: "name",
    header: "Driver Name",
    enableSorting: true,
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="size-8">
          {row.original.avatarUrl ? (
            <AvatarImage src={row.original.avatarUrl} alt={row.original.name} />
          ) : null}
          <AvatarFallback>{initials(row.original.name)}</AvatarFallback>
        </Avatar>
        <span className="font-semibold text-sm text-secondary-600 underline cursor-pointer hover:text-opacity-80">
          {row.original.name}
        </span>
      </div>
    ),
  },
  { accessorKey: "contact", header: "Contact", enableSorting: false },
  { accessorKey: "driverId", header: "Driver ID", enableSorting: false },
  { accessorKey: "assignedVehicle", header: "Assigned Vehicle", enableSorting: false },
  { accessorKey: "email", header: "Email", enableSorting: false },
  { accessorKey: "gender", header: "Gender", enableSorting: false },
  { accessorKey: "updatedBy", header: "Updated By", enableSorting: false },
];

