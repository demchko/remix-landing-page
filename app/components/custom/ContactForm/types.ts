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
}
