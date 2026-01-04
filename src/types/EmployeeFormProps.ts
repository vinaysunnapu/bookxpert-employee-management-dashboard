import type { Employee } from './Employee';

/**
 * Props for EmployeeForm component
 * Used for both Add and Edit operations
 */
export interface EmployeeFormProps {
  initialData?: Employee;
  onSubmit: (employee: Omit<Employee, 'id'>) => void;
  isLoading?: boolean;
  submitButtonText?: string;
}
