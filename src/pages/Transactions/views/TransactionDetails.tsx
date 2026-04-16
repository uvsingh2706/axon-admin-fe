import { useParams } from "react-router-dom";
import Breadcrumb from "@/component/Breadcrumb";
import PageWrapper from "@/component/PageWrapper";
import { Pathname } from "@/utils/pathname";
import { getTransactionById } from "../mocks/transaction.mock";
import Download from "@/assets/icons/Download";
import { cn } from "@/lib/utils";

export default function TransactionDetails() {
    const { id } = useParams<{ id: string }>();
    const transaction = getTransactionById(id);

    if (!transaction) {
        return (
            <div className="p-8 text-center text-text-500 subtitle-2-medium">
                Transaction not found.
            </div>
        );
    }

    const sections = [
        {
            title: "Personal Information",
            fields: [
                { label: "User Name", value: transaction.userName, isUser: true },
                {
                    label: "User Type",
                    value: transaction.userType,
                    isBadge: true,
                    badgeStyles: transaction.userType === "Driver" ? "flex items-center justify-center bg-pink-c2 text-pink-c3 w-13 h-6 rounded" : "flex items-center justify-center bg-blue-c1 text-blue-c2 w-[4.625rem] h-[1.5625rem] rounded"
                },
                { label: "Vehicle Make", value: transaction.vehicleMake || "-" },
                { label: "Vehicle Model", value: transaction.vehicleModel || "-" },
            ],
        },
        {
            title: "Invoice Information",
            fields: [
                { label: "Invoice ID", value: transaction.invoiceId },
                { label: "Invoice Type", value: transaction.invoiceType },
                { label: "Entry Type", value: transaction.entryType },
                { label: "Date & Time", value: transaction.dateTime },
            ],
        },
        {
            title: "Charging Information",
            fields: [
                { label: "Charging Station", value: transaction.chargingStation || "-" },
                {
                    label: "Charging Point & Charging Type",
                    value: `${transaction.chargingPoint || "-"}, | ${transaction.chargingType || "-"}`
                },
                { label: "Duration (hrs)", value: transaction.duration || "-" },
                { label: "Energy Consumption (kWH)", value: transaction.energy && transaction.energy !== "-" ? `${transaction.energy} kWH` : "-" },
                { label: "Initial SoC", value: transaction.initialSoC || "-" },
                { label: "Last SoC", value: transaction.lastSoC || "-" },
            ],
        },
    ];

    return (
        <div className="flex flex-col gap-4">
            <Breadcrumb
                items={[
                    { label: "Transactions", path: Pathname.TRANSACTIONS },
                    { label: transaction.userName },
                ]}
            />

            <PageWrapper
                title={
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                            <span className="subtitle-2-semibold text-text-950 leading-none">
                                {transaction.userName}
                            </span>
                            {transaction.status === "Success" && (
                                <span className="flex items-center justify-center subtitle-3-5-medium bg-green-c1 text-success w-16 h-6 gap-2 rounded px-2 py-1">
                                    Success
                                </span>
                            )}
                        </div>
                        <span className="subtitle-3-regular text-text-400 leading-none">
                            {transaction.invoiceId}
                        </span>
                    </div>
                }
                headerActions={
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 border border-primary-500 text-primary-500 rounded-lg hover:bg-primary-50 transition-colors cursor-pointer group">
                            <Download className="w-4 h-4 text-primary-500" />
                            <span className="subtitle-3-semibold text-primary-500">Download Invoice</span>
                        </button>
                    </div>
                }
                showSearch={false}
                showFilter={false}
                className="w-full"
            >
                <div className="flex flex-col gap-10 mt-4">
                    {sections.map((section, idx) => (
                        <div key={idx} className="flex flex-col gap-6">
                            <div className="flex items-center gap-4 w-full">
                                <h3 className="heading-5-semibold text-text-950 whitespace-nowrap">
                                    {section.title}
                                </h3>
                                <div className="h-px bg-text-100 w-full" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                                {section.fields.map((field, fIdx) => (
                                    <div key={fIdx} className="flex flex-col gap-1.5 relative">
                                        <span className="subtitle-3-regular text-text-500">{field.label}</span>
                                        {field.isBadge ? (
                                            <div className="flex">
                                                <span className={cn("subtitle-3-5-medium px-2 py-1 rounded-md", field.badgeStyles)}>
                                                    {field.value}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="subtitle-3-semibold text-text-950">{field.value}</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Billing Information Section */}
                    <div className="bg-secondary-0 p-6 rounded-xl flex flex-col gap-6">
                        <div className="flex items-center gap-4 w-full">
                            <h3 className="heading-5-semibold text-text-950 whitespace-nowrap">
                                Billing Information
                            </h3>
                            <div className="h-0.5 bg-text-100/50 w-full" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="flex flex-col gap-1.5">
                                <span className="subtitle-3-regular text-text-500 leading-none">Total Base Amount</span>
                                <span className="subtitle-3-semibold text-text-950">{transaction.billing?.totalBaseAmount}</span>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <span className="subtitle-3-regular text-text-500 leading-none">Service Fee</span>
                                <span className="subtitle-3-semibold text-text-950">{transaction.billing?.serviceFee}</span>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <span className="subtitle-3-regular text-text-500 leading-none">Total Tax Amount</span>
                                <span className="subtitle-3-semibold text-text-950">{transaction.billing?.totalTaxAmount}</span>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <span className="subtitle-3-regular text-text-500 leading-none">Flat Rate</span>
                                <span className="subtitle-3-semibold text-text-950">{transaction.billing?.flatRate}</span>
                            </div>
                        </div>

                        {/* Final Total Bar */}
                        <div className="bg-white p-4 rounded-lg flex items-center justify-between border border-secondary-00/50 mt-2">
                            <span className="heading-5-semibold text-text-950">Total Amount</span>
                            <span className="heading-3-semibold text-success">
                                {transaction.billing?.totalAmount || transaction.amount}
                            </span>
                        </div>
                    </div>
                </div>
            </PageWrapper>
        </div>
    );
}



