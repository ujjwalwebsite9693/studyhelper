import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CONTENT_TYPES, BRANCHES, SEMESTERS } from '../constants/contentTypes';
import DisclaimerModal from '../components/DisclaimerModal';
import Ticker from '../components/Ticker';
import QuickDownloads from '../components/QuickDownloads';
import PublicHeader from '../components/PublicHeader';

export default function Landing() {
  // SGPA to Percentage Calculator State
  const [sgpaInput, setSgpaInput] = useState('');
  const [percentageResult, setPercentageResult] = useState(null);

  const calculatePercentage = (e) => {
    e.preventDefault();
    const val = parseFloat(sgpaInput);
    if (!isNaN(val) && val >= 0 && val <= 10) {
      // Standard SBTE / AICTE formula: (SGPA - 0.75) * 10 or val * 9.5
      const pct = ((val - 0.75) * 10).toFixed(2);
      setPercentageResult(Math.max(0, pct));
    } else {
      setPercentageResult(null);
    }
  };

  return (
    <div className="flex-1 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-brand-900/40 via-ink-950 to-ink-950">
      <DisclaimerModal />

      <PublicHeader />

      <Ticker />

      {/* Hero Section */}
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

      {/* Quick Downloads */}
      <section className="px-4 pb-14">
        <QuickDownloads />
      </section>

      {/* Academic Highlights & Stats Banner */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass p-6 rounded-2xl text-center border-t-2 border-t-brand-500">
            <div className="text-3xl font-extrabold text-gradient mb-1">500+</div>
            <div className="text-xs text-white/60 font-medium uppercase tracking-wider">Curated PDFs & PYQs</div>
          </div>
          <div className="glass p-6 rounded-2xl text-center border-t-2 border-t-accent-400">
            <div className="text-3xl font-extrabold text-gradient mb-1">10+</div>
            <div className="text-xs text-white/60 font-medium uppercase tracking-wider">Interactive Study Guides</div>
          </div>
          <div className="glass p-6 rounded-2xl text-center border-t-2 border-t-emerald-400">
            <div className="text-3xl font-extrabold text-gradient mb-1">100%</div>
            <div className="text-xs text-white/60 font-medium uppercase tracking-wider">Free Educational Access</div>
          </div>
          <div className="glass p-6 rounded-2xl text-center border-t-2 border-t-purple-400">
            <div className="text-3xl font-extrabold text-gradient mb-1">6 Sem</div>
            <div className="text-xs text-white/60 font-medium uppercase tracking-wider">CSE & IT Covered</div>
          </div>
        </div>
      </section>

      {/* Content Categories */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <h2 className="text-center font-display font-semibold text-2xl mb-2">Everything you need, sorted automatically</h2>
        <p className="text-center text-white/50 text-sm mb-8 max-w-xl mx-auto">Access 13 specialized academic categories designed to support your daily learning and exam prep.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {CONTENT_TYPES.map((t) => (
            <div key={t.key} className="glass rounded-xl p-4 text-center hover:border-brand-500/40 transition">
              <div className="text-2xl">{t.icon}</div>
              <div className="text-sm mt-2 text-white/70 font-medium">{t.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Branches & Semesters */}
      <section className="max-w-4xl mx-auto px-4 pb-16 text-center">
        <div className="flex items-center justify-center gap-2 flex-wrap text-xs text-white/50">
          <span className="font-semibold text-white/70">Supported Branches:</span>
          {BRANCHES.map((b) => <span key={b} className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10">{b} Engineering</span>)}
          <span className="ml-3 font-semibold text-white/70">Semesters:</span>
          {SEMESTERS.map((s) => <span key={s} className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10">Sem {s}</span>)}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <h2 className="text-center font-display font-semibold text-2xl mb-3">How It Works</h2>
        <p className="text-center text-white/50 mb-10 max-w-2xl mx-auto">Get started in three simple steps and access all the study material you need for your diploma semester exams.</p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass rounded-xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-brand-500/20 text-brand-300 flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
            <h3 className="font-semibold text-lg mb-2">Create Account</h3>
            <p className="text-white/60 text-sm">Sign up for free in seconds. Enter your board registration number and basic details.</p>
          </div>
          <div className="glass rounded-xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-brand-500/20 text-brand-300 flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
            <h3 className="font-semibold text-lg mb-2">Select Branch & Semester</h3>
            <p className="text-white/60 text-sm">Choose your branch (CSE/IT) and current semester to automatically filter your feed.</p>
          </div>
          <div className="glass rounded-xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-brand-500/20 text-brand-300 flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
            <h3 className="font-semibold text-lg mb-2">Download & Study</h3>
            <p className="text-white/60 text-sm">Access verified handwritten notes, solved PYQs, class routines, and interactive quizzes.</p>
          </div>
        </div>
      </section>

      {/* Diploma Curriculum Breakdown */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="text-center mb-10">
          <h2 className="font-display font-semibold text-2xl mb-3">SBTE Diploma Academic Curriculum Overview</h2>
          <p className="text-white/50 text-sm max-w-2xl mx-auto">Structured overview of core learning goals across the 3-year diploma engineering journey.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass p-6 rounded-2xl border-l-4 border-l-brand-500">
            <span className="text-xs uppercase tracking-wider text-brand-300 font-bold">Year 1 · Sem 1 & 2</span>
            <h3 className="text-lg font-bold font-sora mt-2 mb-3">Engineering Foundations</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Building foundational quantitative, algorithmic, and hardware skills through Engineering Mathematics, C Programming, Digital Electronics, and Communication Skills.
            </p>
            <ul className="text-xs text-white/50 space-y-1.5 list-disc pl-4">
              <li>C Programming & Logic Building</li>
              <li>Engineering Mathematics I & II</li>
              <li>Logic Gates & Boolean Algebra</li>
            </ul>
          </div>

          <div className="glass p-6 rounded-2xl border-l-4 border-l-accent-400">
            <span className="text-xs uppercase tracking-wider text-accent-300 font-bold">Year 2 · Sem 3 & 4</span>
            <h3 className="text-lg font-bold font-sora mt-2 mb-3">Core Computer Science</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Deep dive into system architectures, algorithm efficiency, database design, and object-oriented paradigms using Java, Data Structures, DBMS, and Operating Systems.
            </p>
            <ul className="text-xs text-white/50 space-y-1.5 list-disc pl-4">
              <li>Data Structures & Algorithms</li>
              <li>OOP with Java & Clean Code</li>
              <li>Relational DBMS & SQL Queries</li>
              <li>Operating Systems & Memory Paging</li>
            </ul>
          </div>

          <div className="glass p-6 rounded-2xl border-l-4 border-l-emerald-400">
            <span className="text-xs uppercase tracking-wider text-emerald-300 font-bold">Year 3 · Sem 5 & 6</span>
            <h3 className="text-lg font-bold font-sora mt-2 mb-3">Advanced Engineering & Capstone</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Industry-aligned practical technologies covering Full-Stack Web Development, Computer Networks, Software Engineering methodologies, and Major Capstone Projects.
            </p>
            <ul className="text-xs text-white/50 space-y-1.5 list-disc pl-4">
              <li>Web Technology (HTML5/CSS3/JS/PHP)</li>
              <li>Computer Networks & OSI Protocols</li>
              <li>Agile Software Engineering & UML</li>
              <li>Industrial Training & Major Project</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Popular Study Guides */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h2 className="font-display font-semibold text-2xl">Popular Chapter-Wise Study Guides</h2>
            <p className="text-white/50 text-sm mt-1">Read in-depth concepts, exam tips, and take interactive practice MCQs.</p>
          </div>
          <Link to="/subjects" className="text-accent-400 text-sm font-medium hover:underline flex items-center gap-1">
            Browse all 10+ Guides &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { id: 'c-programming', name: 'C Programming', icon: '💻', sem: 'Sem 1' },
            { id: 'data-structures', name: 'Data Structures', icon: '🌳', sem: 'Sem 3' },
            { id: 'dbms', name: 'DBMS & SQL', icon: '🗄️', sem: 'Sem 4' },
            { id: 'computer-networks', name: 'Computer Networks', icon: '🌐', sem: 'Sem 5' },
            { id: 'operating-systems', name: 'Operating Systems', icon: '⚙️', sem: 'Sem 4' },
            { id: 'web-technology', name: 'Web Technology', icon: '🌍', sem: 'Sem 5' }
          ].map((subj) => (
            <Link key={subj.id} to={`/subjects/${subj.id}`} className="glass p-4 rounded-xl hover:border-brand-500/50 transition-all flex flex-col justify-between group">
              <div>
                <span className="text-3xl mb-2 block">{subj.icon}</span>
                <span className="text-xs text-accent-400 font-semibold">{subj.sem}</span>
                <h4 className="font-semibold text-sm mt-1 text-white group-hover:text-brand-300 transition-colors">{subj.name}</h4>
              </div>
              <span className="text-xs text-white/40 mt-3 font-medium">Read Guide →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Interactive SGPA to Percentage Tool */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="glass rounded-3xl p-8 border border-white/10">
          <div className="max-w-xl mx-auto text-center">
            <span className="text-2xl mb-2 inline-block">🧮</span>
            <h2 className="font-display font-semibold text-2xl mb-2">SBTE SGPA to Percentage Calculator</h2>
            <p className="text-white/60 text-sm mb-6">Calculate your official semester aggregate percentage based on SBTE Bihar standard formula <code className="text-accent-400 font-mono bg-white/5 px-2 py-0.5 rounded">Percentage = (SGPA - 0.75) × 10</code>.</p>
            
            <form onSubmit={calculatePercentage} className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                placeholder="Enter SGPA (e.g. 8.45)"
                value={sgpaInput}
                onChange={(e) => setSgpaInput(e.target.value)}
                className="px-4 py-2.5 rounded-xl bg-ink-900 border border-white/10 text-white placeholder-white/40 outline-none focus:border-brand-400 text-center sm:text-left flex-1 max-w-xs"
              />
              <button type="submit" className="btn-primary px-6 py-2.5 rounded-xl font-medium hover:opacity-90 transition">
                Calculate %
              </button>
            </form>

            {percentageResult !== null && (
              <div className="p-4 rounded-xl bg-brand-500/10 border border-brand-500/20 text-white animate-fadeIn">
                <span className="text-sm text-white/70">Equivalent Percentage:</span>
                <div className="text-3xl font-extrabold text-accent-400 mt-1">{percentageResult}%</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SBTE Exam Pattern & Preparation Tips */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-center font-display font-semibold text-2xl mb-3">SBTE Diploma Exam Pattern & Preparation Strategy</h2>
        <p className="text-center text-white/50 text-sm mb-10 max-w-2xl mx-auto">Master the marking scheme and maximize your semester grade score with proven preparation strategies.</p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass p-6 rounded-2xl">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="text-xl">📋</span> Marking Scheme & Assessment
            </h3>
            <ul className="space-y-3 text-sm text-white/70 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-brand-400 font-bold">•</span>
                <span><strong>Theory End-Semester Exam (70 Marks):</strong> Objective MCQs (20 Marks), Short Conceptual Questions (20 Marks), and Long Analytical / Numerical Problems (30 Marks).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-400 font-bold">•</span>
                <span><strong>Internal Sessional & Class Tests (30 Marks):</strong> Periodic mid-semester exams, regular assignment submissions, and minimum 75% attendance criteria.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-400 font-bold">•</span>
                <span><strong>Passing Criteria:</strong> Minimum 28 marks out of 70 in external theory exam plus 40% combined aggregate to clear the subject.</span>
              </li>
            </ul>
          </div>

          <div className="glass p-6 rounded-2xl">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="text-xl">💡</span> Proven Topper Study Strategies
            </h3>
            <ul className="space-y-3 text-sm text-white/70 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-accent-400 font-bold">1.</span>
                <span><strong>Solve Last 5 Years PYQs:</strong> 70%+ of questions repeat standard themes. Solving past papers builds speed and accuracy.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-400 font-bold">2.</span>
                <span><strong>Include Block Diagrams:</strong> For architecture, OSI models, and hardware questions, neat labelled diagrams fetch full marks.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-400 font-bold">3.</span>
                <span><strong>Write Working Code:</strong> In C, Java, and Web Tech papers, always write complete code snippets with comments.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Why Students Love HUB STUDY */}
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

      {/* Blog CTA */}
      <section className="max-w-4xl mx-auto px-4 pb-16 text-center">
        <div className="glass rounded-3xl p-8 border border-brand-500/20 bg-brand-900/10">
          <h2 className="font-display font-semibold text-2xl mb-3">Latest from Our Educational Blog</h2>
          <p className="text-white/60 mb-6 max-w-xl mx-auto text-sm">Read our original educational articles, exam preparation roadmaps, and SBTE Bihar diploma engineering updates.</p>
          <Link to="/blog" className="btn-primary px-6 py-3 rounded-xl font-medium inline-block hover:opacity-90 transition">Explore Blog Articles &rarr;</Link>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <h2 className="font-display font-semibold text-2xl mb-4">About HUB STUDY</h2>
        <div className="glass p-6 rounded-xl text-white/70 text-sm space-y-4 leading-relaxed">
          <p>HUB STUDY is a comprehensive open-access educational platform designed specifically for Computer Science & Engineering (CSE) and Information Technology (IT) diploma students. Our mission is to make quality study materials accessible to every student, helping them excel in their semester exams and build a strong technical foundation.</p>
          <p>We understand the challenges diploma students face when searching for reliable notes, previous year question papers (PYQs), and accurate syllabus information. HUB STUDY solves this by offering a neatly organized, semester-wise repository of resources tailored to the State Board of Technical Education (SBTE) Bihar curriculum.</p>
          <p>Whether you need to quickly check your results, download the latest class routine, prepare with important questions, or read detailed subject guides with interactive practice quizzes, HUB STUDY is your all-in-one companion. Developed by Ujjwal Mehta at Government Polytechnic Gaya, this platform continues to evolve with new features added regularly based on student community feedback.</p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-4 pb-20">
        <h2 className="text-center font-display font-semibold text-2xl mb-8">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {[
            { q: "What is HUB STUDY?", a: "HUB STUDY is a free platform providing structured study materials, PYQs, syllabus, and results for CSE and IT diploma students." },
            { q: "Is HUB STUDY free to use?", a: "Yes, accessing all study materials, subject guides, blogs, and tools on HUB STUDY is completely free for all polytechnic students." },
            { q: "Which branches are supported?", a: "Currently, we fully support Computer Science & Engineering (CSE) and Information Technology (IT) branches from Semester 1 to Semester 6." },
            { q: "How do I download study materials?", a: "Simply sign up, select your branch and semester in your profile, and visit the respective sections (Notes, PYQs, Syllabus) from your dashboard to download PDFs." },
            { q: "Are the question papers from previous SBTE exams?", a: "Yes, we provide authentic Previous Year Question Papers (PYQs) from the State Board of Technical Education (SBTE) exams to help you prepare effectively." },
            { q: "Who created this platform?", a: "HUB STUDY was developed by Ujjwal Mehta, a student at Government Polytechnic Gaya, to provide organized academic resources." },
            { q: "Can I access it on mobile?", a: "Absolutely! The HUB STUDY website is fully responsive and works smoothly across mobile phones, tablets, and desktop computers." },
            { q: "How do I report an issue or suggest a feature?", a: "You can reach out to us via the Contact Us page (/contact) or connect directly on WhatsApp through the floating help button." }
          ].map((faq, i) => (
            <details key={i} className="glass rounded-xl group cursor-pointer">
              <summary className="p-4 font-medium list-none flex justify-between items-center text-sm sm:text-base">
                {faq.q}
                <span className="text-white/40 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="p-4 pt-0 text-white/60 text-sm border-t border-white/5 mt-2 leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}

