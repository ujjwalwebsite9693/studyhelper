import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { adminApi } from '../../api/axios';
import Loader from '../../components/Loader';

const IMGBB_KEY = import.meta.env.VITE_IMGBB_KEY;

const emptyForm = {
  name: '', roleBadge: '', branch: 'Computer Science & Engg.', rollNumber: '',
  semesterLabel: '', roleTitle: '', responsibilities: '', photoUrl: '',
  githubUrl: '', linkedinUrl: '', instagramUrl: '', websiteUrl: '',
};

export default function AdminTeam() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  function load() {
    setLoading(true);
    adminApi.get('/team/admin/all').then((res) => setMembers(res.data)).finally(() => setLoading(false));
  }
  useEffect(load, []);

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function startEdit(m) {
    setEditingId(m._id);
    setForm({
      name: m.name, roleBadge: m.roleBadge, branch: m.branch || '', rollNumber: m.rollNumber || '',
      semesterLabel: m.semesterLabel || '', roleTitle: m.roleTitle || '', responsibilities: m.responsibilities || '',
      photoUrl: m.photoUrl || '', githubUrl: m.githubUrl || '', linkedinUrl: m.linkedinUrl || '',
      instagramUrl: m.instagramUrl || '', websiteUrl: m.websiteUrl || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!IMGBB_KEY) {
      toast.error("Photo upload isn't configured yet (missing VITE_IMGBB_KEY).");
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, { method: 'POST', body: formData });
      const data = await res.json();
      if (!data.success) throw new Error('Upload failed');
      update('photoUrl', data.data.url);
      toast.success('Photo uploaded');
    } catch {
      toast.error('Could not upload photo. Please try again.');
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingId) {
        await adminApi.put(`/team/${editingId}`, form);
        toast.success('Updated');
      } else {
        await adminApi.post('/team', form);
        toast.success('Team member added');
      }
      cancelEdit();
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Remove this team member?')) return;
    try {
      await adminApi.delete(`/team/${id}`);
      toast.success('Removed');
      load();
    } catch {
      toast.error('Could not remove. Please try again.');
    }
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Team</h1>
      <p className="text-white/50 text-sm mt-1">Shown on the public Team page.</p>

      <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 mt-6 grid sm:grid-cols-2 gap-4">
        <h2 className="sm:col-span-2 font-semibold">{editingId ? 'Edit team member' : 'Add team member'}</h2>

        <div className="sm:col-span-2 flex items-center gap-4">
          <img
            src={form.photoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name || 'T')}&background=4f46e5&color=fff`}
            alt="preview" className="h-16 w-16 rounded-xl object-cover border border-white/10"
          />
          <label className="text-sm px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition cursor-pointer">
            {uploading ? 'Uploading…' : 'Upload photo'}
            <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} disabled={uploading} />
          </label>
        </div>

        <label className="block">
          <span className="text-xs text-white/60 mb-1 block">Name</span>
          <input required value={form.name} onChange={(e) => update('name', e.target.value)} className={inputCls} />
        </label>
        <label className="block">
          <span className="text-xs text-white/60 mb-1 block">Role badge</span>
          <input required value={form.roleBadge} onChange={(e) => update('roleBadge', e.target.value)} placeholder="e.g. SUPER ADMIN & DEVELOPER" className={inputCls} />
        </label>
        <label className="block">
          <span className="text-xs text-white/60 mb-1 block">Branch</span>
          <input value={form.branch} onChange={(e) => update('branch', e.target.value)} className={inputCls} />
        </label>
        <label className="block">
          <span className="text-xs text-white/60 mb-1 block">Roll Number</span>
          <input value={form.rollNumber} onChange={(e) => update('rollNumber', e.target.value)} className={inputCls} />
        </label>
        <label className="block">
          <span className="text-xs text-white/60 mb-1 block">Semester</span>
          <input value={form.semesterLabel} onChange={(e) => update('semesterLabel', e.target.value)} placeholder="e.g. 3rd SEM. (25-28)" className={inputCls} />
        </label>
        <label className="block">
          <span className="text-xs text-white/60 mb-1 block">Role title</span>
          <input value={form.roleTitle} onChange={(e) => update('roleTitle', e.target.value)} placeholder="e.g. Lead Architect & Developer" className={inputCls} />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-xs text-white/60 mb-1 block">Work & responsibilities</span>
          <textarea value={form.responsibilities} onChange={(e) => update('responsibilities', e.target.value)} rows={3} className={inputCls} />
        </label>
        <label className="block">
          <span className="text-xs text-white/60 mb-1 block">GitHub URL</span>
          <input value={form.githubUrl} onChange={(e) => update('githubUrl', e.target.value)} className={inputCls} />
        </label>
        <label className="block">
          <span className="text-xs text-white/60 mb-1 block">LinkedIn URL</span>
          <input value={form.linkedinUrl} onChange={(e) => update('linkedinUrl', e.target.value)} className={inputCls} />
        </label>
        <label className="block">
          <span className="text-xs text-white/60 mb-1 block">Instagram URL</span>
          <input value={form.instagramUrl} onChange={(e) => update('instagramUrl', e.target.value)} className={inputCls} />
        </label>
        <label className="block">
          <span className="text-xs text-white/60 mb-1 block">Website URL</span>
          <input value={form.websiteUrl} onChange={(e) => update('websiteUrl', e.target.value)} className={inputCls} />
        </label>

        <div className="sm:col-span-2 flex gap-3">
          <button type="submit" disabled={submitting} className="btn-primary rounded-lg px-5 py-2.5 font-medium hover:opacity-90 transition disabled:opacity-50">
            {submitting ? 'Saving…' : editingId ? 'Save changes' : 'Add member'}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit} className="rounded-lg px-5 py-2.5 border border-white/10 hover:bg-white/5 transition">
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2 className="font-semibold mt-8 mb-3">All team members ({members.length})</h2>
      {loading ? <Loader /> : (
        <div className="space-y-2">
          {members.map((m) => (
            <div key={m._id} className="glass rounded-lg p-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <img src={m.photoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=4f46e5&color=fff`} className="h-9 w-9 rounded-lg object-cover" />
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{m.name}</p>
                  <p className="text-xs text-white/40 truncate">{m.roleBadge}</p>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => startEdit(m)} className="text-xs px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5">Edit</button>
                <button onClick={() => handleDelete(m._id)} className="text-xs px-3 py-1.5 rounded-lg border border-red-400/30 text-red-300 hover:bg-red-400/10">Remove</button>
              </div>
            </div>
          ))}
          {members.length === 0 && <p className="text-white/40 text-sm">No team members yet.</p>}
        </div>
      )}
    </div>
  );
}

const inputCls = 'w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-400';
