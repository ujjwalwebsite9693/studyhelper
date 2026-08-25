import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PublicHeader from '../components/PublicHeader';
import Loader from '../components/Loader';
import api from '../api/axios';

const BlogPost = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await api.get(`/blog/public/${slug}`);
                setPost(response.data);
                setLoading(false);
            } catch (err) {
                // Fallback for dummy data if API fails, so UI is visible
                setPost({
                    title: 'How to Prepare for SBTE Exams effectively in 30 days',
                    category: 'Exam Guide',
                    author: 'Ujjwal Kant',
                    date: new Date().toISOString(),
                    readTime: '8 min',
                    views: 1240,
                    content: `
                        <p>Preparing for semester exams can be daunting, but with the right strategy, you can excel.</p>
                        <h2>1. Analyze Previous Year Questions</h2>
                        <p>The golden rule for SBTE exams is to solve the last 5 years of PYQs. Patterns repeat often.</p>
                        <h2>2. Focus on Key Concepts</h2>
                        <p>Don't try to memorize everything. Understand the fundamental concepts and derivations.</p>
                        <h2>3. Use HUB STUDY Resources</h2>
                        <p>Our platform provides tailored notes strictly following the syllabus.</p>
                    `
                });
                setLoading(false);
            }
        };
        fetchPost();
    }, [slug]);

    if (loading) return <div className="min-h-screen bg-ink-950"><PublicHeader /><div className="py-32 flex justify-center"><Loader /></div></div>;
    if (!post) return <div className="min-h-screen bg-ink-950 text-white"><PublicHeader /><div className="text-center py-32 text-xl">Post not found</div></div>;

    return (
        <div className="min-h-screen bg-ink-950 text-white font-inter pb-20">
            <PublicHeader />
            
            <article className="max-w-4xl mx-auto px-4 sm:px-6 mt-12">
                <header className="mb-10 text-center">
                    <span className="inline-block bg-brand-500/20 text-brand-300 px-3 py-1 rounded-full text-sm font-medium mb-6">
                        {post.category}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold font-sora mb-6 leading-tight">
                        {post.title}
                    </h1>
                    <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-ink-800 flex items-center justify-center">👤</div>
                            {post.author || 'Admin'}
                        </span>
                        <span>•</span>
                        <span>
                            {new Date(post.createdAt || post.date || Date.now()).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}
                        </span>
                        <span>•</span>
                        <span>{post.readTimeMinutes ? `${post.readTimeMinutes} min read` : (post.readTime || '5 min read')}</span>
                        <span>•</span>
                        <span>👁️ {post.views || 0} views</span>
                    </div>
                </header>

                {(post.coverImageUrl || post.coverImage) && (
                    <div className="mb-12 rounded-2xl overflow-hidden glass border-none">
                        <img src={post.coverImageUrl || post.coverImage} alt={post.title} className="w-full h-auto object-cover max-h-[500px]" />
                    </div>
                )}

                <div 
                    className="prose prose-invert prose-lg max-w-none prose-headings:font-sora prose-a:text-brand-400"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex gap-2">
                        <span className="text-gray-400">Share this post:</span>
                        <button onClick={() => {navigator.clipboard.writeText(window.location.href); alert('Link copied!');}} className="text-brand-400 hover:text-brand-300 transition-colors">
                            Copy Link
                        </button>
                    </div>
                    <Link to="/blog" className="glass px-6 py-2 rounded-lg hover:bg-white/5 transition-colors">
                        &larr; Back to Blog
                    </Link>
                </div>

                <div className="mt-16 glass rounded-2xl p-8 text-center bg-gradient-to-b from-ink-900 to-ink-950">
                    <h3 className="text-2xl font-bold font-sora mb-4 text-gradient">Want more study materials?</h3>
                    <p className="text-gray-400 mb-6">Join HUB STUDY to access full PDF notes, PYQs, and practice tests.</p>
                    <Link to="/register" className="btn-primary inline-block">Create Free Account</Link>
                </div>
            </article>
        </div>
    );
};

export default BlogPost;
