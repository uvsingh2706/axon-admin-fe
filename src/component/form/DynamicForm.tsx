/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import { useForm, Controller, type DefaultValues, type Path, type FieldValues } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

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

export type FieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "date"
  | "select"
  | "phone"
  | "image"
  | "switch"
  | "custom"

export interface FieldConfig<T extends FieldValues> {
  name: Path<T>
  label?: string
  type: FieldType
  placeholder?: string
  options?: { label: string; value: string }[]
  required?: boolean
  disabled?: boolean
  colSpan?: number // Number of columns to span (e.g., 2 in a 2-column grid)
  className?: string
  isPublic?: boolean
  customComponent?: (props: {
    field: any
    fieldState: any
    formState: any
  }) => React.ReactNode
}

export interface SectionConfig<T extends FieldValues> {
  title?: string
  fields: FieldConfig<T>[]
  gridCols?: number // e.g. 2 for 2-col layout
  className?: string
}

export interface DynamicFormProps<T extends FieldValues> {
  schema: z.ZodType<T>
  defaultValues?: DefaultValues<T>
  onSubmit: (data: T) => void
  sections?: SectionConfig<T>[]
  fields?: FieldConfig<T>[]
  submitLabel?: string
  cancelLabel?: string
  onCancel?: () => void
  className?: string
  isSubmitting?: boolean
}

function ImageUploadField({
  onChange,
  value,
  error,
}: {
  onChange: (file: File | null) => void
  value?: File | string | null
  error?: boolean
}) {
  const [preview, setPreview] = React.useState<string | null>(
    typeof value === "string" ? value : null
  )

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setPreview(null)
    }
    onChange(file)
  }

  return (
    <div className="flex w-full flex-col justify-center">
      <div
        className={cn(
          "relative flex h-40 w-40 flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed mx-auto",
          error ? "border-danger bg-danger/5" : "border-border bg-gray-50",
          "transition-colors hover:bg-gray-100"
        )}
      >
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
          onChange={handleFileChange}
        />
        {preview ? (
          <img src={preview} alt="Preview" className="h-full w-full object-cover" />
        ) : (
          <div className="flex flex-col items-center justify-center">
            <span className="text-3xl font-light text-text-400">+</span>
            <span className="mt-1 text-xs text-text-500">Upload Image</span>
          </div>
        )}
      </div>
    </div>
  )
}

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

    console.log(fieldConfig, 'helllo');
    
    return (
      <Controller
        key={fieldConfig.name}
        control={control}
        name={fieldConfig.name}
        render={({ field, fieldState, formState }) => {
          const errorMsg = fieldState.error?.message

          // 1. Image Upload
          if (fieldConfig.type === "image") {
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
          }

          // 2. Select Field
          if (fieldConfig.type === "select") {
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
          }

          // 3. Custom Component
          if (fieldConfig.type === "custom" && fieldConfig.customComponent) {
            return (
              <div className={fieldConfig.className}>
                {fieldConfig.customComponent({ field, fieldState, formState })}
                <ErrorMessage message={errorMsg} />
              </div>
            )
          }

          // 4 Date Component
          if (fieldConfig.type === "date") {
            // Note: form typically handles dates as strings "yyyy-MM-dd" or full ISO, adapt as needed
            const dateValue = field.value ? new Date(field.value) : undefined;
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
                    const d = date as Date;
                    field.onChange(d ? d.toISOString() : "");
                  }}
                  placeholder={fieldConfig.placeholder}
                  disabled={field.disabled}
                  error={!!errorMsg}
                />
                <ErrorMessage message={errorMsg} />
              </div>
            )
          }

          // 5. Switch Component
          if (fieldConfig.type === "switch") {
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
          }

          // 6. Default: Input Component (handles text, email, password, phone, etc)
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
