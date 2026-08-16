import { createContext, useContext, useState } from 'react';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(!!localStorage.getItem('adminToken'));
  const [role, setRole] = useState(localStorage.getItem('adminRole') || 'admin');
  const [username, setUsername] = useState(localStorage.getItem('adminUsername') || '');

  function loginSuccess(token, accountRole, accountUsername) {
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminRole', accountRole || 'admin');
    localStorage.setItem('adminUsername', accountUsername || '');
    setIsAdmin(true);
    setRole(accountRole || 'admin');
    setUsername(accountUsername || '');
  }

  function logout() {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminRole');
    localStorage.removeItem('adminUsername');
    setIsAdmin(false);
    setRole('admin');
    setUsername('');
  }

  return (
    <AdminAuthContext.Provider value={{ isAdmin, role, username, isSuperAdmin: role === 'superadmin', loginSuccess, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}
