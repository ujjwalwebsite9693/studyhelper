import { CONTACT } from '../constants/contact';

// Small and quiet on purpose — a single line, not a whole marketing block.
export default function Footer() {
  return (
    <footer className="mt-auto py-4 text-center text-xs text-white/35 border-t border-white/5">
      <p>
        Developed &amp; managed by <span className="text-white/55">{CONTACT.developer}</span>
      </p>
      <div className="flex items-center justify-center gap-3 mt-1.5">
        <a href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-300 transition">
          📸 {CONTACT.instagramHandle}
        </a>
        <span className="text-white/15">·</span>
        <a href={CONTACT.websiteUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-300 transition">
          🌐 {CONTACT.website}
        </a>
        <span className="text-white/15">·</span>
        <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-300 transition">
          💬 WhatsApp
        </a>
      </div>
    </footer>
  );
}
