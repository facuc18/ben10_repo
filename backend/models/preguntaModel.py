from sqlalchemy import Column, Integer,Text
from sqlalchemy.orm import relationship

from database import Base


# =========================
# TABLA: preguntas
# =========================
class Pregunta(Base):
    __tablename__ = "preguntas"

    id = Column(Integer, primary_key=True)
    texto = Column(Text)

    # una pregunta tiene muchas respuestas
    respuestas = relationship("Respuesta", back_populates="pregunta")

