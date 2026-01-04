import React from 'react';
import { Edit2Icon, Trash2Icon, PrinterIcon } from 'lucide-react';
import type { EmployeeRowProps } from '../types';
import ActiveToggle from './ActiveToggle';

const EmployeeRow: React.FC<EmployeeRowProps> = ({
  employee,
  onEdit,
  onDelete,
  onToggleStatus,
  onPrint,
}) => {
  // Format date to DD/MM/YYYY
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <tr className="hover:bg-slate-50/50 transition-colors group border-b border-slate-100 last:border-b-0">
      <td className="px-6 py-4 text-sm font-medium text-slate-700">{employee.id}</td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden flex-shrink-0">
            <img
              src={employee.profileImage}
              alt={employee.fullName}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-semibold text-slate-700">{employee.fullName}</span>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-slate-600">{employee.gender}</td>
      <td className="px-6 py-4 text-sm text-slate-600">{formatDate(employee.dateOfBirth)}</td>
      <td className="px-6 py-4 text-sm text-slate-600">{employee.state}</td>
      <td className="px-6 py-4">
        <ActiveToggle
          isActive={employee.isActive}
          onChange={(status) => onToggleStatus(employee.id, status)}
          employeeId={employee.id}
        />
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(employee.id)}
            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
            title="Edit employee"
            aria-label={`Edit ${employee.fullName}`}
          >
            <Edit2Icon size={16} />
          </button>
          <button
            onClick={() => onPrint(employee)}
            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
            title="Print employee details"
            aria-label={`Print ${employee.fullName}`}
          >
            <PrinterIcon size={16} />
          </button>
          <button
            onClick={() => onDelete(employee.id)}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
            title="Delete employee"
            aria-label={`Delete ${employee.fullName}`}
          >
            <Trash2Icon size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default EmployeeRow;
