from sqlalchemy import Column, Integer,Text, ForeignKey
from sqlalchemy.orm import relationship

from database import Base


# =========================
# TABLA: respuestas
# =========================
class Respuesta(Base):
    __tablename__ = "respuestas"

    id = Column(Integer, primary_key=True)
    texto = Column(Text)

    # FK → pregunta a la que pertenece
    pregunta_id = Column(Integer, ForeignKey("preguntas.id"))

    # relación inversa: esta respuesta pertenece a una pregunta
    pregunta = relationship("Pregunta", back_populates="respuestas")

    # relación con tabla intermedia
    aliens = relationship("RespuestaAlien", back_populates="respuesta")

