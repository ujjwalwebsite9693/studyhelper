import { Link } from 'react-router-dom';

// Lightweight header for auth pages (Login, Register, Admin Login) that
// otherwise had no way back to the landing page and no branding.
export default function AuthHeader() {
  return (
    <header className="sticky top-0 z-40 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display font-bold text-lg tracking-tight">
          HUB<span className="text-gradient">STUDY</span>
        </Link>
        <Link to="/" className="text-sm px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 transition">
          ← Back to home
        </Link>
      </div>
    </header>
  );
}
