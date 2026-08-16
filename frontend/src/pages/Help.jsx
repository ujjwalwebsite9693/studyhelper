import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { studentApi } from '../api/axios';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
import { CONTACT } from '../constants/contact';

export default function Help() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openIdx, setOpenIdx] = useState(null);

  useEffect(() => {
    studentApi.get('/faq').then((res) => setFaqs(res.data)).finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex-1">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <Link to="/dashboard" className="text-sm text-white/50 hover:text-white/80">← Back to dashboard</Link>
        <h1 className="font-display text-2xl font-bold mt-2">Help &amp; Support</h1>
        <p className="text-white/50 text-sm mt-1">Common questions, and how to reach us directly.</p>

        <div className="glass rounded-2xl p-5 mt-6 flex flex-wrap gap-3">
          <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[140px] rounded-xl border border-white/10 px-4 py-3 text-sm hover:bg-white/5 transition text-center">
            💬<br />WhatsApp
          </a>
          <a href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[140px] rounded-xl border border-white/10 px-4 py-3 text-sm hover:bg-white/5 transition text-center">
            📸<br />Instagram
          </a>
          <a href={CONTACT.websiteUrl} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[140px] rounded-xl border border-white/10 px-4 py-3 text-sm hover:bg-white/5 transition text-center">
            🌐<br />Website
          </a>
        </div>

        <h2 className="font-semibold mt-8 mb-3">Frequently asked questions</h2>
        {loading ? <Loader /> : (
          <div className="space-y-2">
            {faqs.length === 0 && <p className="text-white/40 text-sm">No FAQs added yet — reach out on WhatsApp above.</p>}
            {faqs.map((f, i) => (
              <div key={f._id} className="glass rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className="w-full text-left px-4 py-3 flex items-center justify-between gap-2"
                >
                  <span className="text-sm font-medium">{f.question}</span>
                  <span className="text-white/40 shrink-0">{openIdx === i ? '−' : '+'}</span>
                </button>
                {openIdx === i && <p className="px-4 pb-3 text-sm text-white/60">{f.answer}</p>}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
