from fastapi import APIRouter, Depends,HTTPException
from sqlalchemy.orm import Session

from database import get_db

from models.userModel import Usuario
from schemas.user import UsuarioCreate,UsuarioLogin,TokenResponse

from auth.service import register,Login

router = APIRouter()

@router.post("/register")
def register_user(user_data:UsuarioCreate,db:Session=Depends(get_db)):


    register(user_data,db)

    return {"message":"Usuario creado correctamente"}


@router.post("/login", response_model=TokenResponse)
def login_user(
    user_data: UsuarioLogin,
    db: Session = Depends(get_db)
):
    return Login(user_data, db)