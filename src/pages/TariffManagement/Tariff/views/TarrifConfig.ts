import * as z from "zod";
import type { SectionConfig } from "@/component/form/DynamicForm";

export const createTariffSchema = z.object({
  name: z.string().min(1, "Name is required"),
  valuePerKwh: z
    .string()
    .min(1, "Value is required")
    .regex(/^\d*\.?\d*$/, "Value must be a valid number"),
  serviceFee: z
    .string()
    .min(1, "Service fee is required")
    .regex(/^\d*\.?\d*$/, "Service fee must be a valid number"),
  taxType: z.string().min(1, "Tax type is required"),
});

export type CreateTariffFormValues = z.infer<typeof createTariffSchema>;

export const tariffFormSections: SectionConfig<CreateTariffFormValues>[] = [
  {
    gridCols: 2,
    fields: [
      {
        name: "name",
        label: "Name",
        type: "text",
        placeholder: "Systematic services",
      },
      {
        name: "valuePerKwh",
        label: "Value (per Kwh)",
        type: "text",
        placeholder: "₹23.25",
      },
      {
        name: "serviceFee",
        label: "Service Fee",
        type: "text",
        placeholder: "₹12",
      },
      {
        name: "taxType",
        label: "Tax",
        type: "select",
        placeholder: "Select type",
        options: [
          { label: "Tax type I", value: "tax_type_1" },
          { label: "Tax type II", value: "tax_type_2" },
        ],
      },
    ],
  },
];
