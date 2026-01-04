/**
 * Option item for SelectInput dropdown
 */
export interface SelectOption {
  value: string;
  label: string;
}

/**
 * Props for SelectInput component
 * Reusable dropdown component
 */
export interface SelectInputProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
}
