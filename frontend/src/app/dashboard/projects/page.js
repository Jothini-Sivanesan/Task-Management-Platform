'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function ProjectsPage() {
  const { user, getToken } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [formData, setFormData] = useState({
    name: '', description: '', status: 'In Progress', progress: 0, start_date: '', due_date: ''
  });

  useEffect(() => {
    const fetchProjects = async () => {
      const token = getToken();
      if (!token) return;
      try {
        const res = await fetch('http://localhost:5000/api/projects', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
        }
      } catch (err) {
        console.error('Failed to fetch projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [getToken, refreshTrigger]);

  const openCreateModal = () => {
    setEditingProject(null);
    setFormData({ name: '', description: '', status: 'In Progress', progress: 0, start_date: '', due_date: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      description: project.description,
      status: project.status || 'In Progress',
      progress: project.progress || 0,
      start_date: project.start_date ? project.start_date.split('T')[0] : '',
      due_date: project.due_date ? project.due_date.split('T')[0] : ''
    });
    setIsModalOpen(true);
  };

  const confirmDelete = (project) => {
    setProjectToDelete(project);
    setIsDeleteModalOpen(true);
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    const token = getToken();
    const method = editingProject ? 'PUT' : 'POST';
    const url = editingProject 
      ? `http://localhost:5000/api/projects/${editingProject.id}`
      : 'http://localhost:5000/api/projects';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setIsModalOpen(false);
        setRefreshTrigger(prev => prev + 1);
      } else {
        alert('Failed to save project');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProject = async () => {
    if (!projectToDelete) return;
    const token = getToken();
    try {
      const res = await fetch(`http://localhost:5000/api/projects/${projectToDelete.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setIsDeleteModalOpen(false);
        setProjectToDelete(null);
        setRefreshTrigger(prev => prev + 1);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="p-8 text-sm font-medium text-gray-500">Loading projects...</div>;
  }

  // Calculate stats
  const totalProjects = projects.length;
  const inProgress = projects.filter(p => p.status === 'In Progress').length;
  const onHold = projects.filter(p => p.status === 'On Hold').length;
  const completed = projects.filter(p => p.status === 'Completed').length;

  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)] bg-[#FAFAFA] p-6 md:p-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[32px] font-bold text-black tracking-tight">Projects</h1>
          <p className="text-gray-500 text-[15px] mt-1">Manage and track all projects</p>
        </div>
        {user && user.role === 'PM' && (
          <button onClick={openCreateModal} className="bg-black hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg text-[14px] font-medium transition-transform hover:-translate-y-0.5 shadow-md flex items-center gap-2 self-start md:self-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            New Project
          </button>
        )}
      </div>

      <div className="flex-1">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Card 1 */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-[12px] font-bold text-black mb-1">Total Projects</div>
              <div className="text-[22px] font-bold text-black leading-none mb-1">{totalProjects}</div>
              <div className="text-[11px] font-semibold text-black mt-1">Updated just now</div>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-[12px] font-bold text-black mb-1">In Progress</div>
              <div className="text-[22px] font-bold text-black leading-none mb-1">{inProgress}</div>
              <div className="text-[11px] font-semibold text-black mt-1">{totalProjects > 0 ? Math.round((inProgress/totalProjects)*100) : 0}% of total</div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-[12px] font-bold text-black mb-1">On Hold</div>
              <div className="text-[22px] font-bold text-black leading-none mb-1">{onHold}</div>
              <div className="text-[11px] font-semibold text-black mt-1">{totalProjects > 0 ? Math.round((onHold/totalProjects)*100) : 0}% of total</div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-[12px] font-bold text-black mb-1">Completed</div>
              <div className="text-[22px] font-bold text-black leading-none mb-1">{completed}</div>
              <div className="text-[11px] font-semibold text-black mt-1">{totalProjects > 0 ? Math.round((completed/totalProjects)*100) : 0}% of total</div>
            </div>
          </div>
        </div>

        {/* Projects Table */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-white">
                  <th className="py-4 pl-6 pr-4 text-[12px] font-bold text-black min-w-[150px]">Project Name</th>
                  <th className="py-4 px-4 text-[12px] font-bold text-black min-w-[200px]">Description</th>
                  <th className="py-4 px-4 text-[12px] font-bold text-black whitespace-nowrap">Progress</th>
                  <th className="py-4 px-4 text-[12px] font-bold text-black whitespace-nowrap">Manager</th>
                  <th className="py-4 px-4 text-[12px] font-bold text-black whitespace-nowrap">Start Date</th>
                  <th className="py-4 px-4 text-[12px] font-bold text-black whitespace-nowrap">Due Date</th>
                  <th className="py-4 px-4 text-[12px] font-bold text-black whitespace-nowrap">Status</th>
                  <th className="py-4 px-4 text-[12px] font-bold text-black whitespace-nowrap">Members</th>
                  <th className="py-4 pl-4 pr-6 text-[12px] font-bold text-black text-center whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="py-4 pl-6 pr-4">
                      <div className="text-[13px] font-bold text-black">{project.name}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-[13px] font-medium text-gray-500 leading-tight">{project.description}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <span className="text-[12px] font-bold text-black w-8">{project.progress}%</span>
                        <div className="w-20 bg-gray-100 rounded-full h-1.5">
                          <div 
                            className="bg-black h-1.5 rounded-full" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center overflow-hidden flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <span className="text-[12px] font-bold text-gray-700 whitespace-nowrap">{project.manager_name || 'Unassigned'}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-[12px] font-bold text-gray-600 whitespace-nowrap">
                      {project.start_date ? new Date(project.start_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
                    </td>
                    <td className="py-4 px-4 text-[12px] font-bold text-gray-600 whitespace-nowrap">
                      {project.due_date ? new Date(project.due_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center justify-center px-3 py-1 rounded-md text-[11px] font-bold bg-white border border-gray-200 text-gray-700 w-24">
                        {project.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center -space-x-1.5">
                        {project.member_count > 0 ? (
                          <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-50 flex items-center justify-center text-[9px] font-bold text-black relative z-10">
                            +{project.member_count}
                          </div>
                        ) : (
                          <span className="text-[12px] text-gray-400">None</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 pl-4 pr-6">
                      <div className="flex items-center justify-center gap-3">
                        {user && user.role === 'PM' && (
                          <>
                            <button onClick={() => openEditModal(project)} className="text-gray-400 hover:text-black transition-colors" title="Edit">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button onClick={() => confirmDelete(project)} className="text-gray-400 hover:text-red-600 transition-colors" title="Delete">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </>
                        )}
                        {(!user || user.role !== 'PM') && (
                          <button className="text-gray-400 hover:text-black transition-colors" title="View Details">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-between p-5 border-t border-gray-100 bg-white">
            <div className="text-[12px] font-bold text-gray-500">
              Showing 1 to {projects.length} of {projects.length} projects
            </div>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-black transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-md bg-black text-white text-[13px] font-bold">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-black transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-black">{editingProject ? 'Edit Project' : 'New Project'}</h2>
            <form onSubmit={handleSaveProject} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black text-sm" rows="3" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black text-sm">
                    <option value="Active">Active</option>
                    <option value="In Progress">In Progress</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Completed">Completed</option>
                    <option value="At Risk">At Risk</option>
                    <option value="On Track">On Track</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Progress (%)</label>
                  <input type="number" min="0" max="100" value={formData.progress} onChange={e => setFormData({...formData, progress: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input type="date" value={formData.start_date} onChange={e => setFormData({...formData, start_date: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black text-sm text-gray-700" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <input type="date" value={formData.due_date} onChange={e => setFormData({...formData, due_date: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black text-sm text-gray-700" />
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-black transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium bg-black text-white rounded-md hover:bg-gray-800 transition-colors">{editingProject ? 'Save Changes' : 'Create Project'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
            <h2 className="text-xl font-bold mb-3 text-red-600">Delete Project</h2>
            <p className="text-[14px] text-gray-600 mb-6">Are you sure you want to delete <strong>{projectToDelete?.name}</strong>? This action cannot be undone and will delete all associated tasks.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setIsDeleteModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-black transition-colors">Cancel</button>
              <button onClick={handleDeleteProject} className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
