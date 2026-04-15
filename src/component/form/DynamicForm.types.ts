/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react";
import type { DefaultValues, FieldValues, Path } from "react-hook-form";
import type * as z from "zod";

export type FieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "date"
  | "select"
  | "phone"
  | "image"
  | "image-upload"
  | "switch"
  | "custom";

export interface FieldConfig<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  type: FieldType;
  placeholder?: string;
  options?: { label: string; value: string }[];
  required?: boolean;
  disabled?: boolean;
  colSpan?: number;
  className?: string;
  isPublic?: boolean;
  customComponent?: (props: {
    field: any;
    fieldState: any;
    formState: any;
  }) => React.ReactNode;
}

export interface SectionConfig<T extends FieldValues> {
  title?: string;
  fields: FieldConfig<T>[];
  gridCols?: number;
  className?: string;
}

export interface DynamicFormProps<T extends FieldValues> {
  schema: z.ZodType<T>;
  defaultValues?: DefaultValues<T>;
  onSubmit: (data: T) => void;
  sections?: SectionConfig<T>[];
  fields?: FieldConfig<T>[];
  submitLabel?: string;
  cancelLabel?: string;
  onCancel?: () => void;
  className?: string;
  isSubmitting?: boolean;
}
