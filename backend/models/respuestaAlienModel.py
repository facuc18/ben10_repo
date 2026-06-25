from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship

from database import Base


# =========================
# TABLA INTERMEDIA: respuesta_alien
# =========================
class RespuestaAlien(Base):
    __tablename__ = "respuesta_alien"

    id = Column(Integer, primary_key=True)

    # FK → respuesta
    respuesta_id = Column(Integer, ForeignKey("respuestas.id"))

    # FK → alien
    alien_id = Column(Integer, ForeignKey("aliens.id"))

    # puntos que gana ese alien por esa respuesta
    puntos = Column(Integer)

    # relaciones
    respuesta = relationship("Respuesta", back_populates="aliens")
    alien = relationship("Alien", back_populates="respuestas")
