import Breadcrumb from "@/component/Breadcrumb";
import PageWrapper from "@/component/PageWrapper";
import EditIcon from "@/assets/icons/EditIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import { Modal } from "@/component/Modal";
import { Pathname } from "@/utils/pathname";
import { useNavigate, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { DataTable } from "@/component/data-table";
import type { ExtendedColumnDef } from "@/component/data-table";
import { getFleetById } from "../../../mocks/fleet.mock";
import { getDriverById, getDriverDetailsById } from "../mocks/driver.mock";
import type { ChargingHistoryRow } from "../types/driver.type";
import CarIcon from "@/assets/icons/CarIcon";
import CopyIcon from "@/assets/icons/CopyIcon";
import type { ReactNode } from "react";

function initials(name: string) {
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((p) => p[0]?.toUpperCase())
        .join("");
}

function DetailField({ label, value, showCopy }: { label: string; value: string; showCopy?: boolean }) {
    const handleCopy = () => {
        navigator.clipboard.writeText(value);
    };

    return (
        <div className="flex flex-col gap-1 min-w-0">
            <span className="subtitle-3-5-regular text-text-400">{label}</span>
            <div className="flex items-center gap-2">
                <span className="subtitle-2-medium text-text-950 truncate" title={value}>{value}</span>
                {showCopy && (
                    <button onClick={handleCopy} className="cursor-pointer hover:opacity-70 transition-opacity">
                        <CopyIcon className="w-3.5 h-3.5" />
                    </button>
                )}
            </div>
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
                    <div className="rounded-xl bg-white border border-text-100">
                        {/* Avatar row + fields */}
                        <div className="p-6 flex items-start gap-6">
                            <div className="size-20 rounded-xl overflow-hidden shrink-0 border border-text-100 bg-gray-50 flex items-center justify-center">
                                {d.avatarUrl ? (
                                    <img src={d.avatarUrl} alt={d.name} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="subtitle-1-semibold text-text-400">{initials(d.name)}</span>
                                )}
                            </div>

                            <div className="flex flex-col gap-6 flex-1 min-w-0">
                                <div className="heading-3-semibold text-text-black-c1">{d.name}</div>

                                <div className="grid grid-cols-2 lg:grid-cols-[1fr_1.5fr_1fr_1fr] gap-x-10 gap-y-4">
                                    {headerFields.map((f) => (
                                        <DetailField
                                            key={f.label}
                                            label={f.label}
                                            value={String(f.value)}
                                            showCopy={f.label === "Personal Email ID"}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Other Details */}
                        <div className="border-t border-text-50 px-6 py-5">
                            <div className="flex items-center gap-4 mb-5">
                                <div className="subtitle-2-semibold text-text-black-c1 shrink-0">Other Details</div>
                                <div className="h-px bg-text-100 flex-1" />
                            </div>
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

