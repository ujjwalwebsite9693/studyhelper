import { useEffect, useRef, useState } from 'react';
import studentApi from '../api/axios';
import { CONTACT } from '../constants/contact';

const BUILTIN_KNOWLEDGE = [
  {
    keywords: ['hi', 'hello', 'hey', 'namaste', 'start', 'help me', 'who are you'],
    answer: "Hello! 👋 I'm HUB STUDY Assistant. You can ask me about notes, syllabus, semester results, class routines, PYQs, interactive MCQs, or how the portal works!"
  },
  {
    keywords: ['notes', 'study material', 'handwritten', 'pdf', 'books', 'materials', 'study'],
    answer: "📚 You can access semester-wise notes for CSE & IT by logging into your account. We also have free public Subject Guides at https://hubstudy.online/subjects with chapter-wise notes and concepts!"
  },
  {
    keywords: ['result', 'results', 'marksheet', 'score', 'percentage', 'grade', 'sbte result'],
    answer: "📊 You can download your SBTE result directly on the Homepage using the 'Download Result' card (just enter your Roll Number), or through the Results tab in your student Dashboard."
  },
  {
    keywords: ['routine', 'timetable', 'time table', 'schedule', 'class routine', 'class timing'],
    answer: "📅 Class routines for CSE and IT branches (Semesters 1–6) can be downloaded without login directly from the Homepage 'Quick Downloads' section or inside your student Dashboard."
  },
  {
    keywords: ['pyq', 'pyqs', 'previous year', 'question paper', 'past papers', 'exam paper', 'questions'],
    answer: "📝 Previous Year Question Papers (PYQs) are organized semester-wise in the PYQs section inside your Dashboard, and chapter-wise question analysis is available on our /subjects pages."
  },
  {
    keywords: ['syllabus', 'curriculum', 'course', 'chapters', 'units'],
    answer: "📘 The complete SBTE Bihar diploma syllabus for Semesters 1 to 6 (CSE & IT) is available in the Documents section (/documents) and inside your student Dashboard."
  },
  {
    keywords: ['subject', 'subjects', 'guide', 'guides', 'mcq', 'mcqs', 'quiz'],
    answer: "🎯 Visit https://hubstudy.online/subjects to explore our rich chapter-wise study guides with interactive MCQ quizzes, important questions, and exam preparation tips!"
  },
  {
    keywords: ['branch', 'branches', 'cse', 'it', 'computer science', 'information technology'],
    answer: "💻 HUB STUDY currently supports Computer Science & Engineering (CSE) and Information Technology (IT) branches for Semesters 1 through 6 under the SBTE curriculum."
  },
  {
    keywords: ['semester', 'semesters', 'sem', '1st', '2nd', '3rd', '4th', '5th', '6th'],
    answer: "🎓 We provide study resources, notes, routines, and PYQs for all 6 semesters (Sem 1 to Sem 6) for CSE & IT diploma students."
  },
  {
    keywords: ['free', 'cost', 'money', 'price', 'paid', 'subscription'],
    answer: "✨ HUB STUDY is 100% FREE for all polytechnic and diploma engineering students. All notes, guides, and routines are completely accessible without any fee."
  },
  {
    keywords: ['register', 'signup', 'sign up', 'create account', 'new student'],
    answer: "🚀 You can create a free student account by clicking 'Sign up' (/register). You just need your name, 10-digit board registration number, branch, semester, and email."
  },
  {
    keywords: ['login', 'log in', 'signin', 'sign in', 'account', 'password'],
    answer: "🔑 To log in, go to https://hubstudy.online/login and enter your board email and password to access your personalized semester dashboard."
  },
  {
    keywords: ['developer', 'creator', 'founder', 'owner', 'who made', 'ujjwal', 'team', 'author'],
    answer: `👨‍💻 HUB STUDY was developed by Ujjwal Mehta (CSE Student at Government Polytechnic Gaya). Check out the /team page or visit ${CONTACT.websiteUrl} to learn more!`
  },
  {
    keywords: ['contact', 'whatsapp', 'instagram', 'support', 'help', 'email', 'feedback', 'report'],
    answer: `💬 You can reach out directly via WhatsApp at ${CONTACT.whatsappUrl}, follow on Instagram (@${CONTACT.instagramHandle}), or check out our /contact page!`
  },
  {
    keywords: ['blog', 'articles', 'tips', 'exam guide', 'updates'],
    answer: "📰 Check out the HUB STUDY Blog at https://hubstudy.online/blog for exam strategies, diploma study tips, and technology articles!"
  }
];

function findAnswer(question, serverFaqs = []) {
  const q = question.toLowerCase().trim();
  const qWords = q.split(/\s+/).filter((w) => w.length >= 2);

  // 1. Check direct keyword matches in built-in knowledge base
  let bestBuiltin = null;
  let bestBuiltinScore = 0;

  for (const item of BUILTIN_KNOWLEDGE) {
    let score = 0;
    for (const kw of item.keywords) {
      if (q.includes(kw)) {
        score += kw.length > 3 ? 3 : 2;
      }
      for (const w of qWords) {
        if (kw.includes(w) || w.includes(kw)) {
          score += 1;
        }
      }
    }
    if (score > bestBuiltinScore) {
      bestBuiltinScore = score;
      bestBuiltin = item.answer;
    }
  }

  // 2. Check admin-managed server FAQs
  let bestServerFaq = null;
  let bestServerScore = 0;

  if (Array.isArray(serverFaqs)) {
    for (const faq of serverFaqs) {
      const hay = ((faq.question || '') + ' ' + (faq.answer || '')).toLowerCase();
      let score = 0;
      for (const w of qWords) {
        if (hay.includes(w)) score += 2;
      }
      if (score > bestServerScore) {
        bestServerScore = score;
        bestServerFaq = faq.answer;
      }
    }
  }

  if (bestServerScore > bestBuiltinScore && bestServerFaq) {
    return bestServerFaq;
  }
  if (bestBuiltinScore > 0 && bestBuiltin) {
    return bestBuiltin;
  }
  return null;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [faqs, setFaqs] = useState([]);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! Ask me anything about HUB STUDY — results, notes, routines, PYQs, or how the site works." },
  ]);
  const endRef = useRef(null);

  useEffect(() => {
    if (open && faqs.length === 0) {
      studentApi.get('/faq/public').then((res) => {
        if (Array.isArray(res.data)) setFaqs(res.data);
      }).catch(() => {});
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

    const answer = findAnswer(text, faqs);
    const reply = answer || `I don't have an answer for that yet. You can reach us directly on WhatsApp: ${CONTACT.whatsappUrl}`;
    setTimeout(() => setMessages((m) => [...m, { from: 'bot', text: reply }]), 250);
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
