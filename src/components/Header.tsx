import React from 'react';
import { LogOut } from 'lucide-react';
import type { HeaderProps } from '../types';
import { STORAGE_KEYS } from '../data/constants';

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEYS.IS_AUTHENTICATED);
    onLogout();
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-slate-200 shadow-sm z-50">
      <div className="px-6 lg:px-10 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">BX</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">BookXpert</h1>
            <p className="text-xs text-slate-500">Employee Management Dashboard</p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl transition-all font-medium"
          title="Logout from your account"
        >
          <LogOut size={18} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
