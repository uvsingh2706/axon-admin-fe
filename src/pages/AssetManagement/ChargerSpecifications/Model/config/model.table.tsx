import type { ExtendedColumnDef } from "@/component/data-table";
import type { ModelDTO } from "../services/model.types";
import EditIcon from "@/assets/icons/EditIcon";
import { useNavigate } from "react-router-dom";
import { Pathname } from "@/utils/pathname";

const ModelCell = ({ row }: { row: any }) => {
  const navigate = useNavigate();
  return (
    <div 
      onClick={() => navigate(`${Pathname.ASSET_MANAGEMENT}/charger-specifications/model/${row.original.id}`)} 
      className="font-medium text-[#4040A1] cursor-pointer hover:underline"
    >
      {row.original.chargerModelName || "NA"}
    </div>
  );
};

const ActionsCell = ({ row }: { row: any }) => {
  const navigate = useNavigate();
  return (
    <button 
      onClick={(e) => {
        e.stopPropagation();
        navigate(`${Pathname.ASSET_MANAGEMENT}/charger-specifications/model/${row.original.id}/edit`, { state: { modelData: row.original } });
      }}
      className="p-2 text-primary-700 hover:bg-secondary-50 transition-colors rounded-lg cursor-pointer flex justify-center items-center w-full"
    >
      <EditIcon className="w-5 h-5 text-[#4040A1]" />
    </button>
  );
};

export const modelColumns: ExtendedColumnDef<ModelDTO>[] = [
  {
    accessorKey: "chargerModelName",
    header: "Model",
    enableSorting: true,
    cell: ModelCell,
  },
  {
    accessorKey: "oemName",
    header: "OEM Name",
    cell: ({ row }) => {
      return <div className="text-text-950 font-medium">{row.original.oem?.oemName || "NA"}</div>;
    },
  },
  {
    accessorKey: "noOfConnectors",
    header: "No. of Connectors",
    cell: ({ row }) => {
      return <div className="text-text-700">{row.original.connectorMetaModels?.length || 0}</div>;
    },
  },
  {
    accessorKey: "outputMax",
    header: "Output Max (A)",
    cell: ({ row }) => {
      return <div className="text-text-700">{row.original.outputMax || "NA"}</div>;
    },
  },
  {
    accessorKey: "chargerModelType",
    header: "Charging ModelType",
    enableSorting: true,
    cell: ({ row }) => {
      const type = row.original.chargerModelType;
      if (!type) return <div className="text-text-700">NA</div>;
      if (type.toUpperCase() === "AC") {
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
    accessorKey: "currentType",
    header: "Current Type",
    enableSorting: true,
    cell: ({ row }) => {
      const type = row.original.currentType;
      if (!type) return <div className="text-text-700">NA</div>;
      if (type.toUpperCase() === "AC") {
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
    accessorKey: "phase",
    header: "Phase Type",
    cell: ({ row }) => {
      return <div className="text-text-700">{row.original.phase || "NA"}</div>;
    },
  },
  {
    accessorKey: "manualPdf",
    header: "Manual PDF",
    cell: () => {
      return <div className="text-text-700 flex justify-center">-</div>;
    },
  },
  {
    accessorKey: "specPdf",
    header: "Spec. PDF",
    cell: () => {
      return <div className="text-text-700 flex justify-center">-</div>;
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
    cell: ({ row }) => {
      return <div className="text-text-700">{row?.original?.updatedByName || "NA"}</div>;
    },
  },
  {
    accessorKey: "id",
    header: "Actions",
    cell: ActionsCell,
  },
];
