from database import Base, engine


from models.serieModel import Series
from models.alienModel import Alien
from models.episodioModel import Episodio
from models.aparicionModel import Aparicion
from models.preguntaModel import Pregunta
from models.respuestaAlienModel import RespuestaAlien
from models.respuestaModel import Respuesta

Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

print("Base reiniciada.")