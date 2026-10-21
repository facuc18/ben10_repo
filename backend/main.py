from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from database import Base, engine

# IMPORTAR MODELOS
from models.alienModel import Alien
from models.episodioModel import Episodio
from models.aparicionModel import Aparicion
from models.preguntaModel import Pregunta
from models.respuestaModel import Respuesta
from models.respuestaAlienModel import RespuestaAlien
from models.serieModel import Series
from models.favoritoModel import Favorito
from models.userModel import Usuario

from routes.alien import router as alienRouter
from routes.preguntas import router as preguntaRouter
from routes.usuario import router as userRouter
from routes.favoritos import router as favoritoRouter
# ...

print(Base.metadata.tables.keys())

Base.metadata.create_all(bind=engine)



app = FastAPI()

# Permite que la versión web de la app (Expo) llame a la API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="static"), name="static")

app.include_router(alienRouter)
app.include_router(preguntaRouter)
app.include_router(userRouter)
app.include_router(favoritoRouter)