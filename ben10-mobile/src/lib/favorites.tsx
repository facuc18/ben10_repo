import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Alien, api } from './api';
import { useAuth } from './auth';

type FavState = {
  favoritos: Alien[];
  loading: boolean;
  isFavorite: (alienId: number) => boolean;
  toggle: (alien: Alien) => Promise<void>;
  refresh: () => Promise<void>;
};

const FavContext = createContext<FavState | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [favoritos, setFavoritos] = useState<Alien[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.favoritos();
      setFavoritos(data.map((f) => f.alien));
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar favoritos del usuario al iniciar sesión; vaciar al cerrarla
  useEffect(() => {
    if (user) {
      refresh().catch(() => {});
    } else {
      setFavoritos([]);
    }
  }, [user, refresh]);

  const isFavorite = useCallback((id: number) => favoritos.some((a) => a.id === id), [favoritos]);

  const toggle = useCallback(
    async (alien: Alien) => {
      if (favoritos.some((a) => a.id === alien.id)) {
        await api.quitarFavorito(alien.id);
        setFavoritos((prev) => prev.filter((a) => a.id !== alien.id));
      } else {
        await api.agregarFavorito(alien.id);
        setFavoritos((prev) => [...prev, alien]);
      }
    },
    [favoritos],
  );

  const value = useMemo(
    () => ({ favoritos, loading, isFavorite, toggle, refresh }),
    [favoritos, loading, isFavorite, toggle, refresh],
  );
  return <FavContext.Provider value={value}>{children}</FavContext.Provider>;
}

export function useFavorites(): FavState {
  const ctx = useContext(FavContext);
  if (!ctx) throw new Error('useFavorites debe usarse dentro de FavoritesProvider');
  return ctx;
}
