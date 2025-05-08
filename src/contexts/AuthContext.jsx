// File: src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import {
  login as apiLogin,
  signup as apiSignup,
  fetchMe,
  logout as apiLogout,
} from "../api/auth";

export const AuthContext = createContext(); // ← this

export function AuthProvider({ children }) {
  // ← and this
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      fetchMe()
        .then((u) => setUser(u))
        .catch(() => apiLogout())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = (creds) =>
    apiLogin(creds).then((u) => {
      setUser(u);
      return u;
    });
  const signup = (data) =>
    apiSignup(data).then((u) => {
      setUser(u);
      return u;
    });
  const logout = () => {
    apiLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
