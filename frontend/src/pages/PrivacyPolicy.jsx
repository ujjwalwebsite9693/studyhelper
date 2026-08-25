import React from 'react';
import PublicHeader from '../components/PublicHeader';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-ink-950 text-white font-inter pb-20">
            <PublicHeader />
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-16">
                <h1 className="text-4xl md:text-5xl font-bold font-sora mb-4 text-gradient">Privacy Policy</h1>
                <p className="text-gray-400 mb-10">Last Updated: October 2023</p>

                <div className="prose prose-invert prose-lg max-w-none text-gray-300 prose-headings:font-sora prose-headings:text-white prose-a:text-brand-400 space-y-8">
                    
                    <section>
                        <h2>1. Introduction</h2>
                        <p>Welcome to HUB STUDY (hubstudy.online). We respect your privacy and are committed to protecting your personal data. This Privacy Policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.</p>
                    </section>

                    <section>
                        <h2>2. Information We Collect</h2>
                        <p>When you register for an account on HUB STUDY, we collect the following personal information:</p>
                        <ul>
                            <li>Full Name</li>
                            <li>Email Address</li>
                            <li>Board Registration Number (for result fetching purposes)</li>
                            <li>Academic Branch (e.g., CSE, IT)</li>
                            <li>Current Semester</li>
                            <li>Profile Photo (optional)</li>
                        </ul>
                    </section>

                    <section>
                        <h2>3. How We Use Your Information</h2>
                        <p>We use the collected information for the following purposes:</p>
                        <ul>
                            <li>To provide, operate, and maintain our platform</li>
                            <li>To personalize your experience and deliver content aligned with your branch and semester</li>
                            <li>To enable the quick checking of SBTE results using your registration number</li>
                            <li>To communicate with you regarding updates, announcements, or support</li>
                            <li>To track overall platform usage and improve our services</li>
                        </ul>
                    </section>

                    <section>
                        <h2>4. Data Storage and Security</h2>
                        <p>Your data is securely stored using modern cloud infrastructure (MongoDB Atlas). Uploaded profile photos and files are hosted securely on Cloudinary and ImgBB. We use JSON Web Tokens (JWT) for authentication and implement strict security measures to prevent unauthorized access. All passwords are encrypted before storage.</p>
                    </section>

                    <section>
                        <h2>5. Cookies and Local Storage</h2>
                        <p>We do not use invasive tracking cookies. We primarily use browser <code>localStorage</code> to store your authentication token securely, ensuring you remain logged in across sessions. We may utilize Google Analytics (via GA4) to understand general traffic patterns.</p>
                    </section>

                    <section>
                        <h2>6. Third-Party Services</h2>
                        <p>We may share limited anonymous data with or utilize the following third-party services:</p>
                        <ul>
                            <li><strong>Google Analytics:</strong> For monitoring website traffic and usage.</li>
                            <li><strong>Google AdSense:</strong> To serve non-intrusive advertisements that help keep the platform free.</li>
                            <li><strong>SBTE Bihar APIs:</strong> Used strictly for fetching semester results when requested by the user.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>7. Your Rights</h2>
                        <p>You have the right to access, update, or delete your personal information at any time. You can manage your data directly from your Profile settings. If you wish to completely delete your account and all associated data, you may contact us.</p>
                    </section>

                    <section>
                        <h2>8. Contact Us</h2>
                        <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                        <p>Email: <a href="mailto:ujjwalcse07@gmail.com">ujjwalcse07@gmail.com</a></p>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
