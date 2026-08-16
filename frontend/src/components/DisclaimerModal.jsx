import { useState } from 'react';
import { DISCLAIMER } from '../constants/disclaimer';

// Shown only on the landing page (see pages/Landing.jsx), every time someone
// opens it — this is intentional so any first-time visitor understands the
// site is a student-run project, not an official college portal.
export default function DisclaimerModal() {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-ink-900 rounded-2xl overflow-hidden shadow-2xl grid sm:grid-cols-[220px_1fr]">
        {/* Left panel */}
        <div className="bg-gradient-to-br from-brand-600 to-brand-800 p-6 flex flex-col">
          <div className="h-11 w-11 rounded-xl bg-white/15 flex items-center justify-center text-2xl mb-4">⚠️</div>
          <h2 className="font-display font-bold text-xl text-white leading-snug">Important Disclaimer</h2>
          <p className="text-white/70 text-sm mt-3">Please read this carefully before proceeding to the website.</p>
        </div>

        {/* Right panel */}
        <div className="p-6 relative">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 h-8 w-8 rounded-lg border border-white/10 hover:bg-white/5 flex items-center justify-center text-white/60"
            aria-label="Close"
          >
            ✕
          </button>

          <p className="text-sm text-white/80 pr-8 leading-relaxed">
            This is an <span className="font-semibold text-white">unofficial website</span> created by{' '}
            <span className="font-semibold text-amber-400">{DISCLAIMER.developerName}</span>, a{' '}
            {DISCLAIMER.course} at {DISCLAIMER.collegeName}.
          </p>

          <div className="mt-4 rounded-xl bg-brand-500/10 border border-brand-500/20 px-4 py-3">
            <p className="text-sm text-brand-200">
              This website is <span className="font-semibold">not affiliated</span> with the institution or any government body.
            </p>
          </div>

          <a
            href={DISCLAIMER.collegeUrl} target="_blank" rel="noopener noreferrer"
            className="mt-3 flex items-center justify-between rounded-xl bg-white/5 hover:bg-white/8 border border-white/10 px-4 py-3 transition"
          >
            <div>
              <p className="text-[11px] uppercase tracking-wide text-white/40">Official College</p>
              <p className="text-sm font-semibold text-white mt-0.5">🏛️ {DISCLAIMER.collegeUrl.replace('https://', '')}</p>
            </div>
            <span className="text-white/40">↗</span>
          </a>

          <a
            href={DISCLAIMER.profileUrl} target="_blank" rel="noopener noreferrer"
            className="mt-3 flex items-center justify-between rounded-xl bg-white/5 hover:bg-white/8 border border-white/10 px-4 py-3 transition"
          >
            <div>
              <p className="text-[11px] uppercase tracking-wide text-white/40">Developer</p>
              <p className="text-sm font-semibold text-white mt-0.5">&lt;/&gt; {DISCLAIMER.developerName} — View Profile</p>
            </div>
            <span className="text-white/40">↗</span>
          </a>

          <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between flex-wrap gap-3">
            <button
              onClick={() => setOpen(false)}
              className="px-5 py-2.5 rounded-xl btn-primary font-semibold text-sm hover:opacity-90 transition flex items-center gap-2"
            >
              ✓ I Understand, Continue
            </button>
            <div className="text-right">
              <p className="text-[11px] text-white/40">Contact Developer</p>
              <a href={`mailto:${DISCLAIMER.contactEmail}`} className="text-sm font-semibold text-brand-300 hover:underline">
                {DISCLAIMER.contactEmail}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
