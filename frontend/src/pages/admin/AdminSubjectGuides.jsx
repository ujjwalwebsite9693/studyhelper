import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { adminApi } from '../../api/axios';
import Loader from '../../components/Loader';

export default function AdminSubjectGuides() {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Section Toggles
  const [openSection, setOpenSection] = useState({
    intro: false,
    concepts: false,
    chapters: false,
    questions: false,
    mcqs: false,
    examInfo: false,
    faqs: false,
    related: false
  });

  const toggleSection = (sec) => setOpenSection(prev => ({ ...prev, [sec]: !prev[sec] }));

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [branch, setBranch] = useState('BOTH');
  const [semester, setSemester] = useState(1);
  const [metaDescription, setMetaDescription] = useState('');
  
  const [introduction, setIntroduction] = useState('');
  
  const [keyConcepts, setKeyConcepts] = useState([]); // {heading, explanation}
  const [chapters, setChapters] = useState([]); // {title, summary, keyPoints: []}
  const [importantQuestions, setImportantQuestions] = useState([]); // [string]
  const [mcqs, setMcqs] = useState([]); // {question, options:[], correctIndex, explanation}
  
  const [previousYearContext, setPreviousYearContext] = useState('');
  const [examTips, setExamTips] = useState([]); // [string]
  const [syllabusRelevance, setSyllabusRelevance] = useState('');
  const [pdfContents, setPdfContents] = useState('');

  const [faqs, setFaqs] = useState([]); // {question, answer}
  
  const [relatedTopics, setRelatedTopics] = useState([]); // {title, slug}
  const [examples, setExamples] = useState([]); // {title, content}

  function load() {
    setLoading(true);
    adminApi.get('/subjects/admin/all').then((res) => setGuides(res.data)).finally(() => setLoading(false));
  }
  useEffect(load, []);

  function handleTitleChange(e) {
    const val = e.target.value;
    setTitle(val);
    if (!editingId) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    }
  }

  function startEdit(g) {
    setEditingId(g._id);
    setTitle(g.title || '');
    setSlug(g.slug || '');
    setBranch(g.branch || 'BOTH');
    setSemester(g.semester || 1);
    setMetaDescription(g.metaDescription || '');
    setIntroduction(g.introduction || '');
    setKeyConcepts(g.keyConcepts || []);
    setChapters(g.chapters || []);
    setImportantQuestions(g.importantQuestions || []);
    setMcqs(g.mcqs || []);
    
    setPreviousYearContext(g.examInfo?.previousYearContext || '');
    setExamTips(g.examInfo?.examTips || []);
    setSyllabusRelevance(g.examInfo?.syllabusRelevance || '');
    setPdfContents(g.examInfo?.pdfContents || '');
    
    setFaqs(g.faqs || []);
    setRelatedTopics(g.relatedTopics || []);
    setExamples(g.examples || []);
  }

  function resetForm() {
    setEditingId(null);
    setTitle(''); setSlug(''); setBranch('BOTH'); setSemester(1); setMetaDescription('');
    setIntroduction(''); setKeyConcepts([]); setChapters([]); setImportantQuestions([]); setMcqs([]);
    setPreviousYearContext(''); setExamTips([]); setSyllabusRelevance(''); setPdfContents('');
    setFaqs([]); setRelatedTopics([]); setExamples([]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        title, slug, branch, semester: Number(semester), metaDescription, introduction,
        keyConcepts, chapters, importantQuestions, mcqs, faqs, relatedTopics, examples,
        examInfo: {
          previousYearContext,
          examTips,
          syllabusRelevance,
          pdfContents
        }
      };

      if (editingId) {
        await adminApi.put(`/subjects/${editingId}`, payload);
        toast.success('Updated guide');
      } else {
        await adminApi.post('/subjects', payload);
        toast.success('Created guide');
      }
      resetForm();
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not save guide');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this subject guide?')) return;
    try {
      await adminApi.delete(`/subjects/${id}`);
      toast.success('Deleted');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not delete');
    }
  }

  // Helpers for dynamic lists
  const updateArr = (arr, setter, index, field, value) => {
    const newArr = [...arr];
    if (field === null) newArr[index] = value;
    else newArr[index][field] = value;
    setter(newArr);
  };
  const removeArrItem = (arr, setter, index) => {
    setter(arr.filter((_, i) => i !== index));
  };
  const addArrItem = (setter, emptyObj) => {
    setter(prev => [...prev, emptyObj]);
  };

  return (
    <div className="pb-20">
      <h1 className="font-display text-2xl font-bold">Subject Guides</h1>
      <p className="text-white/50 text-sm mt-1">Create comprehensive study material for subjects.</p>

      <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 mt-6 space-y-4">
        
        {/* Basic Info */}
        <div className="space-y-4">
          <h3 className="font-semibold text-brand-300">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input required placeholder="Title" value={title} onChange={handleTitleChange} className="input-field" />
            <input required placeholder="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} className="input-field" />
            <select value={branch} onChange={(e) => setBranch(e.target.value)} className="input-field [&>option]:bg-ink-900">
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="BOTH">BOTH</option>
            </select>
            <select value={semester} onChange={(e) => setSemester(e.target.value)} className="input-field [&>option]:bg-ink-900">
              {[1,2,3,4,5,6].map(s => <option key={s} value={s}>Semester {s}</option>)}
            </select>
          </div>
          <input placeholder="Meta Description (for SEO/cards)" value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} className="input-field" />
        </div>

        {/* Introduction */}
        <div className="border border-white/10 rounded-lg overflow-hidden">
          <button type="button" onClick={() => toggleSection('intro')} className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 font-medium">
            Introduction {openSection.intro ? '▼' : '▶'}
          </button>
          {openSection.intro && (
            <div className="p-4 bg-black/20">
              <textarea placeholder="Write a compelling introduction..." value={introduction} onChange={(e) => setIntroduction(e.target.value)} rows={6} className="input-field" />
            </div>
          )}
        </div>

        {/* Key Concepts */}
        <div className="border border-white/10 rounded-lg overflow-hidden">
          <button type="button" onClick={() => toggleSection('concepts')} className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 font-medium">
            Key Concepts ({keyConcepts.length}) {openSection.concepts ? '▼' : '▶'}
          </button>
          {openSection.concepts && (
            <div className="p-4 bg-black/20 space-y-4">
              {keyConcepts.map((kc, i) => (
                <div key={i} className="glass p-3 rounded-lg flex gap-3">
                  <div className="flex-1 space-y-2">
                    <input placeholder="Concept Heading" value={kc.heading} onChange={(e) => updateArr(keyConcepts, setKeyConcepts, i, 'heading', e.target.value)} className="input-field" />
                    <textarea placeholder="Explanation" value={kc.explanation} onChange={(e) => updateArr(keyConcepts, setKeyConcepts, i, 'explanation', e.target.value)} className="input-field" rows={2} />
                  </div>
                  <button type="button" onClick={() => removeArrItem(keyConcepts, setKeyConcepts, i)} className="text-red-400">✕</button>
                </div>
              ))}
              <button type="button" onClick={() => addArrItem(setKeyConcepts, {heading:'', explanation:''})} className="text-sm btn-primary px-3 py-1.5 rounded">+ Add Concept</button>
            </div>
          )}
        </div>

        {/* Chapters */}
        <div className="border border-white/10 rounded-lg overflow-hidden">
          <button type="button" onClick={() => toggleSection('chapters')} className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 font-medium">
            Chapters ({chapters.length}) {openSection.chapters ? '▼' : '▶'}
          </button>
          {openSection.chapters && (
            <div className="p-4 bg-black/20 space-y-4">
              {chapters.map((ch, i) => (
                <div key={i} className="glass p-3 rounded-lg space-y-3">
                  <div className="flex gap-3">
                    <div className="flex-1 space-y-2">
                      <input placeholder="Chapter Title" value={ch.title} onChange={(e) => updateArr(chapters, setChapters, i, 'title', e.target.value)} className="input-field" />
                      <textarea placeholder="Chapter Summary" value={ch.summary} onChange={(e) => updateArr(chapters, setChapters, i, 'summary', e.target.value)} className="input-field" rows={2} />
                    </div>
                    <button type="button" onClick={() => removeArrItem(chapters, setChapters, i)} className="text-red-400">✕</button>
                  </div>
                  <div className="pl-4 border-l-2 border-brand-500/30">
                    <p className="text-xs text-white/50 mb-2">Key Points:</p>
                    {ch.keyPoints.map((kp, j) => (
                      <div key={j} className="flex gap-2 mb-2">
                        <input value={kp} onChange={(e) => {
                          const newChs = [...chapters];
                          newChs[i].keyPoints[j] = e.target.value;
                          setChapters(newChs);
                        }} className="input-field py-1" />
                        <button type="button" onClick={() => {
                          const newChs = [...chapters];
                          newChs[i].keyPoints.splice(j, 1);
                          setChapters(newChs);
                        }} className="text-red-400">✕</button>
                      </div>
                    ))}
                    <button type="button" onClick={() => {
                      const newChs = [...chapters];
                      newChs[i].keyPoints.push('');
                      setChapters(newChs);
                    }} className="text-xs border border-white/20 px-2 py-1 rounded">+ Point</button>
                  </div>
                </div>
              ))}
              <button type="button" onClick={() => addArrItem(setChapters, {title:'', summary:'', keyPoints:[]})} className="text-sm btn-primary px-3 py-1.5 rounded">+ Add Chapter</button>
            </div>
          )}
        </div>

        {/* Important Questions */}
        <div className="border border-white/10 rounded-lg overflow-hidden">
          <button type="button" onClick={() => toggleSection('questions')} className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 font-medium">
            Important Questions ({importantQuestions.length}) {openSection.questions ? '▼' : '▶'}
          </button>
          {openSection.questions && (
            <div className="p-4 bg-black/20 space-y-2">
              {importantQuestions.map((q, i) => (
                <div key={i} className="flex gap-2">
                  <input value={q} onChange={(e) => updateArr(importantQuestions, setImportantQuestions, i, null, e.target.value)} className="input-field py-1.5" />
                  <button type="button" onClick={() => removeArrItem(importantQuestions, setImportantQuestions, i)} className="text-red-400 px-2">✕</button>
                </div>
              ))}
              <button type="button" onClick={() => addArrItem(setImportantQuestions, '')} className="text-sm border border-white/20 px-3 py-1.5 rounded">+ Add Question</button>
            </div>
          )}
        </div>

        {/* MCQs */}
        <div className="border border-white/10 rounded-lg overflow-hidden">
          <button type="button" onClick={() => toggleSection('mcqs')} className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 font-medium">
            MCQs ({mcqs.length}) {openSection.mcqs ? '▼' : '▶'}
          </button>
          {openSection.mcqs && (
            <div className="p-4 bg-black/20 space-y-4">
              {mcqs.map((mcq, i) => (
                <div key={i} className="glass p-3 rounded-lg relative">
                  <button type="button" onClick={() => removeArrItem(mcqs, setMcqs, i)} className="absolute top-2 right-2 text-red-400">✕</button>
                  <input placeholder="Question" value={mcq.question} onChange={(e) => updateArr(mcqs, setMcqs, i, 'question', e.target.value)} className="input-field mb-2" />
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    {[0,1,2,3].map(optIdx => (
                      <input key={optIdx} placeholder={`Option ${optIdx+1}`} value={mcq.options[optIdx] || ''} onChange={(e) => {
                        const newMcqs = [...mcqs];
                        newMcqs[i].options[optIdx] = e.target.value;
                        setMcqs(newMcqs);
                      }} className="input-field py-1 text-sm" />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <select value={mcq.correctIndex} onChange={(e) => updateArr(mcqs, setMcqs, i, 'correctIndex', Number(e.target.value))} className="input-field py-1.5 w-32 [&>option]:bg-ink-900">
                      {[0,1,2,3].map(idx => <option key={idx} value={idx}>Correct: Opt {idx+1}</option>)}
                    </select>
                    <input placeholder="Explanation (optional)" value={mcq.explanation || ''} onChange={(e) => updateArr(mcqs, setMcqs, i, 'explanation', e.target.value)} className="input-field py-1.5 flex-1" />
                  </div>
                </div>
              ))}
              <button type="button" onClick={() => addArrItem(setMcqs, {question:'', options:['','','',''], correctIndex:0, explanation:''})} className="text-sm btn-primary px-3 py-1.5 rounded">+ Add MCQ</button>
            </div>
          )}
        </div>

        {/* Exam Info */}
        <div className="border border-white/10 rounded-lg overflow-hidden">
          <button type="button" onClick={() => toggleSection('examInfo')} className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 font-medium">
            Exam Info {openSection.examInfo ? '▼' : '▶'}
          </button>
          {openSection.examInfo && (
            <div className="p-4 bg-black/20 space-y-4">
              <div>
                <label className="text-xs text-white/50 block mb-1">Previous Year Context</label>
                <textarea value={previousYearContext} onChange={(e) => setPreviousYearContext(e.target.value)} className="input-field" rows={2} />
              </div>
              <div>
                <label className="text-xs text-white/50 block mb-1">Exam Tips (dynamic list)</label>
                {examTips.map((tip, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input value={tip} onChange={(e) => updateArr(examTips, setExamTips, i, null, e.target.value)} className="input-field py-1" />
                    <button type="button" onClick={() => removeArrItem(examTips, setExamTips, i)} className="text-red-400">✕</button>
                  </div>
                ))}
                <button type="button" onClick={() => addArrItem(setExamTips, '')} className="text-xs border border-white/20 px-2 py-1 rounded">+ Tip</button>
              </div>
              <div>
                <label className="text-xs text-white/50 block mb-1">Syllabus Relevance</label>
                <textarea value={syllabusRelevance} onChange={(e) => setSyllabusRelevance(e.target.value)} className="input-field" rows={2} />
              </div>
              <div>
                <label className="text-xs text-white/50 block mb-1">PDF Contents description</label>
                <textarea value={pdfContents} onChange={(e) => setPdfContents(e.target.value)} className="input-field" rows={2} />
              </div>
            </div>
          )}
        </div>

        {/* FAQs */}
        <div className="border border-white/10 rounded-lg overflow-hidden">
          <button type="button" onClick={() => toggleSection('faqs')} className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 font-medium">
            FAQs ({faqs.length}) {openSection.faqs ? '▼' : '▶'}
          </button>
          {openSection.faqs && (
            <div className="p-4 bg-black/20 space-y-3">
              {faqs.map((f, i) => (
                <div key={i} className="glass p-2 rounded flex gap-2">
                  <div className="flex-1 space-y-2">
                    <input placeholder="Q" value={f.question} onChange={(e) => updateArr(faqs, setFaqs, i, 'question', e.target.value)} className="input-field py-1" />
                    <input placeholder="A" value={f.answer} onChange={(e) => updateArr(faqs, setFaqs, i, 'answer', e.target.value)} className="input-field py-1" />
                  </div>
                  <button type="button" onClick={() => removeArrItem(faqs, setFaqs, i)} className="text-red-400 px-2">✕</button>
                </div>
              ))}
              <button type="button" onClick={() => addArrItem(setFaqs, {question:'', answer:''})} className="text-xs btn-primary px-3 py-1.5 rounded">+ FAQ</button>
            </div>
          )}
        </div>

        {/* Related & Examples */}
        <div className="border border-white/10 rounded-lg overflow-hidden">
          <button type="button" onClick={() => toggleSection('related')} className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 font-medium">
            Related Topics &amp; Examples {openSection.related ? '▼' : '▶'}
          </button>
          {openSection.related && (
            <div className="p-4 bg-black/20 space-y-6">
              <div>
                <p className="text-sm font-semibold mb-2">Related Topics</p>
                {relatedTopics.map((rt, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input placeholder="Title" value={rt.title} onChange={(e) => updateArr(relatedTopics, setRelatedTopics, i, 'title', e.target.value)} className="input-field py-1" />
                    <input placeholder="Slug" value={rt.slug} onChange={(e) => updateArr(relatedTopics, setRelatedTopics, i, 'slug', e.target.value)} className="input-field py-1" />
                    <button type="button" onClick={() => removeArrItem(relatedTopics, setRelatedTopics, i)} className="text-red-400">✕</button>
                  </div>
                ))}
                <button type="button" onClick={() => addArrItem(setRelatedTopics, {title:'', slug:''})} className="text-xs border border-white/20 px-2 py-1 rounded">+ Topic</button>
              </div>

              <div>
                <p className="text-sm font-semibold mb-2">Examples</p>
                {examples.map((ex, i) => (
                  <div key={i} className="glass p-2 rounded flex gap-2 mb-2">
                    <div className="flex-1 space-y-2">
                      <input placeholder="Title" value={ex.title} onChange={(e) => updateArr(examples, setExamples, i, 'title', e.target.value)} className="input-field py-1" />
                      <textarea placeholder="Content" value={ex.content} onChange={(e) => updateArr(examples, setExamples, i, 'content', e.target.value)} className="input-field py-1" rows={2} />
                    </div>
                    <button type="button" onClick={() => removeArrItem(examples, setExamples, i)} className="text-red-400 px-2">✕</button>
                  </div>
                ))}
                <button type="button" onClick={() => addArrItem(setExamples, {title:'', content:''})} className="text-xs border border-white/20 px-2 py-1 rounded">+ Example</button>
              </div>
            </div>
          )}
        </div>

        {/* Submit Actions */}
        <div className="flex gap-3 pt-4">
          <button type="submit" disabled={submitting} className="btn-primary rounded-lg px-6 py-2.5 font-medium hover:opacity-90 transition disabled:opacity-50">
            {submitting ? 'Saving…' : editingId ? 'Save Changes' : 'Create Guide'}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="rounded-lg px-5 py-2.5 border border-white/10 hover:bg-white/5 transition">
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <h2 className="font-semibold mt-10 mb-4">Existing Guides ({guides.length})</h2>
      {loading ? <Loader /> : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {guides.map((g) => (
            <div key={g._id} className="glass rounded-xl p-4 flex flex-col justify-between gap-3">
              <div>
                <h3 className="font-semibold">{g.title}</h3>
                <div className="flex flex-wrap gap-2 text-xs mt-2 text-white/60">
                  <span className="bg-white/5 px-2 py-0.5 rounded border border-white/5">{g.branch}</span>
                  <span className="bg-white/5 px-2 py-0.5 rounded border border-white/5">Sem {g.semester}</span>
                  <span className="truncate max-w-[150px]">{g.slug}</span>
                </div>
              </div>
              <div className="flex gap-2 shrink-0 justify-end pt-2 border-t border-white/5">
                <button onClick={() => startEdit(g)} className="text-xs px-4 py-1.5 rounded-lg border border-white/10 hover:bg-white/5">Edit</button>
                <button onClick={() => handleDelete(g._id)} className="text-xs px-4 py-1.5 rounded-lg border border-red-400/30 text-red-300 hover:bg-red-400/10">Delete</button>
              </div>
            </div>
          ))}
          {guides.length === 0 && <p className="text-white/40 text-sm col-span-2">No subject guides found.</p>}
        </div>
      )}

      {/* Global Style for this component inputs */}
      <style jsx="true">{`
        .input-field {
          width: 100%;
          background-color: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.5rem;
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          outline: none;
        }
        .input-field:focus {
          border-color: #06b6d4; /* brand color */
        }
      `}</style>
    </div>
  );
}
