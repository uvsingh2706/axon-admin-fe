import * as z from "zod";
import type { SectionConfig } from "@/component/form/DynamicForm";

export const createTaxSchema = z.object({
  name: z.string().min(1, "Tax name is required"),
  type: z.string().min(1, "Type is required"),
  percentageValue: z
    .string()
    .min(1, "Percentage value is required")
    .regex(/^\d*\.?\d*$/, "Value must be a valid number"),
});

export type CreateTaxFormValues = z.infer<typeof createTaxSchema>;
export const editTaxSchema = createTaxSchema;
export type EditTaxFormValues = z.infer<typeof editTaxSchema>;

const taxFormSections: SectionConfig<CreateTaxFormValues>[] = [
  {
    gridCols: 2,
    fields: [
      { name: "name", label: "Tax Name", type: "text", placeholder: "Enter tax name" },
      {
        name: "type",
        label: "Type",
        type: "text",
        placeholder: "Percentage",
        disabled: true,
      },
      {
        name: "percentageValue",
        label: "Percentage Value",
        type: "text",
        placeholder: "Enter Percentage",
      },
    ],
  },
];

export const taxCreateFormSections = taxFormSections;
export const taxEditFormSections = taxFormSections;
