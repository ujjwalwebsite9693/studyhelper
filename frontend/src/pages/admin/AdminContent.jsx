import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { adminApi } from '../../api/axios';
import Loader from '../../components/Loader';
import { CONTENT_TYPES, BRANCHES, SEMESTERS } from '../../constants/contentTypes';

// branches/semesters are always arrays now — in "create" mode the checkboxes
// let you pick more than one, so a single PDF can go out to e.g. both
// branches and every semester in one upload.
const emptyForm = { title: '', type: 'notes', branches: ['CSE'], semesters: [1], subject: '', ytUrl: '' };
const emptyBulkForm = { type: 'notes', branches: ['CSE'], semesters: [1], subject: '' };

function toggleValue(arr, value) {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
}

// Cloudinary's free plan hard-caps raw/PDF uploads at 10MB — matches
// backend/src/routes/content.js MAX_PDF_BYTES.
const MAX_PDF_BYTES = 10 * 1024 * 1024;
const MAX_PDF_LABEL = '10MB';
const COMPRESS_URL = 'https://www.ilovepdf.com/compress_pdf';

function formatSize(bytes) {
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

export default function AdminContent() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [search, setSearch] = useState('');

  const [bulkMode, setBulkMode] = useState(false);
  const [bulkForm, setBulkForm] = useState(emptyBulkForm);
  const [bulkFiles, setBulkFiles] = useState([]);
  const [bulkSubmitting, setBulkSubmitting] = useState(false);

  function load() {
    setLoading(true);
    const params = {};
    if (filterType !== 'all') params.type = filterType;
    if (search) params.search = search;
    adminApi.get('/content/admin/all', { params }).then((res) => setItems(res.data)).finally(() => setLoading(false));
  }

  useEffect(() => {
    const debounce = setTimeout(load, 250);
    return () => clearTimeout(debounce);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterType, search]);

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function startEdit(item) {
    setEditingId(item._id);
    // Editing always targets one existing entry, so branch/semester stay
    // single-select here even though the create form allows multiple.
    setForm({
      title: item.title, type: item.type, branches: [item.branch],
      semesters: [item.semester], subject: item.subject || '',
      ytUrl: item.type === 'ytlink' ? item.fileUrl : '',
    });
    setFile(null);
    setBulkMode(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
    setFile(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.type !== 'ytlink' && !file && !editingId) {
      toast.error('Please attach a PDF file');
      return;
    }
    if (form.branches.length === 0 || form.semesters.length === 0) {
      toast.error('Select at least one branch and one semester');
      return;
    }
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('title', form.title);
      fd.append('type', form.type);
      fd.append('subject', form.subject);
      if (form.type === 'ytlink') fd.append('ytUrl', form.ytUrl);
      if (file) fd.append('file', file);

      if (editingId) {
        // Editing one existing entry — plain single fields, matches PUT /:id.
        fd.append('branch', form.branches[0]);
        fd.append('semester', form.semesters[0]);
        await adminApi.put(`/content/${editingId}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Updated');
      } else {
        // Creating — send the full selection, backend fans it out to one
        // entry per branch × semester combination.
        fd.append('branches', JSON.stringify(form.branches));
        fd.append('semesters', JSON.stringify(form.semesters));
        const res = await adminApi.post('/content', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        const count = res.data.length;
        toast.success(count > 1 ? `Uploaded to ${count} branch/semester combinations` : 'Uploaded');
      }
      cancelEdit();
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleBulkSubmit(e) {
    e.preventDefault();
    if (bulkFiles.length === 0) {
      toast.error('Select one or more PDF files');
      return;
    }
    if (bulkForm.branches.length === 0 || bulkForm.semesters.length === 0) {
      toast.error('Select at least one branch and one semester');
      return;
    }
    setBulkSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('type', bulkForm.type);
      fd.append('branches', JSON.stringify(bulkForm.branches));
      fd.append('semesters', JSON.stringify(bulkForm.semesters));
      fd.append('subject', bulkForm.subject);
      bulkFiles.forEach((f) => fd.append('files', f));
      const res = await adminApi.post('/content/bulk', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      toast.success(`${res.data.length} entries created`);
      setBulkFiles([]);
      setBulkForm(emptyBulkForm);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Bulk upload failed');
    } finally {
      setBulkSubmitting(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this item permanently?')) return;
    try {
      await adminApi.delete(`/content/${id}`);
      toast.success('Deleted');
      load();
    } catch {
      toast.error('Could not delete. Please try again.');
    }
  }

  async function togglePin(id) {
    try {
      const res = await adminApi.post(`/content/${id}/pin`);
      toast.success(res.data.pinned ? 'Pinned as must-read' : 'Unpinned');
      setItems((prev) => prev.map((i) => (i._id === id ? { ...i, pinned: res.data.pinned } : i)));
    } catch {
      toast.error('Could not update. Please try again.');
    }
  }

  function downloadCsv() {
    window.open(`${adminApi.defaults.baseURL}/content/admin/export.csv`, '_blank');
  }

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="font-display text-2xl font-bold">Manage Content</h1>
        <div className="flex gap-2">
          <button onClick={() => setBulkMode((v) => !v)} className="text-xs px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5">
            {bulkMode ? 'Single upload' : 'Bulk upload'}
          </button>
          <button onClick={downloadCsv} className="text-xs px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5">
            Export CSV
          </button>
        </div>
      </div>

      {bulkMode ? (
        <form onSubmit={handleBulkSubmit} className="glass rounded-2xl p-6 mt-6 grid sm:grid-cols-2 gap-4">
          <h2 className="sm:col-span-2 font-semibold">Bulk upload PDFs (filename becomes the title)</h2>
          <label className="block">
            <span className="text-xs text-white/60 mb-1 block">Category</span>
            <select value={bulkForm.type} onChange={(e) => setBulkForm((f) => ({ ...f, type: e.target.value }))} className={inputCls}>
              {CONTENT_TYPES.filter((t) => t.key !== 'ytlink').map((t) => <option key={t.key} value={t.key}>{t.label}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="text-xs text-white/60 mb-1 block">Subject (optional, applies to all)</span>
            <input value={bulkForm.subject} onChange={(e) => setBulkForm((f) => ({ ...f, subject: e.target.value }))} className={inputCls} />
          </label>

          <CheckboxGroup
            label="Branches (select one or more)"
            options={BRANCHES}
            selected={bulkForm.branches}
            onToggle={(val) => setBulkForm((f) => ({ ...f, branches: toggleValue(f.branches, val) }))}
          />
          <CheckboxGroup
            label="Semesters (select one or more)"
            options={SEMESTERS}
            renderLabel={(s) => `Semester ${s}`}
            selected={bulkForm.semesters}
            onToggle={(val) => setBulkForm((f) => ({ ...f, semesters: toggleValue(f.semesters, val) }))}
          />

          <label className="block sm:col-span-2">
            <span className="text-xs text-white/60 mb-1 block">
              PDF files (up to 20, max {MAX_PDF_LABEL} each) —{' '}
              <a href={COMPRESS_URL} target="_blank" rel="noopener noreferrer" className="text-brand-300 hover:underline">
                compress a file first
              </a>
            </span>
            <input
              type="file" accept="application/pdf" multiple
              onChange={(e) => {
                const chosen = Array.from(e.target.files || []);
                const tooBig = chosen.filter((f) => f.size > MAX_PDF_BYTES);
                const ok = chosen.filter((f) => f.size <= MAX_PDF_BYTES);
                if (tooBig.length > 0) {
                  toast.error(`${tooBig.length} file(s) over ${MAX_PDF_LABEL} were skipped: ${tooBig.map((f) => f.name).join(', ')}`);
                }
                setBulkFiles(ok);
              }}
              className={inputCls}
            />
            {bulkFiles.length > 0 && (
              <p className="text-xs text-white/40 mt-1">
                {bulkFiles.length} file(s) × {bulkForm.branches.length} branch(es) × {bulkForm.semesters.length} semester(s) = {bulkFiles.length * bulkForm.branches.length * bulkForm.semesters.length} entries
              </p>
            )}
          </label>
          <button type="submit" disabled={bulkSubmitting} className="sm:col-span-2 btn-primary rounded-lg px-5 py-2.5 font-medium hover:opacity-90 transition disabled:opacity-50">
            {bulkSubmitting ? 'Uploading…' : `Upload ${bulkFiles.length || ''} file(s)`}
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 mt-6 grid sm:grid-cols-2 gap-4">
          <h2 className="sm:col-span-2 font-semibold">{editingId ? 'Edit resource' : 'Upload new resource'}</h2>

          <label className="block">
            <span className="text-xs text-white/60 mb-1 block">Title</span>
            <input required value={form.title} onChange={(e) => update('title', e.target.value)} className={inputCls} />
          </label>
          <label className="block">
            <span className="text-xs text-white/60 mb-1 block">Category</span>
            <select value={form.type} onChange={(e) => update('type', e.target.value)} className={inputCls} disabled={!!editingId}>
              {CONTENT_TYPES.map((t) => <option key={t.key} value={t.key}>{t.label}</option>)}
            </select>
          </label>

          {editingId ? (
            <>
              <label className="block">
                <span className="text-xs text-white/60 mb-1 block">Branch</span>
                <select value={form.branches[0]} onChange={(e) => update('branches', [e.target.value])} className={inputCls}>
                  {BRANCHES.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="text-xs text-white/60 mb-1 block">Semester</span>
                <select value={form.semesters[0]} onChange={(e) => update('semesters', [Number(e.target.value)])} className={inputCls}>
                  {SEMESTERS.map((s) => <option key={s} value={s}>Semester {s}</option>)}
                </select>
              </label>
            </>
          ) : (
            <>
              <CheckboxGroup
                label="Branches (select one or more)"
                options={BRANCHES}
                selected={form.branches}
                onToggle={(val) => update('branches', toggleValue(form.branches, val))}
              />
              <CheckboxGroup
                label="Semesters (select one or more)"
                options={SEMESTERS}
                renderLabel={(s) => `Semester ${s}`}
                selected={form.semesters}
                onToggle={(val) => update('semesters', toggleValue(form.semesters, val))}
              />
            </>
          )}

          <label className="block">
            <span className="text-xs text-white/60 mb-1 block">Subject (optional)</span>
            <input value={form.subject} onChange={(e) => update('subject', e.target.value)} className={inputCls} />
          </label>

          {form.type === 'ytlink' ? (
            <label className="block">
              <span className="text-xs text-white/60 mb-1 block">YouTube URL</span>
              <input required value={form.ytUrl} onChange={(e) => update('ytUrl', e.target.value)} className={inputCls} />
            </label>
          ) : (
            <label className="block">
              <span className="text-xs text-white/60 mb-1 block">
                PDF file (max {MAX_PDF_LABEL}) {editingId && '— leave empty to keep current file'} —{' '}
                <a href={COMPRESS_URL} target="_blank" rel="noopener noreferrer" className="text-brand-300 hover:underline">
                  compress it first
                </a>
              </span>
              <input
                type="file" accept="application/pdf"
                onChange={(e) => {
                  const f = e.target.files?.[0] || null;
                  if (f && f.size > MAX_PDF_BYTES) {
                    toast.error(`"${f.name}" is ${formatSize(f.size)} — compress it to under ${MAX_PDF_LABEL} first (see link above)`);
                    e.target.value = '';
                    setFile(null);
                    return;
                  }
                  setFile(f);
                }}
                className={inputCls}
              />
            </label>
          )}

          {!editingId && form.branches.length > 0 && form.semesters.length > 0 && (
            <p className="sm:col-span-2 text-xs text-white/40 -mt-1">
              This will create {form.branches.length * form.semesters.length} entr{form.branches.length * form.semesters.length === 1 ? 'y' : 'ies'}:{' '}
              {form.branches.flatMap((b) => form.semesters.map((s) => `${b} sem ${s}`)).join(', ')}
            </p>
          )}

          <div className="sm:col-span-2 flex gap-3">
            <button type="submit" disabled={submitting} className="btn-primary rounded-lg px-5 py-2.5 font-medium hover:opacity-90 transition disabled:opacity-50">
              {submitting ? 'Saving…' : editingId ? 'Save changes' : 'Upload'}
            </button>
            {editingId && (
              <button type="button" onClick={cancelEdit} className="rounded-lg px-5 py-2.5 border border-white/10 hover:bg-white/5 transition">
                Cancel
              </button>
            )}
          </div>
        </form>
      )}

      <div className="flex items-center justify-between mt-8 mb-3 gap-3 flex-wrap">
        <h2 className="font-semibold">All resources ({items.length})</h2>
        <div className="flex gap-2">
          <input
            placeholder="Search title/subject…" value={search} onChange={(e) => setSearch(e.target.value)}
            className={`${inputCls} w-48`}
          />
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className={`${inputCls} w-auto`}>
            <option value="all">All categories</option>
            {CONTENT_TYPES.map((t) => <option key={t.key} value={t.key}>{t.label}</option>)}
          </select>
        </div>
      </div>

      {loading ? <Loader /> : (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item._id} className="glass rounded-lg p-3 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium truncate flex items-center gap-1.5">
                  {item.pinned && <span title="Must read">📌</span>}
                  {item.title}
                </p>
                <p className="text-xs text-white/40">
                  {item.branch} · Sem {item.semester} · {CONTENT_TYPES.find((t) => t.key === item.type)?.label} · {item.downloadCount} downloads
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => togglePin(item._id)} className="text-xs px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5">
                  {item.pinned ? 'Unpin' : 'Pin'}
                </button>
                <button onClick={() => startEdit(item)} className="text-xs px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5">Edit</button>
                <button onClick={() => handleDelete(item._id)} className="text-xs px-3 py-1.5 rounded-lg border border-red-400/30 text-red-300 hover:bg-red-400/10">Delete</button>
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="text-white/40 text-sm">Nothing here yet.</p>}
        </div>
      )}
    </div>
  );
}

function CheckboxGroup({ label, options, selected, onToggle, renderLabel }) {
  return (
    <div className="block">
      <span className="text-xs text-white/60 mb-1 block">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const checked = selected.includes(opt);
          return (
            <label
              key={opt}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm cursor-pointer transition ${checked ? 'border-brand-400 bg-brand-500/15 text-white' : 'border-white/10 text-white/60 hover:bg-white/5'}`}
            >
              <input type="checkbox" checked={checked} onChange={() => onToggle(opt)} className="accent-brand-500" />
              {renderLabel ? renderLabel(opt) : opt}
            </label>
          );
        })}
      </div>
    </div>
  );
}

const inputCls = 'w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-400';
