import { createContext, useContext, useMemo, useState } from "react";
import { api } from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("portfolio_token"));
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("portfolio_user");
    return saved ? JSON.parse(saved) : null;
  });

  async function login(email, password) {
    const data = await api.post("/api/auth/login", { email, password });
    localStorage.setItem("portfolio_token", data.token);
    localStorage.setItem("portfolio_user", JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
  }

  function logout() {
    localStorage.removeItem("portfolio_token");
    localStorage.removeItem("portfolio_user");
    setToken(null);
    setUser(null);
  }

  const value = useMemo(() => ({ token, user, isAuthenticated: Boolean(token), login, logout }), [token, user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
