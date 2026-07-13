'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user, getToken, loading } = useAuth();
  const router = useRouter();
  const [adminSummary, setAdminSummary] = useState({ totalUsers: '-', activeProjects: '-' });
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

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

    if (user && user.role !== 'ADMIN' && token) {
      Promise.all([
        fetch('http://localhost:5000/api/projects', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('http://localhost:5000/api/tasks', { headers: { 'Authorization': `Bearer ${token}` } })
      ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([projectsData, tasksData]) => {
        setProjects(projectsData);
        setTasks(tasksData);
      })
      .catch(err => console.error('Failed to fetch dashboard data:', err));
    }
  }, [user, loading, getToken, router]);

  // Calculate PM Dashboard stats
  const totalProjects = projects.length;
  const inProgress = projects.filter(p => p.status === 'In Progress').length;
  const completed = projects.filter(p => p.status === 'Completed').length;
  const totalTasks = tasks.length;
  const tasksDueToday = tasks.filter(t => {
    if (!t.due_date) return false;
    const today = new Date().toISOString().split('T')[0];
    const due = new Date(t.due_date).toISOString().split('T')[0];
    return today === due;
  }).length;

  if (loading || !user) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[calc(100vh-80px)] bg-[#FAFAFA]">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  // Define role-specific content
  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#FAFAFA] py-10 px-6">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-[32px] font-bold text-black tracking-tight">Welcome back, {user.name.split(' ')[0]}! 👋</h1>
          <p className="text-gray-500 text-[15px] mt-1">Here's what's happening with your projects today.</p>
        </div>

        {/* Role Specific Mock Data */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          
          {user.role === 'ADMIN' && (
            <div className="col-span-1 md:col-span-4 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-[18px] font-semibold text-black mb-4">Admin Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <div className="text-[14px] text-gray-500 font-medium">Total Users</div>
                  <div className="text-[32px] font-bold text-black mt-2">{adminSummary.totalUsers}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <div className="text-[14px] text-gray-500 font-medium">Active Projects</div>
                  <div className="text-[32px] font-bold text-black mt-2">{adminSummary.activeProjects}</div>
                </div>
              </div>
            </div>
          )}

          {user.role === 'PM' && (
            <>
              {/* Card 1 */}
              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <div>
                  <div className="text-[14px] text-gray-500 font-medium">Total Projects</div>
                  <div className="text-[32px] leading-tight font-bold text-black mt-1">{totalProjects}</div>
                  <div className="text-[13px] font-medium text-gray-600 mt-1">Updated just now</div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <div>
                  <div className="text-[14px] text-gray-500 font-medium">Total Tasks</div>
                  <div className="text-[32px] leading-tight font-bold text-black mt-1">{totalTasks}</div>
                  <div className="text-[13px] font-medium text-gray-600 mt-1">{tasksDueToday} due today <span className="text-black font-bold">!</span></div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[14px] text-gray-500 font-medium">In Progress</div>
                  <div className="text-[32px] leading-tight font-bold text-black mt-1">{inProgress}</div>
                  <div className="text-[13px] font-medium text-gray-600 mt-1">{totalProjects > 0 ? Math.round((inProgress/totalProjects)*100) : 0}% of total</div>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[14px] text-gray-500 font-medium">Completed</div>
                  <div className="text-[32px] leading-tight font-bold text-black mt-1">{completed}</div>
                  <div className="text-[13px] font-medium text-gray-600 mt-1">{totalProjects > 0 ? Math.round((completed/totalProjects)*100) : 0}% of total</div>
                </div>
              </div>
              {/* Projects & Tasks Grid */}
              <div className="col-span-1 md:col-span-4 grid grid-cols-1 lg:grid-cols-3 gap-5 mt-2">
                             {/* Projects Overview */}
                <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-[19px] font-bold text-black">Projects Overview</h3>
                    <a href="/dashboard/projects" className="text-[11px] font-semibold text-gray-500 hover:text-black transition-colors flex items-center gap-1">
                      View All Projects <span className="text-sm leading-none">→</span>
                    </a>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-gray-100">
                          <th className="pb-4 text-[13px] font-semibold text-gray-500 whitespace-nowrap">Project Name</th>
                          <th className="pb-4 text-[13px] font-semibold text-gray-500 whitespace-nowrap">Progress</th>
                          <th className="pb-4 text-[13px] font-semibold text-gray-500 text-center whitespace-nowrap">Members</th>
                          <th className="pb-4 text-[13px] font-semibold text-gray-500 whitespace-nowrap">Due Date</th>
                          <th className="pb-4 text-[13px] font-semibold text-gray-500 text-center whitespace-nowrap">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {projects.slice(0, 4).map(project => (
                          <tr key={project.id} className="group hover:bg-gray-50/50 transition-colors">
                            <td className="py-5 pr-4">
                              <div className="text-[14px] font-bold text-gray-900 whitespace-nowrap">{project.name}</div>
                              <div className="text-[13px] text-gray-500 mt-0.5 whitespace-nowrap truncate max-w-[200px]">{project.description}</div>
                            </td>
                            <td className="py-5 pr-6">
                              <div className="flex items-center gap-4">
                                <div className="w-24 bg-gray-100 rounded-full h-1.5 flex-shrink-0">
                                  <div className="bg-black h-1.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
                                </div>
                                <span className="text-[13px] font-medium text-gray-600">{project.progress}%</span>
                              </div>
                            </td>
                            <td className="py-5 pr-4">
                              <div className="flex items-center justify-center -space-x-1.5">
                                {project.member_count > 0 ? (
                                  <div className="w-7 h-7 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[11px] font-medium text-gray-500 relative z-10">
                                    +{project.member_count}
                                  </div>
                                ) : (
                                  <span className="text-[12px] text-gray-400">None</span>
                                )}
                              </div>
                            </td>
                            <td className="py-5 pr-4 text-[14px] font-medium text-gray-600 whitespace-nowrap">
                              {project.due_date ? new Date(project.due_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
                            </td>
                            <td className="py-5 text-center">
                              <span className="inline-flex items-center justify-center px-3 py-1.5 rounded-md text-[12px] font-bold bg-gray-100 text-gray-800 w-24">
                                {project.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Tasks Due Soon */}
                <div className="col-span-1 bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-[19px] font-bold text-black">Tasks Due Soon</h3>
                    <a href="/dashboard/tasks" className="text-[11px] font-semibold text-gray-500 hover:text-black transition-colors flex items-center gap-1">
                      View All Tasks <span className="text-sm leading-none">→</span>
                    </a>
                  </div>
                  
                  <div className="relative flex flex-col">
                    {/* Timeline Vertical Line */}
                    <div className="absolute left-[7px] top-3 bottom-3 w-px bg-gray-200"></div>

                    {tasks.slice(0, 5).map(task => {
                      const priorityColor = task.priority === 'HIGH' ? 'bg-red-50 text-red-600' : task.priority === 'MEDIUM' ? 'bg-orange-50 text-orange-600' : 'bg-gray-100 text-green-600';
                      const dotColor = task.priority === 'HIGH' ? 'bg-red-400' : task.priority === 'MEDIUM' ? 'bg-orange-400' : 'bg-green-400';
                      
                      return (
                        <div key={task.id} className="relative flex items-start justify-between group py-3.5">
                          <div className="flex items-start gap-4">
                            <div className="relative z-10 w-4 h-4 mt-1 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                              <div className={`w-2.5 h-2.5 rounded-full ${dotColor}`}></div>
                            </div>
                            <div>
                              <div className="text-[14px] font-bold text-gray-900 leading-tight truncate max-w-[150px]">{task.title}</div>
                              <div className="text-[13px] text-gray-500 mt-1.5 truncate max-w-[150px]">{task.project_name || 'No Project'}</div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2 ml-4 flex-shrink-0">
                            <span className={`inline-flex items-center justify-center px-3 py-1 rounded-md text-[11px] font-bold w-16 ${priorityColor}`}>
                              {task.priority === 'HIGH' ? 'High' : task.priority === 'MEDIUM' ? 'Medium' : 'Low'}
                            </span>
                            <div className="flex items-center gap-1.5 text-gray-500">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span className="text-[13px] font-medium">
                                {task.due_date ? new Date(task.due_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : '-'}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
