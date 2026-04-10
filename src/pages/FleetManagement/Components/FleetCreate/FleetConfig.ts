import * as z from "zod";
import type { SectionConfig } from "@/component/form/DynamicForm";

export const createFleetSchema = z.object({
  name: z.string().min(1, "Name is required"),
  companyName: z.string().min(1, "Company name is required"),
  contactPerson: z.string().min(1, "Contact person is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  status: z.string().min(1, "Status is required"),
});

export type CreateFleetFormValues = z.infer<typeof createFleetSchema>;

export const fleetFormSections: SectionConfig<CreateFleetFormValues>[] = [
  {
    gridCols: 2,
    fields: [
      {
        name: "name",
        label: "Fleet Name",
        type: "text",
        placeholder: "Enter fleet name",
      },
      {
        name: "companyName",
        label: "Company Name",
        type: "text",
        placeholder: "Enter company name",
      },
      {
        name: "contactPerson",
        label: "Contact Person",
        type: "text",
        placeholder: "Enter contact person name",
      },
      {
        name: "email",
        label: "Email Address",
        type: "text",
        placeholder: "example@company.com",
      },
      {
        name: "phone",
        label: "Phone Number",
        type: "text",
        placeholder: "+1 (555) 000-0000",
      },
      {
        name: "status",
        label: "Status",
        type: "select",
        placeholder: "Select status",
        options: [
          { label: "Active", value: "active" },
          { label: "Inactive", value: "inactive" },
        ],
      },
    ],
  },
];
