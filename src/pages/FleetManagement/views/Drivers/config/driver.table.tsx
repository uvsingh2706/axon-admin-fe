import { Avatar, AvatarFallback } from "@/component/ui/avatar";
import type { DriverDTO } from "../services/driver.types";
import type { ExtendedColumnDef } from "@/component/data-table";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

export const driverTableColumns: ExtendedColumnDef<DriverDTO, unknown>[] = [
  {
    header: "Driver Name",
    enableSorting: true,
    cell: ({ row }) => {
      const name = `${row.original.customer?.firstName || ""} ${row.original.customer?.lastName || ""}`.trim() || "N/A";
      return (
        <div className="flex items-center gap-3">
          <Avatar className="size-8">
            <AvatarFallback>{initials(name)}</AvatarFallback>
          </Avatar>
          <span className="font-semibold text-sm text-secondary-600 underline cursor-pointer hover:text-opacity-80">
            {name}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "customer.mobileNumber",
    header: "Contact",
    enableSorting: false,
    cell: ({ row }) => row.original.customer?.mobileNumber || "N/A",
  },
  { accessorKey: "id", header: "Driver ID", enableSorting: false },
  {
    accessorKey: "vehicle.make",
    header: "Assigned Vehicle",
    enableSorting: false,
    cell: ({ row }) => row.original.vehicle?.make || "-",
  },
  {
    accessorKey: "customer.email",
    header: "Email",
    enableSorting: false,
    cell: ({ row }) => row.original.customer?.email || "N/A",
  },
  {
    accessorKey: "customer.gender",
    header: "Gender",
    enableSorting: false,
    cell: ({ row }) => row.original.customer?.gender || "N/A",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    enableSorting: false,
    cell: ({ row }) => new Date(row.original.updatedAt).toLocaleDateString(),
  },
];

