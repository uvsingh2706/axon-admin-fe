/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, Controller, type FieldValues } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input, FieldLabel, ErrorMessage } from "@/component/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/component/ui/select"
import { Button } from "@/component/ui/button"
import { cn } from "@/lib/utils"
import { DatePicker } from "@/component/form-date"
import { Switch } from "@/component/ui/switch"
import ImageUploadField from "./imageUploadField/ImageUploadField"
import DriverImageUploadField from "./imageUploadField/AvatarImageUploadField"
import type { DynamicFormProps, FieldConfig } from "./DynamicForm.types"
export type {
  DynamicFormProps,
  FieldConfig,
  FieldType,
  SectionConfig,
} from "./DynamicForm.types"

export function DynamicForm<T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  sections = [],
  fields = [],
  submitLabel = "Submit",
  cancelLabel = "Cancel",
  onCancel,
  className,
  isSubmitting,
}: DynamicFormProps<T>) {
  const {
    control,
    handleSubmit,
    formState,
  } = useForm({
    resolver: zodResolver(schema as any),
    defaultValues: defaultValues as any,
    mode: "onChange",
  })

  // Normalize structure: flat fields are wrapped in a default section
  const normalizedSections = sections.length
    ? sections
    : [{ fields, gridCols: 2 }]

  const renderField = (fieldConfig: FieldConfig<T>) => {
    return (
      <Controller
        key={fieldConfig.name}
        control={control}
        name={fieldConfig.name}
        render={({ field, fieldState, formState }) => {
          const errorMsg = fieldState.error?.message
          switch (fieldConfig.type) {
            case "image":
              return (
                <div className={cn("flex flex-col", fieldConfig.className)}>
                  {fieldConfig.label && (
                    <FieldLabel
                      label={fieldConfig.label}
                      required={fieldConfig.required}
                    />
                  )}
                  <ImageUploadField
                    onChange={field.onChange}
                    value={field.value}
                    error={!!fieldState.error}
                  />
                  <ErrorMessage message={errorMsg} />
                </div>
              )

            case "image-upload":
              return (
                <div className={cn("flex flex-col", fieldConfig.className)}>
                  {fieldConfig.label && (
                    <FieldLabel
                      label={fieldConfig.label}
                      required={fieldConfig.required}
                    />
                  )}
                  <DriverImageUploadField
                    onChange={field.onChange}
                    value={field.value}
                    error={!!fieldState.error}
                  />
                  <ErrorMessage message={errorMsg} />
                </div>
              )

            case "select":
              return (
                <div className={cn("flex flex-col", fieldConfig.className)}>
                  {fieldConfig.label && (
                    <FieldLabel
                      label={fieldConfig.label}
                      required={fieldConfig.required}
                    />
                  )}
                  <Select
                    value={field.value || ""}
                    onValueChange={field.onChange}
                    disabled={field.disabled}
                  >
                    <SelectTrigger
                      className={cn(
                        "w-full h-[42px] px-4",
                        fieldState.error && "border-danger text-danger focus:ring-danger"
                      )}
                    >
                      <SelectValue placeholder={fieldConfig.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {fieldConfig.options?.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <ErrorMessage message={errorMsg} />
                </div>
              )

            case "custom":
              if (!fieldConfig.customComponent) {
                return <ErrorMessage message="Custom component is required." />
              }
              return (
                <div className={fieldConfig.className}>
                  {fieldConfig.customComponent({ field, fieldState, formState })}
                  <ErrorMessage message={errorMsg} />
                </div>
              )

            case "date": {
              const dateValue = field.value ? new Date(field.value) : undefined
              return (
                <div className={cn("flex flex-col", fieldConfig.className)}>
                  {fieldConfig.label && (
                    <FieldLabel
                      label={fieldConfig.label}
                      required={fieldConfig.required}
                    />
                  )}
                  <DatePicker
                    mode="single"
                    value={dateValue}
                    onChange={(date) => {
                      const d = date as Date
                      field.onChange(d ? d.toISOString() : "")
                    }}
                    placeholder={fieldConfig.placeholder}
                    disabled={field.disabled}
                    error={!!errorMsg}
                  />
                  <ErrorMessage message={errorMsg} />
                </div>
              )
            }

            case "switch":
              return (
                <div className={cn("flex items-center justify-between w-full h-[42px] px-4 border border-text-200 rounded-lg bg-white mt-[24px]", fieldConfig.className)}>
                  <span className="subtitle-3-regular text-text-700">{fieldConfig.label}</span>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={fieldConfig.disabled || formState.isSubmitting}
                    defaultChecked={fieldConfig?.isPublic}
                  />
                  <ErrorMessage message={errorMsg} />
                </div>
              )

            default: {
              const inputType =
                fieldConfig.type === "phone" ? "phone" : fieldConfig.type
              return (
                <Input
                  type={inputType}
                  label={fieldConfig.label}
                  required={fieldConfig.required}
                  placeholder={fieldConfig.placeholder}
                  error={!!errorMsg}
                  errorMessage={errorMsg}
                  className={fieldConfig.className}
                  disabled={fieldConfig.disabled || formState.isSubmitting}
                  {...field}
                />
              )
            }
          }
        }}
      />
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit as any)}
      className={cn("flex flex-col gap-8", className)}
    >
      {normalizedSections.map((section, idx) => {
        const gridColsClass =
          section.gridCols === 1
            ? "grid-cols-1"
            : section.gridCols === 3
              ? "grid-cols-1 md:grid-cols-3"
              : "grid-cols-1 md:grid-cols-2" // Default to 2 columns

        return (
          <div key={idx} className={cn("flex flex-col gap-4", section.className)}>
            {section.title && (
              <h3 className="text-lg font-semibold text-text-950">
                {section.title}
              </h3>
            )}
            <div className={cn("grid gap-x-6 gap-y-4", gridColsClass)}>
              {section.fields.map((fieldConf) => {
                const colSpanClass = fieldConf.colSpan
                  ? fieldConf.colSpan === 2
                    ? "col-span-1 md:col-span-2"
                    : fieldConf.colSpan === 3
                      ? "col-span-1 md:col-span-3"
                      : "col-span-1"
                  : "col-span-1"

                return (
                  <div key={fieldConf.name} className={colSpanClass}>
                    {renderField(fieldConf)}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}

      <div className="flex justify-end gap-3 mt-4">
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isSubmitting}
            className="min-w-[120px]"
          >
            {cancelLabel}
          </Button>
        )}
        <Button
          type="submit"
          className="min-w-[150px]"
          disabled={isSubmitting || !formState.isValid}
        >
          {isSubmitting ? "Submitting..." : submitLabel}
        </Button>
      </div>
    </form>
  )
}
