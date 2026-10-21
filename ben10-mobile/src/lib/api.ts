import Constants from 'expo-constants';
import { Platform } from 'react-native';

function resolveBase(): string {
  const env = process.env.EXPO_PUBLIC_API_URL;
  if (env) return env.replace(/\/$/, '');
  // En desarrollo, Expo sabe la IP de tu compu: el backend corre ahí, puerto 8000
  const host = Constants.expoConfig?.hostUri?.split(':')[0];
  if (host) return `http://${host}:8000`;
  return Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost:8000';
}

export const API_URL = resolveBase();

export const alienImageUrl = (file: string) => `${API_URL}/static/images/${file}`;
export const avatarUrl = (file: string) => `${API_URL}/static/images/perfiles/${file}`;

// ---------- tipos (reflejan los schemas del backend) ----------
export type Alien = {
  id: number;
  nombre: string;
  imagen: string;
  planeta: string;
  especie: string;
};

export type Aparicion = { id: number; serie: string; codigo: string; episodio: string };

export type AlienDetalle = Alien & {
  descripcion: string;
  habilidades: string;
  curiosidades: string;
  apariciones: Aparicion[];
};

export type AlienResultado = Alien & { descripcion: string };

export type Respuesta = { id: number; texto: string };
export type Pregunta = { id: number; texto: string; respuestas: Respuesta[] };

export type Usuario = { id: number; username: string; foto_perfil: string | null };
export type Favorito = { id: number; alien: Alien };

// ---------- cliente ----------
export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

let token: string | null = null;
let onUnauthorized: (() => void) | null = null;

export const setToken = (t: string | null) => {
  token = t;
};
export const setOnUnauthorized = (fn: (() => void) | null) => {
  onUnauthorized = fn;
};

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = { ...(init.headers as Record<string, string>) };
  if (token) headers.Authorization = `Bearer ${token}`;

  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, { ...init, headers });
  } catch {
    throw new ApiError(0, `No se pudo conectar con el servidor (${API_URL}). ¿Está corriendo el backend?`);
  }

  if (!res.ok) {
    let message = 'Algo salió mal. Probá de nuevo.';
    try {
      const body = await res.json();
      if (typeof body.detail === 'string') message = body.detail;
    } catch {}
    // Token vencido: cerrar sesión (no aplica al login, que no tiene token)
    if (res.status === 401 && token && onUnauthorized) onUnauthorized();
    throw new ApiError(res.status, message);
  }
  return res.json() as Promise<T>;
}

const json = (body: unknown): RequestInit => ({
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

export const api = {
  register: (username: string, password: string) =>
    request<{ message: string }>('/register', json({ username, password })),

  login: (username: string, password: string) =>
    request<{ access_token: string; token_type: string }>('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ username, password }).toString(),
    }),

  perfil: () => request<Usuario>('/perfil'),

  subirFoto: async (uri: string, mimeType?: string) => {
    const form = new FormData();
    const type = mimeType ?? 'image/jpeg';
    const name = `foto.${type.split('/')[1] ?? 'jpg'}`;
    if (Platform.OS === 'web') {
      const blob = await (await fetch(uri)).blob();
      form.append('file', blob, name);
    } else {
      form.append('file', { uri, name, type } as unknown as Blob);
    }
    return request<Usuario>('/perfil/foto', { method: 'POST', body: form });
  },

  aliens: () => request<Alien[]>('/aliens'),
  alien: (id: number) => request<AlienDetalle>(`/aliens/${id}`),

  preguntas: () => request<Pregunta[]>('/preguntas'),
  resultado: (respuestas: number[]) => request<AlienResultado>('/resultado', json({ respuestas })),

  favoritos: () => request<Favorito[]>('/favoritos'),
  agregarFavorito: (alien_id: number) => request<Favorito>('/favoritos', json({ alien_id })),
  quitarFavorito: (alien_id: number) =>
    request<{ message: string }>(`/favoritos/${alien_id}`, { method: 'DELETE' }),
};
