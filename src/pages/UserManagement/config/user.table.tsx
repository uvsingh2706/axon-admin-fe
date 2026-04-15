import type { ExtendedColumnDef } from "@/component/data-table";
import type { UserData } from "../types/user.type";

export const userColumns: ExtendedColumnDef<UserData, unknown>[] = [
  {
    accessorKey: "name",
    header: "Name",
    enableSorting: true,
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "contact",
    header: "Contact",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <span className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-medium">
        {row.original.role}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.original.status === 'Active';
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {row.original.status}
        </span>
      );
    },
  },
  {
    accessorKey: "lastLogin",
    header: "Last Login",
    cell: ({ row }) => {
      return <span>{new Date(row.original.lastLogin).toLocaleDateString()}</span>;
    }
  },
];
