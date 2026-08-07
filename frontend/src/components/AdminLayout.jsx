import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

const links = [
  { to: '/admin', label: 'Overview', end: true },
  { to: '/admin/content', label: 'Content' },
  { to: '/admin/students', label: 'Students' },
  { to: '/admin/notices', label: 'Notices' },
  { to: '/admin/reports', label: 'Reports' },
  { to: '/admin/logs', label: 'Activity Log' },
];

export default function AdminLayout() {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen md:flex">
      <aside className="glass md:w-60 md:min-h-screen p-4 flex md:flex-col justify-between">
        <div>
          <div className="font-display font-bold text-lg mb-6 px-2">
            SBTE<span className="text-gradient">Admin</span>
          </div>
          <nav className="flex md:flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm transition ${isActive ? 'bg-brand-600/30 text-white' : 'text-white/60 hover:bg-white/5'}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <button
          onClick={() => { logout(); navigate('/admin/login'); }}
          className="hidden md:block text-sm px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition"
        >
          Logout
        </button>
      </aside>
      <main className="flex-1 p-4 sm:p-8">
        <Outlet />
      </main>
    </div>
  );
}
