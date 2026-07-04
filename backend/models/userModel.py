from sqlalchemy import Column, String, Integer
from database import Base

class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)
    foto_perfil = Column(String, nullable=True)   # ← nueva