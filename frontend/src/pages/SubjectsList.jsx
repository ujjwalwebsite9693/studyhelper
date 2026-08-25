import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PublicHeader from '../components/PublicHeader';
import Loader from '../components/Loader';
import api from '../api/axios';

const SubjectsList = () => {
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Pagination & Filters
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchInput, setSearchInput] = useState('');
    const [search, setSearch] = useState('');
    const [branch, setBranch] = useState('All');
    const [semester, setSemester] = useState('All');
    const [sort, setSort] = useState('Newest');

    useEffect(() => {
        const timer = setTimeout(() => setSearch(searchInput), 300);
        return () => clearTimeout(timer);
    }, [searchInput]);

    useEffect(() => {
        setPage(1);
    }, [search, branch, semester, sort]);

    useEffect(() => {
        const fetchSubjects = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams({
                    page,
                    limit: 12,
                    ...(search && { search }),
                    ...(branch !== 'All' && { branch }),
                    ...(semester !== 'All' && { semester }),
                    sort
                });
                const response = await api.get(`/subjects/public?${params.toString()}`);
                
                const list = response.data?.guides || response.data?.subjects || (Array.isArray(response.data) ? response.data : []);
                setSubjects(list);
                setTotalPages(response.data?.totalPages || 1);
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Failed to fetch subjects');
                setLoading(false);
            }
        };
        fetchSubjects();
    }, [page, search, branch, semester, sort]);

    return (
        <div className="min-h-screen bg-ink-950 text-white font-inter">
            <PublicHeader />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold font-sora mb-4 text-gradient">
                        Study Guides & Subject Resources
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Comprehensive, chapter-wise study guides tailored for diploma engineering students. Master your subjects with ease.
                    </p>
                </div>

                <div className="glass rounded-xl p-4 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </span>
                            <input
                                type="text"
                                placeholder="Search subjects..."
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-ink-800 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-brand-500/50"
                            />
                        </div>
                        <select
                            value={branch}
                            onChange={(e) => setBranch(e.target.value)}
                            className="px-3 py-2.5 rounded-lg bg-ink-800 border border-white/10 text-white focus:outline-none focus:border-brand-500/50"
                        >
                            <option value="All">All Branches</option>
                            <option value="CSE">Computer Science (CSE)</option>
                            <option value="IT">Information Tech (IT)</option>
                        </select>
                        <select
                            value={semester}
                            onChange={(e) => setSemester(e.target.value)}
                            className="px-3 py-2.5 rounded-lg bg-ink-800 border border-white/10 text-white focus:outline-none focus:border-brand-500/50"
                        >
                            <option value="All">All Semesters</option>
                            {[1,2,3,4,5,6].map(sem => (
                                <option key={sem} value={String(sem)}>Semester {sem}</option>
                            ))}
                        </select>
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="px-3 py-2.5 rounded-lg bg-ink-800 border border-white/10 text-white focus:outline-none focus:border-brand-500/50"
                        >
                            <option value="Newest">Newest</option>
                            <option value="Oldest">Oldest</option>
                            <option value="A-Z">A-Z</option>
                            <option value="Z-A">Z-A</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="py-20 flex justify-center"><Loader /></div>
                ) : error ? (
                    <div className="glass p-6 text-center text-red-400">{error}</div>
                ) : subjects.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {subjects.map((subject) => (
                                <div key={subject._id} className="glass rounded-xl p-6 hover:border-brand-500/50 transition-colors flex flex-col">
                                    <div className="flex gap-2 mb-4">
                                        <span className="bg-brand-500/20 text-brand-300 text-xs px-2 py-1 rounded-full font-medium">
                                            {subject.branch}
                                        </span>
                                        <span className="bg-accent-500/20 text-accent-400 text-xs px-2 py-1 rounded-full font-medium">
                                            Sem {subject.semester}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-sora font-bold mb-2 text-white group-hover:text-brand-300 transition-colors">
                                        {subject.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-6 flex-1">
                                        {subject.introduction ? subject.introduction.substring(0, 150) + '...' : 'Detailed study guide covering all essential topics.'}
                                    </p>
                                    <Link
                                        to={`/subjects/${subject.slug || subject._id}`}
                                        className="text-accent-400 font-medium hover:text-accent-300 flex items-center gap-1"
                                    >
                                        Read Full Guide &rarr;
                                    </Link>
                                </div>
                            ))}
                        </div>
                        
                        {totalPages > 1 && (
                            <div className="flex justify-between items-center glass rounded-xl p-4 mt-8">
                                <button 
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className={`px-4 py-2 rounded-lg font-medium transition ${page === 1 ? 'border border-white/10 text-gray-500 cursor-not-allowed' : 'btn-primary text-white'}`}
                                >
                                    Previous
                                </button>
                                <span className="text-gray-400">Page {page} of {totalPages}</span>
                                <button 
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                    className={`px-4 py-2 rounded-lg font-medium transition ${page === totalPages ? 'border border-white/10 text-gray-500 cursor-not-allowed' : 'btn-primary text-white'}`}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="glass rounded-xl p-12 text-center">
                        <div className="text-6xl mb-4">📚</div>
                        <h3 className="text-xl font-bold mb-2">No subjects found</h3>
                        <p className="text-gray-400">Try adjusting your search filters.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default SubjectsList;
