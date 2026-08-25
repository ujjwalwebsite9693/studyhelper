import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PublicHeader from '../components/PublicHeader';
import Loader from '../components/Loader';
import api from '../api/axios';

const SubjectGuide = () => {
    const { slug } = useParams();
    const [subject, setSubject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeChapter, setActiveChapter] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [faqOpen, setFaqOpen] = useState(null);

    useEffect(() => {
        const fetchSubject = async () => {
            try {
                const response = await api.get(`/subjects/public/${slug}`);
                setSubject(response.data);
                setLoading(false);
            } catch (err) {
                setError('Subject guide not found or error occurred.');
                setLoading(false);
            }
        };
        fetchSubject();
    }, [slug]);

    if (loading) return <div className="min-h-screen bg-ink-950"><PublicHeader /><div className="py-32 flex justify-center"><Loader /></div></div>;
    if (error) return <div className="min-h-screen bg-ink-950 text-white"><PublicHeader /><div className="max-w-4xl mx-auto py-32 px-4 text-center"><h2 className="text-3xl text-gradient mb-4">404 - Not Found</h2><p>{error}</p><Link to="/subjects" className="btn-primary mt-6 inline-block">Back to Subjects</Link></div></div>;
    if (!subject) return null;

    const handleAnswerSelect = (mcqIndex, optionIndex) => {
        setSelectedAnswers(prev => ({ ...prev, [mcqIndex]: optionIndex }));
    };

    return (
        <div className="min-h-screen bg-ink-950 text-white font-inter">
            <PublicHeader />
            
            {/* Hero Banner */}
            <div className="bg-ink-900 border-b border-white/5 py-16 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="flex justify-center gap-3 mb-6">
                        <span className="bg-brand-500/20 text-brand-300 text-sm px-3 py-1 rounded-full">{subject.branch}</span>
                        <span className="bg-accent-500/20 text-accent-400 text-sm px-3 py-1 rounded-full">Semester {subject.semester}</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold font-sora mb-6 text-gradient">{subject.title}</h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
                        Complete study guide, chapter-wise notes, previous year questions analysis, and important concepts.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-12">
                {/* Table of Contents - Sidebar */}
                <aside className="w-full md:w-64 flex-shrink-0">
                    <div className="sticky top-24 glass p-6 rounded-xl">
                        <h3 className="font-sora font-bold text-lg mb-4 border-b border-white/10 pb-2">Contents</h3>
                        <nav className="flex flex-col gap-3 text-sm text-gray-400">
                            <a href="#introduction" className="hover:text-brand-300 transition-colors">1. Introduction</a>
                            <a href="#chapters" className="hover:text-brand-300 transition-colors">2. Chapter-wise Notes</a>
                            <a href="#concepts" className="hover:text-brand-300 transition-colors">3. Key Concepts</a>
                            <a href="#important-questions" className="hover:text-brand-300 transition-colors">4. Important Questions</a>
                            <a href="#mcqs" className="hover:text-brand-300 transition-colors">5. Practice MCQs</a>
                            <a href="#faqs" className="hover:text-brand-300 transition-colors">6. FAQs</a>
                        </nav>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 space-y-16">
                    {/* Introduction */}
                    <section id="introduction">
                        <h2 className="text-3xl font-sora font-bold mb-6">Introduction to {subject.title}</h2>
                        <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed">
                            {subject.introduction?.split('\n').map((para, idx) => (
                                <p key={idx} className="mb-4">{para}</p>
                            )) || <p>Welcome to the comprehensive guide for {subject.title}.</p>}
                        </div>
                    </section>

                    {/* Chapters */}
                    {subject.chapters?.length > 0 && (
                        <section id="chapters">
                            <h2 className="text-3xl font-sora font-bold mb-6">Chapter-wise Explanation</h2>
                            <div className="space-y-4">
                                {subject.chapters.map((chapter, idx) => (
                                    <div key={idx} className="glass rounded-xl overflow-hidden">
                                        <button 
                                            onClick={() => setActiveChapter(activeChapter === idx ? null : idx)}
                                            className="w-full p-6 text-left flex justify-between items-center bg-white/5 hover:bg-white/10 transition-colors"
                                        >
                                            <h3 className="text-xl font-bold font-sora">Chapter {idx + 1}: {chapter.title}</h3>
                                            <span>{activeChapter === idx ? '−' : '+'}</span>
                                        </button>
                                        {activeChapter === idx && (
                                            <div className="p-6 border-t border-white/10">
                                                <p className="text-gray-300 mb-4">{chapter.summary}</p>
                                                <ul className="list-disc pl-5 space-y-2 text-gray-400">
                                                    {chapter.keyPoints?.map((point, pIdx) => (
                                                        <li key={pIdx}>{point}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Key Concepts */}
                    {subject.concepts?.length > 0 && (
                        <section id="concepts">
                            <h2 className="text-3xl font-sora font-bold mb-6">Key Concepts</h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {subject.concepts.map((concept, idx) => (
                                    <div key={idx} className="glass p-6 rounded-xl border-l-4 border-l-brand-500">
                                        <h3 className="text-lg font-bold mb-3">{concept.heading}</h3>
                                        <p className="text-gray-400 text-sm">{concept.explanation}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Important Questions */}
                    {subject.importantQuestions?.length > 0 && (
                        <section id="important-questions">
                            <h2 className="text-3xl font-sora font-bold mb-6">Important Questions</h2>
                            <div className="glass p-6 rounded-xl">
                                <ul className="space-y-4">
                                    {subject.importantQuestions.map((q, idx) => (
                                        <li key={idx} className="flex gap-4">
                                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-ink-800 flex items-center justify-center text-accent-400 font-bold">{idx + 1}</span>
                                            <p className="text-gray-300 mt-1">{q}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>
                    )}

                    {/* MCQs */}
                    {subject.mcqs?.length > 0 && (
                        <section id="mcqs">
                            <h2 className="text-3xl font-sora font-bold mb-6">Practice MCQs</h2>
                            <div className="space-y-8">
                                {subject.mcqs.map((mcq, mIdx) => (
                                    <div key={mIdx} className="glass p-6 rounded-xl">
                                        <h3 className="text-lg font-medium mb-4">{mIdx + 1}. {mcq.question}</h3>
                                        <div className="space-y-3">
                                            {mcq.options.map((opt, oIdx) => {
                                                const isSelected = selectedAnswers[mIdx] === oIdx;
                                                const isCorrect = oIdx === mcq.correctOptionIndex;
                                                const showResult = selectedAnswers[mIdx] !== undefined;
                                                
                                                let btnClass = "w-full text-left p-4 rounded-lg border transition-all duration-200 ";
                                                if (!showResult) {
                                                    btnClass += "border-white/10 hover:border-brand-500 bg-ink-900";
                                                } else if (isCorrect) {
                                                    btnClass += "border-green-500 bg-green-500/10 text-green-400";
                                                } else if (isSelected && !isCorrect) {
                                                    btnClass += "border-red-500 bg-red-500/10 text-red-400";
                                                } else {
                                                    btnClass += "border-white/5 bg-ink-900/50 opacity-50";
                                                }

                                                return (
                                                    <button
                                                        key={oIdx}
                                                        onClick={() => !showResult && handleAnswerSelect(mIdx, oIdx)}
                                                        disabled={showResult}
                                                        className={btnClass}
                                                    >
                                                        {opt}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                        {selectedAnswers[mIdx] !== undefined && mcq.explanation && (
                                            <div className="mt-4 p-4 rounded-lg bg-brand-500/10 border border-brand-500/20 text-brand-200 text-sm">
                                                <strong>Explanation: </strong>{mcq.explanation}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* FAQs */}
                    {subject.faqs?.length > 0 && (
                        <section id="faqs">
                            <h2 className="text-3xl font-sora font-bold mb-6">Frequently Asked Questions</h2>
                            <div className="space-y-4">
                                {subject.faqs.map((faq, idx) => (
                                    <div key={idx} className="glass rounded-lg overflow-hidden">
                                        <button 
                                            onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                                            className="w-full p-4 text-left flex justify-between items-center"
                                        >
                                            <span className="font-medium">{faq.question}</span>
                                            <span>{faqOpen === idx ? '−' : '+'}</span>
                                        </button>
                                        {faqOpen === idx && (
                                            <div className="p-4 border-t border-white/5 text-gray-400 bg-ink-900/50">
                                                {faq.answer}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* CTA Section */}
                    <section className="glass rounded-2xl p-10 text-center relative overflow-hidden mt-20">
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 to-accent-500/10 pointer-events-none"></div>
                        <h2 className="text-3xl font-sora font-bold mb-4 relative z-10">Get Full Access to All Study Materials</h2>
                        <p className="text-gray-300 mb-8 max-w-2xl mx-auto relative z-10">
                            Join HUB STUDY to download complete PDF notes, previous year questions, syllabus, and track your progress—all for free!
                        </p>
                        <div className="flex justify-center gap-4 relative z-10">
                            <Link to="/register" className="btn-primary">Create Free Account</Link>
                            <Link to="/login" className="px-6 py-2 rounded-lg font-medium border border-white/20 hover:bg-white/5 transition-colors">Login</Link>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default SubjectGuide;
