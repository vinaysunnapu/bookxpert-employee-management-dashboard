import React from 'react';
import type { StatCardProps } from '../types';

const StatCard: React.FC<StatCardProps> = ({ title, count, icon, color }) => (
  <div className={`${color} p-8 rounded-2xl shadow-xl backdrop-blur-xl flex items-center justify-between transform transition-all hover:scale-105 hover:shadow-2xl`}>
    <div>
      <p className="text-sm font-semibold text-slate-300 mb-2 uppercase tracking-wide">{title}</p>
      <h3 className="text-4xl font-black text-white drop-shadow-lg">{count}</h3>
    </div>
    <div className={`p-5 rounded-2xl bg-white/10 backdrop-blur-md`}>
      {icon}
    </div>
  </div>
);

export default StatCard;
