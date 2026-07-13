'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user, getToken, loading } = useAuth();
  const router = useRouter();
  const [adminSummary, setAdminSummary] = useState({ totalUsers: '-', activeProjects: '-' });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    
    const token = getToken ? getToken() : null;
    
    if (user && user.role === 'ADMIN' && token) {
      fetch('http://localhost:5000/api/reports/admin-summary', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => setAdminSummary(data))
        .catch(err => console.error('Failed to fetch admin summary:', err));
    }
  }, [user, loading, getToken, router]);

  if (loading || !user) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[calc(100vh-80px)] bg-[#FAFAFA]">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  // Define role-specific content
  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#FAFAFA] py-12 px-6">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-[32px] font-bold text-black tracking-tight">Welcome, {user.name.split(' ')[0]}</h1>
            <p className="text-gray-500 text-[15px] mt-1">Here's an overview of your projects and recent activity.</p>
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
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <div className="text-[13px] text-gray-500 font-medium">Total Users</div>
                  <div className="text-[28px] font-bold text-black mt-1">{adminSummary.totalUsers}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <div className="text-[13px] text-gray-500 font-medium">Active Projects</div>
                  <div className="text-[28px] font-bold text-black mt-1">{adminSummary.activeProjects}</div>
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

        </div>

      </div>
    </div>
  );
}
