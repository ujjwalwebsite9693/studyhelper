import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="font-display text-5xl font-extrabold text-gradient">404</h1>
      <p className="text-white/50 mt-3">This page doesn't exist.</p>
      <Link to="/" className="mt-6 px-5 py-2.5 rounded-lg btn-primary font-medium hover:opacity-90 transition">Go home</Link>
    </div>
  );
}
