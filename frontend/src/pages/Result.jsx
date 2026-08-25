import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { studentApi } from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { SEMESTERS } from '../constants/contentTypes';

export default function Result() {
  const { student } = useAuth();
  const [semester, setSemester] = useState(student?.semester || 1);
  const [status, setStatus] = useState('idle'); // idle | loading | not-available
  const [error, setError] = useState('');

  async function handleDownload() {
    setStatus('loading');
    setError('');
    try {
      const res = await studentApi.get('/result/download', {
        params: { semester },
        responseType: 'blob',
      });

      // The backend responds with JSON (not a PDF blob) when the result
      // isn't published yet — detect that here.
      if (res.headers['content-type']?.includes('application/json')) {
        const text = await res.data.text();
        const parsed = JSON.parse(text);
        if (!parsed.available) {
          setStatus('not-available');
          return;
        }
      }

      const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
      const a = document.createElement('a');
      a.href = url;
      a.download = `result-semester-${semester}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      setStatus('idle');
      toast.success('Result downloaded');
    } catch (err) {
      setError('Something went wrong. Please try again in a moment.');
      setStatus('idle');
    }
  }

  return (
    <div className="flex-1">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <Link to="/dashboard" className="text-sm text-white/50 hover:text-white/80">← Back to dashboard</Link>
        <h1 className="font-display text-2xl font-bold mt-2">Download Result</h1>
        <p className="text-white/50 text-sm mt-1">Choose a semester and download your result as a PDF.</p>

        <div className="glass rounded-2xl p-6 mt-6">
          <label className="block mb-4">
            <span className="text-xs text-white/60 mb-1 block">Semester</span>
            <select
              value={semester}
              onChange={(e) => { setSemester(Number(e.target.value)); setStatus('idle'); }}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-400"
            >
              {SEMESTERS.map((s) => <option key={s} value={s}>Semester {s}</option>)}
            </select>
          </label>

          <button
            onClick={handleDownload}
            disabled={status === 'loading'}
            className="w-full btn-primary rounded-xl py-3 font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {status === 'loading' ? 'Checking…' : 'Download Result'}
          </button>

          {status === 'not-available' && (
            <div className="mt-4 rounded-lg border border-amber-400/30 bg-amber-400/10 text-amber-200 text-sm px-4 py-3 text-center">
              Result not published yet. Please check back later.
            </div>
          )}
          {error && (
            <div className="mt-4 rounded-lg border border-red-400/30 bg-red-400/10 text-red-200 text-sm px-4 py-3 text-center">
              {error}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
