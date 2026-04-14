import * as z from "zod";
import type { SectionConfig } from "@/component/form/DynamicForm";

/**
 * 🔹 Validation Schema
 */
export const createFleetSchema = z.object({
    name: z.string().min(1, "Organisation name is required"),
    contact: z
        .string()
        .min(10, "Contact number must be at least 10 digits"),
    email: z.string().email("Invalid email address"),
});

export type CreateFleetFormValues = z.infer<typeof createFleetSchema>;

/**
 * 🔹 Form Layout (matches your UI image)
 */
export const fleetFormSections: SectionConfig<CreateFleetFormValues>[] = [
    {
        gridCols: 1,
        fields: [
            {
                name: "name",
                label: "Organisation Name",
                type: "text",
                placeholder: "Enter organisation name",
                required: true,
            },
        ],
    },
    {
        gridCols: 2,
        fields: [
            {
                name: "contact",
                label: "Contact Number",
                type: "text",
                placeholder: "Enter contact number",
                required: true,
            },
            {
                name: "email",
                label: "Mail ID",
                type: "text",
                placeholder: "Enter email address",
                required: true,
            },
        ],
    },
];