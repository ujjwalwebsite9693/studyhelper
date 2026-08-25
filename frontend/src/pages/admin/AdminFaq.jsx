import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { adminApi } from '../../api/axios';
import Loader from '../../components/Loader';

export default function AdminFaq() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function load() {
    setLoading(true);
    adminApi.get('/faq/admin').then((res) => setFaqs(res.data)).finally(() => setLoading(false));
  }
  useEffect(load, []);

  function startEdit(f) {
    setEditingId(f._id);
    setQuestion(f.question);
    setAnswer(f.answer);
  }

  function resetForm() {
    setEditingId(null);
    setQuestion('');
    setAnswer('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingId) {
        await adminApi.put(`/faq/${editingId}`, { question, answer });
        toast.success('Updated');
      } else {
        await adminApi.post('/faq', { question, answer });
        toast.success('Added');
      }
      resetForm();
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not save');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this FAQ?')) return;
    await adminApi.delete(`/faq/${id}`);
    load();
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Help &amp; FAQ</h1>
      <p className="text-white/50 text-sm mt-1">Shown to every student on their Help &amp; Support page.</p>

      <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 mt-6 space-y-3">
        <input
          required placeholder="Question" value={question} onChange={(e) => setQuestion(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-400"
        />
        <textarea
          required placeholder="Answer" value={answer} onChange={(e) => setAnswer(e.target.value)} rows={3}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-400"
        />
        <div className="flex gap-3">
          <button type="submit" disabled={submitting} className="btn-primary rounded-lg px-5 py-2.5 font-medium hover:opacity-90 transition disabled:opacity-50">
            {submitting ? 'Saving…' : editingId ? 'Save changes' : 'Add FAQ'}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="rounded-lg px-5 py-2.5 border border-white/10 hover:bg-white/5 transition">
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2 className="font-semibold mt-8 mb-3">All FAQs ({faqs.length})</h2>
      {loading ? <Loader /> : (
        <div className="space-y-2">
          {faqs.map((f) => (
            <div key={f._id} className="glass rounded-lg p-3 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium">{f.question}</p>
                <p className="text-xs text-white/50 mt-1">{f.answer}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => startEdit(f)} className="text-xs px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5">Edit</button>
                <button onClick={() => handleDelete(f._id)} className="text-xs px-3 py-1.5 rounded-lg border border-red-400/30 text-red-300 hover:bg-red-400/10">Delete</button>
              </div>
            </div>
          ))}
          {faqs.length === 0 && <p className="text-white/40 text-sm">No FAQs yet.</p>}
        </div>
      )}
    </div>
  );
}
