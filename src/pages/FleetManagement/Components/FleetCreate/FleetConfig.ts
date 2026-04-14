import * as z from "zod";
import type { SectionConfig } from "@/component/form/DynamicForm";

export const createFleetSchema = z.object({
  organisationName: z.string().min(1, "Organisation name is required"),
  vehicleType: z.string().min(1, "Vehicle type is required"),
  contactNumber: z.string().min(10, "Contact number is required"),
  email: z.string().email("Invalid email address"),
});

export type CreateFleetFormValues = z.infer<typeof createFleetSchema>;

export const fleetFormSections: SectionConfig<CreateFleetFormValues>[] = [
  {
    gridCols: 2,
    fields: [
      {
        name: "organisationName",
        label: "Organisation Name",
        type: "text",
        placeholder: "Eg. Ola Pvt. Ltd.",
        required: true,
      },
      {
        name: "vehicleType",
        label: "Vehicle Type",
        type: "select",
        placeholder: "Eg. Buses",
        required: true,
        options: [
          { label: "Buses", value: "buses" },
          { label: "Cars", value: "cars" },
        ],
      },
      {
        name: "contactNumber",
        label: "Contact Number",
        type: "text",
        placeholder: "Eg. 8713133245",
        required: true,
      },
      {
        name: "email",
        label: "Mail ID",
        type: "text",
        placeholder: "Eg. xyz@gmail.com",
        required: true,
      },
    ],
  },
];
