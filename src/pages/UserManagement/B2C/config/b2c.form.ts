import * as z from "zod";
import type { SectionConfig } from "@/component/form/DynamicForm";

export const createB2CSchema = z.object({
  driverName: z.string().min(1, "Name is required"),
  personalEmailId: z.string().email("Enter a valid email").or(z.literal("")),
  phoneNumber: z.string().min(6, "Enter a valid phone number"),
  location: z.string().min(1, "Location is required"),
  image: z.string().optional(),
});

export type CreateB2CFormValues = z.infer<typeof createB2CSchema>;
export const editB2CSchema = createB2CSchema;
export type EditB2CFormValues = z.infer<typeof editB2CSchema>;

const b2cEditFields: SectionConfig<EditB2CFormValues>[] = [
  {
    title: "Personal Information",
    gridCols: 2,
    fields: [
      {
        name: "driverName",
        label: "Driver Name",
        type: "text",
        placeholder: "Enter name",
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
        type: "text",
        placeholder: "Eg. rahul.sharma123@gmail.com",
        required: true,
      },
      {
        name: "phoneNumber",
        label: "Phone number",
        type: "text",
        placeholder: "+91 8721937813",
        required: true,
      },
      {
        name: "location",
        label: "Location",
        type: "text",
        placeholder: "Enter location",
        required: true,
      },
    ],
  },
];

export const b2cCreateFormSections = b2cEditFields;
export const b2cEditFormSections = b2cEditFields;
