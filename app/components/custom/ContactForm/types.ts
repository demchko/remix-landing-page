import { FieldMetadata } from "@conform-to/react";

export interface RadioOption {
  id: string;
  value: string;
  label: string;
}

export interface FormFieldProps {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  className?: string;
  stringType: FieldMetadata<
    string,
    {
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
      subject: "general" | "support" | "billing" | "feedback";
      message: string;
    },
    string[]
  >;
  error: string[] | undefined;
}
