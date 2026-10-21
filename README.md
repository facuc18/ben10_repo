# Ben 10 Wiki

App tipo wiki de Ben 10: lista de aliens, detalle de cada uno, cuestionario "¿qué alien sos?" y favoritos por usuario.

- `backend/` → API REST (FastAPI + SQLAlchemy + PostgreSQL, auth con JWT)
- `ben10-mobile/` → app móvil (Expo / React Native + TypeScript, Expo Router)

## Funcionalidades
- Registro y login (bcrypt + JWT de 30 min)
- Perfil con foto
- Lista de aliens y detalle (especie, planeta, habilidades, curiosidades, apariciones por serie/episodio)
- Cuestionario de 10 preguntas: cada respuesta suma puntos a ciertos aliens y gana el de mayor puntaje
- Favoritos por usuario (agregar, listar, quitar)

## Endpoints
| Método | Ruta | Descripción |
|---|---|---|
| POST | `/register` | Crear usuario |
| POST | `/login` | Devuelve el token |
| GET | `/perfil` | Datos del usuario |
| POST | `/perfil/foto` | Subir foto de perfil |
| GET | `/aliens` | Lista de aliens |
| GET | `/aliens/{id}` | Detalle de un alien |
| GET | `/preguntas` | Preguntas con sus respuestas |
| POST | `/resultado` | Body `{"respuestas":[ids]}` → alien ganador |
| GET/POST | `/favoritos` | Listar / agregar (`{"alien_id": 1}`) |
| DELETE | `/favoritos/{alien_id}` | Quitar favorito |

Todos menos `/register` y `/login` requieren `Authorization: Bearer <token>`.
Documentación interactiva en `http://localhost:8000/docs`.

## Cómo correrlo
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env        # completar valores (o usar DATABASE_URL=sqlite:///./ben10.db)
python reset_db.py          # crea las tablas
python seed.py              # carga aliens, series, preguntas
uvicorn main:app --reload
```

## App móvil
```bash
cd ben10-mobile
npm install
npx expo start      # escanear el QR con Expo Go, o presionar w para la versión web
```
La app detecta sola la IP de tu compu y se conecta al backend en el puerto 8000
(celular y compu en la misma red wifi). Para usar otra URL: `EXPO_PUBLIC_API_URL=http://IP:8000`.
Arrancar el backend con `uvicorn main:app --host 0.0.0.0 --reload` para que el celular pueda llegar a él.

Pantallas: ingresar / crear cuenta, lista de aliens con buscador, ficha del alien, quiz "¿qué alien sos?",
favoritos y perfil (foto y cerrar sesión).

## Notas
- Las imágenes de aliens están en `backend/static/images/`. Algunas son placeholders: reemplazarlas por las reales con el mismo nombre de archivo.
- No commitear `.env`.
