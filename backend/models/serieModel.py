from sqlalchemy import Column,String,Integer
from sqlalchemy.orm import relationship

from database import Base

class Series (Base):

    __tablename__ = "series"

    id=Column(Integer,primary_key=True)
    nombre = Column(String(50))

    apariciones = relationship(
    "Aparicion",
    back_populates="serie"
)