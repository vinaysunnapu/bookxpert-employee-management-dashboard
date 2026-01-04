import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { EmployeeTableProps } from "../types";
import EmployeeRow from "./EmployeeRow";

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  onEdit,
  onDelete,
  onToggleStatus,
  onPrint,
  loading = false,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) => {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
      {loading ? (
        <div className="p-20 text-center text-slate-400 text-lg font-semibold">
          Loading employees...
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-linear-to-r from-white/10 to-white/5 border-b border-white/10 sticky top-0">
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
                      <p className="text-slate-300 font-semibold text-lg">
                        No employees found matching your criteria.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="px-6 py-5 border-t border-white/10 flex items-center justify-between bg-white/2">
              <div className="text-sm text-slate-300 font-medium">
                Showing page{" "}
                <span className="text-white font-bold">{currentPage}</span> of{" "}
                <span className="text-white font-bold">{totalPages}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onPageChange?.(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/5"
                >
                  <ChevronLeft size={18} />
                  Previous
                </button>
                <button
                  onClick={() => onPageChange?.(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/5"
                >
                  Next
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EmployeeTable;
