'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[calc(100vh-80px)] bg-[#FAFAFA]">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <>{children}</>;
  }

  // Sidebar links based on role
  const adminLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'User Management', href: '/dashboard/users', icon: '👥' },
    { name: 'System Reports', href: '/dashboard/reports', icon: '📈' },
    { name: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
  ];

  const pmLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'My Projects', href: '/dashboard/projects', icon: '📁' },
    { name: 'Team Performance', href: '/dashboard/performance', icon: '📈' },
  ];

  const memberLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'My Tasks', href: '/dashboard/tasks', icon: '✅' },
  ];

  const links = user.role === 'ADMIN' ? adminLinks : 
                user.role === 'PM' ? pmLinks : memberLinks;

  return (
    <div className="flex min-h-[calc(100vh-80px)] bg-[#FAFAFA]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
        <div className="p-6">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
            {user.role === 'ADMIN' ? 'Admin Controls' : user.role === 'PM' ? 'Project Management' : 'Workspace'}
          </h2>
          <nav className="flex flex-col gap-2">
            {links.map((link) => {
              const isActive = link.href === '/dashboard' 
                ? pathname === '/dashboard'
                : (pathname === link.href || pathname.startsWith(`${link.href}/`));
                
              return (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-black text-white' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                  }`}
                >
                  <span>{link.icon}</span>
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}
