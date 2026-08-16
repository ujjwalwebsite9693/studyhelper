import { Link } from 'react-router-dom';
import { CONTENT_TYPES, BRANCHES, SEMESTERS } from '../constants/contentTypes';
import DisclaimerModal from '../components/DisclaimerModal';
import Ticker from '../components/Ticker';
import QuickDownloads from '../components/QuickDownloads';
import PublicHeader from '../components/PublicHeader';

export default function Landing() {
  return (
    <div className="flex-1 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-brand-900/40 via-ink-950 to-ink-950">
      <DisclaimerModal />

      <PublicHeader />

      <Ticker />

      <section className="max-w-4xl mx-auto text-center px-4 pt-14 pb-10">
        <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-200 mb-5">
          For CSE & IT · Semester 1 to 6
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold leading-tight">
          Everything for your semester,<br /><span className="text-gradient">in one place</span>
        </h1>
        <p className="text-white/60 mt-5 max-w-xl mx-auto">
          Notes, question papers, syllabus, routine, results and more — filtered to exactly your
          branch and semester. Built for CSE & IT students.
        </p>
        <div className="flex items-center justify-center gap-4 mt-8">
          <Link to="/register" className="px-6 py-3 rounded-xl btn-primary font-semibold hover:opacity-90 transition">Get started free</Link>
          <Link to="/login" className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition">I have an account</Link>
        </div>
      </section>

      <section className="px-4 pb-14">
        <QuickDownloads />
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-10">
        <h2 className="text-center font-display font-semibold text-lg mb-6">Everything you need, sorted automatically</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {CONTENT_TYPES.map((t) => (
            <div key={t.key} className="glass rounded-xl p-4 text-center hover:border-brand-500/40 transition">
              <div className="text-2xl">{t.icon}</div>
              <div className="text-sm mt-2 text-white/70">{t.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 pb-20 text-center">
        <div className="flex items-center justify-center gap-2 flex-wrap text-xs text-white/40">
          <span>Branches:</span>
          {BRANCHES.map((b) => <span key={b} className="px-2 py-1 rounded-full bg-white/5 border border-white/10">{b}</span>)}
          <span className="ml-2">Semesters:</span>
          {SEMESTERS.map((s) => <span key={s} className="px-2 py-1 rounded-full bg-white/5 border border-white/10">{s}</span>)}
        </div>
      </section>
    </div>
  );
}
