import * as z from "zod";
import type { SectionConfig } from "@/component/form/DynamicForm";

export const createFleetSchema = z.object({
  name: z.string().min(1, "Organisation Name is required"),
  logo: z.any().optional(),
  vehicleType: z.string().min(1, "Vehicle Type is required"),
  flatRate: z.string().min(1, "Flat Rate is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  contact: z.string().min(1, "Contact Number is required"),
  totalDrivers: z.string().optional(),
  totalVehicles: z.string().optional(),
});

export type CreateFleetFormValues = z.infer<typeof createFleetSchema>;
export const editFleetSchema = createFleetSchema;
export type EditFleetFormValues = z.infer<typeof editFleetSchema>;

export const fleetFormSections: SectionConfig<CreateFleetFormValues>[] = [
  {
    gridCols: 1,
    fields: [
      { name: "logo", label: "Organisation Logo", type: "image" },
    ],
  },
  {
    gridCols: 2,
    fields: [
      { name: "name", label: "Organisation Name", type: "text", placeholder: "E.g. Ola Pvt. Ltd.", required: true },
      {
        name: "vehicleType",
        label: "Vehicle Type",
        type: "select",
        placeholder: "E.g. Buses",
        required: true,
        options: [
          { label: "E2W", value: "E2W" },
          { label: "E4W", value: "E4W" },
          { label: "Bus", value: "Bus" },
        ],
      },
      { name: "contact", label: "Contact Number", type: "text", placeholder: "E.g. 8713133245", required: true },
      { name: "email", label: "Mail ID", type: "email", placeholder: "E.g. xyz@gmail.com", required: true },
      { name: "flatRate", label: "Flat Rate", type: "text", placeholder: "E.g. ₹12", required: true },
    ],
  },
];
