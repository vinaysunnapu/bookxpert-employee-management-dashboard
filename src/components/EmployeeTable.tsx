import React from 'react';
import type { EmployeeTableProps } from '../types';
import EmployeeRow from './EmployeeRow';

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  onEdit,
  onDelete,
  onToggleStatus,
  onPrint,
  loading = false,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      {loading ? (
        <div className="p-20 text-center text-slate-500">Loading employees...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 sticky top-0">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Employee ID
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Full Name
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Gender
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Date of Birth
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  State
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Active
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-700 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((employee) => (
                  <EmployeeRow
                    key={employee.id}
                    employee={employee}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onToggleStatus={onToggleStatus}
                    onPrint={onPrint}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-20 text-center">
                    <p className="text-slate-400 font-medium">No employees found matching your criteria.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;
