import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { studentApi } from '../api/axios';

export default function NoticeBanner() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    studentApi.get('/notice').then((res) => setNotices(res.data)).catch(() => {});
  }, []);

  if (notices.length === 0) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-display font-semibold text-lg">Notices</h2>
        <Link to="/notices" className="text-xs text-brand-300 hover:underline">View all →</Link>
      </div>
      <div className="space-y-3">
        {notices.slice(0, 3).map((n) => (
          <div
            key={n._id}
            className={`glass rounded-xl p-4 border-l-4 ${n.important ? 'border-l-amber-400' : 'border-l-brand-500'}`}
          >
            <div className="flex items-center justify-between gap-2">
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
    </div>
  );
}
