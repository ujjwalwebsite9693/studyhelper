import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { studentApi } from '../api/axios';
import Navbar from '../components/Navbar';
import ContentCard from '../components/ContentCard';
import Loader from '../components/Loader';

export default function Bookmarks() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    studentApi.get('/content/bookmarks/mine').then((res) => setItems(res.data)).finally(() => setLoading(false));
  }
  useEffect(load, []);

  function handleBookmarkChange(id, bookmarked) {
    if (!bookmarked) setItems((prev) => prev.filter((i) => i._id !== id));
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <Link to="/dashboard" className="text-sm text-white/50 hover:text-white/80">← Back to dashboard</Link>
        <h1 className="font-display text-2xl font-bold mt-2">My Bookmarks</h1>

        <div className="mt-6 space-y-3">
          {loading && <Loader />}
          {!loading && items.length === 0 && (
            <div className="glass rounded-xl p-8 text-center text-white/50">
              You haven't bookmarked anything yet — tap the ☆ on any resource to save it here.
            </div>
          )}
          {!loading && items.map((item) => (
            <ContentCard key={item._id} item={item} bookmarked onBookmarkChange={handleBookmarkChange} />
          ))}
        </div>
      </main>
    </div>
  );
}
