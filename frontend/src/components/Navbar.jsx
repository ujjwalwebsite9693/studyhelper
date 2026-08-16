import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { studentApi } from '../api/axios';

export default function Navbar() {
  const { student, logout } = useAuth();
  const navigate = useNavigate();
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    if (!student) return;
    studentApi.get('/notice/unread-count').then((res) => setUnread(res.data.count)).catch(() => {});
  }, [student]);

  return (
    <header className="sticky top-0 z-40 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/dashboard" className="font-display font-bold text-lg tracking-tight">
          HUB<span className="text-gradient">STUDY</span>
        </Link>
        <div className="flex items-center gap-4">
          {student && (
            <>
              <span className="hidden sm:block text-sm text-white/60">
                {student.branch} · Sem {student.semester}
              </span>
              <Link to="/notices" className="relative" title="Notices">
                <span className="text-lg">🔔</span>
                {unread > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {unread > 9 ? '9+' : unread}
                  </span>
                )}
              </Link>
              <Link to="/bookmarks" title="My bookmarks" className="text-lg">⭐</Link>
              <Link to="/help" title="Help & Support" className="text-lg">❓</Link>
              <Link to="/profile" className="flex items-center gap-2">
                <img
                  src={student.dpUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=4f46e5&color=fff`}
                  alt="profile"
                  className="h-9 w-9 rounded-full object-cover border border-white/10"
                />
              </Link>
              <button
                onClick={() => { logout(); navigate('/login'); }}
                className="text-sm px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
