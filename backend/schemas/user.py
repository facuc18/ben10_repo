from pydantic import BaseModel

class UsuarioCreate(BaseModel):
    username: str
    password: str

class UsuarioLogin(BaseModel):
    username:str
    password:str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str