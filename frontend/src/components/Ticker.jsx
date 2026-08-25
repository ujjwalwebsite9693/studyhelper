import { useEffect, useState } from 'react';
import studentApi from '../api/axios';

// Public, unauthenticated scrolling banner — controlled entirely from the
// admin Notices page (tick "Show on landing ticker" on any notice).
export default function Ticker() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    studentApi.get('/notice/ticker').then((res) => setItems(res.data)).catch(() => {});
  }, []);

  if (items.length === 0) return null;

  const text = items.map((n) => `📢 ${n.title} — ${n.message}`).join('     •     ');

  return (
    <div className="bg-brand-600/20 border-y border-brand-500/20 overflow-hidden py-2">
      <div className="flex whitespace-nowrap animate-[scroll_28s_linear_infinite]">
        <span className="text-sm text-brand-100 px-4">{text}</span>
        <span className="text-sm text-brand-100 px-4">{text}</span>
      </div>
    </div>
  );
}
