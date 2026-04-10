import * as z from "zod";
import type { SectionConfig } from "@/component/form/DynamicForm";

export const createStationSchema = z.object({
  stationName: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  supportPerson: z.string().min(1, "Support person is required"),
  status: z.string().min(1, "Status is required"),
});

export type CreateStationFormValues = z.infer<typeof createStationSchema>;

export const stationFormSections: SectionConfig<CreateStationFormValues>[] = [
  {
    gridCols: 2,
    fields: [
      {
        name: "stationName",
        label: "Station Name",
        type: "text",
        placeholder: "Enter Station Name",
        required: true,
      },
      {
        name: "address",
        label: "Address",
        type: "text",
        placeholder: "Enter Full Address",
        required: true,
      },
      {
        name: "supportPerson",
        label: "Support Person",
        type: "select",
        placeholder: "Select Support Person",
        required: true,
        options: [
          { label: "Rahul Rathore", value: "rahul-rathore" },
          { label: "Ravi Singh", value: "ravi-singh" },
          { label: "Maneshwar", value: "maneshwar" },
        ],
      },
      {
        name: "status",
        label: "Status",
        type: "select",
        placeholder: "Select Status",
        required: true,
        options: [
          { label: "Active", value: "active" },
          { label: "Inactive", value: "inactive" },
          { label: "Under Maintenance", value: "under-maintenance" },
        ],
      },
    ],
  },
];
