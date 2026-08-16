import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

const links = [
  { to: '/admin', label: 'Overview', end: true },
  { to: '/admin/content', label: 'Content' },
  { to: '/admin/documents', label: 'Documents' },
  { to: '/admin/team', label: 'Team' },
  { to: '/admin/students', label: 'Students' },
  { to: '/admin/notices', label: 'Notices' },
  { to: '/admin/reports', label: 'Reports' },
  { to: '/admin/faq', label: 'Help & FAQ' },
  { to: '/admin/logs', label: 'Activity Log' },
];

export default function AdminLayout() {
  const { logout, username, role, isSuperAdmin } = useAdminAuth();
  const navigate = useNavigate();

  return (
    <div className="flex-1 md:flex">
      <aside className="glass md:w-60 p-4 flex md:flex-col justify-between">
        <div>
          <div className="font-display font-bold text-lg mb-1 px-2">
            HUB<span className="text-gradient">STUDY</span>
            <span className="block text-[10px] tracking-widest text-white/40 font-normal">ADMIN</span>
          </div>
          {username && (
            <p className="px-2 mb-5 text-xs text-white/40 truncate">
              {username} · <span className={isSuperAdmin ? 'text-amber-400' : ''}>{role === 'superadmin' ? 'Super Admin' : 'Admin'}</span>
            </p>
          )}
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
            {isSuperAdmin && (
              <NavLink
                to="/admin/manage-admins"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm transition ${isActive ? 'bg-amber-500/20 text-amber-200' : 'text-amber-400/80 hover:bg-amber-500/10'}`
                }
              >
                👑 Manage Admins
              </NavLink>
            )}
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
