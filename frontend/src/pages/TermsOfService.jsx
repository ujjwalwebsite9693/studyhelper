import React from 'react';
import PublicHeader from '../components/PublicHeader';

const TermsOfService = () => {
    return (
        <div className="min-h-screen bg-ink-950 text-white font-inter pb-20">
            <PublicHeader />
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-16">
                <h1 className="text-4xl md:text-5xl font-bold font-sora mb-4 text-gradient">Terms of Service</h1>
                <p className="text-gray-400 mb-10">Last Updated: October 2023</p>

                <div className="prose prose-invert prose-lg max-w-none text-gray-300 prose-headings:font-sora prose-headings:text-white prose-a:text-brand-400 space-y-8">
                    
                    <section>
                        <h2>1. Acceptance of Terms</h2>
                        <p>By accessing and using HUB STUDY (hubstudy.online), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use our service.</p>
                    </section>

                    <section>
                        <h2>2. Description of Service</h2>
                        <p>HUB STUDY is a free, non-profit educational platform created to assist diploma engineering students (primarily SBTE Bihar) by providing study materials, notes, PYQs, and result checking facilities. The platform is continuously evolving, and we reserve the right to modify or discontinue any feature without notice.</p>
                    </section>

                    <section>
                        <h2>3. User Accounts</h2>
                        <p>To access certain features, you must register for an account. You agree to:</p>
                        <ul>
                            <li>Provide accurate, current, and complete information during registration.</li>
                            <li>Maintain the security of your password and identification.</li>
                            <li>Accept full responsibility for all activities that occur under your account.</li>
                            <li>Register only one account per student.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>4. Acceptable Use</h2>
                        <p>You agree not to use the platform to:</p>
                        <ul>
                            <li>Upload or distribute malicious code, viruses, or harmful software.</li>
                            <li>Scrape, datamine, or mass-download resources using automated scripts.</li>
                            <li>Share your account credentials with unauthorized users.</li>
                            <li>Use the service for any unlawful purpose.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>5. Content and Intellectual Property</h2>
                        <p>The study materials, notes, and previous year questions provided on HUB STUDY are collected from various open sources, student contributions, and faculty guidelines. While we strive for accuracy, we do not claim ownership of the original syllabus content or official university question papers. The platform's codebase, design, and original written guides are the intellectual property of the developer.</p>
                    </section>

                    <section>
                        <h2>6. Disclaimer</h2>
                        <p><strong>HUB STUDY is an independent, unofficial student project.</strong> We are NOT affiliated with, endorsed by, or officially connected to the State Board of Technical Education (SBTE) Bihar or any government institution. The materials provided are for reference and educational purposes only. Always verify critical information with your official college administration.</p>
                    </section>

                    <section>
                        <h2>7. Limitation of Liability</h2>
                        <p>In no event shall HUB STUDY or its developers be liable for any direct, indirect, incidental, consequential, or special damages arising out of or in any way connected with access to or use of the platform, including but not limited to inaccuracies in study materials or temporary downtime of the service.</p>
                    </section>

                    <section>
                        <h2>8. Account Termination</h2>
                        <p>We reserve the right to suspend or terminate your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms of Service.</p>
                    </section>

                    <section>
                        <h2>9. Contact</h2>
                        <p>If you have any questions about these Terms, please contact us at <a href="mailto:ujjwalcse07@gmail.com">ujjwalcse07@gmail.com</a>.</p>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
