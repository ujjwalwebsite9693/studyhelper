import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { adminApi } from '../../api/axios';
import Loader from '../../components/Loader';

export default function AdminReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    adminApi.get('/reports').then((res) => setReports(res.data)).finally(() => setLoading(false));
  }
  useEffect(load, []);

  async function resolve(id) {
    try {
      await adminApi.put(`/reports/${id}/resolve`);
      toast.success('Marked resolved');
      load();
    } catch {
      toast.error('Could not update');
    }
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Reported Files</h1>
      <p className="text-white/50 text-sm mt-1">Broken or incorrect files flagged by students.</p>

      {loading ? <Loader /> : (
        <div className="mt-6 space-y-2">
          {reports.map((r) => (
            <div key={r._id} className={`glass rounded-lg p-3 flex items-start justify-between gap-3 ${r.status === 'resolved' ? 'opacity-50' : ''}`}>
              <div className="min-w-0">
                <p className="text-sm font-medium">{r.content?.title || 'Deleted item'}</p>
                <p className="text-xs text-white/50 mt-1">"{r.reason}"</p>
                <p className="text-xs text-white/30 mt-1">
                  Reported by {r.student?.name || 'unknown'} · {new Date(r.createdAt).toLocaleString()} · {r.status}
                </p>
              </div>
              {r.status === 'open' && (
                <button onClick={() => resolve(r._id)} className="text-xs px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 shrink-0">
                  Mark resolved
                </button>
              )}
            </div>
          ))}
          {reports.length === 0 && <p className="text-white/40 text-sm">No reports yet.</p>}
        </div>
      )}
    </div>
  );
}
