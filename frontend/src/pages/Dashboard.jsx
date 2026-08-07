import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { studentApi } from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import NoticeBanner from '../components/NoticeBanner';
import { CONTENT_TYPES } from '../constants/contentTypes';

export default function Dashboard() {
  const { student } = useAuth();
  const [counts, setCounts] = useState({});
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!student) return;
    studentApi
      .get('/content', { params: { branch: student.branch, semester: student.semester } })
      .then((res) => {
        const tally = {};
        res.data.forEach((item) => { tally[item.type] = (tally[item.type] || 0) + 1; });
        setCounts(tally);
      })
      .catch(() => {});
  }, [student]);

  useEffect(() => {
    if (!student || !search.trim()) { setSearchResults(null); return; }
    const debounce = setTimeout(() => {
      studentApi
        .get('/content', { params: { branch: student.branch, semester: student.semester, search } })
        .then((res) => setSearchResults(res.data));
    }, 300);
    return () => clearTimeout(debounce);
  }, [student, search]);

  const totalItems = Object.values(counts).reduce((a, b) => a + b, 0);
  const recentDownloads = student?.recentDownloads?.slice(0, 5) || [];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <div>
          <h1 className="font-display text-2xl font-bold">Hey, {student?.name?.split(' ')[0]} 👋</h1>
          <p className="text-white/50 text-sm mt-1">
            {student?.branch} · Semester {student?.semester} — here's everything available for you.
          </p>
        </div>

        <div className="relative">
          <input
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search everything for your semester — e.g. 'DBMS notes', 'unit 3 pyq'…"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-400"
          />
          {searchResults !== null && (
            <div className="absolute z-30 mt-2 w-full glass rounded-xl p-2 max-h-80 overflow-y-auto">
              {searchResults.length === 0 && <p className="text-white/40 text-sm px-3 py-2">No matches found.</p>}
              {searchResults.map((item) => (
                <button
                  key={item._id}
                  onClick={() => navigate(`/section/${item.type}`)}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 flex items-center justify-between gap-2"
                >
                  <span className="text-sm truncate">{item.title}</span>
                  <span className="text-xs text-white/40 shrink-0">{CONTENT_TYPES.find((t) => t.key === item.type)?.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard label="Resources available" value={totalItems} />
          <StatCard label="Your branch" value={student?.branch} />
          <StatCard label="Your semester" value={student?.semester} />
          <Link to="/result" className="glass rounded-xl p-4 flex flex-col justify-between hover:border-brand-500/40 transition">
            <span className="text-xs text-white/50">Result</span>
            <span className="font-semibold text-brand-300 mt-2">Download →</span>
          </Link>
        </div>

        <NoticeBanner />

        {recentDownloads.length > 0 && (
          <div>
            <h2 className="font-display font-semibold text-lg mb-3">Recently downloaded</h2>
            <div className="glass rounded-xl divide-y divide-white/5">
              {recentDownloads.map((d, i) => (
                <div key={i} className="px-4 py-3 flex items-center justify-between text-sm">
                  <span className="truncate">{d.title}</span>
                  <span className="text-white/40 text-xs shrink-0 ml-3">{new Date(d.downloadedAt).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="font-display font-semibold text-lg mb-3">Browse by category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {CONTENT_TYPES.map((t) => (
              <Link
                key={t.key}
                to={`/section/${t.key}`}
                className="glass rounded-xl p-4 hover:border-brand-500/40 transition flex flex-col gap-2"
              >
                <span className="text-2xl">{t.icon}</span>
                <span className="text-sm font-medium">{t.label}</span>
                <span className="text-xs text-white/40">{counts[t.key] || 0} available</span>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="glass rounded-xl p-4">
      <span className="text-xs text-white/50">{label}</span>
      <p className="font-display text-2xl font-bold mt-1">{value ?? '—'}</p>
    </div>
  );
}
