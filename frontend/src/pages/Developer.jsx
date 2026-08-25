import React from 'react';
import { Link } from 'react-router-dom';
import PublicHeader from '../components/PublicHeader';
import { CONTACT } from '../constants/contact';

export default function Developer() {
  const skills = [
    { category: 'Frontend Development', items: ['React.js', 'Vite', 'Tailwind CSS', 'JavaScript (ES6+)', 'HTML5 & CSS3', 'Responsive UI/UX'] },
    { category: 'Backend & APIs', items: ['Node.js', 'Express.js', 'RESTful APIs', 'JWT Auth', 'Multer', 'API Security'] },
    { category: 'Database & Cloud', items: ['MongoDB Atlas', 'Mongoose ODM', 'Cloudinary CDN', 'Vercel Deployment', 'Render Cloud'] },
    { category: 'Core Engineering', items: ['Data Structures & Algorithms', 'C Programming', 'Java OOP', 'System Architecture', 'Git & GitHub'] }
  ];

  const milestones = [
    {
      title: 'Conceived & Built HUB STUDY',
      year: '2025 - Present',
      desc: 'Architected and launched hubstudy.online from scratch to provide 10,000+ diploma engineering students with organized notes, PYQs, routines, and results.'
    },
    {
      title: 'Computer Science & Engineering Diploma',
      year: '2025 - 2028',
      desc: 'Pursuing Diploma in Computer Science & Engineering at Government Polytechnic Gaya under the State Board of Technical Education (SBTE) Bihar curriculum.'
    },
    {
      title: 'Full-Stack Web Development',
      year: '2024 - Present',
      desc: 'Specialized in the modern MERN stack ecosystem, building scalable full-stack web applications, clean responsive user interfaces, and automated tools.'
    }
  ];

  return (
    <div className="min-h-screen bg-ink-950 text-white font-inter flex flex-col">
      <PublicHeader />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Profile Header Card */}
        <div className="glass rounded-3xl p-8 sm:p-12 mb-16 relative overflow-hidden border border-brand-500/20">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="relative">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-gradient-to-tr from-brand-500 via-accent-400 to-indigo-600 p-1 shadow-2xl shadow-brand-500/20">
                <div className="w-full h-full bg-ink-900 rounded-[22px] flex items-center justify-center text-5xl sm:text-6xl select-none">
                  👨‍💻
                </div>
              </div>
              <span className="absolute -bottom-2 -right-2 px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold rounded-full backdrop-blur">
                Active Developer
              </span>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/70 mb-3">
                <span>📍 Government Polytechnic Gaya, Bihar</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold font-sora text-gradient mb-2">
                Ujjwal Mehta
              </h1>
              <p className="text-lg text-accent-400 font-medium mb-4">
                Founder & Lead Full-Stack Developer of HUB STUDY
              </p>
              <p className="text-white/60 text-sm sm:text-base max-w-2xl leading-relaxed mb-6">
                Passionate Computer Science & Engineering diploma student, MERN stack developer, and open-source enthusiast dedicated to building clean, accessible, and high-impact digital tools for students.
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <a
                  href={CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-5 py-2.5 rounded-xl text-sm font-medium inline-flex items-center gap-2 hover:opacity-90 transition"
                >
                  <span>💬</span> Message on WhatsApp
                </a>
                <a
                  href="mailto:ujjwalcse07@gmail.com"
                  className="glass px-5 py-2.5 rounded-xl text-sm font-medium hover:border-brand-500/40 transition inline-flex items-center gap-2 text-white"
                >
                  <span>✉️</span> ujjwalcse07@gmail.com
                </a>
                <a
                  href={CONTACT.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass px-4 py-2.5 rounded-xl text-sm font-medium hover:border-brand-500/40 transition text-white/80 hover:text-white"
                >
                  📸 Instagram
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* The Story behind HUB STUDY */}
        <section className="mb-16">
          <div className="glass rounded-3xl p-8 sm:p-10 border border-white/10">
            <h2 className="text-2xl font-bold font-sora mb-4 text-white flex items-center gap-3">
              <span className="text-2xl">💡</span> The Story Behind HUB STUDY
            </h2>
            <div className="space-y-4 text-white/70 leading-relaxed text-sm sm:text-base">
              <p>
                As a Computer Science diploma student at Government Polytechnic Gaya, I noticed that hundreds of fellow students struggled every semester to find organized syllabus notes, authentic Previous Year Question Papers (PYQs), and accurate result links. Study materials were scattered across informal WhatsApp groups, low-quality scans, and broken download links.
              </p>
              <p>
                To permanently solve this, I designed and coded <strong>HUB STUDY (hubstudy.online)</strong> as a unified, fast, and 100% free academic portal. Built on the MERN stack with modern responsive design, it delivers instant semester-wise notes, chapter guides with interactive quizzes, syllabus tracking, and direct SBTE result downloads.
              </p>
              <p>
                My vision is to empower every polytechnic engineering student in Bihar and beyond with seamless access to high-quality study resources without any cost barriers.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Skills Grid */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold font-sora mb-6 text-white text-center sm:text-left">
            🛠️ Technical Skills & Stack
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((s, idx) => (
              <div key={idx} className="glass p-6 rounded-2xl border border-white/10 hover:border-brand-500/40 transition flex flex-col">
                <h3 className="font-semibold text-accent-400 text-base mb-4 pb-2 border-b border-white/10">
                  {s.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {s.items.map((item, i) => (
                    <span key={i} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-white/80 font-medium">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Journey & Milestones */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold font-sora mb-6 text-white text-center sm:text-left">
            🚀 Journey & Milestones
          </h2>
          <div className="space-y-4">
            {milestones.map((m, idx) => (
              <div key={idx} className="glass p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold text-brand-400 uppercase tracking-wider mb-1">{m.year}</div>
                  <h3 className="text-lg font-bold text-white mb-1">{m.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Connect & Get in Touch Card */}
        <section className="glass rounded-3xl p-8 sm:p-10 text-center border border-brand-500/20 bg-brand-900/10">
          <h2 className="text-2xl font-bold font-sora mb-3">Want to Collaborate or Share Feedback?</h2>
          <p className="text-white/60 text-sm max-w-xl mx-auto mb-8">
            Whether you are a student with study resource requests, a fellow developer interested in collaboration, or need help with diploma materials, feel free to reach out directly!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-6 py-3 rounded-xl font-medium text-sm inline-flex items-center gap-2 hover:opacity-90 transition"
            >
              <span>💬</span> Chat on WhatsApp ({CONTACT.whatsappDisplay})
            </a>
            <Link
              to="/contact"
              className="glass px-6 py-3 rounded-xl font-medium text-sm hover:border-white/20 transition text-white"
            >
              Visit Contact Page &rarr;
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
