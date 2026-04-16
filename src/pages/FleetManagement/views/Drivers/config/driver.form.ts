import * as z from "zod";
import type { SectionConfig } from "@/component/form/DynamicForm";

export const createDriverSchema = z.object({
  driverName: z.string().min(1, "Driver Name is required"),
  image: z.any().optional(),
  personalEmailId: z.string().email("Invalid email"),
  phoneNumber: z.string().min(8, "Phone number is required"),
  gender: z.string().min(1, "Gender is required"),
  driverId: z.string().trim().or(z.literal("")).optional(),
  licenseNumber: z.string().min(1, "License number is required"),
  licenseExpiryDate: z.string().min(1, "License expiry date is required"),
  organisationFleet: z.string().min(1, "Organisation / fleet is required"),
  vehicleId: z.string().min(1, "Vehicle is required"),
});

export type CreateDriverFormValues = z.infer<typeof createDriverSchema>;

// Edit schema — identical fields, image is optional (may already exist)
export const editDriverSchema = createDriverSchema;
export type EditDriverFormValues = CreateDriverFormValues;


export const driverCreateFormSections: SectionConfig<CreateDriverFormValues>[] = [
  {
    title: "Personal Information",
    gridCols: 2,
    fields: [
      {
        name: "driverName",
        label: "Driver Name",
        type: "text",
        placeholder: "E.g. Ramesh Sharma",
        required: true,
      },
      {
        name: "image",
        label: "Upload Image",
        type: "image-upload",
      },
      {
        name: "personalEmailId",
        label: "Personal Email ID",
        type: "email",
        placeholder: "E.g. rahul@company.com",
        required: true,
      },
      {
        name: "phoneNumber",
        label: "Phone number",
        type: "phone",
        placeholder: "E.g. 98765 43210",
        required: true,
      },
      {
        name: "gender",
        label: "Gender",
        type: "select",
        placeholder: "Select gender",
        required: true,
        options: [
          { label: "Male", value: "Male" },
          { label: "Female", value: "Female" },
          { label: "Other", value: "Other" },
        ],
      },
      {
        name: "driverId",
        label: "Driver ID",
        type: "text",
        placeholder: "E.g. OLA123",
        required: false,
      },
    ],
  },
  {
    title: "License & Credentials",
    gridCols: 2,
    fields: [
      {
        name: "licenseNumber",
        label: "License number",
        type: "text",
        placeholder: "E.g. KA-01-20190012345",
        required: true,
      },
      {
        name: "licenseExpiryDate",
        label: "License expiry date",
        type: "date",
        placeholder: "dd/mm/yy",
        required: true,
      },
    ],
  },
  {
    title: "Fleet & Access Assignment",
    gridCols: 2,
    fields: [
      {
        name: "organisationFleet",
        label: "Organisation / fleet",
        type: "text",
        required: true,
        disabled: true,
      },
    ],
  },
  {
    title: "Assign Vehicle",
    gridCols: 2,
    fields: [
      {
        name: "vehicleId",
        label: "Vehicle",
        type: "select",
        placeholder: "Search by reg number, brand or model...",
        required: true,
        options: [
          { label: "Tata Nexon EV (DL-33L-2453)", value: "veh_001" },
          { label: "Tigor EV XE (DL-11A-8888)", value: "veh_002" },
        ],
      },
    ],
  },
];
