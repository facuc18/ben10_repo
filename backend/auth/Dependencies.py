from fastapi import HTTPException,Depends
from fastapi.security import OAuth2PasswordBearer

from sqlalchemy.orm import Session
from database import get_db
from  .service import obtener_usuario_por_id
from .jwt_handler import verification_token_access

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")

def get_current_user(token:str = Depends(oauth2_scheme),db:Session = Depends(get_db)):
    user_id = verification_token_access(token)

    usuario = obtener_usuario_por_id(user_id,db)

    if usuario is None:
        raise HTTPException(status_code=401,detail="usuario no encontrado")

    return usuario
