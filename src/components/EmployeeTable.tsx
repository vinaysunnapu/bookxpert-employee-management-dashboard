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
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
      {loading ? (
        <div className="p-20 text-center text-slate-400 text-lg font-semibold">Loading employees...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gradient-to-r from-white/10 to-white/5 border-b border-white/10 sticky top-0">
              <tr>
                <th className="px-6 py-5 text-xs font-bold text-white uppercase tracking-widest">
                  Employee ID
                </th>
                <th className="px-6 py-5 text-xs font-bold text-white uppercase tracking-widest">
                  Full Name
                </th>
                <th className="px-6 py-5 text-xs font-bold text-white uppercase tracking-widest">
                  Gender
                </th>
                <th className="px-6 py-5 text-xs font-bold text-white uppercase tracking-widest">
                  Date of Birth
                </th>
                <th className="px-6 py-5 text-xs font-bold text-white uppercase tracking-widest">
                  State
                </th>
                <th className="px-6 py-5 text-xs font-bold text-white uppercase tracking-widest">
                  Active
                </th>
                <th className="px-6 py-5 text-xs font-bold text-white uppercase tracking-widest text-right">
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
                    <p className="text-slate-300 font-semibold text-lg">No employees found matching your criteria.</p>
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
