import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import AdminLayout from './components/AdminLayout';
import Footer from './components/Footer';
import HelpButton from './components/HelpButton';
import Chatbot from './components/Chatbot';

import Landing from './pages/Landing';
import Documents from './pages/Documents';
import Team from './pages/Team';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ContentSection from './pages/ContentSection';
import Result from './pages/Result';
import Notices from './pages/Notices';
import Bookmarks from './pages/Bookmarks';
import Help from './pages/Help';
import NotFound from './pages/NotFound';

import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminContent from './pages/admin/AdminContent';
import AdminStudents from './pages/admin/AdminStudents';
import AdminNotices from './pages/admin/AdminNotices';
import AdminReports from './pages/admin/AdminReports';
import AdminLogs from './pages/admin/AdminLogs';
import AdminFaq from './pages/admin/AdminFaq';
import AdminManageAdmins from './pages/admin/AdminManageAdmins';
import AdminDocuments from './pages/admin/AdminDocuments';
import AdminTeam from './pages/admin/AdminTeam';

// Chatbot floats on every page except the admin panel, where it would
// just be clutter for someone managing content.
function ChatbotGate() {
  const location = useLocation();
  if (location.pathname.startsWith('/admin')) return null;
  return <Chatbot />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" toastOptions={{ style: { background: '#171c3a', color: '#fff', border: '1px solid rgba(255,255,255,0.08)' } }} />
      <AdminAuthProvider>
        <AuthProvider>
          {/* flex column shell so the footer always sits at the end of the
              page's content, on every route, without editing every page */}
          <div className="min-h-screen flex flex-col">
            <div className="flex-1 flex flex-col">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/documents" element={<Documents />} />
                <Route path="/team" element={<Team />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/section/:type" element={<ProtectedRoute><ContentSection /></ProtectedRoute>} />
                <Route path="/result" element={<ProtectedRoute><Result /></ProtectedRoute>} />
                <Route path="/notices" element={<ProtectedRoute><Notices /></ProtectedRoute>} />
                <Route path="/bookmarks" element={<ProtectedRoute><Bookmarks /></ProtectedRoute>} />
                <Route path="/help" element={<ProtectedRoute><Help /></ProtectedRoute>} />

                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin"
                  element={<AdminProtectedRoute><AdminLayout /></AdminProtectedRoute>}
                >
                  <Route index element={<AdminDashboard />} />
                  <Route path="content" element={<AdminContent />} />
                  <Route path="documents" element={<AdminDocuments />} />
                  <Route path="team" element={<AdminTeam />} />
                  <Route path="students" element={<AdminStudents />} />
                  <Route path="notices" element={<AdminNotices />} />
                  <Route path="reports" element={<AdminReports />} />
                  <Route path="logs" element={<AdminLogs />} />
                  <Route path="faq" element={<AdminFaq />} />
                  <Route path="manage-admins" element={<AdminManageAdmins />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Footer />
          </div>
          <HelpButton />
          <ChatbotGate />
        </AuthProvider>
      </AdminAuthProvider>
    </BrowserRouter>
  );
}
