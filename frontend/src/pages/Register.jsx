import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { studentApi } from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { BRANCHES, SEMESTERS } from '../constants/contentTypes';
import PublicHeader from '../components/PublicHeader';
import { isValidName, isValidRegNo, isLikelyRealEmail, REGNO_LENGTH } from '../utils/validators';

const empty = {
  name: '', boardRegNo: '', branch: 'CSE', semester: 1,
  boardEmail: '', password: '', confirmPassword: '',
};

export default function Register() {
  const [form, setForm] = useState(empty);
  const [submitting, setSubmitting] = useState(false);
  const { loginSuccess } = useAuth();
  const navigate = useNavigate();

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  // Filters characters as the person types, instead of only complaining
  // after they hit submit — name can't contain digits, reg no can't
  // contain anything but digits and stops accepting more past 10.
  function handleNameChange(e) {
    update('name', e.target.value.replace(/[^A-Za-z\s.'-]/g, ''));
  }
  function handleRegNoChange(e) {
    update('boardRegNo', e.target.value.replace(/\D/g, '').slice(0, REGNO_LENGTH));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!isValidName(form.name)) {
      toast.error('Name should only contain letters');
      return;
    }
    if (!isValidRegNo(form.boardRegNo)) {
      toast.error(`Board Registration No. must be exactly ${REGNO_LENGTH} digits`);
      return;
    }
    if (!isLikelyRealEmail(form.boardEmail)) {
      toast.error("That doesn't look like a real email address — please use your actual board registered email");
      return;
    }
    if (form.password.length < 4) {
      toast.error('Password must be at least 4 characters');
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setSubmitting(true);
    try {
      const { confirmPassword, ...payload } = form;
      const res = await studentApi.post('/auth/register', payload);
      loginSuccess(res.data.token, res.data.student);
      toast.success('Account created! Let\'s finish your profile.');
      navigate('/profile', { state: { firstLogin: true } });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      <PublicHeader />
      <div className="flex-1 flex items-center justify-center px-4 py-10 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-brand-900/40 via-ink-950 to-ink-950">
      <div className="w-full max-w-xl glass rounded-2xl p-6 sm:p-8">
        <h1 className="font-display text-2xl font-bold">
          Create your <span className="text-gradient">student account</span>
        </h1>
        <p className="text-white/50 text-sm mt-1">One account, updated every semester — no need to re-register.</p>

        <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Full name">
            <input required value={form.name} onChange={handleNameChange} placeholder="Letters only" className={inputCls} />
          </Field>
          <Field label="Board Registration No.">
            <input
              required value={form.boardRegNo} onChange={handleRegNoChange}
              inputMode="numeric" placeholder={`${REGNO_LENGTH}-digit number`}
              className={inputCls}
            />
          </Field>
          <Field label="Branch">
            <select value={form.branch} onChange={(e) => update('branch', e.target.value)} className={inputCls}>
              {BRANCHES.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </Field>
          <Field label="Semester">
            <select value={form.semester} onChange={(e) => update('semester', Number(e.target.value))} className={inputCls}>
              {SEMESTERS.map((s) => <option key={s} value={s}>Semester {s}</option>)}
            </select>
          </Field>
          <Field label="Board Registered Email" span2>
            <input required type="email" value={form.boardEmail} onChange={(e) => update('boardEmail', e.target.value)} placeholder="your.actual.name@gmail.com" className={inputCls} />
          </Field>
          <Field label="Password">
            <input required type="password" minLength={4} value={form.password} onChange={(e) => update('password', e.target.value)} className={inputCls} />
          </Field>
          <Field label="Confirm Password">
            <input required type="text" minLength={4} value={form.confirmPassword} onChange={(e) => update('confirmPassword', e.target.value)} className={inputCls} />
          </Field>

          <button
            type="submit"
            disabled={submitting}
            className="sm:col-span-2 mt-2 btn-primary rounded-xl py-3 font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {submitting ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className="text-sm text-white/50 mt-5 text-center">
          Already have an account? <Link to="/login" className="text-brand-300 hover:underline">Log in</Link>
        </p>
      </div>
      </div>
    </div>
  );
}

const inputCls = 'w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400 transition';

function Field({ label, children, span2 }) {
  return (
    <label className={`block ${span2 ? 'sm:col-span-2' : ''}`}>
      <span className="text-xs text-white/60 mb-1 block">{label}</span>
      {children}
    </label>
  );
}
