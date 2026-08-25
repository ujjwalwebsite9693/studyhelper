import { Link } from 'react-router-dom';
import { CONTENT_TYPES, BRANCHES, SEMESTERS } from '../constants/contentTypes';
import DisclaimerModal from '../components/DisclaimerModal';
import Ticker from '../components/Ticker';
import QuickDownloads from '../components/QuickDownloads';
import PublicHeader from '../components/PublicHeader';

export default function Landing() {
  return (
    <div className="flex-1 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-brand-900/40 via-ink-950 to-ink-950">
      <DisclaimerModal />

      <PublicHeader />

      <Ticker />

      <section className="max-w-4xl mx-auto text-center px-4 pt-14 pb-10">
        <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-200 mb-5">
          For CSE & IT · Semester 1 to 6
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold leading-tight">
          Everything for your semester,<br /><span className="text-gradient">in one place</span>
        </h1>
        <p className="text-white/60 mt-5 max-w-xl mx-auto">
          Notes, question papers, syllabus, routine, results and more — filtered to exactly your
          branch and semester. Built for CSE & IT students.
        </p>
        <div className="flex items-center justify-center gap-4 mt-8">
          <Link to="/register" className="px-6 py-3 rounded-xl btn-primary font-semibold hover:opacity-90 transition">Get started free</Link>
          <Link to="/login" className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition">I have an account</Link>
        </div>
      </section>

      <section className="px-4 pb-14">
        <QuickDownloads />
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-10">
        <h2 className="text-center font-display font-semibold text-lg mb-6">Everything you need, sorted automatically</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {CONTENT_TYPES.map((t) => (
            <div key={t.key} className="glass rounded-xl p-4 text-center hover:border-brand-500/40 transition">
              <div className="text-2xl">{t.icon}</div>
              <div className="text-sm mt-2 text-white/70">{t.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 pb-20 text-center">
        <div className="flex items-center justify-center gap-2 flex-wrap text-xs text-white/40">
          <span>Branches:</span>
          {BRANCHES.map((b) => <span key={b} className="px-2 py-1 rounded-full bg-white/5 border border-white/10">{b}</span>)}
          <span className="ml-2">Semesters:</span>
          {SEMESTERS.map((s) => <span key={s} className="px-2 py-1 rounded-full bg-white/5 border border-white/10">{s}</span>)}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 pb-16">
        <h2 className="text-center font-display font-semibold text-2xl mb-3">How It Works</h2>
        <p className="text-center text-white/50 mb-10 max-w-2xl mx-auto">Get started in three simple steps and access all the study material you need for your diploma semester exams.</p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass rounded-xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-brand-500/20 text-brand-300 flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
            <h3 className="font-semibold text-lg mb-2">Create Account</h3>
            <p className="text-white/60 text-sm">Sign up for free in seconds. No complicated verification needed.</p>
          </div>
          <div className="glass rounded-xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-brand-500/20 text-brand-300 flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
            <h3 className="font-semibold text-lg mb-2">Select Details</h3>
            <p className="text-white/60 text-sm">Choose your branch (CSE/IT) and current semester to filter content.</p>
          </div>
          <div className="glass rounded-xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-brand-500/20 text-brand-300 flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
            <h3 className="font-semibold text-lg mb-2">Download & Study</h3>
            <p className="text-white/60 text-sm">Access notes, PYQs, and syllabus tailored to your exact needs.</p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-center font-display font-semibold text-2xl mb-10">Why Students Love HUB STUDY</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass p-5 rounded-xl">
            <div className="text-2xl mb-3">📚</div>
            <h3 className="font-semibold mb-2">Semester-Wise Organization</h3>
            <p className="text-white/60 text-sm">Everything is perfectly organized by your specific branch and semester. No more searching through irrelevant materials.</p>
          </div>
          <div className="glass p-5 rounded-xl">
            <div className="text-2xl mb-3">📝</div>
            <h3 className="font-semibold mb-2">Previous Year Papers</h3>
            <p className="text-white/60 text-sm">Access years of SBTE previous question papers to understand exam patterns and prepare better.</p>
          </div>
          <div className="glass p-5 rounded-xl">
            <div className="text-2xl mb-3">🎯</div>
            <h3 className="font-semibold mb-2">Important Questions</h3>
            <p className="text-white/60 text-sm">Curated lists of VVI and frequently asked questions for every subject to boost your scores.</p>
          </div>
          <div className="glass p-5 rounded-xl">
            <div className="text-2xl mb-3">📅</div>
            <h3 className="font-semibold mb-2">Class Routine</h3>
            <p className="text-white/60 text-sm">Stay updated with the latest official class routines and time tables directly on your dashboard.</p>
          </div>
          <div className="glass p-5 rounded-xl">
            <div className="text-2xl mb-3">📊</div>
            <h3 className="font-semibold mb-2">Result Downloads</h3>
            <p className="text-white/60 text-sm">Check and download your SBTE diploma results quickly when they are announced.</p>
          </div>
          <div className="glass p-5 rounded-xl">
            <div className="text-2xl mb-3">🤖</div>
            <h3 className="font-semibold mb-2">Smart Study Assistant</h3>
            <p className="text-white/60 text-sm">Use our built-in AI assistant to ask doubts, get summaries, and understand complex topics.</p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-center font-display font-semibold text-2xl mb-10">Popular Study Guides</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { id: 'c-programming', name: 'C Programming', icon: '💻' },
            { id: 'data-structures', name: 'Data Structures', icon: '🌳' },
            { id: 'dbms', name: 'DBMS', icon: '🗄️' },
            { id: 'computer-networks', name: 'Computer Networks', icon: '🌐' },
            { id: 'operating-systems', name: 'Operating Systems', icon: '⚙️' },
            { id: 'web-technology', name: 'Web Technology', icon: '🌍' }
          ].map(subj => (
            <Link key={subj.id} to={`/subjects/${subj.id}`} className="glass p-4 rounded-xl hover:border-brand-500/40 transition flex items-center gap-3">
              <span className="text-2xl">{subj.icon}</span>
              <span className="font-medium text-sm">{subj.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 pb-16 text-center">
        <div className="glass rounded-2xl p-8 border border-brand-500/20 bg-brand-900/10">
          <h2 className="font-display font-semibold text-2xl mb-3">Latest from Our Blog</h2>
          <p className="text-white/60 mb-6">Read our educational articles, exam preparation guides, and SBTE updates.</p>
          <Link to="/blog" className="btn-primary px-6 py-3 rounded-xl font-medium inline-block">Explore Articles</Link>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 pb-16">
        <h2 className="font-display font-semibold text-2xl mb-4">About HUB STUDY</h2>
        <div className="glass p-6 rounded-xl text-white/70 text-sm space-y-4 leading-relaxed">
          <p>HUB STUDY is a comprehensive educational platform designed specifically for Computer Science & Engineering (CSE) and Information Technology (IT) diploma students. Our mission is to make quality study materials accessible to every student, helping them excel in their semester exams and build a strong technical foundation.</p>
          <p>We understand the challenges diploma students face when searching for reliable notes, previous year question papers (PYQs), and accurate syllabus information. HUB STUDY solves this by offering a neatly organized, semester-wise repository of resources tailored to the SBTE curriculum.</p>
          <p>Whether you need to quickly check your results, download the latest class routine, prepare with important questions, or read detailed subject guides, HUB STUDY is your all-in-one companion. Developed by Ujjwal Mehta, this platform continues to evolve with new features and resources added regularly based on student feedback.</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 pb-20">
        <h2 className="text-center font-display font-semibold text-2xl mb-8">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {[
            { q: "What is HUB STUDY?", a: "HUB STUDY is a free platform providing structured study materials, PYQs, syllabus, and results for CSE and IT diploma students." },
            { q: "Is HUB STUDY free?", a: "Yes, creating an account and accessing the core study materials on HUB STUDY is completely free for all students." },
            { q: "Which branches are supported?", a: "Currently, we fully support Computer Science & Engineering (CSE) and Information Technology (IT) branches from Semester 1 to Semester 6." },
            { q: "How do I download study materials?", a: "Simply sign up, select your branch and semester in your profile, and visit the respective sections (Notes, PYQs, Syllabus) from your dashboard to download PDFs." },
            { q: "Are the question papers from previous SBTE exams?", a: "Yes, we provide authentic Previous Year Question Papers (PYQs) from the State Board of Technical Education (SBTE) exams to help you prepare effectively." },
            { q: "Who created this platform?", a: "HUB STUDY was developed by Ujjwal Mehta to solve the common problems faced by diploma students in finding organized study resources." },
            { q: "Can I access it on mobile?", a: "Absolutely! The HUB STUDY website is fully responsive and works perfectly on mobile phones, tablets, and desktop computers." },
            { q: "How do I report an issue?", a: "You can reach out to us via the Contact Us page or click the Help & Support option in your dashboard to submit a query or report an issue." }
          ].map((faq, i) => (
            <details key={i} className="glass rounded-xl group cursor-pointer">
              <summary className="p-4 font-medium list-none flex justify-between items-center">
                {faq.q}
                <span className="text-white/40 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="p-4 pt-0 text-white/60 text-sm border-t border-white/5 mt-2">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
