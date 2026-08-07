import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { studentApi } from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { BRANCHES, SEMESTERS } from '../constants/contentTypes';

const IMGBB_KEY = import.meta.env.VITE_IMGBB_KEY;

export default function Profile() {
  const { student, updateStudent } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const firstLogin = location.state?.firstLogin || !student?.hasCompletedFirstLogin;

  const [name, setName] = useState(student?.name || '');
  const [branch, setBranch] = useState(student?.branch || 'CSE');
  const [semester, setSemester] = useState(student?.semester || 1);
  const [dpUrl, setDpUrl] = useState(student?.dpUrl || '');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!IMGBB_KEY) {
      toast.error('Image upload isn\'t configured yet (missing VITE_IMGBB_KEY).');
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!data.success) throw new Error('Upload failed');
      setDpUrl(data.data.url);
      toast.success('Photo uploaded');
    } catch {
      toast.error('Could not upload photo. Please try again.');
    } finally {
      setUploading(false);
    }
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await studentApi.put('/profile/me', { name, branch, semester, dpUrl });
      updateStudent(res.data);
      toast.success('Profile updated');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);

  async function handleChangePassword(e) {
    e.preventDefault();
    setChangingPassword(true);
    try {
      await studentApi.put('/profile/change-password', { currentPassword, newPassword });
      toast.success('Password updated');
      setCurrentPassword('');
      setNewPassword('');
      setShowPasswordForm(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not change password. Please try again.');
    } finally {
      setChangingPassword(false);
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        {!firstLogin && (
          <Link to="/dashboard" className="text-sm text-white/50 hover:text-white/80">← Back to dashboard</Link>
        )}

        {firstLogin && (
          <div className="glass rounded-xl p-4 mb-4 border-l-4 border-l-brand-500 text-sm text-white/70">
            Welcome! Take a moment to confirm your details and add a profile photo — you can change your
            semester here anytime new content is released.
          </div>
        )}

        <h1 className="font-display text-2xl font-bold mt-2">Your Profile</h1>

        <form onSubmit={handleSave} className="glass rounded-2xl p-6 mt-6 space-y-5">
          <div className="flex items-center gap-4">
            <img
              src={dpUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'S')}&background=4f46e5&color=fff`}
              alt="dp"
              className="h-20 w-20 rounded-full object-cover border border-white/10"
            />
            <label className="text-sm px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition cursor-pointer">
              {uploading ? 'Uploading…' : 'Change photo'}
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} disabled={uploading} />
            </label>
          </div>

          <label className="block">
            <span className="text-xs text-white/60 mb-1 block">Full name</span>
            <input
              value={name} onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-400"
            />
          </label>

          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-xs text-white/60 mb-1 block">Branch</span>
              <select value={branch} onChange={(e) => setBranch(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-400">
                {BRANCHES.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="text-xs text-white/60 mb-1 block">Semester</span>
              <select value={semester} onChange={(e) => setSemester(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-400">
                {SEMESTERS.map((s) => <option key={s} value={s}>Semester {s}</option>)}
              </select>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-white/50">
            <div>
              <span className="text-xs block">Board Reg. No.</span>
              <span>{student?.boardRegNo}</span>
            </div>
            <div>
              <span className="text-xs block">Board Email</span>
              <span className="truncate block">{student?.boardEmail}</span>
            </div>
            <div>
              <span className="text-xs block">Total downloads</span>
              <span>{student?.totalDownloads ?? 0}</span>
            </div>
            <div>
              <span className="text-xs block">Member since</span>
              <span>{student?.createdAt ? new Date(student.createdAt).toLocaleDateString() : '—'}</span>
            </div>
          </div>

          <button
            type="submit" disabled={saving}
            className="w-full btn-primary rounded-xl py-3 font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Save profile'}
          </button>
        </form>

        <div className="glass rounded-2xl p-6 mt-4">
          <button
            type="button"
            onClick={() => setShowPasswordForm((v) => !v)}
            className="text-sm font-medium text-brand-300 hover:underline"
          >
            {showPasswordForm ? 'Cancel password change' : 'Change password'}
          </button>

          {showPasswordForm && (
            <form onSubmit={handleChangePassword} className="mt-4 space-y-3">
              <input
                required type="password" placeholder="Current password"
                value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-400"
              />
              <input
                required type="password" placeholder="New password" minLength={4}
                value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-400"
              />
              <button
                type="submit" disabled={changingPassword}
                className="w-full rounded-xl py-2.5 font-medium border border-white/10 hover:bg-white/5 transition disabled:opacity-50"
              >
                {changingPassword ? 'Updating…' : 'Update password'}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
