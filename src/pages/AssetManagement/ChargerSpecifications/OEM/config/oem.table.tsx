import { useMemo } from "react";
import type { ExtendedColumnDef } from "@/component/data-table";
import type { OEMDTO } from "../services/oem.types";
import EditIcon from "@/assets/icons/EditIcon";

export interface OEMRowData extends Partial<OEMDTO> {
  id: string;
  isParent: boolean;
  parentId?: string;
  chargerModelName?: string;
  chargerModelType?: string;
  displayName: string;
}

export const useOemColumns = (
  expandedIds: Set<string>,
  toggleExpand: (id: string) => void,
  onEdit: (id: string) => void
): ExtendedColumnDef<OEMRowData>[] => {
  return useMemo(
    () => [
      {
        accessorKey: "oemName",
        header: "OEM Name",
        enableSorting: true,
        cell: ({ row }) => {
          const data = row.original;
          const isExpanded = expandedIds.has(data.id);
          const hasMultipleModels = (data.chargerModels?.length || 0) > 1;

          if (data.isParent) {
            return (
              <div
                className={`flex items-center gap-3 font-semibold text-text-950 select-none ${hasMultipleModels ? 'cursor-pointer' : ''}`}
                onClick={(e) => {
                  if (!hasMultipleModels) return;
                  e.stopPropagation();
                  toggleExpand(data.id);
                }}
              >
                <span className="text-secondary-600 font-bold block w-4 text-center transition-transform">
                  {hasMultipleModels && (
                    isExpanded ? (
                      <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 7L7 1L13 7" stroke="#475467" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L7 7L13 1" stroke="#475467" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )
                  )}
                </span>
                {data.oemName}
              </div>
            );
          }
          return <div className="pl-8 font-medium text-text-700">{data.oemName || ""}</div>;
        },
      },
      {
        accessorKey: "chargerModels",
        header: "Model",
        cell: ({ row }) => {
          const data = row.original;
          if (data.isParent) {
            const models = data.chargerModels || [];
            if (models.length === 0) return <div className="text-text-700">NA</div>;
            
            const firstModel = models[0].chargerModelName;
            const remainingCount = models.length - 1;
            
            return (
              <div className="flex items-center gap-2">
                <span className="bg-pink-50 text-[#AD336D] px-2 py-1 rounded text-xs font-semibold">
                  {firstModel}
                </span>
                {remainingCount > 0 && (
                  <span className="bg-pink-50 text-[#AD336D] px-2 py-1 rounded text-xs font-semibold">
                    +{remainingCount}
                  </span>
                )}
              </div>
            );
          }
          return (
            <div className="pl-8 text-text-700">
              {data.chargerModelName || "NA"}
            </div>
          );
        },
      },
      {
        accessorKey: "updatedAt",
        header: "Updated At",
        cell: ({ row }) => {
          return <div className="text-text-700">{row.original.updatedAt ? new Date(row.original.updatedAt).toLocaleString() : "NA"}</div>;
        },
      },
      {
        accessorKey: "updatedByName",
        header: "Updated By",
        cell: ({ row }) => {
          return <div className="text-text-700">{row.original.updatedByName || "NA"}</div>;
        },
      },
      {
        accessorKey: "id",
        header: "Actions",
        cell: ({ row }) => {
          const data = row.original;
          if (!data.isParent) {
            return <div className="text-text-700">-</div>;
          }
          return (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onEdit(data.id);
              }}
              className="p-2 text-primary-700 hover:bg-secondary-50 transition-colors rounded-lg cursor-pointer"
            >
              <EditIcon className="w-5 h-5 flex justify-center items-center" />
            </button>
          );
        },
      },
    ],
    [expandedIds, toggleExpand, onEdit]
  );
};
