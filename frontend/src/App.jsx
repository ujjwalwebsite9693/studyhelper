import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import AdminLayout from './components/AdminLayout';

import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ContentSection from './pages/ContentSection';
import Result from './pages/Result';
import Notices from './pages/Notices';
import Bookmarks from './pages/Bookmarks';
import NotFound from './pages/NotFound';

import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminContent from './pages/admin/AdminContent';
import AdminStudents from './pages/admin/AdminStudents';
import AdminNotices from './pages/admin/AdminNotices';
import AdminReports from './pages/admin/AdminReports';
import AdminLogs from './pages/admin/AdminLogs';

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" toastOptions={{ style: { background: '#171c3a', color: '#fff', border: '1px solid rgba(255,255,255,0.08)' } }} />
      <AdminAuthProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/section/:type" element={<ProtectedRoute><ContentSection /></ProtectedRoute>} />
            <Route path="/result" element={<ProtectedRoute><Result /></ProtectedRoute>} />
            <Route path="/notices" element={<ProtectedRoute><Notices /></ProtectedRoute>} />
            <Route path="/bookmarks" element={<ProtectedRoute><Bookmarks /></ProtectedRoute>} />

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={<AdminProtectedRoute><AdminLayout /></AdminProtectedRoute>}
            >
              <Route index element={<AdminDashboard />} />
              <Route path="content" element={<AdminContent />} />
              <Route path="students" element={<AdminStudents />} />
              <Route path="notices" element={<AdminNotices />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="logs" element={<AdminLogs />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </AdminAuthProvider>
    </BrowserRouter>
  );
}
