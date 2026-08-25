import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { adminApi } from '../../api/axios';
import { useAdminAuth } from '../../context/AdminAuthContext';
import Loader from '../../components/Loader';

const emptyForm = { username: '', password: '', role: 'admin' };

export default function AdminManageAdmins() {
  const { isSuperAdmin } = useAdminAuth();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  function load() {
    setLoading(true);
    adminApi.get('/admin/admins').then((res) => setAdmins(res.data)).finally(() => setLoading(false));
  }
  useEffect(load, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await adminApi.post('/admin/admins', form);
      toast.success('Admin account created');
      setForm(emptyForm);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not create admin');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleRoleChange(id, role) {
    try {
      await adminApi.put(`/admin/admins/${id}`, { role });
      toast.success('Role updated');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not update role');
    }
  }

  async function handleDelete(id) {
    if (!confirm('Remove this admin account?')) return;
    try {
      await adminApi.delete(`/admin/admins/${id}`);
      toast.success('Removed');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not remove this account');
    }
  }

  if (!isSuperAdmin) {
    return (
      <div className="glass rounded-xl p-6 text-white/60 text-sm">
        Only a super admin can manage admin accounts.
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Manage Admins</h1>
      <p className="text-white/50 text-sm mt-1">Create and manage admin accounts. Only super admins can see this page.</p>

      <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 mt-6 grid sm:grid-cols-3 gap-4">
        <label className="block">
          <span className="text-xs text-white/60 mb-1 block">Username</span>
          <input required value={form.username} onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))} className={inputCls} />
        </label>
        <label className="block">
          <span className="text-xs text-white/60 mb-1 block">Password (min 6 characters)</span>
          <input required type="password" minLength={6} value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} className={inputCls} />
        </label>
        <label className="block">
          <span className="text-xs text-white/60 mb-1 block">Role</span>
          <select value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))} className={inputCls}>
            <option value="admin">Admin</option>
            <option value="superadmin">Super Admin</option>
          </select>
        </label>
        <button type="submit" disabled={submitting} className="sm:col-span-3 btn-primary rounded-lg px-5 py-2.5 font-medium hover:opacity-90 transition disabled:opacity-50 w-fit">
          {submitting ? 'Creating…' : 'Create admin account'}
        </button>
      </form>

      <h2 className="font-semibold mt-8 mb-3">All admin accounts ({admins.length})</h2>
      {loading ? <Loader /> : (
        <div className="space-y-2">
          {admins.map((a) => (
            <div key={a._id} className="glass rounded-lg p-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium">{a.username}</p>
                <p className="text-xs text-white/40">Added {new Date(a.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <select
                  value={a.role}
                  onChange={(e) => handleRoleChange(a._id, e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-brand-400"
                >
                  <option value="admin">Admin</option>
                  <option value="superadmin">Super Admin</option>
                </select>
                <button onClick={() => handleDelete(a._id)} className="text-xs px-3 py-1.5 rounded-lg border border-red-400/30 text-red-300 hover:bg-red-400/10">Remove</button>
              </div>
            </div>
          ))}
          {admins.length === 0 && <p className="text-white/40 text-sm">No admin accounts found.</p>}
        </div>
      )}
    </div>
  );
}

const inputCls = 'w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-400';
