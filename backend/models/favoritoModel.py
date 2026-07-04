from sqlalchemy import Column, Integer, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from database import Base

class Favorito(Base):
    __tablename__ = "favoritos"

    id = Column(Integer, primary_key=True)
    alien_id = Column(Integer, ForeignKey("aliens.id"))
    usuario_id = Column(Integer, ForeignKey("usuarios.id"))

    alien = relationship("Alien", back_populates="favoritos")
    usuario = relationship("Usuario", back_populates="favoritos")

    __table_args__ = (
        UniqueConstraint("usuario_id", "alien_id", name="usuario_alien_unico"),
    )