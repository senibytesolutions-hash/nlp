import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { adminLogin, adminLogout, getAdminSession } from "../lib/api.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);

  // On mount, ask the API if the httpOnly cookie still represents a valid session.
  // This is what makes a page refresh on /admin/dashboard keep the admin logged in.
  useEffect(() => {
    let isMounted = true;

    getAdminSession()
      .then(({ data }) => {
        if (isMounted) setAdmin(data.data);
      })
      .catch(() => {
        if (isMounted) setAdmin(null);
      })
      .finally(() => {
        if (isMounted) setCheckingSession(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const login = useCallback(async (email, password) => {
    const { data } = await adminLogin({ email, password });
    setAdmin(data.data);
    return data;
  }, []);

  const logout = useCallback(async () => {
    try {
      await adminLogout();
    } finally {
      setAdmin(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ admin, isAuthenticated: !!admin, checkingSession, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
