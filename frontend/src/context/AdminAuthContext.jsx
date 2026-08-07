import { createContext, useContext, useState } from 'react';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(!!localStorage.getItem('adminToken'));

  function loginSuccess(token) {
    localStorage.setItem('adminToken', token);
    setIsAdmin(true);
  }

  function logout() {
    localStorage.removeItem('adminToken');
    setIsAdmin(false);
  }

  return (
    <AdminAuthContext.Provider value={{ isAdmin, loginSuccess, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}
