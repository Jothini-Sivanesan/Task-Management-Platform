'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('MEMBER');
  
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    const res = await register(name, email, password, role);
    
    if (!res.success) {
      setError(res.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center bg-[#FAFAFA] px-6 py-12">
      <div className="w-full max-w-[440px] bg-white border border-gray-200 rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
        
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-5 h-5 border-[2px] border-black rounded-[3px] relative">
              <div className="absolute top-[3px] left-[3px] w-1.5 h-1.5 bg-black rounded-[1px]"></div>
            </div>
            <span className="text-[18px] font-bold tracking-tight text-black">TaskFlow</span>
          </div>
          <h1 className="text-[24px] font-bold text-black tracking-tight mb-2">Create an account</h1>
          <p className="text-[14px] text-gray-500">Join TaskFlow and start organizing your work</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[13px] font-semibold text-black">Full Name</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              placeholder="John Doe"
            />
          </div>

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
            <label className="text-[13px] font-semibold text-black">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              placeholder="Create a strong password"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[13px] font-semibold text-black">Select your Role</label>
            <div className="grid grid-cols-3 gap-3">
              {['ADMIN', 'PM', 'MEMBER'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`py-2 rounded-lg text-[12px] font-semibold transition-all border ${
                    role === r 
                      ? 'bg-black text-white border-black shadow-md' 
                      : 'bg-white text-gray-600 border-gray-200 hover:border-black hover:text-black'
                  }`}
                >
                  {r === 'PM' ? 'Project Manager' : r.charAt(0) + r.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-black hover:bg-gray-800 text-white font-medium text-[14px] py-3 rounded-lg transition-all shadow-md mt-4 flex justify-center items-center disabled:opacity-70"
          >
            {isSubmitting ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <p className="text-center text-[13px] text-gray-500 mt-8 font-medium">
          Already have an account? <Link href="/login" className="text-black hover:underline">Sign in</Link>
        </p>

      </div>
    </div>
  );
}
