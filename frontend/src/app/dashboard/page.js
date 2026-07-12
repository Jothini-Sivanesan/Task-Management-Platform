'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[calc(100vh-80px)] bg-[#FAFAFA]">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  // Define role-specific content
  const roleDisplay = user.role === 'PM' ? 'Project Manager' : 
                      user.role === 'ADMIN' ? 'Administrator' : 'Team Member';

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#FAFAFA] py-12 px-6">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-[32px] font-bold text-black tracking-tight">Welcome, {user.name.split(' ')[0]}</h1>
            <p className="text-gray-500 text-[15px] mt-1">You are logged in as a <strong className="text-black font-semibold">{roleDisplay}</strong></p>
          </div>
          <button className="bg-black hover:bg-gray-800 text-white px-5 py-2.5 rounded-md text-[14px] font-medium transition-transform hover:-translate-y-0.5 shadow-md self-start md:self-auto">
            + New Task
          </button>
        </div>

        {/* Role Specific Mock Data */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {user.role === 'ADMIN' && (
            <div className="col-span-1 md:col-span-3 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-[18px] font-semibold text-black mb-4">Admin Overview</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <div className="text-[13px] text-gray-500 font-medium">Total Users</div>
                  <div className="text-[28px] font-bold text-black mt-1">124</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <div className="text-[13px] text-gray-500 font-medium">Active Projects</div>
                  <div className="text-[28px] font-bold text-black mt-1">12</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <div className="text-[13px] text-gray-500 font-medium">System Health</div>
                  <div className="text-[28px] font-bold text-green-600 mt-1">100%</div>
                </div>
              </div>
            </div>
          )}

          {user.role === 'PM' && (
            <div className="col-span-1 md:col-span-3 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-[18px] font-semibold text-black mb-4">Project Management</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <div className="text-[13px] text-gray-500 font-medium">My Projects</div>
                  <div className="text-[28px] font-bold text-black mt-1">5</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <div className="text-[13px] text-gray-500 font-medium">Pending Review</div>
                  <div className="text-[28px] font-bold text-black mt-1">8</div>
                </div>
              </div>
            </div>
          )}

          {/* Generic Member / Everyone Board */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col h-[300px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[15px] font-semibold text-black">To Do</h3>
              <span className="bg-gray-100 text-gray-600 text-[11px] px-2 py-0.5 rounded-full font-bold">3</span>
            </div>
            <div className="flex-1 bg-gray-50 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-[13px] text-gray-400">
              Drag tasks here
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col h-[300px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[15px] font-semibold text-black">In Progress</h3>
              <span className="bg-gray-100 text-gray-600 text-[11px] px-2 py-0.5 rounded-full font-bold">1</span>
            </div>
            <div className="flex-1 flex flex-col gap-3">
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] cursor-pointer hover:border-black transition-colors">
                <div className="text-[10px] font-bold text-gray-400 mb-1">TASK-101</div>
                <div className="text-[14px] font-medium text-black">Setup authentication API</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col h-[300px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[15px] font-semibold text-black">Done</h3>
              <span className="bg-gray-100 text-gray-600 text-[11px] px-2 py-0.5 rounded-full font-bold">0</span>
            </div>
            <div className="flex-1 bg-gray-50 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-[13px] text-gray-400">
              No completed tasks
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
