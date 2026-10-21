import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { api, setOnUnauthorized, setToken, Usuario } from './api';
import { getItem, removeItem, setItem } from './storage';

const TOKEN_KEY = 'ben10_token';

type AuthState = {
  user: Usuario | null;
  booting: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (u: Usuario) => void;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [booting, setBooting] = useState(true);

  const logout = useCallback(async () => {
    setToken(null);
    await removeItem(TOKEN_KEY);
    setUser(null);
  }, []);

  // Al abrir la app: si hay un token guardado, intentar retomar la sesión
  useEffect(() => {
    setOnUnauthorized(() => {
      void logout();
    });
    (async () => {
      try {
        const saved = await getItem(TOKEN_KEY);
        if (saved) {
          setToken(saved);
          setUser(await api.perfil());
        }
      } catch {
        setToken(null);
        await removeItem(TOKEN_KEY);
      } finally {
        setBooting(false);
      }
    })();
    return () => setOnUnauthorized(null);
  }, [logout]);

  const login = useCallback(async (username: string, password: string) => {
    const { access_token } = await api.login(username.trim(), password);
    setToken(access_token);
    await setItem(TOKEN_KEY, access_token);
    setUser(await api.perfil());
  }, []);

  const register = useCallback(
    async (username: string, password: string) => {
      await api.register(username.trim(), password);
      await login(username, password);
    },
    [login],
  );

  const value = useMemo(
    () => ({ user, booting, login, register, logout, setUser }),
    [user, booting, login, register, logout],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}
