from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm

from sqlalchemy.orm import Session
from database import get_db

from auth.Dependencies import get_current_user
from schemas.user import UsuarioCreate,UsuarioLogin,TokenResponse,Usuarioinfo
from auth.service import register,Login


import os
import uuid
from fastapi import UploadFile, File

UPLOAD_DIR = "static/images/perfiles"

router = APIRouter()

@router.post("/register")
def register_user(user_data:UsuarioCreate,db:Session=Depends(get_db)):


    register(user_data,db)

    return {"message":"Usuario creado correctamente"}


@router.post("/login", response_model=TokenResponse)
def login_user(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user_data = UsuarioLogin(
        username=form_data.username,
        password=form_data.password
    )

    return Login(user_data, db)

@router.get("/perfil",response_model = Usuarioinfo)
def perfil(usuario = Depends(get_current_user)):
    return usuario


@router.post("/perfil/foto", response_model=Usuarioinfo)
def subir_foto_perfil(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    usuario = Depends(get_current_user)
):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="El archivo debe ser una imagen")

    os.makedirs(UPLOAD_DIR, exist_ok=True)

    extension = file.filename.split(".")[-1]
    nombre_archivo = f"{uuid.uuid4()}.{extension}"
    ruta_completa = os.path.join(UPLOAD_DIR, nombre_archivo)

    with open(ruta_completa, "wb") as buffer:
        buffer.write(file.file.read())

    usuario.foto_perfil = nombre_archivo
    db.commit()
    db.refresh(usuario)

    return usuario