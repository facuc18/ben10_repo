from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship

from database import Base





# =========================
# TABLA: apariciones
# =========================
class Aparicion(Base):
    __tablename__ = "apariciones"

    id = Column(Integer, primary_key=True)

    alien_id = Column(Integer, ForeignKey("aliens.id"))
    episodio_id = Column(Integer, ForeignKey("episodios.id"))
    serie_id = Column(Integer,ForeignKey("series.id"))

    # relaciones
    alien = relationship("Alien", back_populates="apariciones")
    episodio = relationship("Episodio", back_populates="apariciones")
    serie = relationship(
    "Series",
    back_populates="apariciones"
)