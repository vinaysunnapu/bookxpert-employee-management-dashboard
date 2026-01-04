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
      className="px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer hover:border-white/30 backdrop-blur-md font-medium"
    >
      <option value="All" className="bg-slate-900 text-white">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value} className="bg-slate-900 text-white">
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
