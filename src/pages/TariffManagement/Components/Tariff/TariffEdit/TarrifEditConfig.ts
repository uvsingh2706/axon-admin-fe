import * as z from "zod";
import type { SectionConfig } from "@/component/form/DynamicForm";

export const editTariffSchema = z.object({
  name: z.string().min(1, "Name is required"),
  value: z
    .string()
    .min(1, "Value is required")
    .regex(/^\d*\.?\d*$/, "Value must be a valid number"),
  serviceFee: z
    .string()
    .min(1, "Service fee is required")
    .regex(/^\d*\.?\d*$/, "Service fee must be a valid number"),
  tax: z.string().min(1, "Tax type is required"),
});

export type EditTariffFormValues = z.infer<typeof editTariffSchema>;

export const tariffEditFormSections: SectionConfig<EditTariffFormValues>[] = [
  {
    gridCols: 2,
    fields: [
      {
        name: "name",
        label: "Name",
        type: "text",
      },
      {
        name: "value",
        label: "Value (per Kwh)",
        type: "text",
      },
      {
        name: "serviceFee",
        label: "Service Fee",
        type: "text",
      },
      {
        name: "tax",
        label: "Tax",
        type: "select",
        options: [
          { label: "Tax type 1", value: "tax-type-1" },
          { label: "Tax type 2", value: "tax-type-2" },
        ],
      },
    ],
  },
];
