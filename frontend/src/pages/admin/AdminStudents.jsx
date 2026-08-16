import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { adminApi } from '../../api/axios';
import Loader from '../../components/Loader';
import { BRANCHES, SEMESTERS } from '../../constants/contentTypes';

export default function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [selected, setSelected] = useState(new Set());
  const [promoting, setPromoting] = useState(false);

  function load() {
    setLoading(true);
    adminApi.get('/admin/students').then((res) => setStudents(res.data)).finally(() => setLoading(false));
  }
  useEffect(load, []);

  function startEdit(s) {
    setEditingId(s._id);
    setEditForm({ name: s.name, branch: s.branch, semester: s.semester, boardEmail: s.boardEmail, boardRollNumber: s.boardRollNumber, boardRegNo: s.boardRegNo });
  }

  async function saveEdit(id) {
    try {
      await adminApi.put(`/admin/students/${id}`, editForm);
      toast.success('Updated');
      setEditingId(null);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not update');
    }
  }

  async function handleDelete(id) {
    if (!confirm('Remove this student account permanently?')) return;
    try {
      await adminApi.delete(`/admin/students/${id}`);
      toast.success('Removed');
      load();
    } catch {
      toast.error('Could not delete. Please try again.');
    }
  }

  function toggleSelect(id) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  async function handlePromote() {
    if (selected.size === 0) {
      toast.error('Select at least one student');
      return;
    }
    if (!confirm(`Promote ${selected.size} student(s) to their next semester?`)) return;
    setPromoting(true);
    try {
      const res = await adminApi.post('/admin/students/promote-semester', { studentIds: [...selected] });
      toast.success(`${res.data.promoted} student(s) promoted`);
      setSelected(new Set());
      load();
    } catch {
      toast.error('Could not promote students');
    } finally {
      setPromoting(false);
    }
  }

  function downloadCsv() {
    window.open(`${adminApi.defaults.baseURL}/admin/students/export.csv`, '_blank');
  }

  const filtered = students.filter((s) =>
    [s.name, s.boardEmail, s.boardRegNo].join(' ').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h1 className="font-display text-2xl font-bold">Students ({students.length})</h1>
        <div className="flex gap-2 items-center flex-wrap">
          {selected.size > 0 && (
            <button onClick={handlePromote} disabled={promoting} className="text-xs px-3 py-2 rounded-lg btn-primary disabled:opacity-50">
              {promoting ? 'Promoting…' : `Promote ${selected.size} to next sem`}
            </button>
          )}
          <button onClick={downloadCsv} className="text-xs px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5">Export CSV</button>
          <input
            placeholder="Search by name, email, reg no…"
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-400 w-56"
          />
        </div>
      </div>

      {loading ? <Loader /> : (
        <div className="mt-6 space-y-2">
          {filtered.map((s) => (
            <div key={s._id} className="glass rounded-lg p-3">
              {editingId === s._id ? (
                <div className="grid sm:grid-cols-3 gap-2">
                  <input className={inputCls} value={editForm.name} onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))} placeholder="Name" />
                  <select className={inputCls} value={editForm.branch} onChange={(e) => setEditForm((f) => ({ ...f, branch: e.target.value }))}>
                    {BRANCHES.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                  <select className={inputCls} value={editForm.semester} onChange={(e) => setEditForm((f) => ({ ...f, semester: Number(e.target.value) }))}>
                    {SEMESTERS.map((sem) => <option key={sem} value={sem}>Semester {sem}</option>)}
                  </select>
                  <input className={inputCls} value={editForm.boardEmail} onChange={(e) => setEditForm((f) => ({ ...f, boardEmail: e.target.value }))} placeholder="Email" />
                  <input className={inputCls} value={editForm.boardRollNumber} onChange={(e) => setEditForm((f) => ({ ...f, boardRollNumber: e.target.value }))} placeholder="Roll number" />
                  <input className={inputCls} value={editForm.boardRegNo} onChange={(e) => setEditForm((f) => ({ ...f, boardRegNo: e.target.value }))} placeholder="Reg no." />
                  <div className="sm:col-span-3 flex gap-2 mt-1">
                    <button onClick={() => saveEdit(s._id)} className="text-xs px-3 py-1.5 rounded-lg btn-primary">Save</button>
                    <button onClick={() => setEditingId(null)} className="text-xs px-3 py-1.5 rounded-lg border border-white/10">Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <input type="checkbox" checked={selected.has(s._id)} onChange={() => toggleSelect(s._id)} />
                    <img src={s.dpUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(s.name)}&background=4f46e5&color=fff`} className="h-9 w-9 rounded-full object-cover" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{s.name}</p>
                      <p className="text-xs text-white/40 truncate">
                        {s.boardEmail} · {s.branch} · Sem {s.semester} · Reg {s.boardRegNo} · {s.totalDownloads || 0} downloads · last login {s.lastLoginAt ? new Date(s.lastLoginAt).toLocaleDateString() : 'never'}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => startEdit(s)} className="text-xs px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5">Edit</button>
                    <button onClick={() => handleDelete(s._id)} className="text-xs px-3 py-1.5 rounded-lg border border-red-400/30 text-red-300 hover:bg-red-400/10">Remove</button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {filtered.length === 0 && <p className="text-white/40 text-sm">No students found.</p>}
        </div>
      )}
    </div>
  );
}

const inputCls = 'w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-400';
