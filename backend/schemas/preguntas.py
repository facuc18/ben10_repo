from pydantic import BaseModel,ConfigDict

class Respuesta(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id:int
    texto:str


class PreguntaSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id:int
    texto:str
    respuestas:list[Respuesta]

class UsuarioResultado(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    respuestas:list[int]

