'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function UsersManagementPage() {
  const { user, getToken, loading } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', email: '', role: '', is_active: true });

  useEffect(() => {
    if (!loading && (!user || user.role !== 'ADMIN')) {
      router.push('/dashboard');
      return;
    }

    if (user && getToken && getToken()) {
      fetchUsers();
    }
  }, [user, loading, getToken, router, search]);

  async function fetchUsers() {
    setIsLoading(true);
    const token = getToken ? getToken() : null;
    try {
      const url = search ? `http://localhost:5000/api/users?search=${encodeURIComponent(search)}` : 'http://localhost:5000/api/users';
      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openEditModal = (u) => {
    setEditingUser(u);
    setEditFormData({ name: u.name, email: u.email, role: u.role, is_active: !!u.is_active });
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleInlineUpdate = async (u, field, value) => {
    const token = getToken ? getToken() : null;
    try {
      const payload = {
        name: u.name,
        email: u.email,
        role: field === 'role' ? value : u.role,
        is_active: field === 'is_active' ? value : u.is_active
      };
      
      // Optimistic UI update
      setUsers(users.map(user => user.id === u.id ? { ...user, [field]: value } : user));

      const response = await fetch(`http://localhost:5000/api/users/${u.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        alert(`Failed to update ${field}`);
        fetchUsers(); // Revert on failure
      }
    } catch (error) {
      console.error('Error updating user:', error);
      fetchUsers(); // Revert on failure
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const token = getToken ? getToken() : null;
    try {
      const response = await fetch(`http://localhost:5000/api/users/${editingUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editFormData)
      });
      
      if (response.ok) {
        closeEditModal();
        fetchUsers();
      } else {
        alert('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    const token = getToken ? getToken() : null;
    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        fetchUsers();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (loading || !user || user.role !== 'ADMIN') {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-black">User Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage system access, roles, and user accounts.</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <input 
            type="text" 
            placeholder="Search users..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-black"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-200">
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Name</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Email</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Role</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr><td colSpan="5" className="text-center py-8 text-gray-500">Loading...</td></tr>
              ) : users.length === 0 ? (
                <tr><td colSpan="5" className="text-center py-8 text-gray-500">No users found.</td></tr>
              ) : (
                users.map(u => (
                  <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3 text-sm font-medium text-gray-900 text-center">{u.name}</td>
                    <td className="px-6 py-3 text-sm text-gray-500 text-center">{u.email}</td>
                    <td className="px-6 py-3 text-sm text-center">
                      <select 
                        value={u.role} 
                        onChange={(e) => handleInlineUpdate(u, 'role', e.target.value)}
                        className={`w-[145px] mx-auto block text-[13px] font-medium rounded-lg pl-3 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-black/5 cursor-pointer bg-white text-gray-800 border border-gray-200 shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:border-gray-300 hover:shadow-sm transition-all`}
                      >
                        <option value="ADMIN">Administrator</option>
                        <option value="PM">Project Manager</option>
                        <option value="MEMBER">Team Member</option>
                      </select>
                    </td>
                    <td className="px-6 py-3 text-sm text-center">
                      <div className="inline-flex mx-auto bg-gray-100/80 rounded-lg p-1 border border-gray-200/50">
                        <button 
                          onClick={() => { if(!u.is_active) handleInlineUpdate(u, 'is_active', true) }}
                          className={`px-3 py-1 text-[12px] font-semibold rounded-md transition-all ${
                            u.is_active 
                              ? 'bg-white text-green-600 shadow-[0_1px_3px_rgba(0,0,0,0.1)]' 
                              : 'text-gray-400 hover:text-gray-600'
                          }`}
                        >
                          Active
                        </button>
                        <button 
                          onClick={() => { if(u.is_active) handleInlineUpdate(u, 'is_active', false) }}
                          className={`px-3 py-1 text-[12px] font-semibold rounded-md transition-all ${
                            !u.is_active 
                              ? 'bg-white text-red-600 shadow-[0_1px_3px_rgba(0,0,0,0.1)]' 
                              : 'text-gray-400 hover:text-gray-600'
                          }`}
                        >
                          Inactive
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-sm text-center">
                      <button 
                        onClick={() => handleDeleteUser(u.id)} 
                        className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-md transition-colors"
                        title="Delete User"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <form onSubmit={handleUpdateUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input 
                  type="text" 
                  value={editFormData.name} 
                  onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  value={editFormData.email} 
                  onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select 
                  value={editFormData.role}
                  onChange={(e) => setEditFormData({...editFormData, role: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
                >
                  <option value="ADMIN">ADMIN</option>
                  <option value="PM">PM</option>
                  <option value="MEMBER">MEMBER</option>
                </select>
              </div>
              <div className="flex items-center mt-2">
                <input 
                  type="checkbox" 
                  id="isActive" 
                  checked={editFormData.is_active}
                  onChange={(e) => setEditFormData({...editFormData, is_active: e.target.checked})}
                  className="mr-2"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-gray-700">Account Active</label>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={closeEditModal} className="px-4 py-2 text-gray-600 hover:text-black">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
