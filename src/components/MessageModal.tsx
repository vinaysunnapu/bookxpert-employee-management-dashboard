import React from 'react';
import { createPortal } from 'react-dom';
import { CheckCircleIcon, AlertCircleIcon, XIcon } from 'lucide-react';
import type { MessageModalProps } from '../types/MessageModalProps';

const MessageModal: React.FC<MessageModalProps> = ({
  isOpen,
  type = 'success',
  title,
  message,
  onClose,
  autoClose = 3000,
}) => {
  React.useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(onClose, autoClose);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, onClose]);

  if (!isOpen) return null;

  const isSuccess = type === 'success';
  const bgColor = isSuccess 
    ? 'from-emerald-500/20 to-green-500/20' 
    : 'from-rose-500/20 to-red-500/20';
  const borderColor = isSuccess 
    ? 'border-emerald-500/30' 
    : 'border-rose-500/30';
  const iconColor = isSuccess 
    ? 'text-emerald-400' 
    : 'text-rose-400';
  const buttonColor = isSuccess
    ? 'bg-emerald-500/20 hover:bg-emerald-500/30 border-emerald-500/30 hover:border-emerald-500/60'
    : 'bg-rose-500/20 hover:bg-rose-500/30 border-rose-500/30 hover:border-rose-500/60';

  const modalContent = (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md px-4">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl border border-white/10 overflow-hidden transform transition-all animate-fadeIn">
          {/* Header */}
          <div className={`bg-gradient-to-r ${bgColor} border-b ${borderColor} p-6 flex items-center justify-between`}>
            <div className="flex items-center gap-3">
              <div className={`p-3 ${isSuccess ? 'bg-emerald-500/20' : 'bg-rose-500/20'} rounded-xl ${borderColor}`}>
                {isSuccess ? (
                  <CheckCircleIcon size={28} className={iconColor} />
                ) : (
                  <AlertCircleIcon size={28} className={iconColor} />
                )}
              </div>
              <h2 className="text-2xl font-bold text-white">
                {title || (isSuccess ? 'Success' : 'Error')}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-all border border-white/10 hover:border-white/30 text-slate-400 hover:text-white cursor-pointer"
              aria-label="Close modal"
            >
              <XIcon size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            <p className="text-slate-300 text-base leading-relaxed">
              {message}
            </p>
          </div>

          {/* Footer */}
          <div className="bg-white/5 backdrop-blur-md border-t border-white/10 p-6 flex gap-3">
            <button
              onClick={onClose}
              className={`flex-1 px-4 py-3 ${buttonColor} text-white rounded-xl transition-all font-bold border cursor-pointer`}
            >
              {isSuccess ? 'Okay' : 'Close'}
            </button>
          </div>

          {/* Auto-close progress bar */}
          {autoClose && (
            <div
              className={`h-1 bg-gradient-to-r ${isSuccess ? 'from-emerald-500 to-green-500' : 'from-rose-500 to-red-500'}`}
              style={{
                animation: `shrink ${autoClose}ms linear forwards`,
              }}
            />
          )}
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
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
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

export default MessageModal;
