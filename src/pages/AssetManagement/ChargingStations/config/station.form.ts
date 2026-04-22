  import * as z from "zod";
  import type { SectionConfig } from "@/component/form/DynamicForm";

  export const createStationSchema = z.object({
    stationName: z.string().min(1, "Name is required"),
    stationImage: z.any().optional(),
    addressLine1: z.string().min(1, "Address Line 1 is required"),
    pincode: z.string().min(1, "Pincode is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    addressLine2: z.string().optional(),
    latitude: z.string().min(1, "Latitude is required"),
    longitude: z.string().min(1, "Longitude is required"),
    commissionOn: z.string().min(1, "Commission Date is required"),
    supportPersonName: z.string().min(1, "Support Person Name is required"),
    contactNumber: z.string().min(1, "Contact Number is required"),
    emailId: z.string().min(1, "Email Id is required").email("Invalid email"),
    supportImage: z.any().optional(),
    solar: z.string().min(1, "Solar is required"),
    bess: z.string().min(1, "BESS is required"),
    nonSolarGeneration: z.string().min(1, "Non solar generation is required"),
    totalChargingCapacity: z.string().min(1, "Total charging capacity is required"),
    totalOnSiteLoad: z.string().min(1, "Total on-site load is required"),
  });

  export type CreateStationFormValues = z.infer<typeof createStationSchema>;

  export const editStationSchema = createStationSchema.extend({
    stationImage: z.any().optional(),
  });

  export type EditStationFormValues = z.infer<typeof editStationSchema>;

  const sharedSections: SectionConfig<CreateStationFormValues>[] = [
    {
      gridCols: 1,
      fields: [
        { name: "stationName", label: "Station Name", type: "text", placeholder: "Enter Station Name", required: true, className: "w-1/2" },
        { name: "stationImage", label: "Station Image", type: "image", required: false },
      ],
    },
    {
      title: "Add Address",
      gridCols: 2,
      fields: [
        { name: "addressLine1", label: "Address Line 1", type: "text", placeholder: "Enter Address Line 1", required: true },
        { name: "pincode", label: "Pincode", type: "text", placeholder: "Enter Pincode", required: true },
        {
          name: "city",
          label: "City",
          type: "select",
          placeholder: "Enter City",
          required: true,
          options: [
            { label: "New Delhi", value: "new-delhi" },
            { label: "Mumbai", value: "mumbai" },
            { label: "Bangalore", value: "bangalore" },
          ],
        },
        {
          name: "state",
          label: "State",
          type: "select",
          placeholder: "Enter State",
          required: true,
          options: [
            { label: "Delhi", value: "delhi" },
            { label: "Maharashtra", value: "maharashtra" },
            { label: "Karnataka", value: "karnataka" },
          ],
        },
        { name: "addressLine2", label: "Address Line 2", type: "text", placeholder: "Enter Address Line 2" },
      ],
    },
    {
      title: "Add Map Co-ordinates",
      gridCols: 2,
      fields: [
        { name: "latitude", label: "Latitude", type: "text", placeholder: "Enter Latitude", required: true },
        { name: "longitude", label: "Longitude", type: "text", placeholder: "Enter Longitude", required: true },
      ],
    },
    {
      title: "Other Details",
      gridCols: 2,
      fields: [{ name: "commissionOn", label: "Commission On", type: "date", placeholder: "dd/mm/yy", required: true }],
    },
    {
      title: "Support Information",
      gridCols: 2,
      fields: [
        { name: "supportPersonName", label: "Support Person Name", type: "text", placeholder: "Enter Name", required: true },
        { name: "contactNumber", label: "Contact Number", type: "text", placeholder: "Enter Number", required: true },
        { name: "emailId", label: "Email Id", type: "email", placeholder: "Enter Email Id", required: true },
        { name: "supportImage", label: "Upload Image", type: "image-upload", required: false },
      ],
    },
    {
      title: "Energy infrastructure & capacity",
      gridCols: 2,
      fields: [
        { name: "solar", label: "Solar", type: "text", placeholder: "E.g. 50 KWp", required: true },
        { name: "bess", label: "BESS - battery energy storage system", type: "text", placeholder: "E.g. 100 KWh", required: true },
        { name: "nonSolarGeneration", label: "Non solar generation", type: "text", placeholder: "E.g. 100 KW", required: true },
        { name: "totalChargingCapacity", label: "Total installed EV charging capacity", type: "text", placeholder: "E.g. 100 KWh", required: true },
        { name: "totalOnSiteLoad", label: "Total on-site load", type: "text", placeholder: "E.g. 100 KW", required: true },
      ],
    },
  ];

  export const stationCreateFormSections = sharedSections;
  export const stationEditFormSections: SectionConfig<EditStationFormValues>[] = sharedSections.map((section) => ({
    ...section,
    title: section.title
      ?.replace("Add Address", "Edit Address")
      .replace("Add Map Co-ordinates", "Edit Map Co-ordinates"),
  })) as SectionConfig<EditStationFormValues>[];
