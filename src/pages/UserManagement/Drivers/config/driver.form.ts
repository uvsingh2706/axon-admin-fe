import * as z from "zod";
import type { SectionConfig } from "@/component/form/DynamicForm";

// Keep User Management driver's Create/Edit UI consistent with Fleet Management's Driver form.
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
  // vehicleId: z.string().min(1, "Vehicle is required"), 
  vehicleId: z.string().optional(),
});

export type CreateDriverFormValues = z.infer<typeof createDriverSchema>;
export const editDriverSchema = createDriverSchema;
export type EditDriverFormValues = z.infer<typeof editDriverSchema>;

// export const driverCreateDefaultValues: CreateDriverFormValues = {
//   driverName: "",
//   image: undefined,
//   personalEmailId: "",
//   phoneNumber: "",
//   gender: "",
//   driverId: "",
//   licenseNumber: "",
//   licenseExpiryDate: "",
//   organisationFleet: "",
//   vehicleId: "",
// };

export const driverCreateFormSections = (
  fleetOptions: { label: string; value: string }[],
  vehicleOptions: { label: string; value: string }[],
  onFleetChange?: (fleetId: string) => void,
  isVehicleDisabled?: boolean,
): SectionConfig<CreateDriverFormValues>[] => [
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
          type: "text",
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
          type: "select",
          placeholder: "Select organisation / fleet",
          required: true,
          options: fleetOptions,
          onChange: onFleetChange,
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
          placeholder: isVehicleDisabled ? "Select a fleet first" : "Select a vehicle",
          required: false,
          options: vehicleOptions,
          disabled: isVehicleDisabled,
          emptyMessage: "No vehicles found for this fleet",
        },

      ],
    },
  ];

export const driverEditFormSections = driverCreateFormSections;

