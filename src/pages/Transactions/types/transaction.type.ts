import type { ElementType } from "react";

export interface TransactionData {
  id: string;
  userName: string;
  invoiceId: string;
  userType: "Driver" | "B2C User" | "B2C Users";
  invoiceType: string;
  entryType: string;
  chargingStation: string;
  chargingPoint: string;
  chargingType?: string;
  dateTime: string;
  duration: string;
  energy: string;
  amount: string;
  billing?: {
    totalBaseAmount: string;
    serviceFee: string;
    totalTaxAmount: string;
    flatRate: string;
    totalAmount: string;
  };
  vehicleMake?: string;
  vehicleModel?: string;
  status?: string;
  ocppTxnId?: string;
  cpStop?: string;
  closedBy?: string;
  initialSoC?: string;
  lastSoC?: string;
}

export interface TransactionStatCard {
  title: string;
  value: string;
  icon: ElementType;
  bgColor: string;
}
export type TransactionListProps = {
  search: string;
};
