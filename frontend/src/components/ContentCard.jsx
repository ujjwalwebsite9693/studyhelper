import { useState } from 'react';
import toast from 'react-hot-toast';
import { studentApi } from '../api/axios';

const isNew = (uploadedAt) => Date.now() - new Date(uploadedAt).getTime() < 7 * 24 * 60 * 60 * 1000;

export default function ContentCard({ item, bookmarked: initialBookmarked, completed: initialCompleted, onBookmarkChange, onCompleteChange }) {
  const [bookmarked, setBookmarked] = useState(!!initialBookmarked);
  const [completed, setCompleted] = useState(!!initialCompleted);
  const [showPreview, setShowPreview] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [reason, setReason] = useState('');
  const [submittingReport, setSubmittingReport] = useState(false);

  async function toggleCompleted() {
    try {
      const res = await studentApi.post(`/content/${item._id}/complete`);
      setCompleted(res.data.completed);
      onCompleteChange?.(item._id, res.data.completed);
    } catch {
      toast.error('Could not update. Please try again.');
    }
  }

  async function handleDownload() {
    try {
      if (item.type === 'ytlink') {
        window.open(item.fileUrl, '_blank', 'noopener,noreferrer');
        return;
      }
      const res = await studentApi.post(`/content/${item._id}/download`);
      window.open(res.data.url, '_blank', 'noopener,noreferrer');
    } catch {
      toast.error('Could not open this file. Please try again.');
    }
  }

  async function toggleBookmark() {
    try {
      const res = await studentApi.post(`/content/${item._id}/bookmark`);
      setBookmarked(res.data.bookmarked);
      onBookmarkChange?.(item._id, res.data.bookmarked);
    } catch {
      toast.error('Could not update bookmark');
    }
  }

  async function submitReport(e) {
    e.preventDefault();
    if (!reason.trim()) return;
    setSubmittingReport(true);
    try {
      await studentApi.post('/reports', { contentId: item._id, reason });
      toast.success('Reported — the admin will take a look');
      setShowReport(false);
      setReason('');
    } catch {
      toast.error('Could not send report. Please try again.');
    } finally {
      setSubmittingReport(false);
    }
  }

  return (
    <div className={`glass rounded-xl p-4 hover:border-brand-500/40 transition ${completed ? 'opacity-60' : ''}`}>
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex items-center gap-3">
          <button
            onClick={toggleCompleted}
            title={completed ? 'Mark as not studied' : 'Mark as studied'}
            className={`shrink-0 h-5 w-5 rounded border flex items-center justify-center text-xs transition ${completed ? 'bg-accent-500 border-accent-500 text-ink-950' : 'border-white/20 hover:border-brand-400'}`}
          >
            {completed && '✓'}
          </button>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className={`font-medium truncate ${completed ? 'line-through' : ''}`}>{item.title}</p>
              {isNew(item.uploadedAt) && (
                <span className="shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-accent-500/20 text-accent-400">NEW</span>
              )}
            </div>
            {item.subject && <p className="text-xs text-white/50 mt-0.5">{item.subject}</p>}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button onClick={toggleBookmark} title={bookmarked ? 'Remove bookmark' : 'Bookmark'} className="text-lg leading-none">
            {bookmarked ? '⭐' : '☆'}
          </button>
          {item.type !== 'ytlink' && (
            <button onClick={() => setShowPreview((v) => !v)} className="text-xs px-2 py-1.5 rounded-lg border border-white/10 hover:bg-white/5">
              Preview
            </button>
          )}
          <button onClick={handleDownload} className="text-sm px-3 py-1.5 rounded-lg btn-primary font-medium hover:opacity-90 transition">
            {item.type === 'ytlink' ? 'Watch' : 'Download'}
          </button>
          <button onClick={() => setShowReport((v) => !v)} title="Report a problem" className="text-xs text-white/30 hover:text-red-300">
            🚩
          </button>
        </div>
      </div>

      {showPreview && (
        <iframe
          src={item.fileUrl}
          title={item.title}
          className="w-full h-80 mt-3 rounded-lg border border-white/10 bg-white"
        />
      )}

      {showReport && (
        <form onSubmit={submitReport} className="mt-3 flex gap-2">
          <input
            value={reason} onChange={(e) => setReason(e.target.value)}
            placeholder="What's wrong with this file?"
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-brand-400"
          />
          <button type="submit" disabled={submittingReport} className="text-xs px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5">
            {submittingReport ? 'Sending…' : 'Send'}
          </button>
        </form>
      )}
    </div>
  );
}
