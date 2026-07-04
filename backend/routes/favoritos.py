from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models.favoritoModel import Favorito
from models.alienModel import Alien
from schemas.favorito import FavoritoDetalle, Add_favorito

from auth.Dependencies import get_current_user

router = APIRouter()

@router.get("/favoritos", response_model=list[FavoritoDetalle])
def obtener_favoritos(db: Session = Depends(get_db), usuario = Depends(get_current_user)):
    favoritos = db.query(Favorito).filter(Favorito.usuario_id == usuario.id).all()
    return favoritos


@router.post("/favoritos", response_model=FavoritoDetalle)
def agregar_favorito(favorito: Add_favorito, db: Session = Depends(get_db), usuario = Depends(get_current_user)):

    alien = db.query(Alien).filter(Alien.id == favorito.alien_id).first()
    if alien is None:
        raise HTTPException(status_code=404, detail="Alien no encontrado")

    ya_existe = db.query(Favorito).filter(
        Favorito.usuario_id == usuario.id,
        Favorito.alien_id == favorito.alien_id
    ).first()

    if ya_existe:
        raise HTTPException(status_code=409, detail="Ese alien ya está en tus favoritos")

    nuevo_favorito = Favorito(
        usuario_id=usuario.id,
        alien_id=favorito.alien_id
    )

    db.add(nuevo_favorito)
    db.commit()
    db.refresh(nuevo_favorito)

    return nuevo_favorito

@router.delete("/favoritos/{alien_id}")
def eliminar_favorito(alien_id: int, db: Session = Depends(get_db), usuario = Depends(get_current_user)):
    favorito = db.query(Favorito).filter(
        Favorito.usuario_id == usuario.id,
        Favorito.alien_id == alien_id
    ).first()

    if favorito is None:
        raise HTTPException(status_code=404, detail="No estaba en tus favoritos")

    db.delete(favorito)
    db.commit()

    return {"message": "Favorito eliminado"}