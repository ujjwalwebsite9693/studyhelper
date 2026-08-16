import { Link, useLocation } from 'react-router-dom';
import { CONTENT_TYPES, BRANCHES, SEMESTERS } from '../constants/contentTypes';
import DisclaimerModal from '../components/DisclaimerModal';
import Ticker from '../components/Ticker';
import QuickDownloads from '../components/QuickDownloads';

export default function Landing() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex-1 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-brand-900/40 via-ink-950 to-ink-950 min-h-screen">
      <DisclaimerModal />

      {/* Header - Fully Responsive on Mobile & Desktop */}
      <header className="w-full border-b border-white/5 sm:border-0">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 min-h-[4rem] flex flex-wrap items-center justify-between gap-2 sm:gap-4">
          
          {/* Logo */}
          <Link to="/" className="font-display font-bold text-lg tracking-tight">
            HUB<span className="text-gradient">STUDY</span>
          </Link>

          {/* Navigation Links (Visible on All Screen Sizes) */}
          <nav className="flex items-center gap-1.5 sm:gap-3 flex-wrap">
            
            {/* 1. Download App Link (Public HTML) */}
            <a 
              href="/downloadapp.html" 
              className="text-xs sm:text-sm px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-lg border border-blue-500/30 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition inline-flex items-center gap-1.5 font-medium"
            >
              <i className="fa-brands fa-android text-sm"></i>
              <span>App</span>
            </a>

            {/* 2. Documents Link */}
            <a
              href="/documents.html"
              className={`text-xs sm:text-sm px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-lg border transition ${
                isActive('/documents') || isActive('/documents.html')
                  ? 'border-brand-400 text-brand-300 bg-brand-500/10'
                  : 'border-white/10 hover:bg-white/5 text-white/80 hover:text-white'
              }`}
            >
              Docs
            </a>

            {/* 3. Team Link */}
            <a
              href="/teams.html"
              className={`text-xs sm:text-sm px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-lg border transition ${
                isActive('/team') || isActive('/teams.html')
                  ? 'border-brand-400 text-brand-300 bg-brand-500/10'
                  : 'border-white/10 hover:bg-white/5 text-white/80 hover:text-white'
              }`}
            >
              Team
            </a>

            {/* 4. Login */}
            <Link 
              to="/login" 
              className="text-xs sm:text-sm px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-lg border border-white/10 hover:bg-white/5 transition text-white"
            >
              Log in
            </Link>

            {/* 5. Sign up */}
            <Link 
              to="/register" 
              className="text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg btn-primary font-medium hover:opacity-90 transition whitespace-nowrap"
            >
              Sign up
            </Link>
          </nav>
        </div>
      </header>

      <Ticker />

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center px-4 pt-10 sm:pt-14 pb-10">
        <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-200 mb-5">
          For CSE & IT · Semester 1 to 6
        </span>
        
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold leading-tight tracking-tight">
          Everything for your semester,<br />
          <span className="text-gradient">in one place</span>
        </h1>

        <p className="text-white/60 mt-4 sm:mt-5 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Notes, question papers, syllabus, routine, results and more — filtered to exactly your
          branch and semester. Built for CSE & IT students.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8 w-full max-w-xs sm:max-w-none mx-auto">
          <Link 
            to="/register" 
            className="w-full sm:w-auto px-6 py-3 rounded-xl btn-primary font-semibold text-center hover:opacity-90 transition"
          >
            Get started free
          </Link>
          <Link 
            to="/login" 
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-center transition"
          >
            I have an account
          </Link>
        </div>
      </section>

      {/* Quick Downloads Section */}
      <section className="px-4 pb-14 max-w-7xl mx-auto">
        <QuickDownloads />
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-10">
        <h2 className="text-center font-display font-semibold text-base sm:text-lg mb-6">
          Everything you need, sorted automatically
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {CONTENT_TYPES.map((t) => (
            <div key={t.key} className="glass rounded-xl p-4 text-center hover:border-brand-500/40 transition">
              <div className="text-2xl">{t.icon}</div>
              <div className="text-xs sm:text-sm mt-2 text-white/70">{t.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tags Footer Section */}
      <section className="max-w-4xl mx-auto px-4 pb-16 text-center">
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap text-xs text-white/40">
          <span>Branches:</span>
          {BRANCHES.map((b) => (
            <span key={b} className="px-2 py-0.5 sm:py-1 rounded-full bg-white/5 border border-white/10">
              {b}
            </span>
          ))}
          <span className="ml-2">Semesters:</span>
          {SEMESTERS.map((s) => (
            <span key={s} className="px-2 py-0.5 sm:py-1 rounded-full bg-white/5 border border-white/10">
              {s}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
