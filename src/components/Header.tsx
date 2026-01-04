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
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-white/10 shadow-2xl z-50 backdrop-blur-xl">
      <div className="px-6 lg:px-10 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg transform transition-transform hover:scale-110">
            <span className="text-white font-black text-xl">BX</span>
          </div>
          <div>
            <h1 className="text-2xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">BookXpert</h1>
            <p className="text-xs text-slate-400 font-semibold">Fintech Employee Dashboard</p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-rose-500/20 to-pink-500/20 hover:from-rose-500/30 hover:to-pink-500/30 text-rose-300 rounded-xl transition-all font-semibold border border-rose-500/30 hover:border-rose-500/60 shadow-lg hover:shadow-xl"
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
