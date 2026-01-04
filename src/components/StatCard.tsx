import React from 'react';
import type { StatCardProps } from '../types';

const StatCard: React.FC<StatCardProps> = ({ title, count, icon, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-slate-800">{count}</h3>
    </div>
    <div className={`p-4 rounded-xl ${color}`}>
      {icon}
    </div>
  </div>
);

export default StatCard;
