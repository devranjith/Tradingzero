import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, History, Settings, LogOut, Activity, Users, Box, Hexagon } from 'lucide-react';
import { supabase } from '../services/supabaseClient';
import useStore from '../store/useStore';

const Sidebar = () => {
  const setUser = useStore(state => state.setUser);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/' },
    { icon: Activity, label: 'AI Analytics', path: '/logs' },
    { icon: Box, label: 'Trading', path: '/trading' },
    { icon: History, label: 'Market Explorer', path: '/history' },
    { icon: Users, label: 'Accounts', path: '/accounts' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="w-64 h-screen bg-theme-bg border-r border-theme-border flex flex-col p-6 fixed left-0 top-0">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
          <Hexagon size={20} className="text-theme-bg fill-theme-bg" />
        </div>
        <h1 className="text-xl font-semibold text-white tracking-wide">
          Quantum
        </h1>
      </div>

      <div className="text-xs font-semibold text-theme-textMuted uppercase tracking-wider mb-4 ml-2">
        Menu
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-theme-card text-theme-accent' 
                  : 'text-theme-textMuted hover:text-white hover:bg-white/5'
              }`
            }
          >
            <item.icon size={20} className={({ isActive }) => isActive ? "text-theme-accent" : ""} />
            <span className="font-medium text-sm">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <button 
        onClick={handleLogout}
        className="flex items-center gap-4 px-4 py-3 mt-auto text-theme-textMuted hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
      >
        <LogOut size={20} />
        <span className="font-medium text-sm">Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
