import * as z from "zod";
import type { SectionConfig } from "@/component/form/DynamicForm";
import { brandOptions, chargingRateOptions, connectorTypeOptions, modelOptions, vehicleTypeOptions } from "../mocks/vehicles.mock";

export const createVehicleSchema = z.object({
  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),
  vehicleType: z.string().min(1, "Vehicle Type is required"),
  registrationNumber: z.string().min(1, "Registration Number is required"),
  connectorType: z.string().min(1, "Connector Type is required"),
  // vehicleId: z.string().min(1, "Vehicle ID is required"),
  batteryPack: z.string().min(1, "Battery Pack is required"),
  chargingRate: z.string().min(1, "Charging Rate is required"),
});

export type CreateVehicleFormValues = z.infer<typeof createVehicleSchema>;
export const editVehicleSchema = createVehicleSchema;
export type EditVehicleFormValues = z.infer<typeof editVehicleSchema>;

const vehicleFormSections: SectionConfig<CreateVehicleFormValues>[] = [
  {
    gridCols: 2,
    fields: [
      {
        name: "brand",
        label: "Brand",
        type: "text",
        placeholder: "Tata Nexon",
        required: true,
        // options: brandOptions,
      },
      {
        name: "model",
        label: "Model",
        type: "text",
        placeholder: "Sierra",
        required: true,
        // options: modelOptions,
      },
      {
        name: "vehicleType",
        label: "Vehicle Type",
        type: "select",
        placeholder: "Select vehicle type",
        required: true,
        options: vehicleTypeOptions,
      },
      {
        name: "registrationNumber",
        label: "Registration Number",
        type: "text",
        placeholder: "E.g. DL-33L-2453",
        required: true,
      },
      {
        name: "connectorType",
        label: "Connector Type",
        type: "select",
        placeholder: "Select connector type",
        required: true,
        options: connectorTypeOptions,
      },
      // {
      //   name: "vehicleId",
      //   label: "Vehicle ID",
      //   type: "text",
      //   placeholder: "E.g. 123-234-245",
      //   required: true,
      // },
      {
        name: "batteryPack",
        label: "Battery Pack",
        type: "text",
        placeholder: "12KWH",
        required: true,
      },
      {
        name: "chargingRate",
        label: "Charging Rate",
        type: "select",
        placeholder: "E.g. 123-234-245",
        required: true,
        options: chargingRateOptions,
      },
    ],
  },
];

export const vehicleCreateFormSections = vehicleFormSections;
export const vehicleEditFormSections = vehicleFormSections;
