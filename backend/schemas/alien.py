from pydantic import BaseModel,ConfigDict

class AlienLista(BaseModel):

    model_config = ConfigDict(from_attributes=True)

    id:int
    nombre:str
    imagen:str
    planeta:str
    especie:str

class AparicionDetalle(BaseModel):

    model_config = ConfigDict(from_attributes=True)
    id:int
    serie:str
    codigo:str
    episodio:str

class AlienDetalle(BaseModel):

    model_config = ConfigDict(from_attributes=True)

    id:int
    nombre:str
    imagen:str
    especie:str
    planeta:str
    descripcion:str
    habilidades:str
    curiosidades:str
    apariciones:list[AparicionDetalle]

class TuAlienResult(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id:int
    nombre:str
    imagen:str
    especie:str
    planeta:str
    descripcion:str