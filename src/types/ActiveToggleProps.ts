/**
 * Props for ActiveToggle component
 * Status toggle switch
 */
export interface ActiveToggleProps {
  isActive: boolean;
  onChange: (isActive: boolean) => void;
  employeeId: string;
}
