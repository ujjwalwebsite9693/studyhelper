import { CONTACT } from '../constants/contact';

// Small floating "need help" shortcut straight to WhatsApp — visible on
// every page, deliberately unobtrusive.
export default function HelpButton() {
  return (
    <a
      href={CONTACT.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      title="Need help? Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 h-11 w-11 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center text-lg shadow-lg shadow-green-500/20 transition"
    >
      💬
    </a>
  );
}
