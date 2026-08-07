import { Link } from 'react-router-dom';
import { CONTENT_TYPES } from '../constants/contentTypes';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-brand-900/40 via-ink-950 to-ink-950">
      <header className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <span className="font-display font-bold text-lg">SBTE<span className="text-gradient">Portal</span></span>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition">Log in</Link>
          <Link to="/register" className="text-sm px-4 py-2 rounded-lg btn-primary font-medium hover:opacity-90 transition">Sign up</Link>
        </div>
      </header>

      <section className="max-w-4xl mx-auto text-center px-4 pt-16 pb-14">
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold leading-tight">
          Everything for your semester,<br /><span className="text-gradient">in one place</span>
        </h1>
        <p className="text-white/60 mt-5 max-w-xl mx-auto">
          Notes, question papers, syllabus, assignments, results and more — filtered to exactly your
          branch and semester. Built for CSE & IT students.
        </p>
        <div className="flex items-center justify-center gap-4 mt-8">
          <Link to="/register" className="px-6 py-3 rounded-xl btn-primary font-semibold hover:opacity-90 transition">Get started free</Link>
          <Link to="/login" className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition">I have an account</Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {CONTENT_TYPES.map((t) => (
            <div key={t.key} className="glass rounded-xl p-4 text-center">
              <div className="text-2xl">{t.icon}</div>
              <div className="text-sm mt-2 text-white/70">{t.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
