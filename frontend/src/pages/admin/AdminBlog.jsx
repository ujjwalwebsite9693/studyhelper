import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { adminApi } from '../../api/axios';
import Loader from '../../components/Loader';

export default function AdminBlog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Form fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('study-tips');
  const [tags, setTags] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [author, setAuthor] = useState('HUB STUDY Team');
  const [published, setPublished] = useState(false);

  function load() {
    setLoading(true);
    adminApi.get('/blog/admin/all')
      .then((res) => {
        const list = res.data?.posts || (Array.isArray(res.data) ? res.data : []);
        setPosts(list);
      })
      .catch((err) => {
        console.error('Failed to load posts:', err);
        setPosts([]);
      })
      .finally(() => setLoading(false));
  }
  useEffect(load, []);

  function handleTitleChange(e) {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!editingId) {
      setSlug(newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    }
  }

  function startEdit(p) {
    setEditingId(p._id);
    setTitle(p.title || '');
    setSlug(p.slug || '');
    setExcerpt(p.excerpt || '');
    setContent(p.content || '');
    setCategory(p.category || 'study-tips');
    setTags(p.tags ? p.tags.join(', ') : '');
    setCoverImageUrl(p.coverImageUrl || '');
    setAuthor(p.author || 'HUB STUDY Team');
    setPublished(p.published || false);
  }

  function resetForm() {
    setEditingId(null);
    setTitle('');
    setSlug('');
    setExcerpt('');
    setContent('');
    setCategory('study-tips');
    setTags('');
    setCoverImageUrl('');
    setAuthor('HUB STUDY Team');
    setPublished(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        title,
        slug,
        excerpt,
        content,
        category,
        tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
        coverImageUrl,
        author,
        published
      };

      if (editingId) {
        await adminApi.put(`/blog/${editingId}`, payload);
        toast.success('Updated post');
      } else {
        await adminApi.post('/blog', payload);
        toast.success('Created post');
      }
      resetForm();
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not save post');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this blog post?')) return;
    try {
      await adminApi.delete(`/blog/${id}`);
      toast.success('Deleted post');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not delete post');
    }
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Blog Posts</h1>
      <p className="text-white/50 text-sm mt-1">Manage articles, study tips, and news.</p>

      <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 mt-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            required placeholder="Title" value={title} onChange={handleTitleChange}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-400"
          />
          <input
            required placeholder="Slug" value={slug} onChange={(e) => setSlug(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-400"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            value={category} onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-400 text-white [&>option]:bg-ink-900"
          >
            <option value="study-tips">Study Tips</option>
            <option value="exam-guide">Exam Guide</option>
            <option value="career">Career</option>
            <option value="technology">Technology</option>
            <option value="college-life">College Life</option>
          </select>
          <input
            placeholder="Tags (comma-separated)" value={tags} onChange={(e) => setTags(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-400"
          />
        </div>

        <textarea
          required placeholder="Excerpt (short summary)" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-400"
        />

        <textarea
          required placeholder="Content (Markdown supported)" value={content} onChange={(e) => setContent(e.target.value)} rows={12}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-400 font-mono"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            placeholder="Cover Image URL" value={coverImageUrl} onChange={(e) => setCoverImageUrl(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-400"
          />
          <input
            placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-400"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox" id="published" checked={published} onChange={(e) => setPublished(e.target.checked)}
            className="w-4 h-4 rounded bg-white/5 border border-white/10 focus:ring-brand-500 text-brand-500"
          />
          <label htmlFor="published" className="text-sm cursor-pointer">Published (visible to students)</label>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={submitting} className="btn-primary rounded-lg px-5 py-2.5 font-medium hover:opacity-90 transition disabled:opacity-50">
            {submitting ? 'Saving…' : editingId ? 'Save Changes' : 'Create Post'}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="rounded-lg px-5 py-2.5 border border-white/10 hover:bg-white/5 transition">
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2 className="font-semibold mt-8 mb-3">All Posts ({Array.isArray(posts) ? posts.length : 0})</h2>
      {loading ? <Loader /> : (
        <div className="space-y-2">
          {Array.isArray(posts) && posts.map((p) => (
            <div key={p._id} className="glass rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-2 h-2 rounded-full ${p.published ? 'bg-green-400' : 'bg-red-400'}`}></span>
                  <h3 className="text-sm font-semibold truncate">{p.title}</h3>
                </div>
                <div className="flex items-center gap-3 text-xs text-white/50">
                  <span className="bg-white/5 px-2 py-0.5 rounded border border-white/5">{p.category}</span>
                  <span>{new Date(p.createdAt).toLocaleDateString()}</span>
                  <span>{p.views || 0} views</span>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => startEdit(p)} className="text-xs px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5">Edit</button>
                <button onClick={() => handleDelete(p._id)} className="text-xs px-3 py-1.5 rounded-lg border border-red-400/30 text-red-300 hover:bg-red-400/10">Delete</button>
              </div>
            </div>
          ))}
          {(!Array.isArray(posts) || posts.length === 0) && <p className="text-white/40 text-sm">No blog posts yet.</p>}
        </div>
      )}
    </div>
  );
}
