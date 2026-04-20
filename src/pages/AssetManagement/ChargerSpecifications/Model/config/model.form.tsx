import { z } from "zod";
import type { SectionConfig } from "@/component/form/DynamicForm.types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/component/ui/select";
import { Button } from "@/component/ui/button";
import { FieldLabel } from "@/component/ui/input";

export const CreateModelSchema = z.object({
  oem: z.string().min(1, "OEM is required"),
  modelName: z.string().min(1, "Model Name is required"),
  outputMax: z.string().min(1, "Output Max is required"),
  chargerModelType: z.string().min(1, "Charger Model Type is required"),
  currentType: z.string().min(1, "Current Type is required"),
  phase: z.string().min(1, "Phase is required"),
  manualPdf: z.any().optional(),
  specPdf: z.any().optional(),
  connectors: z.array(z.string().min(1, "Select a connector")).min(1, "At least one connector is required"),
});

export type CreateModelFormValues = z.infer<typeof CreateModelSchema>;

export const CreateModelSections: SectionConfig<CreateModelFormValues>[] = [
  {
    gridCols: 2,
    fields: [
      {
        name: "oem",
        label: "OEM",
        type: "select",
        required: true,
        placeholder: "OEM 1",
        options: [
          { label: "OEM 1", value: "OEM 1" },
          { label: "Axon Energies", value: "Axon Energies" },
        ],
      },
      {
        name: "modelName",
        label: "Model Name",
        type: "text",
        required: true,
        placeholder: "Model 12",
      },
      {
        name: "outputMax",
        label: "Output Max (A)",
        type: "text",
        required: true,
        placeholder: "12",
      },
      {
        name: "chargerModelType",
        label: "Charger Model Type",
        type: "select",
        required: true,
        placeholder: "AC",
        options: [
          { label: "AC", value: "AC" },
          { label: "DC", value: "DC" },
        ],
      },
      {
        name: "currentType",
        label: "Current Type",
        type: "select",
        required: true,
        placeholder: "AC",
        options: [
          { label: "AC", value: "AC" },
          { label: "DC", value: "DC" },
        ],
      },
      {
        name: "phase",
        label: "Phase",
        type: "select",
        required: true,
        placeholder: "1",
        options: [
          { label: "1", value: "1" },
          { label: "2", value: "2" },
          { label: "3", value: "3" },
        ],
      },
      {
        name: "manualPdf",
        label: "User Manual PDF",
        type: "custom",
        customComponent: ({ field, fieldState }) => (
          <div className="flex flex-col">
            <FieldLabel label="User Manual PDF" />
            <div className="relative">
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => field.onChange(e.target.files?.[0])}
              />
              <div className="flex items-center justify-between w-full h-[42px] px-4 border border-text-200 rounded-lg bg-white text-text-500">
                <span className="truncate">{field.value?.name || "Choose file..."}</span>
                <span className="text-gray-400">📄</span>
              </div>
            </div>
            {fieldState.error && (
              <p className="mt-1 text-xs text-danger">{fieldState.error.message}</p>
            )}
          </div>
        )
      },
      {
        name: "specPdf",
        label: "Specification PDF",
        type: "custom",
        customComponent: ({ field, fieldState }) => (
          <div className="flex flex-col">
            <FieldLabel label="Specification PDF" />
            <div className="relative">
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => field.onChange(e.target.files?.[0])}
              />
              <div className="flex items-center justify-between w-full h-[42px] px-4 border border-text-200 rounded-lg bg-white text-text-500">
                <span className="truncate">{field.value?.name || "Choose file..."}</span>
                <span className="text-gray-400">📄</span>
              </div>
            </div>
            {fieldState.error && (
              <p className="mt-1 text-xs text-danger">{fieldState.error.message}</p>
            )}
          </div>
        )
      },
    ],
  },
  {
    title: "Select Connector",
    gridCols: 1, // Only one logical field block spanning the full row
    className: "mt-6",
    fields: [
      {
        name: "connectors",
        type: "custom",
        customComponent: ({ field, fieldState }) => {
          const values: string[] = Array.isArray(field.value) && field.value.length > 0 ? field.value : [""];

          const updateAt = (index: number, val: string) => {
            const next = [...values];
            next[index] = val;
            field.onChange(next);
          };

          const removeAt = (index: number) => {
            const next = values.filter((_, i) => i !== index);
            field.onChange(next.length ? next : [""]);
          };

          const addRow = () => field.onChange([...values, ""]);

          return (
            <div className="flex flex-col gap-4 w-full">
              {values.map((val: string, index: number) => (
                <div key={index} className="flex gap-4 items-center w-full md:w-1/2">
                  <div className="flex flex-col flex-1">
                    {index === 0 && <FieldLabel label="Connector" required />}
                    <Select value={val || ""} onValueChange={(v) => updateAt(index, v)}>
                      <SelectTrigger
                        className={`h-[42px] ${
                          fieldState.error && !val ? "border-danger text-danger focus:ring-danger" : ""
                        }`}
                      >
                        <SelectValue placeholder="Select Connector" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="type-1">Type - 1 Connector</SelectItem>
                        <SelectItem value="type-2">Type - 2 Connector</SelectItem>
                        <SelectItem value="type-5">Type - 5 Connector</SelectItem>
                        <SelectItem value="type-6">Type - 6 Connector</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {values.length > 1 && (
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => removeAt(index)}
                      className={`text-danger border-danger hover:bg-red-50 px-3 h-[42px] ${index === 0 ? "mt-6" : ""}`}
                    >
                      Remove
                    </Button>
                  )}

                  {index === values.length - 1 && (
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={addRow}
                      className={`whitespace-nowrap px-4 bg-white hover:bg-gray-50 border-text-200 text-text-700 h-[42px] ${index === 0 ? "mt-6" : ""}`}
                    >
                      <span className="mr-1 inline-flex items-center">+</span> Add Connector
                    </Button>
                  )}
                </div>
              ))}
              {fieldState.error && (
                <p className="mt-1 text-xs text-danger">
                  {typeof fieldState.error.message === "string"
                    ? fieldState.error.message
                    : "Please select all connectors"}
                </p>
              )}
            </div>
          );
        },
      },
    ],
  },
];
