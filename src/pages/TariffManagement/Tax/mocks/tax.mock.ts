import type { TaxData, TaxDetailData, TaxEditData } from "../types/tax.types";

export const mockTaxList: TaxData[] = [
  { id: "1", taxName: "star-1 3968", type: "Percentage", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "standard client 12062025" },
  { id: "2", taxName: "zaptec tax", type: "Percentage", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
  { id: "3", taxName: "zaptec tax", type: "Percentage", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
  { id: "4", taxName: "Systematic services", type: "Percentage", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
  { id: "5", taxName: "Systematic services", type: "Percentage", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "operation" },
  { id: "6", taxName: "zaptec tax", type: "Percentage", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
];

export const mockTaxDetailsById: Record<string, TaxDetailData> = {
  "1": { taxName: "star-1 3968", type: "Percentage", percentageValue: "18%" },
  "2": { taxName: "zaptec tax", type: "Percentage", percentageValue: "18%" },
  "3": { taxName: "zaptec tax", type: "Percentage", percentageValue: "18%" },
  "4": { taxName: "Systematic services", type: "Percentage", percentageValue: "18%" },
};

export const mockTaxEditById: Record<string, TaxEditData> = {
  "1": { taxName: "star-1 3968", type: "Percentage", percentageValue: "18" },
  "2": { taxName: "zaptec tax", type: "Percentage", percentageValue: "18" },
  "3": { taxName: "zaptec tax", type: "Percentage", percentageValue: "18" },
  "4": { taxName: "Systematic services", type: "Percentage", percentageValue: "18" },
};
