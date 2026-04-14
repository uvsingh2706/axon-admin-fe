import type { TariffData, TariffDetailData, TariffEditData } from "../types/tariff.types";

export const mockTariffList: TariffData[] = [
  { id: "1", name: "Zaptec tariff", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "standard client 12062025" },
  { id: "2", name: "Systematic services", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
  { id: "3", name: "Systematic services", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
  { id: "4", name: "Systematic services", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
  { id: "5", name: "Systematic services", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "operation" },
  { id: "6", name: "Systematic services", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
  { id: "7", name: "Systematic services", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
  { id: "8", name: "Systematic services", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
  { id: "9", name: "Systematic services", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
  { id: "10", name: "Systematic services", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
  { id: "11", name: "Systematic services", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
  { id: "12", name: "Systematic services", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
];

export const mockTariffDetailsById: Record<string, TariffDetailData> = {
  "1": { name: "Zaptec Tariff", value: "₹23.25", serviceFee: "₹12", tax: "Tax type 1" },
  "2": { name: "Systematic Services", value: "₹23.25", serviceFee: "₹12", tax: "Tax type 1" },
  "3": { name: "Systematic Services", value: "₹23.25", serviceFee: "₹12", tax: "Tax type 1" },
  "4": { name: "Systematic Services", value: "₹23.25", serviceFee: "₹12", tax: "Tax type 1" },
  "5": { name: "Systematic Services", value: "₹23.25", serviceFee: "₹12", tax: "Tax type 1" },
  "6": { name: "Systematic Services", value: "₹23.25", serviceFee: "₹12", tax: "Tax type 1" },
  "7": { name: "Systematic Services", value: "₹23.25", serviceFee: "₹12", tax: "Tax type 1" },
};

export const mockTariffEditById: Record<string, TariffEditData> = {
  "1": { name: "Zaptec Tariff", value: "23.25", serviceFee: "12", tax: "tax-type-1" },
  "2": { name: "Systematic Services", value: "23.25", serviceFee: "12", tax: "tax-type-1" },
  "3": { name: "Systematic Services", value: "23.25", serviceFee: "12", tax: "tax-type-1" },
  "4": { name: "Systematic Services", value: "23.25", serviceFee: "12", tax: "tax-type-1" },
  "5": { name: "Systematic Services", value: "23.25", serviceFee: "12", tax: "tax-type-1" },
  "6": { name: "Systematic Services", value: "23.25", serviceFee: "12", tax: "tax-type-1" },
  "7": { name: "Systematic Services", value: "23.25", serviceFee: "12", tax: "tax-type-1" },
};
