import React from 'react';
import { LayoutGrid, Code, Settings } from 'lucide-react';
import { NavLink } from './NavLink';

export function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r">
      <div className="p-6">
        <h1 className="text-xl font-bold text-indigo-600">Articleo.ai</h1>
      </div>
      <nav className="px-4 space-y-1">
        <NavLink to="/" icon={LayoutGrid}>Dashboard</NavLink>
        <NavLink to="/integration" icon={Code}>Integration</NavLink>
        <NavLink to="/settings" icon={Settings}>Settings</NavLink>
      </nav>
    </aside>
  );
}