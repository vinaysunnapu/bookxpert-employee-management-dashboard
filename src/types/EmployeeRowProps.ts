import type { Employee } from './Employee';

/**
 * Props for EmployeeRow component
 * Individual table row component
 */
export interface EmployeeRowProps {
  employee: Employee;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, status: boolean) => void;
  onPrint: (employee: Employee) => void;
}
