import React from 'react';
import { Link } from 'react-router-dom';
import PublicHeader from '../components/PublicHeader';

const ContactUs = () => {
    return (
        <div className="min-h-screen bg-ink-950 text-white font-inter">
            <PublicHeader />
            
            <div className="bg-ink-900 border-b border-white/5 py-20 px-4 text-center">
                <h1 className="text-5xl font-bold font-sora mb-6 text-gradient">Get in Touch</h1>
                <p className="text-gray-400 text-xl max-w-2xl mx-auto">
                    Have questions, suggestions, or found an issue? We'd love to hear from you.
                </p>
            </div>

            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {/* WhatsApp */}
                    <a href="https://wa.me/917462002715" target="_blank" rel="noreferrer" className="glass p-8 rounded-2xl text-center hover:border-green-500/50 hover:-translate-y-1 transition-all group">
                        <div className="w-16 h-16 mx-auto bg-green-500/10 rounded-full flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                            📱
                        </div>
                        <h3 className="font-bold font-sora text-lg mb-2">WhatsApp</h3>
                        <p className="text-gray-400 text-sm mb-4">Fastest response for urgent queries.</p>
                        <span className="text-green-400 font-medium">Message Us &rarr;</span>
                    </a>

                    {/* Email */}
                    <a href="mailto:ujjwalcse07@gmail.com" className="glass p-8 rounded-2xl text-center hover:border-red-500/50 hover:-translate-y-1 transition-all group">
                        <div className="w-16 h-16 mx-auto bg-red-500/10 rounded-full flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                            ✉️
                        </div>
                        <h3 className="font-bold font-sora text-lg mb-2">Email</h3>
                        <p className="text-gray-400 text-sm mb-4">For detailed inquiries and support.</p>
                        <span className="text-red-400 font-medium">Send Email &rarr;</span>
                    </a>

                    {/* Instagram */}
                    <a href="https://instagram.com/itz_ujjwalofficial" target="_blank" rel="noreferrer" className="glass p-8 rounded-2xl text-center hover:border-pink-500/50 hover:-translate-y-1 transition-all group">
                        <div className="w-16 h-16 mx-auto bg-pink-500/10 rounded-full flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                            📸
                        </div>
                        <h3 className="font-bold font-sora text-lg mb-2">Instagram</h3>
                        <p className="text-gray-400 text-sm mb-4">Follow for updates and announcements.</p>
                        <span className="text-pink-400 font-medium">Follow Us &rarr;</span>
                    </a>

                    {/* Developer */}
                    <a href="https://github.com/ujjwalcse" target="_blank" rel="noreferrer" className="glass p-8 rounded-2xl text-center hover:border-brand-500/50 hover:-translate-y-1 transition-all group">
                        <div className="w-16 h-16 mx-auto bg-brand-500/10 rounded-full flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                            👨‍💻
                        </div>
                        <h3 className="font-bold font-sora text-lg mb-2">Developer</h3>
                        <p className="text-gray-400 text-sm mb-4">Check out GitHub and other projects.</p>
                        <span className="text-brand-400 font-medium">View Profile &rarr;</span>
                    </a>
                </div>

                <div className="glass rounded-3xl p-10 md:p-16 text-center max-w-4xl mx-auto border-brand-500/20">
                    <h2 className="text-3xl font-sora font-bold mb-4">Before reaching out...</h2>
                    <p className="text-gray-400 text-lg mb-8">
                        Many common questions about notes availability, platform features, and registration have already been answered. Please take a moment to read our documentation.
                    </p>
                    <p className="text-sm text-gray-500 mb-8">
                        * We typically respond to queries within 24-48 hours.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/about" className="glass px-8 py-3 rounded-lg font-medium hover:bg-white/5 transition-colors">Read About Us</Link>
                        <Link to="/register" className="btn-primary">Join the Community</Link>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default ContactUs;
