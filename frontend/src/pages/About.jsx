import React from 'react';
import { Link } from 'react-router-dom';
import PublicHeader from '../components/PublicHeader';

const About = () => {
    return (
        <div className="min-h-screen bg-ink-950 text-white font-inter">
            <PublicHeader />
            
            <div className="bg-ink-900 border-b border-white/5 py-20 px-4 text-center">
                <h1 className="text-5xl font-bold font-sora mb-6 text-gradient">About HUB STUDY</h1>
                <p className="text-gray-400 text-xl max-w-2xl mx-auto">
                    Empowering diploma engineering students with structured, accessible, and high-quality study resources.
                </p>
            </div>

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
                
                <section>
                    <h2 className="text-3xl font-sora font-bold mb-6 border-b border-white/10 pb-2">What is HUB STUDY?</h2>
                    <div className="text-gray-300 text-lg leading-relaxed space-y-4">
                        <p>
                            HUB STUDY (hubstudy.online) is a comprehensive digital study platform designed specifically for Computer Science and Information Technology diploma students studying under the SBTE Bihar curriculum.
                        </p>
                        <p>
                            Recognizing the challenges students face in finding well-organized, curriculum-aligned study materials, this platform was created to serve as a single repository for everything a student needs to succeed. From detailed chapter-wise notes and Previous Year Question (PYQ) analysis to interactive MCQs and instant result checking, HUB STUDY simplifies the academic journey.
                        </p>
                    </div>
                </section>

                <section>
                    <h2 className="text-3xl font-sora font-bold mb-6 border-b border-white/10 pb-2">Our Mission</h2>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        Our primary mission is to democratize technical education by providing free, organized, and semester-wise study resources to every diploma engineering student. We believe that access to quality educational materials shouldn't be a barrier to achieving academic excellence. By leveraging modern web technologies, we aim to build a community-driven ecosystem that fosters collaborative learning and continuous improvement.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl font-sora font-bold mb-10 text-center">What We Offer</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { title: 'Curated Notes', desc: 'Handcrafted, syllabus-aligned PDF notes that make complex topics easy to grasp.', icon: '📚' },
                            { title: 'PYQ Solutions', desc: 'Detailed analysis and solutions of previous year questions to help you understand exam patterns.', icon: '📝' },
                            { title: 'Interactive MCQs', desc: 'Test your knowledge with our subject-wise multiple choice question banks.', icon: '✅' },
                            { title: 'Result Portal', desc: 'Quickly check your SBTE semester results directly through our integrated portal.', icon: '🎯' },
                            { title: 'Syllabus Tracker', desc: 'Keep track of what you have studied and what remains with our intuitive syllabus viewer.', icon: '📊' },
                            { title: 'Study Guides', desc: 'Comprehensive online guides providing chapter summaries, important concepts, and FAQs.', icon: '💡' }
                        ].map((feature, idx) => (
                            <div key={idx} className="glass p-6 rounded-xl flex gap-4">
                                <div className="text-3xl">{feature.icon}</div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                    <p className="text-gray-400">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="glass rounded-2xl p-10 text-center">
                    <h2 className="text-3xl font-sora font-bold mb-6">Who Built This?</h2>
                    <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-6">
                        HUB STUDY is an independent, student-led initiative created by <strong>Ujjwal Kant</strong>, a passionate Computer Science Engineering student (Batch 2025-2028) at Government Polytechnic Gaya. Driven by the vision to solve the resource scarcity problem for his peers, Ujjwal developed this entire platform from scratch using the MERN stack.
                    </p>
                    <div className="flex justify-center gap-4">
                        <a href="https://github.com/ujjwalcse" target="_blank" rel="noreferrer" className="text-brand-400 hover:text-brand-300">GitHub Profile</a>
                        <span className="text-gray-600">|</span>
                        <a href="mailto:ujjwalcse07@gmail.com" className="text-brand-400 hover:text-brand-300">Email Developer</a>
                    </div>
                </section>

                <section className="text-center">
                    <h2 className="text-3xl font-sora font-bold mb-6">Join the Community</h2>
                    <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                        Be part of our growing network of diploma students. Register for a free account today to unlock all features.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link to="/register" className="btn-primary">Get Started</Link>
                        <Link to="/contact" className="px-6 py-2 rounded-lg font-medium glass hover:bg-white/5 transition-colors">Contact Us</Link>
                    </div>
                </section>
                
            </main>
        </div>
    );
};

export default About;
