import { IndividualTaxReturnFormInput } from "@/app/(site)/individual-tax-return/schema";
import { z } from "zod";

// Define the possible field types
type FieldType =
  | "text"
  | "email"
  | "number"
  | "date"
  | "checkbox"
  | "radio"
  | "select"
  | "signature"
  | "textarea";

interface DateFieldPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

// Helper type to infer the type from a Zod schema
type Infer<T> = T extends z.ZodType<infer R> ? R : never;

// Updated NestedKeys type
type NestedKeys<T, Prefix extends string = ""> = T extends z.ZodType
  ? NestedKeys<Infer<T>, Prefix>
  : T extends Array<any>
  ? `${Prefix}${number}`
  : T extends object
  ? {
      [K in keyof T & (string | number)]: T[K] extends z.ZodType
        ? `${Prefix}${K}` | NestedKeys<Infer<T[K]>, `${Prefix}${K}.`>
        : T[K] extends object
        ? `${Prefix}${K}` | NestedKeys<T[K], `${Prefix}${K}.`>
        : `${Prefix}${K}`;
    }[keyof T & (string | number)]
  : never;

export type FormFieldName = NestedKeys<IndividualTaxReturnFormInput>;

interface BaseFormField {
  name: FormFieldName;
  type: FieldType;
  label: string;
  x: number;
  y: number;
  disabled?: boolean;
  onBlur?: (value: string | boolean) => void;
  value?: string | number | Date | boolean;
  width: number;
  height: number;
  isVisible?: boolean;
  isShowInPDF?: boolean;
  imageIndex: number;
}

interface RadioFormField extends BaseFormField {
  type: "radio";
  options: Array<{
    label: string;
    value: string | boolean;
    x: number;
    y: number;
    width: number;
    height: number;
  }>;
  resetFields?: (keyof IndividualTaxReturnFormInput)[];
}

interface TextAreaFormField extends BaseFormField {
  type: "textarea";
  rows?: number;
  cols?: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface SelectFormField extends BaseFormField {
  type: "select";
  options: Array<{ label: string; value: string }>;
  placeholder: string;
}

interface DateFormField extends BaseFormField {
  type: "date";
  dayPosition: DateFieldPosition;
  monthPosition: DateFieldPosition;
  yearPosition: DateFieldPosition;
}

interface SignatureFormField extends BaseFormField {
  type: "signature";
}

type OtherFormField = Omit<BaseFormField, "type"> & {
  type: Exclude<
    FieldType,
    "radio" | "select" | "date" | "signature" | "textarea"
  >;
};

export type FormField =
  | RadioFormField
  | SelectFormField
  | DateFormField
  | SignatureFormField
  | OtherFormField
  | TextAreaFormField;
