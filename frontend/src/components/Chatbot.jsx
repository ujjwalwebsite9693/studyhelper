import { useEffect, useRef, useState } from 'react';
import studentApi from '../api/axios';
import { CONTACT } from '../constants/contact';

// A simple FAQ-matching chatbot — no external AI service involved. It
// searches the same FAQ list the admin manages on the Help & FAQ page, so
// admins fully control what it can answer without touching any code.
function findAnswer(question, faqs) {
  const q = question.toLowerCase();
  const qWords = q.split(/\s+/).filter((w) => w.length > 2);
  let best = null;
  let bestScore = 0;
  for (const faq of faqs) {
    const hay = (faq.question + ' ' + faq.answer).toLowerCase();
    let score = 0;
    for (const w of qWords) if (hay.includes(w)) score += 1;
    if (score > bestScore) { bestScore = score; best = faq; }
  }
  return bestScore > 0 ? best : null;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [faqs, setFaqs] = useState([]);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! Ask me anything about HUB STUDY — results, notes, or how the site works." },
  ]);
  const endRef = useRef(null);

  useEffect(() => {
    if (open && faqs.length === 0) {
      studentApi.get('/faq/public').then((res) => setFaqs(res.data)).catch(() => {});
    }
  }, [open, faqs.length]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  function handleSend(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { from: 'user', text }]);
    setInput('');

    const match = findAnswer(text, faqs);
    const reply = match
      ? match.answer
      : `I don't have an answer for that yet. You can reach us directly on WhatsApp: ${CONTACT.whatsappUrl}`;
    setTimeout(() => setMessages((m) => [...m, { from: 'bot', text: reply }]), 350);
  }

  return (
    <>
      {open && (
        <div className="fixed bottom-24 left-5 z-50 w-80 max-w-[calc(100vw-2.5rem)] glass rounded-2xl overflow-hidden shadow-2xl flex flex-col" style={{ height: 420 }}>
          <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <p className="text-sm font-semibold">HUB STUDY Assistant</p>
            <button onClick={() => setOpen(false)} className="text-white/50 hover:text-white/80">✕</button>
          </div>
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`text-sm px-3 py-2 rounded-xl max-w-[85%] ${m.from === 'user' ? 'btn-primary' : 'bg-white/5 border border-white/10'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <form onSubmit={handleSend} className="p-2.5 border-t border-white/10 flex gap-2">
            <input
              value={input} onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question…"
              className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-400"
            />
            <button type="submit" className="btn-primary rounded-lg px-3 py-2 text-sm font-medium">Send</button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        title="Chat with HUB STUDY Assistant"
        className="fixed bottom-5 left-5 z-50 h-11 w-11 rounded-full btn-primary flex items-center justify-center text-lg shadow-lg transition hover:opacity-90"
      >
        {open ? '✕' : '🤖'}
      </button>
    </>
  );
}
