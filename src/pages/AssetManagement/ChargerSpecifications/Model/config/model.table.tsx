import type { ExtendedColumnDef } from "@/component/data-table";
import type { ModelMockData } from "../mocks/model.mock";
import EditIcon from "@/assets/icons/EditIcon";
import { useNavigate } from "react-router-dom";

const ModelCell = ({ row }: { row: any }) => {
  const navigate = useNavigate();

  console.log(row, 'row');
  return (
    <div 
      onClick={() => navigate(`charger-specifications/model/${row.original.id}`)} 
      className="font-medium text-[#4040A1] cursor-pointer hover:underline"
    >
      {row.original.model}
    </div>
  );
};

const ActionsCell = ({ row }: { row: any }) => {
  const navigate = useNavigate();
  return (
    <button 
      onClick={(e) => {
        e.stopPropagation();
        navigate(`charger-specifications/model/${row.original.id}/edit`, { state: { modelData: row.original } });
      }}
      className="p-2 text-primary-700 hover:bg-secondary-50 transition-colors rounded-lg cursor-pointer flex justify-center items-center w-full"
    >
      <EditIcon className="w-5 h-5 text-[#4040A1]" />
    </button>
  );
};

export const modelColumns: ExtendedColumnDef<ModelMockData>[] = [
  {
    accessorKey: "model",
    header: "Model",
    enableSorting: true,
    cell: ModelCell,
  },
  {
    accessorKey: "oemName",
    header: "OEM Name",
    cell: ({ row }) => {
      return <div className="text-text-950 font-medium">{row.original.oemName}</div>;
    },
  },
  {
    accessorKey: "noOfConnectors",
    header: "No. of Connectors",
    cell: ({ row }) => {
      return <div className="text-text-700">{row.original.noOfConnectors}</div>;
    },
  },
  {
    accessorKey: "outputMax",
    header: "Output Max (A)",
    cell: ({ row }) => {
      return <div className="text-text-700">{row.original.outputMax}</div>;
    },
  },
  {
    accessorKey: "chargingModelType",
    header: "Charging ModelType",
    enableSorting: true,
    cell: ({ row }) => {
      const type = row.original.chargingModelType;
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
    accessorKey: "currentType",
    header: "Current Type",
    enableSorting: true,
    cell: ({ row }) => {
      const type = row.original.currentType;
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
    accessorKey: "phaseType",
    header: "Phase Type",
    cell: ({ row }) => {
      return <div className="text-text-700">{row.original.phaseType}</div>;
    },
  },
  {
    accessorKey: "manualPdf",
    header: "Manual PDF",
    cell: ({ row }) => {
      const pdf = row.original.manualPdf;
      if (pdf === "-") return <div className="text-text-700 flex justify-center">-</div>;
      return (
        <span className="border border-secondary-200 px-3 py-1.5 rounded-lg text-text-700 text-xs font-medium inline-block truncate max-w-[120px]">
          {pdf}
        </span>
      );
    },
  },
  {
    accessorKey: "specPdf",
    header: "Spec. PDF",
    cell: ({ row }) => {
      const pdf = row.original.specPdf;
      if (pdf === "-") return <div className="text-text-700 flex justify-center">-</div>;
      return (
        <span className="border border-secondary-200 px-3 py-1.5 rounded-lg text-text-700 text-xs font-medium inline-block truncate max-w-[120px]">
          {pdf}
        </span>
      );
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
    accessorKey: "id", // Using ID for Actions
    header: "Actions",
    cell: ActionsCell,
  },
];
