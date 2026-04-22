import * as z from "zod";
import type { SectionConfig } from "@/component/form/DynamicForm";

export const createPointSchema = z.object({
  name: z.string().min(1, "Name is required"),
  id: z.string().min(1, "ID is required"),
  configurationUrl: z.string().optional(),
  station: z.string().min(1, "Station is required"),
  oem: z.string().min(1, "OEM is required"),
  model: z.string().min(1, "Model is required"),
  commissionOn: z.string().min(1, "Date is required"),
  tariff: z.string().min(1, "Tariff is required"),
  connectionType: z.string().min(1, "Connection type is required"),
  isPublic: z.boolean().default(true),
});

export type CreatePointFormValues = z.infer<typeof createPointSchema>;
export const editPointSchema = createPointSchema;
export type EditPointFormValues = z.infer<typeof editPointSchema>;

export const getPointFormSections = ({
  stationOptions = [],
  oemOptions = [],
  modelOptions = [],
  tariffOptions = [],
}: {
  stationOptions?: { label: string; value: string }[];
  oemOptions?: { label: string; value: string }[];
  modelOptions?: { label: string; value: string }[];
  tariffOptions?: { label: string; value: string }[];
}): SectionConfig<CreatePointFormValues>[] => [
  {
    gridCols: 2,
    fields: [
      { name: "name", label: "Charging Point Display Name", type: "text", placeholder: "Enter Name", required: true },
      { name: "id", label: "Charging Point ID", type: "text", placeholder: "Enter ID", required: true },
      { name: "configurationUrl", label: "Configuration URL", type: "text", placeholder: "Enter URL", required: true },
      {
        name: "station",
        label: "Charging Stations",
        type: "select",
        placeholder: "Select Station",
        required: true,
        options: stationOptions,
      },
      {
        name: "oem",
        label: "Charging Point OEM",
        type: "select",
        placeholder: "Select OEM",
        required: true,
        options: oemOptions,
      },
      {
        name: "model",
        label: "Model Name",
        type: "select",
        placeholder: "Select Model",
        required: true,
        options: modelOptions,
      },
      { name: "commissionOn", label: "Commission On", type: "date", placeholder: "Select Date", required: true },
      {
        name: "tariff",
        label: "Assign Tariff",
        type: "select",
        placeholder: "Select Tariff",
        required: true,
        options: tariffOptions,
      },
      {
        name: "connectionType",
        label: "Connection Type",
        type: "select",
        placeholder: "Select Connection Type",
        required: true,
        options: [
          { label: "LAN", value: "LAN" },
          { label: "M2M", value: "M2M" },
          { label: "WIFI", value: "WIFI" },
        ],
      },
      { name: "isPublic", label: "Public", type: "switch", isPublic: true },
    ],
  },
];
