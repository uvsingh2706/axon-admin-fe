import * as z from "zod";
import type { SectionConfig } from "@/component/form/DynamicForm";
import { brandOptions, connectorTypeOptions, modelOptions } from "../mocks/vehicles.mock";

export const createVehicleSchema = z.object({
  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),
  registrationNumber: z.string().min(1, "Registration Number is required"),
  connectorType: z.string().min(1, "Connector Type is required"),
  vehicleId: z.string().min(1, "Vehicle ID is required"),
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
        type: "select",
        placeholder: "Select brand",
        required: true,
        options: brandOptions,
      },
      {
        name: "model",
        label: "Model",
        type: "select",
        placeholder: "Select model",
        required: true,
        options: modelOptions,
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
      {
        name: "vehicleId",
        label: "Vehicle ID",
        type: "text",
        placeholder: "E.g. 123-234-245",
        required: true,
      },
    ],
  },
];

export const vehicleCreateFormSections = vehicleFormSections;
export const vehicleEditFormSections = vehicleFormSections;
