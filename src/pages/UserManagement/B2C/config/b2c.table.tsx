import type { ExtendedColumnDef } from "@/component/data-table";
import type { B2CUserData } from "../types/b2c.type";
import { Avatar, AvatarFallback, AvatarImage } from "@/component/ui/avatar";

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const a = parts[0]?.[0] ?? "";
  const b = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
  return (a + b).toUpperCase();
}

export const b2cTableColumns: ExtendedColumnDef<B2CUserData, unknown>[] = [
  {
    accessorKey: "name",
    header: "Name",
    enableSorting: true,
    cell: ({ row }) => {
      const u = row.original;
      return (
        <div className="flex items-center gap-3 min-w-[180px]">
          <Avatar size="sm" className="bg-secondary-00">
            {u.avatarUrl ? <AvatarImage src={u.avatarUrl} alt={u.name} /> : null}
            <AvatarFallback>{initials(u.name)}</AvatarFallback>
          </Avatar>
          <span className="font-medium text-text-950">{u.name}</span>
        </div>
      );
    },
  },
  { accessorKey: "phoneNumber", header: "Phone Number" },
  { accessorKey: "email", header: "Email ID" },
  { accessorKey: "location", header: "Location" },
];
