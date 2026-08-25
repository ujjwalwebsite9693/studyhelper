import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { adminApi } from '../../api/axios';
import { useAdminAuth } from '../../context/AdminAuthContext';
import AuthHeader from '../../components/AuthHeader';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { loginSuccess } = useAdminAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await adminApi.post('/admin/login', { username, password });
      loginSuccess(res.data.token, res.data.role, res.data.username);
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      <AuthHeader />
      <div className="flex-1 flex items-center justify-center px-4 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-brand-900/40 via-ink-950 to-ink-950">
      <div className="w-full max-w-sm glass rounded-2xl p-6 sm:p-8">
        <h1 className="font-display text-2xl font-bold">Admin Login</h1>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            required placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-400"
          />
          <input
            required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-400"
          />
          <button
            type="submit" disabled={submitting}
            className="w-full btn-primary rounded-xl py-3 font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {submitting ? 'Logging in…' : 'Log in'}
          </button>
        </form>
      </div>
      </div>
    </div>
  );
}
