import React, { useState } from 'react';
import { Edit2Icon, Trash2Icon, PrinterIcon } from 'lucide-react';
import type { EmployeeRowProps } from '../types';
import ActiveToggle from './ActiveToggle';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const EmployeeRow: React.FC<EmployeeRowProps> = ({
  employee,
  onEdit,
  onDelete,
  onToggleStatus,
  onPrint,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Format date to DD/MM/YYYY
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
    onDelete(employee.id);
  };

  return (
    <>
      <tr className="hover:bg-white/5 transition-all group border-b border-white/10 last:border-b-0">
        <td className="px-6 py-4 text-sm font-bold text-white/80">{employee.id}</td>
        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 border-2 border-white/20 shadow-lg overflow-hidden flex-shrink-0">
              <img
                src={employee.profileImage}
                alt={employee.fullName}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-bold text-white">{employee.fullName}</span>
          </div>
        </td>
        <td className="px-6 py-4 text-sm text-slate-300">{employee.gender}</td>
        <td className="px-6 py-4 text-sm text-slate-300">{formatDate(employee.dateOfBirth)}</td>
        <td className="px-6 py-4 text-sm text-slate-300">{employee.state}</td>
        <td className="px-6 py-4">
          <ActiveToggle
            isActive={employee.isActive}
            onChange={(status) => onToggleStatus(employee.id, status)}
            employeeId={employee.id}
          />
        </td>
        <td className="px-6 py-4 text-right">
          <div className="flex justify-end gap-2">
            <button
              onClick={() => onEdit(employee.id)}
              className="p-2.5 text-blue-300 hover:text-blue-200 hover:bg-blue-500/20 rounded-lg transition-all border border-blue-500/30 hover:border-blue-500/60 cursor-pointer"
              title="Edit employee"
              aria-label={`Edit ${employee.fullName}`}
            >
              <Edit2Icon size={16} />
            </button>
            <button
              onClick={() => onPrint(employee)}
              className="p-2.5 text-purple-300 hover:text-purple-200 hover:bg-purple-500/20 rounded-lg transition-all border border-purple-500/30 hover:border-purple-500/60 cursor-pointer"
              title="Print employee details"
              aria-label={`Print ${employee.fullName}`}
            >
              <PrinterIcon size={16} />
            </button>
            <button
              onClick={handleDeleteClick}
              className="p-2.5 text-rose-300 hover:text-rose-200 hover:bg-rose-500/20 rounded-lg transition-all border border-rose-500/30 hover:border-rose-500/60 cursor-pointer"
              title="Delete employee"
              aria-label={`Delete ${employee.fullName}`}
            >
              <Trash2Icon size={16} />
            </button>
          </div>
        </td>
      </tr>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        title="Delete Employee"
        message="Are you sure you want to delete this employee? This action cannot be undone."
        itemName={employee.fullName}
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowDeleteModal(false)}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
};

export default EmployeeRow;
