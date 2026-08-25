import { useEffect, useState } from 'react';
import { adminApi } from '../../api/axios';
import Loader from '../../components/Loader';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [top, setTop] = useState([]);
  const [today, setToday] = useState(null);

  useEffect(() => {
    adminApi.get('/admin/stats').then((res) => setStats(res.data)).catch(() => {});
    adminApi.get('/content/admin/top', { params: { limit: 5 } }).then((res) => setTop(res.data)).catch(() => {});
    adminApi.get('/admin/today').then((res) => setToday(res.data)).catch(() => {});
  }, []);

  if (!stats) return <Loader />;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Overview</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
        <StatCard label="Total students" value={stats.totalStudents} />
        <StatCard label="Total resources" value={stats.totalContent} />
        <StatCard label="Notices sent" value={stats.totalNotices} />
      </div>

      {today && (
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="glass rounded-xl p-4 border-l-4 border-l-accent-500">
            <span className="text-xs text-white/50">New signups today</span>
            <p className="font-display text-2xl font-bold mt-1">{today.newSignupsToday}</p>
          </div>
          <div className="glass rounded-xl p-4 border-l-4 border-l-accent-500">
            <span className="text-xs text-white/50">Downloads today</span>
            <p className="font-display text-2xl font-bold mt-1">{today.downloadsToday}</p>
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4 mt-8">
        <Breakdown title="Students by branch" rows={stats.byBranch} />
        <Breakdown title="Students by semester" rows={stats.bySemester.map((r) => ({ _id: `Sem ${r._id}`, count: r.count }))} />
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mt-8">
        <Breakdown title="Resources by category" rows={stats.byType} />
        <div className="glass rounded-xl p-4">
          <h3 className="font-semibold text-sm mb-3">Top downloaded resources</h3>
          <div className="space-y-2">
            {top.length === 0 && <p className="text-white/40 text-sm">No downloads yet.</p>}
            {top.map((item) => (
              <div key={item._id} className="flex items-center justify-between text-sm">
                <span className="text-white/70 truncate">{item.title}</span>
                <span className="font-medium shrink-0 ml-2">{item.downloadCount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="glass rounded-xl p-4">
      <span className="text-xs text-white/50">{label}</span>
      <p className="font-display text-3xl font-bold mt-1">{value}</p>
    </div>
  );
}

function Breakdown({ title, rows }) {
  return (
    <div className="glass rounded-xl p-4">
      <h3 className="font-semibold text-sm mb-3">{title}</h3>
      <div className="space-y-2">
        {rows.length === 0 && <p className="text-white/40 text-sm">No data yet.</p>}
        {rows.map((r) => (
          <div key={r._id} className="flex items-center justify-between text-sm">
            <span className="text-white/70">{r._id}</span>
            <span className="font-medium">{r.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
