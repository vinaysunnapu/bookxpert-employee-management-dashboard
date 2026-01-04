import React from 'react';
import type { SelectInputProps } from '../types';

const SelectInput: React.FC<SelectInputProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Select an option',
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer hover:border-slate-300"
    >
      <option value="All">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
