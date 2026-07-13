'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const getIcon = (iconName, isActive) => {
  const className = `w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-900'}`;
  switch(iconName) {
    case 'home':
      return <svg className={className} fill={isActive ? "currentColor" : "none"} viewBox="0 0 24 24" stroke={isActive ? "none" : "currentColor"} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
    case 'briefcase':
      return <svg className={className} fill={isActive ? "currentColor" : "none"} viewBox="0 0 24 24" stroke={isActive ? "none" : "currentColor"} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
    case 'clipboard':
      return <svg className={className} fill={isActive ? "currentColor" : "none"} viewBox="0 0 24 24" stroke={isActive ? "none" : "currentColor"} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>;
    case 'users':
      return <svg className={className} fill={isActive ? "currentColor" : "none"} viewBox="0 0 24 24" stroke={isActive ? "none" : "currentColor"} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
    case 'chart':
      return <svg className={className} fill={isActive ? "currentColor" : "none"} viewBox="0 0 24 24" stroke={isActive ? "none" : "currentColor"} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
    case 'cog':
      return <svg className={className} fill={isActive ? "currentColor" : "none"} viewBox="0 0 24 24" stroke={isActive ? "none" : "currentColor"} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
    default:
      return null;
  }
};

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
    { name: 'Dashboard', href: '/dashboard', iconName: 'home' },
    { name: 'User Management', href: '/dashboard/users', iconName: 'users' },
    { name: 'System Reports', href: '/dashboard/reports', iconName: 'chart' },
    { name: 'Settings', href: '/dashboard/settings', iconName: 'cog' },
  ];

  const pmLinks = [
    { name: 'Dashboard', href: '/dashboard', iconName: 'home' },
    { name: 'Projects', href: '/dashboard/projects', iconName: 'briefcase' },
    { name: 'Tasks', href: '/dashboard/tasks', iconName: 'clipboard' },
    { name: 'Settings', href: '/dashboard/settings', iconName: 'cog' },
  ];

  const memberLinks = [
    { name: 'Dashboard', href: '/dashboard', iconName: 'home' },
    { name: 'My Tasks', href: '/dashboard/tasks', iconName: 'clipboard' },
  ];

  const links = user.role === 'ADMIN' ? adminLinks : 
                user.role === 'PM' ? pmLinks : memberLinks;

  return (
    <div className="flex min-h-[calc(100vh-80px)] bg-[#FAFAFA]">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-gray-200 flex flex-col hidden md:flex flex-shrink-0">
        <div className="p-5">
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
                  className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-medium transition-all ${
                    isActive 
                      ? 'bg-black text-white shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <div className={`flex items-center justify-center ${isActive ? '' : 'opacity-80 group-hover:opacity-100'}`}>
                    {getIcon(link.iconName, isActive)}
                  </div>
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
