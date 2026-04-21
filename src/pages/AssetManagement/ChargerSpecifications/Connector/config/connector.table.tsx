import type { ExtendedColumnDef } from "@/component/data-table";
import type { ConnectorDTO } from "../services/connector.type";
import EditIcon from "@/assets/icons/EditIcon";
import { useNavigate } from "react-router-dom";
import { Pathname } from "@/utils/pathname";

const ActionsCell = ({ row }: { row: any }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        const connector = row.original;
        const stateData = {
          id: connector.id,
          connectorName: connector.name,
          ioType: connector.ioType,
          connectorStandard: connector.standard,
          connectorOutput: connector.outputKw,
        };
        navigate(`${Pathname.ASSET_MANAGEMENT}/charger-specifications/connector/${connector.id}/edit`, { 
          state: { connectorData: stateData } 
        });
      }}
      className="p-2 text-primary-700 hover:bg-secondary-50 transition-colors rounded-lg cursor-pointer flex justify-center items-center w-full"
    >
      <EditIcon className="w-5 h-5 text-[#4040A1]" />
    </button>
  );
};

export const connectorColumns: ExtendedColumnDef<ConnectorDTO>[] = [
  {
    accessorKey: "name",
    header: "Connector Name",
    enableSorting: true,
    cell: ({ row }) => {
      return <div className="text-text-950 font-medium">{row.original.name || "NA"}</div>;
    },
  },
  {
    accessorKey: "model",
    header: "Model",
    cell: () => {
      // Model is not returned in the current API response
      return <div className="text-text-700">NA</div>;
    },
  },
  {
    accessorKey: "ioType",
    header: "I/O Type",
    enableSorting: true,
    cell: ({ row }) => {
      const type = row.original.ioType;
      if (!type) return <div className="text-text-700">NA</div>;
      if (type.toLowerCase() === "ac") {
        return (
          <span className="bg-pink-50 text-[#AD336D] px-3 py-1 rounded-md text-xs font-semibold">
            {type.toUpperCase()}
          </span>
        );
      }
      return (
        <span className="bg-[#FCF5E3] text-[#F3A218] px-3 py-1 rounded-md text-xs font-semibold">
          {type.toUpperCase()}
        </span>
      );
    },
  },
  {
    accessorKey: "standard",
    header: "Connector Standard",
    cell: ({ row }) => {
      return <div className="text-text-700">{row.original.standard || "NA"}</div>;
    },
  },
  {
    accessorKey: "outputKw",
    header: "Connector Output (kW)",
    cell: ({ row }) => {
      return <div className="text-text-700">{row.original.outputKw || "NA"}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    enableSorting: true,
    cell: ({ row }) => {
      const updatedAt = row.original.updatedAt;
      if (!updatedAt) return <div className="text-text-700">NA</div>;
      return <div className="text-text-700">{new Date(updatedAt).toLocaleString()}</div>;
    },
  },
  {
    accessorKey: "updatedBy",
    header: "Updated By",
    enableSorting: true,
    cell: () => {
      // updatedBy is not returned in the current API response
      return <div className="text-text-700"></div>;
    },
  },
  {
    accessorKey: "id",
    header: "Actions",
    cell: ActionsCell,
  },
];
