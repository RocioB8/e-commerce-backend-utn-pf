import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User, AuthContextType } from '../interfaces/Iauth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const BASE_URL = import.meta.env.VITE_BASE_API;
const AUTH_API = `${BASE_URL}/auth`;

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const authContextLogin = async (credentials: object): Promise<boolean> => {
    try {
      const res = await fetch(`${AUTH_API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      if (!res.ok) {
        return false;
      }

      const json = await res.json();

      const receivedToken = json.token || json.data;

      if (receivedToken) {
        localStorage.setItem("token", receivedToken);
        setToken(receivedToken);
        if (json.user) {
          setUser(json.user);
        }
        return true;
      }

      return false;

    } catch (error) {
      console.error("Error en login:", error);
      return false;
    }
  };

  const authContextRegister = async (userData: object): Promise<Response> => {
    return await fetch(`${AUTH_API}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
  };

  const authContextLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{
      token,
      user,
      setUser,
      authContextLogin,
      authContextRegister,
      authContextLogout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
