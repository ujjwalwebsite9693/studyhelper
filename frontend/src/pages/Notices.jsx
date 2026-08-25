import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { studentApi } from '../api/axios';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';

export default function Notices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    studentApi.get('/notice').then((res) => setNotices(res.data)).finally(() => setLoading(false));
    studentApi.put('/notice/mark-seen').catch(() => {});
  }, []);

  return (
    <div className="flex-1">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <Link to="/dashboard" className="text-sm text-white/50 hover:text-white/80">← Back to dashboard</Link>
        <h1 className="font-display text-2xl font-bold mt-2">Notices</h1>

        {loading ? <Loader /> : (
          <div className="mt-6 space-y-3">
            {notices.length === 0 && <p className="text-white/40 text-sm">No notices yet.</p>}
            {notices.map((n) => (
              <div
                key={n._id}
                className={`glass rounded-xl p-4 border-l-4 ${n.important ? 'border-l-amber-400' : 'border-l-brand-500'}`}
              >
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    {n.pinned && <span className="text-xs">📌</span>}
                    <h4 className="font-semibold text-sm">{n.title}</h4>
                  </div>
                  <span className="text-xs text-white/40">{new Date(n.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-white/70 mt-1">{n.message}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
