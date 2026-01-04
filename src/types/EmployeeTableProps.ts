import type { Employee } from './Employee';

/**
 * Props for EmployeeTable component
 * Main table display component
 */
export interface EmployeeTableProps {
  employees: Employee[];
  loading?: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, status: boolean) => void;
  onPrint: (employee: Employee) => void;
}
