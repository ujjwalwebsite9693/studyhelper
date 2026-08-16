import { useEffect, useState } from 'react';
import studentApi from '../api/axios';
import PublicHeader from '../components/PublicHeader';
import Loader from '../components/Loader';

// Cycle through a few badge colors so roles read distinctly without
// needing the admin to pick a color when adding a member.
const BADGE_COLORS = [
  'bg-violet-500/15 border-violet-500/30 text-violet-300',
  'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
  'bg-amber-500/15 border-amber-500/30 text-amber-300',
  'bg-cyan-500/15 border-cyan-500/30 text-cyan-300',
];

function InfoRow({ icon, label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-center justify-between text-sm py-1.5">
      <span className="text-white/50 flex items-center gap-1.5">{icon} {label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}

export default function Team() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    studentApi.get('/team/public').then((res) => setMembers(res.data)).finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex-1 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-brand-900/40 via-ink-950 to-ink-950">
      <PublicHeader />

      <section className="max-w-4xl mx-auto text-center px-4 pt-12 pb-10">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-200 mb-5">
          🔗 Development &amp; Core Team
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold">Meet the Minds Behind HUB STUDY</h1>
        <p className="text-white/60 mt-4 max-w-xl mx-auto">
          The core team responsible for portal development, infrastructure management, and resource uploads.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-20">
        {loading && <Loader />}
        {!loading && members.length === 0 && (
          <div className="glass rounded-xl p-8 text-center text-white/50">Team details coming soon.</div>
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {members.map((m, i) => (
            <div key={m._id} className="glass rounded-2xl p-5 flex flex-col">
              <div className="flex items-center gap-3">
                {m.photoUrl ? (
                  <img src={m.photoUrl} alt={m.name} className="h-14 w-14 rounded-xl object-cover border border-white/10" />
                ) : (
                  <div className="h-14 w-14 rounded-xl bg-white/10 flex items-center justify-center text-lg font-semibold border border-white/10">
                    {m.name?.[0]}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="font-semibold truncate">{m.name}</p>
                  <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${BADGE_COLORS[i % BADGE_COLORS.length]}`}>
                    {m.roleBadge}
                  </span>
                </div>
              </div>

              <div className="mt-4 divide-y divide-white/5">
                <InfoRow icon="🖥️" label="Branch" value={m.branch} />
                <InfoRow icon="🪪" label="Roll Number" value={m.rollNumber} />
                <InfoRow icon="🎓" label="Semester" value={m.semesterLabel} />
                <InfoRow icon="👤" label="Role" value={m.roleTitle} />
              </div>

              {m.responsibilities && (
                <div className="mt-4 bg-white/5 border border-white/10 rounded-xl p-3">
                  <p className="text-[11px] font-semibold text-brand-300 flex items-center gap-1.5 mb-1.5">💼 WORK &amp; RESPONSIBILITIES</p>
                  <p className="text-sm text-white/60">{m.responsibilities}</p>
                </div>
              )}

              {(m.githubUrl || m.linkedinUrl || m.instagramUrl || m.websiteUrl) && (
                <div className="mt-4 flex gap-2">
                  {m.githubUrl && <a href={m.githubUrl} target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center transition">🐙</a>}
                  {m.linkedinUrl && <a href={m.linkedinUrl} target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center transition">💼</a>}
                  {m.instagramUrl && <a href={m.instagramUrl} target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center transition">📸</a>}
                  {m.websiteUrl && <a href={m.websiteUrl} target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center transition">🌐</a>}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
