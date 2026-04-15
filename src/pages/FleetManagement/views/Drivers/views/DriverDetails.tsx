import Breadcrumb from "@/component/Breadcrumb";
import PageWrapper from "@/component/PageWrapper";
import EditIcon from "@/assets/icons/EditIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import { Modal } from "@/component/Modal";
import { Pathname } from "@/utils/pathname";
import { useNavigate, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/component/ui/avatar";
import { DataTable } from "@/component/data-table";
import type { ExtendedColumnDef } from "@/component/data-table";
import { getFleetById } from "../../../mocks/fleet.mock";
import { getDriverById, getDriverDetailsById } from "../mocks/driver.mock";
import type { ChargingHistoryRow } from "../types/driver.type";
import CarIcon from "@/assets/icons/CarIcon";
import type { ReactNode } from "react";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="subtitle-3-regular text-text-500">{label}</span>
      <span className="subtitle-2-medium text-text-950">{value}</span>
    </div>
  );
}

function CardSection({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className ?? "rounded-xl bg-white p-6"}>
      <div className="subtitle-2-semibold text-text-950 mb-4">{title}</div>
      {children}
    </div>
  );
}

function VehicleInfoCard({
  title,
  subtitle,
  leftLabel,
  leftValue,
  rightLabel,
  rightValue,
}: {
  title: string;
  subtitle: string;
  leftLabel: string;
  leftValue: string;
  rightLabel: string;
  rightValue: string;
}) {
  return (
    <div className="w-full max-w-xs rounded-xl border border-text-100 bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-secondary-50 flex items-center justify-center shrink-0">
          <CarIcon className="w-5 h-5 text-primary-600" />
        </div>

        <div className="flex flex-col">
          <span className="subtitle-2-semibold text-text-950">{title}</span>
          <span className="subtitle-3-regular text-text-500">{subtitle}</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <DetailField label={leftLabel} value={leftValue} />
        <DetailField label={rightLabel} value={rightValue} />
      </div>
    </div>
  );
}

export default function DriverDetails() {
    const { id, driverId } = useParams<{ id: string; driverId: string }>();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fleet = getFleetById(id);
    const driver = id && driverId ? getDriverById(id, driverId) : undefined;
    const details = driverId ? getDriverDetailsById(driverId) : undefined;

    if (!fleet || !driver || !id || !driverId) {
        return <div className="p-8 text-center text-text-500 subtitle-2-medium">Driver not found.</div>;
    }

    const d = details ?? {
        ...driver,
        organisationName: fleet.organisationName,
        personalEmailId: driver.email,
        licenseNumber: "-",
        licenseExpiryDate: "-",
        vehicleInfo: {
            vehicleName: driver.assignedVehicle,
            model: "-",
            connectorType: "-",
            registrationNumber: "-",
        },
        chargingHistory: [],
    };

    const chargingColumns: ExtendedColumnDef<ChargingHistoryRow, unknown>[] = useMemo(
        () => [
            { accessorKey: "stationName", header: "Station Name" },
            { accessorKey: "chargingPointName", header: "Charging Point Name" },
            { accessorKey: "dateTime", header: "Date & Time" },
            { accessorKey: "durationHours", header: "Duration (hrs)" },
            { accessorKey: "energyConsumptionKwh", header: "Energy Consumption (kWh)" },
            { accessorKey: "amount", header: "Amount" },
        ],
        []
    );

    const headerFields = [
        { label: "Phone number", value: d.contact },
        { label: "Personal Email ID", value: d.personalEmailId },
        { label: "Gender", value: d.gender },
        { label: "Driver ID", value: d.driverId },
    ];

    const otherDetails = [
        { label: "Organisation / fleet", value: d.organisationName },
        { label: "License number", value: d.licenseNumber },
        { label: "License expiry date", value: d.licenseExpiryDate },
    ];

    const handleDelete = () => {
        console.log("Delete driver:", driverId);
        navigate(`${Pathname.FLEET_MANAGEMENT}/${id}/drivers`);
    };

    return (
        <div className="flex flex-col gap-4">
            <Breadcrumb
                items={[
                    { label: "Fleet Management", path: Pathname.FLEET_MANAGEMENT },
                    { label: fleet.organisationName, path: `${Pathname.FLEET_MANAGEMENT}/${id}` },
                    { label: d.name },
                ]}
            />

            <PageWrapper
                title={d.name}
                showSearch={false}
                showFilter={false}
                titleClassName="heading-3-semibold"
                className="w-full"
                headerActions={
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() =>
                                navigate(`${Pathname.FLEET_MANAGEMENT}/${id}/drivers/${driverId}/edit`)
                            }
                            className="p-2 rounded-lg hover:bg-secondary-50 transition-colors cursor-pointer"
                            aria-label="Edit driver"
                        >
                            <EditIcon className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="p-2 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                            aria-label="Delete driver"
                        >
                            <DeleteIcon className="w-5 h-5" />
                        </button>
                        <Modal
                            open={isModalOpen}
                            onOpenChange={setIsModalOpen}
                            description="Are you sure you want to delete this driver?"
                            onConfirm={handleDelete}
                            confirmLabel="Delete"
                            cancelLabel="Cancel"
                        />
                    </div>
                }
            >
                <div className="flex flex-col gap-6 mt-6">
                    {/* Top details card */}
                    <div className="rounded-xl bg-white">
                        {/* Avatar row + fields */}
                        <div className="p-6 flex items-start gap-6">
                            <Avatar className="size-16 shrink-0">
                                {d.avatarUrl ? <AvatarImage src={d.avatarUrl} alt={d.name} /> : null}
                                <AvatarFallback className="subtitle-2-medium">{initials(d.name)}</AvatarFallback>
                            </Avatar>

                            <div className="flex flex-col gap-1 min-w-[120px] shrink-0">
                                <span className="heading-4-semibold text-text-950">{d.name}</span>
                            </div>

                            <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4">
                                {headerFields.map((f) => (
                                    <DetailField key={f.label} label={f.label} value={String(f.value)} />
                                ))}
                            </div>
                        </div>

                        {/* Other Details */}
                        <div className="border-t border-text-100 px-6 py-5">
                            <div className="subtitle-2-semibold text-text-950 mb-4">Other Details</div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                                {otherDetails.map((f) => (
                                    <DetailField key={f.label} label={f.label} value={String(f.value)} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Vehicle info */}
                    <CardSection title="Vehicle Information" className="rounded-xl bg-gray-c4 p-6">
                        <VehicleInfoCard
                            title={d.vehicleInfo.vehicleName}
                            subtitle={d.vehicleInfo.model}
                            leftLabel="Connector Type"
                            leftValue={d.vehicleInfo.connectorType}
                            rightLabel="Registration Number"
                            rightValue={d.vehicleInfo.registrationNumber}
                        />
                    </CardSection>

                    {/* Charging history */}
                    <CardSection title="Charging History">
                        <DataTable
                            columns={chargingColumns}
                            data={d.chargingHistory}
                            // emptyMessage="No charging history found."
                        />
                    </CardSection>
                </div>
            </PageWrapper>
        </div>
    );
}

