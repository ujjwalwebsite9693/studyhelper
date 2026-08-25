import React from 'react';
import { Link } from 'react-router-dom';
import PublicHeader from '../components/PublicHeader';
import { CONTACT } from '../constants/contact';

export default function Developer() {
  const academicHighlights = [
    { label: 'Current Education', value: 'Diploma in CSE (3rd Sem)' },
    { label: 'Institution', value: 'GP Gaya, Bihar' },
    { label: '1st Sem Score', value: '8.50 CGPA' },
    { label: '2nd Sem Score', value: '8.63 CGPA' },
    { label: 'Schooling', value: '10th Completed' },
    { label: 'Board', value: 'SBTE Bihar' }
  ];

  const certifications = [
    { title: 'Python Programming', issuer: 'Verified Certificate', icon: '🐍', desc: 'Core Python syntax, data structures, scripting, and backend algorithmic problem solving.' },
    { title: 'Introduction to Information Technology', issuer: 'IT Fundamentals', icon: '💻', desc: 'Computer architecture, operating systems, hardware fundamentals, and modern IT workflows.' },
    { title: 'HTML5 & Modern Web Development', issuer: 'Frontend Certificate', icon: '🌐', desc: 'Semantic HTML, responsive layouts, web accessibility standards, and clean CSS styling.' },
    { title: 'Cisco Networking Essentials', issuer: 'Cisco Academy', icon: '🛡️', desc: 'Network topologies, IP addressing, routing protocols, and OSI model concepts.' },
    { title: 'Technical Training Workshop', issuer: 'Hands-on Engineering', icon: '⚙️', desc: 'Practical full-stack software development, debugging, and live application deployment.' }
  ];

  const skills = [
    { category: 'Frontend Development', items: ['React.js', 'Vite', 'Tailwind CSS', 'JavaScript (ES6+)', 'HTML5 & CSS3', 'Responsive UI/UX'] },
    { category: 'Backend & APIs', items: ['Node.js', 'Express.js', 'RESTful APIs', 'JWT Auth', 'Python Basics', 'Java Basics', 'C Programming'] },
    { category: 'Database & Cloud', items: ['MongoDB Atlas', 'Mongoose ODM', 'Cloudinary CDN', 'Vercel Deployment', 'Render Cloud', 'Netlify'] },
    { category: 'Tools & Creative', items: ['Git & GitHub', 'VS Code', 'Video Editing', 'Content Creation', 'System Design', 'Postman'] }
  ];

  const projects = [
    {
      title: 'HUB STUDY',
      role: 'Founder & Full-Stack Developer',
      url: 'https://hubstudy.online',
      badge: 'Live Academic Portal',
      desc: 'Complete educational ecosystem for CSE & IT diploma students featuring semester-wise notes, solved PYQs, class routines, automated SBTE result downloads, chapter study guides with interactive MCQ quizzes, and an educational blog CMS.',
      tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS']
    },
    {
      title: "Ujjwal's Code Platform",
      role: 'Creator & Architect',
      url: 'https://ujjwal.page.gd',
      badge: 'Projects & Source Code Hub',
      desc: 'A full-stack project repository and developer resource platform where students and developers can explore live projects, access open-source codes, and download starter templates.',
      tech: ['Full-Stack Web', 'Responsive UI', 'Source Code Distribution']
    },
    {
      title: "Ujjwal's Code — YouTube Channel",
      role: 'Content Creator & Educator',
      url: 'https://www.youtube.com/@Ujjwalmehta1',
      badge: '@Ujjwalmehta1',
      desc: 'Educational YouTube channel dedicated to programming tutorials, web development tips, project walkthroughs, and diploma engineering preparation guides.',
      tech: ['Coding Tutorials', 'Project Guides', 'Tech Content']
    }
  ];

  const journey = [
    {
      year: 'Schooling Phase',
      title: 'Completed 10th Standard',
      desc: 'Developed an early passion for technology, algorithms, computer hardware, and digital design.'
    },
    {
      year: '2025 - 2028',
      title: 'Diploma in Computer Science & Engineering (GP Gaya)',
      desc: 'Enrolled at Government Polytechnic Gaya under SBTE Bihar. Consistently secured high academic results with 8.50 CGPA in Semester 1 and 8.63 CGPA in Semester 2 (currently in 3rd Semester).'
    },
    {
      year: '2025',
      title: "Launched YouTube Channel: Ujjwal's Code",
      desc: 'Started creating programming tutorials and tech walkthroughs under @Ujjwalmehta1 to guide polytechnic students in web development.'
    },
    {
      year: '2025 - Present',
      title: "Founded Ujjwal's Code Platform & Built HUB STUDY",
      desc: 'Built ujjwal.page.gd to share open-source code and architected hubstudy.online as a free unified academic resource platform for thousands of diploma students.'
    }
  ];

  return (
    <div className="min-h-screen bg-ink-950 text-white font-inter flex flex-col">
      <PublicHeader />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Profile Hero Card */}
        <div className="glass rounded-3xl p-8 sm:p-12 mb-16 relative overflow-hidden border border-brand-500/25 shadow-2xl shadow-brand-500/10">
          <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-brand-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 bg-accent-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            {/* Real Profile Image with Glowing Aura */}
            <div className="relative shrink-0">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-gradient-to-tr from-brand-500 via-accent-400 to-indigo-600 p-1 shadow-2xl shadow-brand-500/30">
                <img
                  src="https://i.ibb.co/HDYy6CSX/File-Name-Lost-1.jpg"
                  alt="Ujjwal Mehta"
                  className="w-full h-full object-cover rounded-[22px] bg-ink-900"
                />
              </div>
              <span className="absolute -bottom-2 -right-2 px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold rounded-full backdrop-blur">
                Active Developer
              </span>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/70 mb-3">
                <span>📍 Government Polytechnic Gaya, BodhGaya, Bihar (823001)</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold font-sora text-gradient mb-2">
                Ujjwal Mehta
              </h1>
              <p className="text-lg text-accent-400 font-medium mb-3">
                Developer • Creator • Founder of HUB STUDY
              </p>
              <p className="text-white/60 text-sm sm:text-base max-w-2xl leading-relaxed mb-6">
                3rd Semester Computer Science & Engineering diploma student at GP Gaya with a strong academic track record (8.5 & 8.63 CGPA). Passionate MERN stack developer and content creator dedicated to building fast, helpful digital solutions for students.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <a
                  href={CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-5 py-2.5 rounded-xl text-sm font-medium inline-flex items-center gap-2 hover:opacity-90 transition shadow-lg shadow-brand-500/20"
                >
                  <span>💬</span> WhatsApp ({CONTACT.whatsappDisplay})
                </a>
                <a
                  href="https://ujjwal.page.gd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass px-5 py-2.5 rounded-xl text-sm font-medium hover:border-brand-500/40 transition inline-flex items-center gap-2 text-white"
                >
                  <span>🌐</span> Ujjwal's Code (ujjwal.page.gd)
                </a>
                <a
                  href="https://www.youtube.com/@Ujjwalmehta1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass px-4 py-2.5 rounded-xl text-sm font-medium hover:border-red-500/40 transition text-red-300 hover:text-red-200 inline-flex items-center gap-2"
                >
                  <span>▶️</span> YouTube
                </a>
                <a
                  href={CONTACT.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass px-4 py-2.5 rounded-xl text-sm font-medium hover:border-pink-500/40 transition text-pink-300 hover:text-pink-200 inline-flex items-center gap-2"
                >
                  <span>📸</span> Instagram
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Profile & Scores */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold font-sora mb-6 text-white flex items-center gap-3">
            <span className="text-2xl">🎓</span> Academic Profile & Performance
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {academicHighlights.map((item, idx) => (
              <div key={idx} className="glass p-5 rounded-2xl border border-white/10 text-center flex flex-col justify-center">
                <span className="text-xs text-white/50 mb-1 font-medium">{item.label}</span>
                <span className="text-base sm:text-lg font-bold text-accent-400">{item.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications Showcase */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold font-sora mb-6 text-white flex items-center gap-3">
            <span className="text-2xl">📜</span> Verified Certifications & Training
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, idx) => (
              <div key={idx} className="glass p-6 rounded-2xl border border-white/10 hover:border-brand-500/40 transition flex flex-col justify-between">
                <div>
                  <div className="text-3xl mb-3">{cert.icon}</div>
                  <span className="text-xs text-brand-300 font-semibold uppercase tracking-wider block mb-1">{cert.issuer}</span>
                  <h3 className="text-lg font-bold text-white mb-2">{cert.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{cert.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                  <span>✓</span> Certified & Completed
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects & Ventures */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold font-sora mb-6 text-white flex items-center gap-3">
            <span className="text-2xl">🚀</span> Projects & Platforms Built
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((proj, idx) => (
              <div key={idx} className="glass p-6 rounded-2xl border border-white/10 hover:border-brand-500/40 transition flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold">
                      {proj.badge}
                    </span>
                    <a href={proj.url} target="_blank" rel="noopener noreferrer" className="text-accent-400 text-xs font-medium hover:underline flex items-center gap-0.5">
                      Visit ↗
                    </a>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{proj.title}</h3>
                  <span className="text-xs text-accent-400 font-medium block mb-3">{proj.role}</span>
                  <p className="text-white/60 text-sm leading-relaxed mb-4">{proj.desc}</p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                    {proj.tech.map((t, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-white/5 text-[11px] text-white/70">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Skills & Stack */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold font-sora mb-6 text-white flex items-center gap-3">
            <span className="text-2xl">🛠️</span> Technical Skills & Stack
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
          <h2 className="text-2xl font-bold font-sora mb-6 text-white flex items-center gap-3">
            <span className="text-2xl">📍</span> Journey & Milestones
          </h2>
          <div className="space-y-4">
            {journey.map((m, idx) => (
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

        {/* Story Behind HUB STUDY */}
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
                My mission is to empower every polytechnic engineering student in Bihar and beyond with seamless access to high-quality study resources without any cost barriers.
              </p>
            </div>
          </div>
        </section>

        {/* Connect & Get in Touch Card */}
        <section className="glass rounded-3xl p-8 sm:p-10 text-center border border-brand-500/20 bg-brand-900/10">
          <h2 className="text-2xl font-bold font-sora mb-3">Want to Connect or Collaborate?</h2>
          <p className="text-white/60 text-sm max-w-xl mx-auto mb-8">
            Whether you are a diploma student looking for study guidance, a developer wanting to collaborate on open-source projects, or have feedback for HUB STUDY, feel free to get in touch!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-6 py-3 rounded-xl font-medium text-sm inline-flex items-center gap-2 hover:opacity-90 transition shadow-lg shadow-brand-500/20"
            >
              <span>💬</span> Chat on WhatsApp ({CONTACT.whatsappDisplay})
            </a>
            <a
              href="mailto:ujjwalcse07@gmail.com"
              className="glass px-6 py-3 rounded-xl font-medium text-sm hover:border-white/20 transition text-white inline-flex items-center gap-2"
            >
              <span>✉️</span> Email: ujjwalcse07@gmail.com
            </a>
            <a
              href="https://t.me/ujjwal_mehta_1"
              target="_blank"
              rel="noopener noreferrer"
              className="glass px-6 py-3 rounded-xl font-medium text-sm hover:border-cyan-500/40 transition text-cyan-300 inline-flex items-center gap-2"
            >
              <span>✈️</span> Telegram (@ujjwal_mehta_1)
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
