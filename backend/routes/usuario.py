from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm

from sqlalchemy.orm import Session
from database import get_db

from auth.Dependencies import get_current_user
from schemas.user import UsuarioCreate,UsuarioLogin,TokenResponse,Usuarioinfo
from auth.service import register,Login

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