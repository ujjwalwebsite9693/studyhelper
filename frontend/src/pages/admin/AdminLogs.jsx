import { useEffect, useState } from 'react';
import { adminApi } from '../../api/axios';
import Loader from '../../components/Loader';

export default function AdminLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.get('/admin/logs').then((res) => setLogs(res.data)).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Activity Log</h1>
      <p className="text-white/50 text-sm mt-1">Recent admin actions, most recent first.</p>

      {loading ? <Loader /> : (
        <div className="mt-6 glass rounded-xl divide-y divide-white/5">
          {logs.map((log) => (
            <div key={log._id} className="px-4 py-3 flex items-center justify-between gap-3 text-sm">
              <div className="min-w-0">
                <span className="font-mono text-xs text-brand-300">{log.action}</span>
                <span className="text-white/60 ml-2 truncate">{log.details}</span>
              </div>
              <span className="text-xs text-white/30 shrink-0">{new Date(log.createdAt).toLocaleString()}</span>
            </div>
          ))}
          {logs.length === 0 && <p className="text-white/40 text-sm px-4 py-6">No activity yet.</p>}
        </div>
      )}
    </div>
  );
}
