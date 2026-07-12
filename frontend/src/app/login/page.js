'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    const res = await login(email, password);
    
    if (!res.success) {
      setError(res.message);
      setIsSubmitting(false);
    }
    // On success, AuthContext handles the redirect
  };

  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center bg-[#FAFAFA] px-6">
      <div className="w-full max-w-[400px] bg-white border border-gray-200 rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
        
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-5 h-5 border-[2px] border-black rounded-[3px] relative">
              <div className="absolute top-[3px] left-[3px] w-1.5 h-1.5 bg-black rounded-[1px]"></div>
            </div>
            <span className="text-[18px] font-bold tracking-tight text-black">TaskFlow</span>
          </div>
          <h1 className="text-[24px] font-bold text-black tracking-tight mb-2">Welcome back</h1>
          <p className="text-[14px] text-gray-500">Enter your credentials to access your account</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[13px] font-semibold text-black">Email address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              placeholder="name@company.com"
            />
          </div>
          
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[13px] font-semibold text-black">Password</label>
              <a href="#" className="text-[12px] font-medium text-gray-500 hover:text-black">Forgot password?</a>
            </div>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-black hover:bg-gray-800 text-white font-medium text-[14px] py-3 rounded-lg transition-all shadow-md mt-2 disabled:opacity-70 flex justify-center items-center"
          >
            {isSubmitting ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <p className="text-center text-[13px] text-gray-500 mt-8 font-medium">
          Don't have an account? <Link href="/register" className="text-black hover:underline">Sign up</Link>
        </p>

      </div>
    </div>
  );
}
