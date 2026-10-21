from database import Base, engine

# Hay que importar todos los modelos para que Base los conozca
from models.serieModel import Series
from models.alienModel import Alien
from models.episodioModel import Episodio
from models.aparicionModel import Aparicion
from models.preguntaModel import Pregunta
from models.respuestaAlienModel import RespuestaAlien
from models.respuestaModel import Respuesta
from models.userModel import Usuario
from models.favoritoModel import Favorito

Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

print("Base reiniciada.")
