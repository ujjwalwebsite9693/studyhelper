import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { adminApi } from '../../api/axios';
import Loader from '../../components/Loader';
import { BRANCHES, SEMESTERS } from '../../constants/contentTypes';

export default function AdminNotices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [important, setImportant] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [targetBranch, setTargetBranch] = useState('ALL');
  const [targetSemester, setTargetSemester] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  function load() {
    setLoading(true);
    adminApi.get('/notice/admin').then((res) => setNotices(res.data)).finally(() => setLoading(false));
  }
  useEffect(load, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await adminApi.post('/notice', { title, message, important, pinned, targetBranch, targetSemester });
      toast.success('Notice sent');
      setTitle(''); setMessage(''); setImportant(false); setPinned(false); setTargetBranch('ALL'); setTargetSemester(0);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not send notice');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this notice?')) return;
    await adminApi.delete(`/notice/${id}`);
    load();
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Notices</h1>

      <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 mt-6 space-y-4">
        <input
          required placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-400"
        />
        <textarea
          required placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} rows={3}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-400"
        />

        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-xs text-white/60 mb-1 block">Send to branch</span>
            <select value={targetBranch} onChange={(e) => setTargetBranch(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-400">
              <option value="ALL">Everyone</option>
              {BRANCHES.map((b) => <option key={b} value={b}>{b} only</option>)}
            </select>
          </label>
          <label className="block">
            <span className="text-xs text-white/60 mb-1 block">Send to semester</span>
            <select value={targetSemester} onChange={(e) => setTargetSemester(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-400">
              <option value={0}>Every semester</option>
              {SEMESTERS.map((s) => <option key={s} value={s}>Semester {s} only</option>)}
            </select>
          </label>
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm text-white/70">
            <input type="checkbox" checked={important} onChange={(e) => setImportant(e.target.checked)} />
            Mark as important
          </label>
          <label className="flex items-center gap-2 text-sm text-white/70">
            <input type="checkbox" checked={pinned} onChange={(e) => setPinned(e.target.checked)} />
            Pin to top
          </label>
        </div>

        <button type="submit" disabled={submitting} className="btn-primary rounded-lg px-5 py-2.5 font-medium hover:opacity-90 transition disabled:opacity-50">
          {submitting ? 'Sending…' : 'Send notice'}
        </button>
      </form>

      <h2 className="font-semibold mt-8 mb-3">Sent notices</h2>
      {loading ? <Loader /> : (
        <div className="space-y-2">
          {notices.map((n) => (
            <div key={n._id} className={`glass rounded-lg p-3 border-l-4 ${n.important ? 'border-l-amber-400' : 'border-l-brand-500'} flex items-start justify-between gap-3`}>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  {n.pinned && <span className="text-xs">📌</span>}
                  <p className="text-sm font-medium">{n.title}</p>
                </div>
                <p className="text-xs text-white/50 mt-1">{n.message}</p>
                <p className="text-xs text-white/30 mt-1">
                  {n.targetBranch === 'ALL' ? 'Everyone' : n.targetBranch} · {n.targetSemester === 0 ? 'all semesters' : `sem ${n.targetSemester}`} · {new Date(n.createdAt).toLocaleString()}
                </p>
              </div>
              <button onClick={() => handleDelete(n._id)} className="text-xs px-3 py-1.5 rounded-lg border border-red-400/30 text-red-300 hover:bg-red-400/10 shrink-0">Delete</button>
            </div>
          ))}
          {notices.length === 0 && <p className="text-white/40 text-sm">No notices sent yet.</p>}
        </div>
      )}
    </div>
  );
}
