'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateUserRole, toggleUserSuspension, deleteUser } from '@/app/actions/admin';

export default function UserActionsClient({ user, currentRole }: { user: any, currentRole: string }) {
  const router = useRouter();
  const [role, setRole] = useState(user.role);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpdateRole = async () => {
    setLoading(true);
    setError('');
    try {
      await updateUserRole(user.id, role);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSuspend = async () => {
    setLoading(true);
    setError('');
    try {
      await toggleUserSuspension(user.id, !user.isSuspended);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
    setLoading(true);
    setError('');
    try {
      await deleteUser(user.id);
      router.push('/admin/users');
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const canModify = user.role !== 'SUPER_ADMIN' || currentRole === 'SUPER_ADMIN';

  return (
    <div className="space-y-6">
      {error && <div className="bg-red-500/10 text-red-400 p-4 border border-red-500/30 font-mono text-sm">{error}</div>}
      
      <div className="border border-border-main p-6 bg-bg-sec">
        <h3 className="text-xl font-display uppercase mb-4">Role Management</h3>
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm text-text-muted mb-2 font-mono">Select Role</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              disabled={!canModify || loading}
              className="w-full bg-bg-main border border-border-main p-2 text-text-primary focus:outline-none focus:border-accent"
            >
              <option value="LEARNER">LEARNER</option>
              <option value="SUPPORT">SUPPORT</option>
              <option value="MODERATOR">MODERATOR</option>
              <option value="CONTENT_MANAGER">CONTENT_MANAGER</option>
              <option value="ADMIN">ADMIN</option>
              {currentRole === 'SUPER_ADMIN' && <option value="SUPER_ADMIN">SUPER_ADMIN</option>}
            </select>
          </div>
          <button 
            onClick={handleUpdateRole} 
            disabled={role === user.role || !canModify || loading}
            className="bg-accent text-bg-main px-4 py-2 font-mono uppercase text-sm disabled:opacity-50"
          >
            Update Role
          </button>
        </div>
      </div>

      <div className="border border-border-main p-6 bg-bg-sec">
        <h3 className="text-xl font-display uppercase mb-4">Account Status</h3>
        <p className="text-text-muted font-mono text-sm mb-4">
          Current status: {user.isSuspended ? <span className="text-red-500 font-bold">SUSPENDED</span> : <span className="text-green-500 font-bold">ACTIVE</span>}
        </p>
        <button 
          onClick={handleToggleSuspend} 
          disabled={!canModify || loading}
          className={`px-4 py-2 font-mono uppercase text-sm border ${user.isSuspended ? 'bg-green-500/10 text-green-500 border-green-500/30 hover:bg-green-500/20' : 'bg-orange-500/10 text-orange-500 border-orange-500/30 hover:bg-orange-500/20'} disabled:opacity-50`}
        >
          {user.isSuspended ? 'Unsuspend User' : 'Suspend User'}
        </button>
      </div>

      <div className="border border-red-900 p-6 bg-red-950/20">
        <h3 className="text-xl font-display uppercase mb-2 text-red-500">Danger Zone</h3>
        <p className="text-text-muted font-mono text-sm mb-4">Permanently delete this user account and all associated data.</p>
        <button 
          onClick={handleDelete} 
          disabled={!canModify || loading}
          className="bg-red-500 text-white px-4 py-2 font-mono uppercase text-sm disabled:opacity-50 hover:bg-red-600 transition-colors"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}
