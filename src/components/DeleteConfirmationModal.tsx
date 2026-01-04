import React from 'react';
import { createPortal } from 'react-dom';
import { Trash2Icon, XIcon } from 'lucide-react';
import type { DeleteConfirmationModalProps } from '../types/DeleteConfirmationModalProps';

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  title = 'Confirm Delete',
  message = 'Are you sure you want to delete this item?',
  itemName,
  onConfirm,
  onCancel,
  isLoading = false,
  confirmText = 'Delete',
  cancelText = 'Cancel',
}) => {
  if (!isOpen) return null;

  const modalContent = (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md px-4">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl border border-white/10 overflow-hidden transform transition-all animate-fadeIn">
          {/* Header */}
          <div className="bg-gradient-to-r from-rose-500/20 to-pink-500/20 border-b border-white/10 p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-rose-500/20 rounded-xl border border-rose-500/30">
                <Trash2Icon size={24} className="text-rose-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">{title}</h2>
            </div>
            <button
              onClick={onCancel}
              className="p-2 hover:bg-white/10 rounded-lg transition-all border border-white/10 hover:border-white/30 text-slate-400 hover:text-white cursor-pointer"
              aria-label="Close modal"
            >
              <XIcon size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            <p className="text-slate-300 text-base leading-relaxed mb-2">
              {message}
            </p>
            {itemName && (
              <p className="text-white font-semibold text-lg break-words">
                &quot;{itemName}&quot;
              </p>
            )}
            <p className="text-slate-400 text-sm mt-4">
              This action cannot be undone.
            </p>
          </div>

          {/* Footer */}
          <div className="bg-white/5 backdrop-blur-md border-t border-white/10 p-6 flex gap-3">
            <button
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 disabled:bg-white/5 text-white rounded-xl transition-all font-bold border border-white/20 hover:border-white/40 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 disabled:from-rose-400 disabled:to-pink-400 text-white rounded-xl transition-all font-bold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:scale-100 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {confirmText}ing...
                </>
              ) : (
                <>
                  <Trash2Icon size={18} />
                  {confirmText}
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );

  return createPortal(modalContent, document.body);
};

export default DeleteConfirmationModal;
