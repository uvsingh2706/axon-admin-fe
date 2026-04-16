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
import type { ChargingHistoryRow, DriverStatCard } from "@/pages/FleetManagement/views/Drivers/types/driver.type";
import type { ReactNode } from "react";
import { mockDriverList } from "../mocks/driver.mock";
import { cn } from "@/lib/utils";
import MoneyIcon from "@/assets/icons/MoneyIcon";
import { Bolt } from "@/assets/icons";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}


  const statCardsData: DriverStatCard[] = [
    {
      title: "Charging Transactions",
      value: '5',
      icon: <MoneyIcon className="w-5 h-5 text-primary-600" />,
      bgColor: "bg-primary-50",
    },
    {
      title: "Energy Delivered (kwh)",
      value: '300',
      icon: <Bolt className="w-5 h-5 text-primary-600" />,
      bgColor: "bg-primary-50",
    },
  
  ];

type StatCardProps = DriverStatCard
function StatCard({ title, value, icon, bgColor }: StatCardProps) {
  return (
    <div className={cn(
      "bg-white border border-text-100 flex items-center justify-between",
      "w-full h-24 p-6 rounded-[0.625rem]"
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

export default function DriverDetails() {
  const { id: driverId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const driver = useMemo(
    () => mockDriverList.find((d) => d.id === driverId),
    [driverId]
  );

  if (!driver || !driverId) {
    return (
      <div className="p-8 text-center text-text-500 subtitle-2-medium">
        Driver not found.
      </div>
    );
  }

  // Match Fleet Management UI's data contract (fallbacks until backend integration)
  const d = {
    name: driver.name,
    avatarUrl: driver.avatarUrl,
    contact: driver.driverPhone,
    personalEmailId: driver.email,
    gender: "-",
    driverId: driverId,
    organisationName: driver.organisationName,
    licenseNumber: "-",
    licenseExpiryDate: "-",
    vehicleInfo: {
      vehicleName: driver.assignedVehicle,
      model: "-",
      connectorType: "-",
      registrationNumber: "-",
      vehicleId: "-",
    },
    chargingHistory: [] as ChargingHistoryRow[],
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
    navigate(Pathname.USER_MANAGEMENT);
  };

  return (
    <div className="flex flex-col gap-5">
      <Breadcrumb
        items={[
          { label: "User Management", path: Pathname.USER_MANAGEMENT },
          { label: "Drivers", path: `${Pathname.USER_MANAGEMENT}` },
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
                navigate(`${Pathname.USER_MANAGEMENT}/drivers/${driverId}/edit`)
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
          <div className="rounded-xl bg-white">

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
            {/* Avatar row + fields */}
            <div className="border border-text-100 rounded-lg mt-2">
            <div className="p-6 flex items-start gap-6">
              {/* Square avatar like designs */}
              <Avatar className="size-16 shrink-0 rounded-xl">
                {d.avatarUrl ? <AvatarImage src={d.avatarUrl} alt={d.name} /> : null}
                <AvatarFallback className="subtitle-2-medium rounded-xl">
                  {initials(d.name)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="heading-4-semibold text-text-950">{d.name}</div>
                <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-4">
                  {headerFields.map((f) => (
                    <DetailField key={f.label} label={f.label} value={String(f.value)} />
                  ))}
                </div>
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
          

          {/* Vehicle info */}
          <CardSection title="Current Vehicle Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-8">
              <DetailField label="Brand" value={d.vehicleInfo.vehicleName} />
              <DetailField label="Model" value={d.vehicleInfo.model} />
              <DetailField
                label="Registration Number"
                value={d.vehicleInfo.registrationNumber}
              />
              <DetailField label="Connector Type" value={d.vehicleInfo.connectorType} />
              <DetailField label="Vehicle ID" value={d.vehicleInfo.vehicleId} />
            </div>
          </CardSection>

          </div>
          </div>
                <div className="subtitle-2-semibold text-text-950">Charging History</div>


            <DataTable columns={chargingColumns} data={d.chargingHistory} />
  
        </div>
      </PageWrapper>
    </div>
  );
}



