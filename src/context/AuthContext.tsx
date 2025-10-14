"use client";

import { createContext, useContext, useState, useEffect, useCallback, useMemo} from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: any | null;
  accessToken: string | null;
  register: (username: string,email: string, password: string) => Promise<any>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  fetchWithAuth: (url: string, options?: RequestInit) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const [user, setUser] = useState<any | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(() => {
  if (typeof window === "undefined") return null;
    return localStorage.getItem("access");
  });

  // Restore token on reload
  useEffect(() => {
  if (accessToken) {
    fetchUser(accessToken); // fetch profile after render
  }
}, [accessToken]);

  const fetchUser = useCallback(async (token: string) => {
    const res = await fetch("http://localhost:8000/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setUser(data);
    } else {
      setUser(null);
    }
  }, []);

  const register = useCallback(async (username: string, email: string, password: string) => {
    const res = await fetch("http://localhost:8000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({username, email, password }),
    });
    const errorBody = await res.json();
    return errorBody;
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch("http://localhost:8000/api/auth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Invalid credentials");

    const data = await res.json();
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);
    setAccessToken(data.access);
    await fetchUser(data.access);
  }, [fetchUser]);

  const logout = useCallback(() => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setAccessToken(null);
    setUser(null);
  }, []);

  const fetchWithAuth = useCallback(
    async (url: string, options: RequestInit = {}) => {
      try {
        const token= localStorage.getItem("access");
        const res = await fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      }
      catch(error){
        alert(error)// might swap to console.log
        router.replace('/login')
      }
      
    },
    []
  );

  // Preventing re-renders of consumers unless one of these changes
  const value = useMemo(
    () => ({ user, accessToken, register, login, logout, fetchWithAuth }),
    [user, accessToken, register, login, logout, fetchWithAuth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};