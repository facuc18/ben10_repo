from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship

from database import Base



# =========================
# TABLA: episodios
# =========================
class Episodio(Base):
    __tablename__ = "episodios"

    id = Column(Integer, primary_key=True)
    codigo = Column(String(20))
    nombre = Column(String(100))

    # un episodio tiene muchas apariciones
    apariciones = relationship("Aparicion", back_populates="episodio")

