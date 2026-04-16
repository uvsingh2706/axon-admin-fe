import type { ElementType } from "react";

export interface TransactionData {
  id: string;
  userName: string;
  invoiceId: string;
  userType: "Driver" | "B2C Users";
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
}

export interface TransactionStatCard {
  title: string;
  value: string;
  icon: ElementType;
  bgColor: string;
}
