import type { ExtendedColumnDef } from "@/component/data-table";
import type { TransactionData } from "../types/activeChargingSession.type";

export const getTransactionColumns = (onTerminate: (data: TransactionData) => void): ExtendedColumnDef<TransactionData, unknown>[] => [
    {
        accessorKey: "ocppTxnId",
        header: "OCPP Txn ID",
        cell: ({ row }) => (
            <span className="subtitle-3 text-secondary-600 underline leading-none">
                {row.original.ocppTxnId}
            </span>
        ),
    },
    {
        accessorKey: "userName",
        header: "User",
    },
    {
        accessorKey: "userType",
        header: "User Type",
        cell: ({ row }) => {
            const type = row.original.userType;

            const styles =
                type === "Driver"
                    ? "bg-pink-c2 text-pink-c3"
                    : "bg-blue-c1 text-blue-c2";

            return (
                <span className={`subtitle-3-5-medium px-2 py-1 rounded-md ${styles}`}>
                    {type}
                </span>
            );
        },
    },
    {
        accessorKey: "chargingStation",
        header: "Charging Station",
    },
    {
        accessorKey: "chargingPoint",
        header: "Charging Point",
    },
    {
        accessorKey: "connectorId",
        header: "Connector ID",
    },
    {
        accessorKey: "startSoc",
        header: "Start SoC",
    },
    {
        accessorKey: "currentSoc",
        header: "Current SoC",
    },
    {
        accessorKey: "duration",
        header: "Duration (HH:MM:SS)",
    },
    {
        accessorKey: "unitConsumed",
        header: "Unit Consumed",
    },
    {
        accessorKey: "chargingSpeed",
        header: "Charging Speed",
    },
    {
        accessorKey: "lastMeterReceived",
        header: "Last Meter Received",
    },
    {
        accessorKey: "vehicleType",
        header: "Vehicle Type",
    },
    {
        accessorKey: "id",
        header: () => <div className="w-36 text-center">Action</div>,
        cell: ({ row }) => {
            return (
                <div className="w-36 flex justify-center">
                    <button
                        onClick={() => onTerminate(row.original)}
                        className="w-36 h-8 rounded-md border border-orange-c1 text-orange-c1 flex items-center justify-center gap-1 py-2 px-3 subtitle-3-5-medium rotate-0 opacity-100 cursor-pointer"
                    >
                        Terminate Session
                    </button>
                </div>
            );
        },
    },
];