import { Link } from 'react-router-dom';
import { CONTACT } from '../constants/contact';

export default function Footer() {
  return (
    <footer className="mt-auto pt-12 pb-6 border-t border-white/5 bg-ink-950">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="font-display font-bold text-xl mb-3">
              HUB<span className="text-gradient">STUDY</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-4">
              Comprehensive study material portal for CSE & IT diploma students. Your one-stop destination for notes, PYQs, syllabus, and results.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-white/90 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-white/50">
              <li><Link to="/" className="hover:text-brand-300 transition">Home</Link></li>
              <li><Link to="/subjects" className="hover:text-brand-300 transition">Subject Guides</Link></li>
              <li><Link to="/blog" className="hover:text-brand-300 transition">Blog</Link></li>
              <li><Link to="/documents" className="hover:text-brand-300 transition">Documents</Link></li>
              <li><Link to="/team" className="hover:text-brand-300 transition">Team</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white/90 mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-white/50">
              <li><Link to="/about" className="hover:text-brand-300 transition">About Us</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-brand-300 transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-brand-300 transition">Terms of Service</Link></li>
              <li><Link to="/contact" className="hover:text-brand-300 transition">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white/90 mb-4">Connect</h3>
            <ul className="space-y-2 text-sm text-white/50">
              <li>
                <Link to="/developer" className="hover:text-brand-300 transition flex items-center gap-2 text-accent-400 font-medium">
                  👨‍💻 About Developer
                </Link>
              </li>
              <li>
                <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-300 transition flex items-center gap-2">
                  💬 WhatsApp ({CONTACT.whatsappDisplay})
                </a>
              </li>
              <li>
                <a href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-300 transition flex items-center gap-2">
                  📸 Instagram (@{CONTACT.instagramHandle})
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-6 border-t border-white/5 text-center text-xs text-white/40">
          <p>Copyright © {new Date().getFullYear()} HUB STUDY. Developed by <Link to="/developer" className="text-accent-400 hover:underline font-medium">{CONTACT.developer}</Link>.</p>
        </div>
      </div>
    </footer>
  );
}
