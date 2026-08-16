import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { studentApi } from '../api/axios';
import { useAuth } from '../context/AuthContext';
import PublicHeader from '../components/PublicHeader';

export default function Login() {
  const [boardEmail, setBoardEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { loginSuccess } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await studentApi.post('/auth/login', { boardEmail, password });
      loginSuccess(res.data.token, res.data.student);
      if (res.data.firstLogin) {
        toast.success('Welcome! Please complete your profile.');
        navigate('/profile', { state: { firstLogin: true } });
      } else {
        toast.success(`Welcome back, ${res.data.student.name.split(' ')[0]}!`);
        navigate('/dashboard');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      <PublicHeader />
      <div className="flex-1 flex items-center justify-center px-4 py-10 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-brand-900/40 via-ink-950 to-ink-950">
      <div className="w-full max-w-md glass rounded-2xl p-6 sm:p-8">
        <h1 className="font-display text-2xl font-bold">
          Welcome <span className="text-gradient">back</span>
        </h1>
        <p className="text-white/50 text-sm mt-1">Log in with your board registered email.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-xs text-white/60 mb-1 block">Board Registered Email</span>
            <input
              required type="email" value={boardEmail} onChange={(e) => setBoardEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400 transition"
            />
          </label>
          <label className="block">
            <span className="text-xs text-white/60 mb-1 block">Password</span>
            <input
              required type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400 transition"
            />
          </label>
          <button
            type="submit" disabled={submitting}
            className="w-full btn-primary rounded-xl py-3 font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {submitting ? 'Logging in…' : 'Log in'}
          </button>
        </form>

        <p className="text-sm text-white/50 mt-5 text-center">
          New here? <Link to="/register" className="text-brand-300 hover:underline">Create an account</Link>
        </p>
        <p className="text-xs text-white/30 mt-4 text-center">
          <Link to="/admin/login" className="hover:text-white/50">Admin login</Link>
        </p>
      </div>
      </div>
    </div>
  );
}
