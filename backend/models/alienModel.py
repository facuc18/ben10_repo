from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship

from database import Base



# =========================
# TABLA: aliens
# =========================
class Alien(Base):
    __tablename__ = "aliens"  # nombre real en la BD

    # columnas
    id = Column(Integer, primary_key=True)  # PK (identificador único)
    nombre = Column(String(100))            # texto corto (nombre)
    imagen = Column(String(255))            # URL o ruta de imagen
    especie = Column(String(50))
    planeta = Column(String(100))            # planeta o lugar
    descripcion = Column(Text)              # texto largo
    habilidades = Column(Text)              # lista en texto (por ahora)
    curiosidades = Column(Text)

    # relación: un alien tiene muchas apariciones
    apariciones = relationship("Aparicion", back_populates="alien")

    # relación: un alien puede tener muchos resultados de respuestas
    respuestas = relationship("RespuestaAlien", back_populates="alien")

    favoritos = relationship("Favorito", back_populates="alien")