import { createContext, useContext, useState, useEffect } from 'react';
import { studentApi } from '../api/axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('studentToken');
    if (!token) {
      setLoading(false);
      return;
    }
    studentApi
      .get('/profile/me')
      .then((res) => setStudent(res.data))
      .catch(() => localStorage.removeItem('studentToken'))
      .finally(() => setLoading(false));
  }, []);

  function loginSuccess(token, studentData) {
    localStorage.setItem('studentToken', token);
    setStudent(studentData);
  }

  function updateStudent(data) {
    setStudent(data);
  }

  function logout() {
    localStorage.removeItem('studentToken');
    setStudent(null);
  }

  return (
    <AuthContext.Provider value={{ student, loading, loginSuccess, updateStudent, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
