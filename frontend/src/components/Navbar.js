'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { user, logout, loading } = useAuth();

  if (user) {
    return (
      <header className="w-full h-16 border-b border-gray-100 bg-white sticky top-0 z-50 flex items-center justify-between px-6 lg:px-12 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
        <Link href="/dashboard" className="flex items-center gap-2.5 cursor-pointer">
          <div className="w-6 h-6 border-[3px] border-black rounded-[4px] relative">
            <div className="absolute top-1 left-1 w-2 h-2 bg-black rounded-[2px]"></div>
          </div>
          <span className="text-[20px] font-bold tracking-tight text-black">TaskFlow</span>
        </Link>
        <button onClick={logout} className="bg-black hover:bg-gray-800 text-white px-5 py-2 rounded-md text-[14px] font-medium transition-transform hover:-translate-y-0.5 shadow-md">
          Logout
        </button>
      </header>
    );
  }

  return (
    <header className="w-full h-20 border-b border-gray-100 bg-white sticky top-0 z-50 flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
      <div className="w-full max-w-[1400px] px-6 lg:px-12 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 cursor-pointer">
          <div className="w-6 h-6 border-[3px] border-black rounded-[4px] relative">
            <div className="absolute top-1 left-1 w-2 h-2 bg-black rounded-[2px]"></div>
          </div>
          <span className="text-[22px] font-bold tracking-tight text-black">TaskFlow</span>
        </Link>

        {/* Center Navigation Links */}
        <div className="hidden md:flex space-x-10">
          <Link href="/" className="text-[14px] font-medium text-black transition-colors">Home</Link>
          <Link href="/#features" className="text-[14px] font-medium text-gray-500 hover:text-black transition-colors">Features</Link>
          <Link href="/#how-it-works" className="text-[14px] font-medium text-gray-500 hover:text-black transition-colors">How It Works</Link>
          <Link href="/#solutions" className="text-[14px] font-medium text-gray-500 hover:text-black transition-colors">Solutions</Link>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-[14px] font-medium text-gray-600 hover:text-black transition-colors">
            Login
          </Link>
          <Link href="/register" className="bg-black hover:bg-gray-800 text-white px-5 py-2.5 rounded-md text-[14px] font-medium transition-transform hover:-translate-y-0.5 shadow-md">
            Get Started
          </Link>
        </div>
        
      </div>
    </header>
  );
}
