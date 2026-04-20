import type { ExtendedColumnDef } from "@/component/data-table";
import type { ConnectorMockData } from "../mocks/connector.mock";
import EditIcon from "@/assets/icons/EditIcon";
import { useNavigate } from "react-router-dom";

const ActionsCell = ({ row }: { row: any }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        navigate(`charger-specifications/connector/${row.original.id}/edit`, { state: { connectorData: row.original } });
      }}
      className="p-2 text-primary-700 hover:bg-secondary-50 transition-colors rounded-lg cursor-pointer flex justify-center items-center w-full"
    >
      <EditIcon className="w-5 h-5 text-[#4040A1]" />
    </button>
  );
};

export const connectorColumns: ExtendedColumnDef<ConnectorMockData>[] = [
  {
    accessorKey: "connectorName",
    header: "Connector Name",
    enableSorting: true,
    cell: ({ row }) => {
      return <div className="text-text-950 font-medium">{row.original.connectorName}</div>;
    },
  },
  {
    accessorKey: "model",
    header: "Model",
    cell: ({ row }) => {
      return <div className="text-text-700">{row.original.model}</div>;
    },
  },
  {
    accessorKey: "ioType",
    header: "I/O Type",
    enableSorting: true,
    cell: ({ row }) => {
      const type = row.original.ioType;
      if (type === "AC") {
        return (
          <span className="bg-pink-50 text-[#AD336D] px-3 py-1 rounded-md text-xs font-semibold">
            {type}
          </span>
        );
      }
      return (
        <span className="bg-[#FCF5E3] text-[#F3A218] px-3 py-1 rounded-md text-xs font-semibold">
          {type}
        </span>
      );
    },
  },
  {
    accessorKey: "connectorStandard",
    header: "Connector Standard",
    cell: ({ row }) => {
      return <div className="text-text-700">{row.original.connectorStandard}</div>;
    },
  },
  {
    accessorKey: "connectorOutput",
    header: "Connector Output (A)",
    cell: ({ row }) => {
      return <div className="text-text-700">{row.original.connectorOutput}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    enableSorting: true,
    cell: ({ row }) => {
      return <div className="text-text-700">{row.original.updatedAt}</div>;
    },
  },
  {
    accessorKey: "updatedBy",
    header: "Updated By",
    enableSorting: true,
    cell: ({ row }) => {
      return <div className="text-text-700">{row.original.updatedBy}</div>;
    },
  },
  {
    accessorKey: "id",
    header: "Actions",
    cell: ActionsCell,
  },
];
