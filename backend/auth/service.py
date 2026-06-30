from schemas.user import UsuarioCreate,UsuarioLogin,TokenResponse
from models.userModel import Usuario
from fastapi import  Depends,HTTPException
from sqlalchemy.orm import Session
from auth.password import hash_password,verify_password
from auth.jwt_handler import create_access_token,verification_token_access



def obtener_usuario_por_username(username,db:Session):
    usuario = db.query(Usuario).filter(Usuario.username == username).first()

    return usuario

def obtener_usuario_por_id(id,db:Session):
   usuario = db.query(Usuario).filter(Usuario.id == id ).first()

   return usuario
   
    
def register (data_user : UsuarioCreate,db:Session):
    usuario_existente = obtener_usuario_por_username(data_user.username,db)

    if usuario_existente :
        raise HTTPException(
            status_code=409,
            detail="El nombre de usuario ya está en uso"
                            )
    else:
        password_hash = hash_password(data_user.password)

        nuevo_Usuario = Usuario(
            username = data_user.username,
            password_hash = password_hash
        )

        db.add(nuevo_Usuario)
        db.commit()
        db.refresh(nuevo_Usuario)
        return nuevo_Usuario


def Login(user_data:UsuarioLogin,db:Session):
   usuario_existente = obtener_usuario_por_username(user_data.username,db)

   if usuario_existente is None :
    raise HTTPException(status_code=409,detail="usuario o contraseña incorrectos")
   else:
      password = verify_password(user_data.password,usuario_existente.password_hash)

      if password == False :
         raise HTTPException(status_code=409,detail="Usuario o contraseña incorrectos")
      else:
        token = create_access_token(usuario_existente.id)
         
         
        return TokenResponse(
            access_token=token,
            token_type="bearer"
        )