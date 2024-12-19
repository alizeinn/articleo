import React from 'react';
import { LucideIcon } from 'lucide-react';

interface NavLinkProps {
  to: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

export function NavLink({ to, icon: Icon, children }: NavLinkProps) {
  const isActive = window.location.pathname === to;
  
  return (
    <a
      href={to}
      className={`flex items-center px-4 py-2 text-sm rounded-lg ${
        isActive
          ? 'bg-indigo-50 text-indigo-600'
          : 'text-gray-600 hover:bg-gray-50'
      }`}
    >
      <Icon className="w-5 h-5 mr-3" />
      {children}
    </a>
  );
}