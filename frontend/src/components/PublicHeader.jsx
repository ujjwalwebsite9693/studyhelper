import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function PublicHeader() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="w-full relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-display font-bold text-lg">
          HUB<span className="text-gradient">STUDY</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-3">
          <Link
            to="/documents"
            className={`text-sm px-4 py-2 rounded-lg border transition ${
              isActive('/documents')
                ? 'border-brand-400 text-brand-300 bg-brand-500/10'
                : 'border-white/10 hover:bg-white/5'
            }`}
          >
            Documents
          </Link>

          <Link
            to="/subjects"
            className={`text-sm px-4 py-2 rounded-lg border transition ${
              isActive('/subjects')
                ? 'border-brand-400 text-brand-300 bg-brand-500/10'
                : 'border-white/10 hover:bg-white/5'
            }`}
          >
            Subjects
          </Link>

          <Link
            to="/blog"
            className={`text-sm px-4 py-2 rounded-lg border transition ${
              isActive('/blog')
                ? 'border-brand-400 text-brand-300 bg-brand-500/10'
                : 'border-white/10 hover:bg-white/5'
            }`}
          >
            Blog
          </Link>

          <Link
            to="/team"
            className={`text-sm px-4 py-2 rounded-lg border transition ${
              isActive('/team')
                ? 'border-brand-400 text-brand-300 bg-brand-500/10'
                : 'border-white/10 hover:bg-white/5'
            }`}
          >
            Team
          </Link>

          <Link
            to="/about"
            className={`text-sm px-4 py-2 rounded-lg border transition ${
              isActive('/about')
                ? 'border-brand-400 text-brand-300 bg-brand-500/10'
                : 'border-white/10 hover:bg-white/5'
            }`}
          >
            About
          </Link>

          {/* Download App Link */}
          <a
            href="/downloadapp.html"
            className="text-sm px-4 py-2 rounded-lg border border-brand-500/40 text-brand-300 hover:bg-brand-500/10 transition"
          >
            Download App
          </a>

          <Link
            to="/login"
            className="text-sm px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition"
          >
            Log in
          </Link>

          <Link
            to="/register"
            className="text-sm px-4 py-2 rounded-lg btn-primary font-medium hover:opacity-90 transition"
          >
            Sign up
          </Link>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            to="/login"
            className="text-xs px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 transition"
          >
            Log in
          </Link>
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg border border-white/10 hover:bg-white/5 text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-black/90 backdrop-blur-md px-4 pt-2 pb-5 space-y-2">
          <Link
            to="/documents"
            onClick={() => setIsMenuOpen(false)}
            className={`block text-sm px-4 py-2.5 rounded-lg border transition ${
              isActive('/documents')
                ? 'border-brand-400 text-brand-300 bg-brand-500/10'
                : 'border-white/10 hover:bg-white/5'
            }`}
          >
            Documents
          </Link>

          <Link
            to="/subjects"
            onClick={() => setIsMenuOpen(false)}
            className={`block text-sm px-4 py-2.5 rounded-lg border transition ${
              isActive('/subjects')
                ? 'border-brand-400 text-brand-300 bg-brand-500/10'
                : 'border-white/10 hover:bg-white/5'
            }`}
          >
            Subjects
          </Link>

          <Link
            to="/blog"
            onClick={() => setIsMenuOpen(false)}
            className={`block text-sm px-4 py-2.5 rounded-lg border transition ${
              isActive('/blog')
                ? 'border-brand-400 text-brand-300 bg-brand-500/10'
                : 'border-white/10 hover:bg-white/5'
            }`}
          >
            Blog
          </Link>

          <Link
            to="/team"
            onClick={() => setIsMenuOpen(false)}
            className={`block text-sm px-4 py-2.5 rounded-lg border transition ${
              isActive('/team')
                ? 'border-brand-400 text-brand-300 bg-brand-500/10'
                : 'border-white/10 hover:bg-white/5'
            }`}
          >
            Team
          </Link>

          <Link
            to="/about"
            onClick={() => setIsMenuOpen(false)}
            className={`block text-sm px-4 py-2.5 rounded-lg border transition ${
              isActive('/about')
                ? 'border-brand-400 text-brand-300 bg-brand-500/10'
                : 'border-white/10 hover:bg-white/5'
            }`}
          >
            About
          </Link>

          <a
            href="/downloadapp.html"
            onClick={() => setIsMenuOpen(false)}
            className="block text-sm px-4 py-2.5 rounded-lg border border-brand-500/40 text-brand-300 hover:bg-brand-500/10 transition text-center"
          >
            Download App
          </a>

          <Link
            to="/register"
            onClick={() => setIsMenuOpen(false)}
            className="block text-center text-sm px-4 py-2.5 rounded-lg btn-primary font-medium hover:opacity-90 transition"
          >
            Sign up
          </Link>
        </div>
      )}
    </header>
  );
}
