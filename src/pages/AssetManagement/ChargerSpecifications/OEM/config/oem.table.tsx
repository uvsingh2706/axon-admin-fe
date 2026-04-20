import { useMemo } from "react";
import type { ExtendedColumnDef } from "@/component/data-table";
import type { OemMockData } from "../mocks/oem.mock";
import EditIcon from "@/assets/icons/EditIcon";

export const useOemColumns = (
  expandedIds: Set<string>,
  toggleExpand: (id: string) => void
): ExtendedColumnDef<OemMockData>[] => {
  return useMemo(
    () => [
      {
        accessorKey: "tariffName",
        header: "Tariff Name",
        enableSorting: true,
        cell: ({ row }) => {
          const data = row.original;
          const isExpanded = expandedIds.has(data.id);

          if (data.isParent) {
            return (
              <div 
                className="flex items-center gap-3 font-semibold text-text-950 cursor-pointer select-none"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpand(data.id);
                }}
              >
                <span className="text-secondary-600 font-bold block w-4 text-center transition-transform">
                  {isExpanded ? (
                    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 7L7 1L13 7" stroke="#475467" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L7 7L13 1" stroke="#475467" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </span>
                {data.tariffName}
              </div>
            );
          }
          return <div className="pl-8 font-medium text-text-950">{data.tariffName}</div>;
        },
      },
      {
        accessorKey: "models",
        header: "Model",
        cell: ({ row }) => {
          const data = row.original;
          if (data.isParent) {
            return (
              <div className="flex items-center gap-2">
                {data.models?.map((model) => (
                  <span key={model} className="bg-pink-50 text-[#AD336D] px-2 py-1 rounded text-xs font-semibold">
                    {model}
                  </span>
                ))}
                {data.additionalModelsCount && (
                  <span className="bg-pink-50 text-[#AD336D] px-2 py-1 rounded text-xs font-semibold">
                    +{data.additionalModelsCount}
                  </span>
                )}
              </div>
            );
          }
          return <div className="text-text-700">{data.models?.[0] || "-"}</div>;
        },
      },
      {
        accessorKey: "updatedAt",
        header: "Updated At",
        cell: ({ row }) => {
          return <div className="text-text-700">{row.original.updatedAt}</div>;
        },
      },
      {
        accessorKey: "updatedBy",
        header: "Updated By",
        cell: ({ row }) => {
          return <div className="text-text-700">{row.original.updatedBy}</div>;
        },
      },
      {
        accessorKey: "id", // using ID for actions
        header: "Actions",
        cell: ({ row }) => {
          const data = row.original;
          if (data.isParent) {
            return <div className="text-text-700">-</div>;
          }
          return (
            <button className="p-2 text-primary-700 hover:bg-secondary-50 transition-colors rounded-lg cursor-pointer">
              <EditIcon className="w-5 h-5" />
            </button>
          );
        },
      },
    ],
    [expandedIds, toggleExpand]
  );
};
