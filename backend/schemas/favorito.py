from pydantic import BaseModel, ConfigDict
from schemas.alien import AlienLista

class FavoritoDetalle(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    alien: AlienLista

class Add_favorito(BaseModel):
    alien_id: int