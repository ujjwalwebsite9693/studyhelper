import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import studentApi from '../api/axios';
import PublicHeader from '../components/PublicHeader';
import Loader from '../components/Loader';

const ICONS = {
  PDF: { icon: '📄', bg: 'bg-red-500/15', text: 'text-red-400' },
  ZIP: { icon: '🗄️', bg: 'bg-blue-500/15', text: 'text-blue-400' },
  DOC: { icon: '📝', bg: 'bg-blue-500/15', text: 'text-blue-400' },
  DOCX: { icon: '📝', bg: 'bg-blue-500/15', text: 'text-blue-400' },
  XLS: { icon: '📊', bg: 'bg-green-500/15', text: 'text-green-400' },
  XLSX: { icon: '📊', bg: 'bg-green-500/15', text: 'text-green-400' },
};
function iconFor(type) {
  return ICONS[(type || '').toUpperCase()] || { icon: '📁', bg: 'bg-white/10', text: 'text-white/60' };
}

export default function Documents() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    studentApi.get('/documents/public').then((res) => setDocs(res.data)).finally(() => setLoading(false));
  }, []);

  async function handleDownload(doc) {
    try {
      const res = await studentApi.post(`/documents/public/${doc._id}/download`);
      window.open(res.data.url, '_blank', 'noopener,noreferrer');
    } catch {
      toast.error('Could not open this file. Please try again.');
    }
  }

  const filtered = docs.filter((d) =>
    [d.title, d.category, d.description].join(' ').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-brand-900/40 via-ink-950 to-ink-950">
      <PublicHeader />

      <section className="max-w-6xl mx-auto px-4 pt-10 pb-6">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-200 mb-5">
          📁 Resource Hub
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold">Documents &amp; Study Notes</h1>
        <p className="text-white/60 mt-3 max-w-xl">
          Download syllabus, handwritten notes, lab manuals, and official college documents directly.
        </p>

        <div className="relative mt-6 max-w-xl">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">🔍</span>
          <input
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by subject, branch, or topic…"
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-brand-400"
          />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-20">
        {loading && <Loader />}
        {!loading && filtered.length === 0 && (
          <div className="glass rounded-xl p-8 text-center text-white/50">
            {docs.length === 0 ? 'No documents uploaded yet — check back soon.' : 'Nothing matches your search.'}
          </div>
        )}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((doc) => {
            const { icon, bg, text } = iconFor(doc.fileType);
            return (
              <div key={doc._id} className="glass rounded-xl p-5 flex flex-col hover:border-brand-500/40 transition">
                <div className="flex items-start gap-3">
                  <div className={`h-11 w-11 rounded-lg ${bg} flex items-center justify-center text-xl shrink-0`}>{icon}</div>
                  <div className="min-w-0">
                    <p className={`text-xs font-semibold uppercase tracking-wide ${text}`}>{doc.category}</p>
                    <p className="font-semibold mt-0.5 truncate">{doc.title}</p>
                  </div>
                </div>
                {doc.description && <p className="text-sm text-white/50 mt-3">{doc.description}</p>}
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-white/40">{doc.fileType} {doc.fileSizeLabel && `· ${doc.fileSizeLabel}`}</span>
                  <button
                    onClick={() => handleDownload(doc)}
                    className="text-sm px-3 py-1.5 rounded-lg btn-primary font-medium hover:opacity-90 transition flex items-center gap-1.5"
                  >
                    ⬇ Download
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
