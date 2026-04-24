import { useState } from "react";
import EditIcon from "@/assets/icons/EditIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import ImagePlaceholderIcon from "@/assets/icons/ImagePlaceholderIcon";
import CopyIcon from "@/assets/icons/CopyIcon";
import { Modal } from "@/component/Modal";
import { TabsContent } from "@/component/ui/tabs";
import { cn } from "@/lib/utils";
import type { FleetDTO } from "../../services/Fleet.types";
import type { FleetStatCard } from "../../types/fleet.type";
import { Can, MODULE } from "@/rbac";
import { toast } from "sonner";

type FleetOverviewProps = {
  fleet: FleetDTO;
  statCardsData: FleetStatCard[];
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function FleetOverview({
  fleet,
  statCardsData,
  onEdit,
  onDelete,
}: FleetOverviewProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <TabsContent value="overview">
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
          {statCardsData.map((data, index) => (
            <StatCard
              key={index}
              title={data.title}
              value={data.value}
              icon={data.icon}
              bgColor={data.bgColor}
            />
          ))}
        </div>

        <div className="flex flex-col gap-6 pt-4">
          <div className="flex items-center justify-between border-b border-text-100 pb-2">
            <h2 className="heading-4-semibold text-text-950">Fleet Overview</h2>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-27 h-27 rounded-xl border border-text-100 flex items-center justify-center overflow-hidden shrink-0 bg-white">
              {fleet.logo ? (
                <img src={fleet.logo} alt={fleet.name} className="w-full h-full object-contain p-2" />
              ) : (
                <ImagePlaceholderIcon className="w-full h-full" />
              )}
            </div>

            <div className="flex flex-col flex-1 gap-6 w-full">
              <div className="flex items-start justify-between w-full">
                <h3 className="heading-3-semibold text-text-950">{fleet.name}</h3>
                <div className="flex items-center gap-3">
                  <Can module={MODULE.FLEET_MANAGEMENT} action="update">
                    <button
                      className="p-1.5 rounded-md hover:bg-secondary-50 transition-colors cursor-pointer group"
                      title="Edit"
                      onClick={() => onEdit?.()}
                    >
                      <EditIcon className="w-5 h-5 text-text-400 group-hover:text-text-700" />
                    </button>
                  </Can>

                  <Can module={MODULE.FLEET_MANAGEMENT} action="delete">
                    <button
                      className="p-1.5 rounded-md hover:bg-danger/5 transition-colors cursor-pointer group"
                      title="Delete"
                      onClick={() => setIsDeleteModalOpen(true)}
                    >
                      <DeleteIcon className="w-5 h-5 text-text-400 group-hover:text-danger" />
                    </button>
                    <Modal
                      open={isDeleteModalOpen}
                      onOpenChange={setIsDeleteModalOpen}
                      description="Are you sure you want to delete this fleet?"
                      onConfirm={() => {
                        setIsDeleteModalOpen(false);
                        onDelete?.();
                      }}
                      confirmLabel="Delete"
                      cancelLabel="Cancel"
                    />
                  </Can>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 w-full">
                <DetailField label="Vehicle Type" value={fleet.vehicle_type || "NA"} />
                <DetailField label="Email" value={fleet.email || "NA"} isCopyable />
                <DetailField label="Contact" value={fleet.contact_number || "NA"} />

              </div>
            </div>
          </div>
        </div>
      </div>
    </TabsContent>
  );
}

type StatCardProps = FleetStatCard;

function StatCard({ title, value, icon, bgColor }: StatCardProps) {
  return (
    <div className={cn(
      "bg-white border border-text-100 flex items-center justify-between",
      "w-full h-24 p-5 rounded-[0.625rem]"
    )}>
      <div className="flex flex-col gap-1">
        <span className="subtitle-3-regular text-text-500">{title}</span>
        <span className="heading-2-semibold text-text-950 leading-tight">{value}</span>
      </div>
      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0", bgColor)}>
        {icon}
      </div>
    </div>
  );
}

type DetailFieldProps = {
  label: string;
  value: string;
  isCopyable?: boolean;
};

function DetailField({ label, value, isCopyable }: DetailFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="subtitle-3-regular text-text-500 leading-none">{label}</span>
      <div className="flex items-center gap-2 h-5">
        <span className="subtitle-3-semibold text-text-950 whitespace-nowrap overflow-hidden text-ellipsis">{value}</span>
        {isCopyable && (
          <button
            className="text-text-400 hover:text-secondary-600 transition-colors cursor-pointer"
            title="Copy"
            onClick={() => {
              navigator.clipboard.writeText(value);
              toast.success(`${label} copied to clipboard`);
            }}
          >
            <CopyIcon className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
