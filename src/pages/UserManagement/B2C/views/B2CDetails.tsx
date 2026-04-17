import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "@/component/Breadcrumb";
import PageWrapper from "@/component/PageWrapper";
import { Modal } from "@/component/Modal";
import { Pathname } from "@/utils/pathname";
import { Avatar, AvatarFallback, AvatarImage } from "@/component/ui/avatar";
import { DataTable } from "@/component/data-table";
import type { ExtendedColumnDef } from "@/component/data-table";
import { mockB2CUsers } from "../mocks/b2c.mock";
import type { B2CTransactionRow } from "../types/b2c.type";
import EditIcon from "@/assets/icons/EditIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import Wallet from "@/assets/icons/Wallet";
import Bolt from "@/assets/icons/Bolt";
import MoneyIcon from "@/assets/icons/MoneyIcon";
import { DownloadIcon } from "@/assets/icons/DownloadIcon";
import { cn } from "@/lib/utils";
import { Can, MODULE } from "@/rbac";

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

type StatCardData = {
  title: string;
  value: string;
  icon: React.ReactNode;
  bgColor: string;
};

function StatCard({ title, value, icon, bgColor }: StatCardData) {
  return (
    <div
      className={cn(
        "bg-white border border-text-100 flex items-center justify-between",
        "w-full h-24 p-6 rounded-xl"
      )}
    >
      <div className="flex flex-col gap-1">
        <span className="subtitle-3-regular text-text-500">{title}</span>
        <span className="heading-2-semibold text-text-950 leading-tight">
          {value}
        </span>
      </div>
      <div
        className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
          bgColor
        )}
      >
        {icon}
      </div>
    </div>
  );
}

export default function B2CDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = useMemo(() => mockB2CUsers.find((u) => u.id === id), [id]);

  if (!user || !id) {
    return (
      <div className="p-8 text-center text-text-500 subtitle-2-medium">
        User not found.
      </div>
    );
  }

  const statCards: StatCardData[] = [
    {
      title: "Available Balance",
      value: `₹${user.availableBalance}`,
      icon: <Wallet className="w-5 h-5" />,
      bgColor: "bg-primary-50",
    },
    {
      title: "Energy Consumed (kwh)",
      value: String(user.energyConsumedKwh),
      icon: <Bolt className="w-5 h-5" />,
      bgColor: "bg-primary-50",
    },
    {
      title: "Charging Transactions",
      value: String(user.chargingTransactions),
      icon: <MoneyIcon className="w-5 h-5" />,
      bgColor: "bg-primary-50",
    },
  ];

  const headerFields = [
    { label: "Phone Number", value: user.phoneNumber },
    { label: "Mail Id", value: user.email },
    { label: "Location", value: user.location },
  ];

  const transactionColumns: ExtendedColumnDef<B2CTransactionRow, unknown>[] = [
    {
      accessorKey: "invoiceId",
      header: "Invoice ID",
      cell: ({ row }) => (
        <span className="text-secondary-600 subtitle-3-medium">
          {row.original.invoiceId}
        </span>
      ),
    },
    { accessorKey: "stationName", header: "Station Name" },
    { accessorKey: "chargingPointName", header: "Charging Point Name" },
    { accessorKey: "dateTime", header: "Date & Time" },
    { accessorKey: "durationHours", header: "Duration (hrs)" },
    { accessorKey: "energyConsumptionKwh", header: "Energy Consumption (kWH)" },
    { accessorKey: "invoiceType", header: "Invoice Type" },
    { accessorKey: "amount", header: "Amount" },
    {
      id: "action",
      header: "Action",
      cell: () => (
        <button
          onClick={() => console.log("Download invoice")}
          className="p-1 hover:bg-secondary-50 rounded transition-colors"
          aria-label="Download invoice"
        >
          <DownloadIcon className="w-5 h-5 text-secondary-600" />
        </button>
      ),
    },
  ];

  const handleDelete = () => {
    console.log("Delete B2C user:", id);
    navigate(Pathname.USER_MANAGEMENT);
  };

  return (
    <div className="flex flex-col gap-5">
      <Breadcrumb
        items={[
          { label: "User Management", path: Pathname.USER_MANAGEMENT },
          { label: "B2C Users", path: Pathname.USER_MANAGEMENT },
          { label: user.name },
        ]}
      />

      <PageWrapper
        title={user.name}
        showSearch={false}
        showFilter={false}
        titleClassName="heading-3-semibold"
        className="w-full"
        headerActions={
          <div className="flex items-center gap-3">
            {/* <button
              onClick={() =>
                navigate(`${Pathname.USER_MANAGEMENT}/b2c/${id}/edit`)
              }
              className="p-2 rounded-lg hover:bg-secondary-50 transition-colors cursor-pointer"
              aria-label="Edit user"
            >
              <EditIcon className="w-5 h-5" />
            </button> */}
            {/* <button
              onClick={() => setIsModalOpen(true)}
              className="p-2 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
              aria-label="Delete user"
            >
              <DeleteIcon className="w-5 h-5" />
            </button> */}
            <Modal
              open={isModalOpen}
              onOpenChange={setIsModalOpen}
              description="Are you sure you want to delete this user?"
              onConfirm={handleDelete}
              confirmLabel="Delete"
              cancelLabel="Cancel"
            />
          </div>
        }
      >
        <div className="flex flex-col gap-6 mt-6">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {statCards.map((card, index) => (
              <StatCard
                key={index}
                title={card.title}
                value={card.value}
                icon={card.icon}
                bgColor={card.bgColor}
              />
            ))}
          </div>

          {/* User Info Card */}
          <div className="rounded-xl bg-white border border-text-100">
            <div className="p-6 flex items-start gap-6">
              <Avatar className="size-16 shrink-0 rounded-xl">
                {user.avatarUrl ? (
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                ) : null}
                <AvatarFallback className="subtitle-2-medium rounded-xl">
                  {initials(user.name)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="heading-4-semibold text-text-950">
                  {user.name}
                </div>
                <div className="mt-4 grid grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4">
                  {headerFields.map((f) => (
                    <DetailField
                      key={f.label}
                      label={f.label}
                      value={String(f.value)}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Can module={MODULE.B2C} action="update">
                  <button
                    onClick={() =>
                      navigate(`${Pathname.USER_MANAGEMENT}/b2c/${id}/edit`)
                    }
                    className="p-2 rounded-lg hover:bg-secondary-50 transition-colors cursor-pointer"
                    aria-label="Edit user"
                  >
                    <EditIcon className="w-5 h-5" />
                  </button>
                </Can>
                <Can module={MODULE.B2C} action="delete">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="p-2 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                    aria-label="Delete user"
                  >
                    <DeleteIcon className="w-5 h-5" />
                  </button>
                </Can>
              </div>
            </div>
          </div>

          {/* Transactions History */}
          <div className="subtitle-2-semibold text-text-950">
            Transactions History
          </div>
          <DataTable
            columns={transactionColumns}
            data={user.transactionHistory}
          />
        </div>
      </PageWrapper>
    </div>
  );
}
