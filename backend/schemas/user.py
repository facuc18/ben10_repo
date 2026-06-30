from pydantic import BaseModel,ConfigDict

class UsuarioCreate(BaseModel):
    username: str
    password: str

class UsuarioLogin(BaseModel):
    username:str
    password:str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str

class Usuarioinfo(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id:int
    username:str