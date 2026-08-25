import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { studentApi } from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import ContentCard from '../components/ContentCard';
import Loader from '../components/Loader';
import { CONTENT_TYPES } from '../constants/contentTypes';

export default function ContentSection() {
  const { type } = useParams();
  const { student } = useAuth();
  const [items, setItems] = useState([]);
  const [bookmarkIds, setBookmarkIds] = useState(new Set());
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState('');
  const [sort, setSort] = useState('newest');

  const meta = CONTENT_TYPES.find((t) => t.key === type);

  useEffect(() => {
    if (!student) return;
    studentApi.get('/content/bookmarks/mine').then((res) => setBookmarkIds(new Set(res.data.map((i) => i._id)))).catch(() => {});
    studentApi.get('/content/progress').then((res) => setProgress(res.data)).catch(() => {});
  }, [student]);

  useEffect(() => {
    if (!student) return;
    setLoading(true);
    const params = { branch: student.branch, semester: student.semester, type, sort };
    if (search) params.search = search;
    if (subject) params.subject = subject;
    const debounce = setTimeout(() => {
      studentApi.get('/content', { params }).then((res) => setItems(res.data)).finally(() => setLoading(false));
    }, 250);
    return () => clearTimeout(debounce);
  }, [student, type, search, subject, sort]);

  function handleCompleteChange(id, isCompleted) {
    if (progress?.[type]) {
      setProgress((prev) => ({
        ...prev,
        [type]: { ...prev[type], completed: prev[type].completed + (isCompleted ? 1 : -1) },
      }));
    }
  }

  const subjects = [...new Set(items.map((i) => i.subject).filter(Boolean))];
  const typeProgress = progress?.[type];

  return (
    <div className="flex-1">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <Link to="/dashboard" className="text-sm text-white/50 hover:text-white/80">← Back to dashboard</Link>
        <h1 className="font-display text-2xl font-bold mt-2 flex items-center gap-2">
          <span>{meta?.icon}</span> {meta?.label || 'Section'}
        </h1>
        <p className="text-white/50 text-sm mt-1">
          {student?.branch} · Semester {student?.semester}
        </p>

        {typeProgress && typeProgress.total > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-white/50 mb-1">
              <span>Your progress</span>
              <span>{typeProgress.completed} / {typeProgress.total} studied</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full btn-primary rounded-full transition-all"
                style={{ width: `${Math.min(100, (typeProgress.completed / typeProgress.total) * 100)}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3 mt-5">
          <input
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or subject…"
            className="flex-1 min-w-[180px] bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-400"
          />
          {subjects.length > 0 && (
            <select value={subject} onChange={(e) => setSubject(e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-400">
              <option value="">All subjects</option>
              {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          )}
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-400">
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="popular">Most downloaded</option>
          </select>
        </div>

        <div className="mt-6 space-y-3">
          {loading && <Loader />}
          {!loading && items.length === 0 && (
            <div className="glass rounded-xl p-8 text-center text-white/50">
              Nothing found here for your semester{search ? ' matching your search' : ''}.
            </div>
          )}
          {!loading && items.map((item) => (
            <ContentCard
              key={item._id}
              item={item}
              bookmarked={bookmarkIds.has(item._id)}
              onCompleteChange={handleCompleteChange}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
