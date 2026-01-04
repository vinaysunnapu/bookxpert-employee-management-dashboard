import React from 'react';
import type { ActiveToggleProps } from '../types';

const ActiveToggle: React.FC<ActiveToggleProps> = ({ isActive, onChange, employeeId }) => {
  return (
    <button
      onClick={() => onChange(!isActive)}
      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all shadow-md cursor-pointer ${
        isActive ? 'bg-emerald-500 shadow-emerald-500/50' : 'bg-slate-600'
      }`}
      aria-label={`Toggle active status for employee ${employeeId}`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-sm ${
          isActive ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
};

export default ActiveToggle;
