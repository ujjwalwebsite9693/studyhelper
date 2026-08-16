import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { adminApi } from '../../api/axios';
import Loader from '../../components/Loader';

const CATEGORY_SUGGESTIONS = ['Bonafide', 'Forms', 'No Dues Form', 'Fee Structure', 'ID Card', 'Syllabus', 'Notes', 'Other'];
const emptyForm = { title: '', category: '', description: '' };

export default function AdminDocuments() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function load() {
    setLoading(true);
    adminApi.get('/documents/admin/all').then((res) => setDocs(res.data)).finally(() => setLoading(false));
  }
  useEffect(load, []);

  function startEdit(doc) {
    setEditingId(doc._id);
    setForm({ title: doc.title, category: doc.category, description: doc.description || '' });
    setFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
    setFile(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!file && !editingId) {
      toast.error('Please attach a file');
      return;
    }
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('title', form.title);
      fd.append('category', form.category);
      fd.append('description', form.description);
      if (file) fd.append('file', file);

      if (editingId) {
        await adminApi.put(`/documents/${editingId}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Updated');
      } else {
        await adminApi.post('/documents', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Uploaded');
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
    if (!confirm('Delete this document permanently?')) return;
    try {
      await adminApi.delete(`/documents/${id}`);
      toast.success('Deleted');
      load();
    } catch {
      toast.error('Could not delete. Please try again.');
    }
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Documents</h1>
      <p className="text-white/50 text-sm mt-1">Bonafide, forms, no-dues, fee structure, and other official documents — shown on the public Documents page.</p>

      <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 mt-6 grid sm:grid-cols-2 gap-4">
        <h2 className="sm:col-span-2 font-semibold">{editingId ? 'Edit document' : 'Upload new document'}</h2>

        <label className="block">
          <span className="text-xs text-white/60 mb-1 block">Title</span>
          <input required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className={inputCls} />
        </label>
        <label className="block">
          <span className="text-xs text-white/60 mb-1 block">Category</span>
          <input
            required list="doc-categories" value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            className={inputCls} placeholder="e.g. Bonafide"
          />
          <datalist id="doc-categories">
            {CATEGORY_SUGGESTIONS.map((c) => <option key={c} value={c} />)}
          </datalist>
        </label>
        <label className="block sm:col-span-2">
          <span className="text-xs text-white/60 mb-1 block">Description (optional)</span>
          <input value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className={inputCls} />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-xs text-white/60 mb-1 block">File (PDF, ZIP, DOC, XLS — max 10MB) {editingId && '— leave empty to keep current file'}</span>
          <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className={inputCls} />
        </label>

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

      <h2 className="font-semibold mt-8 mb-3">All documents ({docs.length})</h2>
      {loading ? <Loader /> : (
        <div className="space-y-2">
          {docs.map((doc) => (
            <div key={doc._id} className="glass rounded-lg p-3 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{doc.title}</p>
                <p className="text-xs text-white/40">{doc.category} · {doc.fileType} {doc.fileSizeLabel && `· ${doc.fileSizeLabel}`} · {doc.downloadCount} downloads</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => startEdit(doc)} className="text-xs px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5">Edit</button>
                <button onClick={() => handleDelete(doc._id)} className="text-xs px-3 py-1.5 rounded-lg border border-red-400/30 text-red-300 hover:bg-red-400/10">Delete</button>
              </div>
            </div>
          ))}
          {docs.length === 0 && <p className="text-white/40 text-sm">Nothing uploaded yet.</p>}
        </div>
      )}
    </div>
  );
}

const inputCls = 'w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-400';
