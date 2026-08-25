import { useState } from 'react';
import toast from 'react-hot-toast';
import studentApi from '../api/axios';
import { BRANCHES, SEMESTERS } from '../constants/contentTypes';

// Public, no-login downloads shown right on the landing page: class routine
// (by branch + semester) and result (by roll number, same as the official
// SBTE portal). Both call unauthenticated backend routes.
export default function QuickDownloads() {
  const [branch, setBranch] = useState('CSE');
  const [semester, setSemester] = useState(1);
  const [routineLoading, setRoutineLoading] = useState(false);

  const [rollNumber, setRollNumber] = useState('');
  const [resultStatus, setResultStatus] = useState('idle'); // idle | loading | not-available

  async function handleRoutine() {
    setRoutineLoading(true);
    try {
      const res = await studentApi.get('/content/public/routine', { params: { branch, semester } });
      if (!res.data) {
        toast.error(`No routine uploaded yet for ${branch} Semester ${semester}`);
        return;
      }
      const dl = await studentApi.post(`/content/public/${res.data._id}/download`);
      window.open(dl.data.url, '_blank', 'noopener,noreferrer');
    } catch {
      toast.error('Could not fetch routine right now. Please try again.');
    } finally {
      setRoutineLoading(false);
    }
  }

  async function handleResult() {
    const trimmed = rollNumber.trim();
    if (!trimmed) {
      toast.error('Enter your roll number');
      return;
    }
    setResultStatus('loading');
    try {
      const res = await studentApi.get('/result/public', { params: { rollNumber: trimmed }, responseType: 'blob' });
      if (res.headers['content-type']?.includes('application/json')) {
        const text = await res.data.text();
        const parsed = JSON.parse(text);
        if (!parsed.available) {
          setResultStatus('not-available');
          return;
        }
      }
      const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
      const a = document.createElement('a');
      a.href = url;
      a.download = `result-${trimmed}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      setResultStatus('idle');
    } catch {
      setResultStatus('not-available');
    }
  }

  return (
    <div className="glass rounded-2xl p-4 sm:p-5 grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
      {/* Routine */}
      <div>
        <p className="text-xs text-white/50 mb-2">📅 Download Class Routine</p>
        <div className="flex gap-2">
          <select value={branch} onChange={(e) => setBranch(e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-2 py-2 text-sm outline-none focus:border-brand-400">
            {BRANCHES.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
          <select value={semester} onChange={(e) => setSemester(Number(e.target.value))} className="bg-white/5 border border-white/10 rounded-lg px-2 py-2 text-sm outline-none focus:border-brand-400">
            {SEMESTERS.map((s) => <option key={s} value={s}>Sem {s}</option>)}
          </select>
          <button
            onClick={handleRoutine} disabled={routineLoading}
            className="flex-1 btn-primary rounded-lg px-3 py-2 text-sm font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            {routineLoading ? 'Checking…' : 'Download'}
          </button>
        </div>
      </div>

      {/* Result */}
      <div>
        <p className="text-xs text-white/50 mb-2">📄 Download Result</p>
        <div className="flex gap-2">
          <input
            value={rollNumber} onChange={(e) => { setRollNumber(e.target.value); setResultStatus('idle'); }}
            placeholder="Enter roll number"
            className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-400"
          />
          <button
            onClick={handleResult} disabled={resultStatus === 'loading'}
            className="btn-primary rounded-lg px-3 py-2 text-sm font-medium hover:opacity-90 transition disabled:opacity-50 shrink-0"
          >
            {resultStatus === 'loading' ? 'Checking…' : 'Download'}
          </button>
        </div>
        {resultStatus === 'not-available' && (
          <p className="text-xs text-amber-300 mt-2">Result not issued yet for this roll number.</p>
        )}
      </div>
    </div>
  );
}
