import React from 'react';
import type { ActiveToggleProps } from '../types';

const ActiveToggle: React.FC<ActiveToggleProps> = ({ isActive, onChange, employeeId }) => {
  return (
    <button
      onClick={() => onChange(!isActive)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        isActive ? 'bg-emerald-500' : 'bg-slate-300'
      }`}
      aria-label={`Toggle active status for employee ${employeeId}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          isActive ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
};

export default ActiveToggle;
