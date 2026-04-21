import { z } from "zod";
import type { SectionConfig } from "@/component/form/DynamicForm.types";

export const CreateConnectorSchema = z.object({
  connectorName: z.string().min(1, "Connector Name is required"),
  ioType: z.string().min(1, "I/O Type is required"),
  connectorStandard: z.string().min(1, "Connector Standard is required"),
  connectorOutput: z.string().min(1, "Connector Output is required"),
});

export type CreateConnectorFormValues = z.infer<typeof CreateConnectorSchema>;

export const CreateConnectorSections: SectionConfig<CreateConnectorFormValues>[] = [
  {
    gridCols: 2,
    fields: [
      {
        name: "connectorName",
        label: "Connector Name",
        type: "text",
        required: true,
        placeholder: "Type 3",
      },
      {
        name: "ioType",
        label: "I/O Type",
        type: "select",
        required: true,
        placeholder: "Model 12",
        options: [
          { label: "AC", value: "ac" },
          { label: "DC", value: "dc" },
        ],
      },
      {
        name: "connectorStandard",
        label: "Connector Standard",
        type: "select",
        required: true,
        placeholder: "Connector type 1",
options: [
  { label: "CCS DC", value: "CCS_DC" },
  { label: "CHAdeMO DC", value: "CHAdeMO_DC" },
  { label: "GBT DC", value: "GBT_DC" },
  { label: "IEC60309 AC", value: "IEC60309_AC" },
  { label: "Type 2 AC", value: "TYPE_2_AC" },
]
      },
      {
        name: "connectorOutput",
        label: "Connector Output (A)",
        type: "text",
        required: true,
        placeholder: "12",
      },
    ],
  },
];
