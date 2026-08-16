import { Link, useLocation } from 'react-router-dom';

// Shared header for public (no-login) pages: Landing, Documents, Team.
// Keeps the nav consistent across all of them.
export default function PublicHeader() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <header className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display font-bold text-lg">HUB<span className="text-gradient">STUDY</span></Link>
        <nav className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/documents"
            className={`hidden sm:inline text-sm px-4 py-2 rounded-lg border transition ${isActive('/documents') ? 'border-brand-400 text-brand-300 bg-brand-500/10' : 'border-white/10 hover:bg-white/5'}`}
          >
            Documents
          </Link>
          <Link
            to="/team"
            className={`hidden sm:inline text-sm px-4 py-2 rounded-lg border transition ${isActive('/team') ? 'border-brand-400 text-brand-300 bg-brand-500/10' : 'border-white/10 hover:bg-white/5'}`}
          >
            Team
          </Link>
          <Link to="/login" className="text-sm px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition">Log in</Link>
          <Link to="/register" className="text-sm px-4 py-2 rounded-lg btn-primary font-medium hover:opacity-90 transition">Sign up</Link>
        </nav>
      </div>
    </header>
  );
}
