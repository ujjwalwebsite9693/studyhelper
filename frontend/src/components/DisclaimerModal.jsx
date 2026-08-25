import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DISCLAIMER } from '../constants/disclaimer';

export default function DisclaimerModal() {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl bg-ink-950/95 border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative">
        {/* Top Decorative Banner */}
        <div className="bg-gradient-to-r from-brand-600 via-indigo-600 to-accent-600 p-6 text-white relative">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-5 right-5 h-8 w-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white/80 transition"
            aria-label="Close modal"
          >
            ✕
          </button>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/20 text-xs font-semibold text-white mb-2">
            <span>ℹ️</span> Official Notice & Platform Guide
          </div>
          <h2 className="font-display font-bold text-2xl">Important Disclaimer & Info</h2>
          <p className="text-white/80 text-xs sm:text-sm mt-1">Please read this short transparency notice before exploring HUB STUDY.</p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-5">
          {/* Main Info Box */}
          <div className="glass p-4 rounded-2xl border-l-4 border-l-brand-400 text-sm text-white/80 leading-relaxed">
            <p>
              <strong className="text-white">HUB STUDY</strong> is an open-access educational study portal developed by{' '}
              <strong className="text-accent-400">{DISCLAIMER.developerName}</strong>, a {DISCLAIMER.course} at {DISCLAIMER.collegeName}.
            </p>
            <p className="mt-2 text-xs text-white/60">
              This platform is an independent student initiative created to provide organized notes, PYQs, syllabus, and results for SBTE Bihar diploma students. It is <strong className="text-white/80">not an official government portal</strong> or directly affiliated with any government body.
            </p>
          </div>

          {/* Quick Informative Resource Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Official College Link */}
            <a
              href={DISCLAIMER.collegeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass p-4 rounded-2xl hover:border-brand-500/40 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-300 flex items-center justify-center text-xl">
                  🏛️
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-white/50 uppercase tracking-wider block">Official College</span>
                  <span className="text-sm font-bold text-white group-hover:text-brand-300 transition-colors">gpgaya.org</span>
                </div>
              </div>
              <span className="text-white/40 group-hover:text-brand-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-sm font-bold">↗</span>
            </a>

            {/* Developer Profile Link */}
            <Link
              to="/developer"
              onClick={() => setOpen(false)}
              className="glass p-4 rounded-2xl hover:border-accent-500/40 transition-all flex items-center justify-between group border-brand-500/20"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent-500/20 text-accent-300 flex items-center justify-center text-xl">
                  👨‍💻
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-accent-400 uppercase tracking-wider block">Lead Developer</span>
                  <span className="text-sm font-bold text-white group-hover:text-accent-300 transition-colors">{DISCLAIMER.developerName}</span>
                </div>
              </div>
              <span className="text-accent-400 text-xs font-semibold">View Profile &rarr;</span>
            </Link>
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => setOpen(false)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl btn-primary font-semibold text-sm hover:opacity-90 transition flex items-center justify-center gap-2 shadow-lg shadow-brand-500/20"
            >
              <span>✓</span> I Understand & Continue
            </button>
            <div className="text-center sm:text-right">
              <span className="text-xs text-white/40 block">Developer Support:</span>
              <a href={`mailto:${DISCLAIMER.contactEmail}`} className="text-xs font-medium text-brand-300 hover:underline">
                {DISCLAIMER.contactEmail}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
