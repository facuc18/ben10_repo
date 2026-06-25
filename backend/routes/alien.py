from fastapi import APIRouter, Depends,HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models.alienModel import Alien

from schemas.alien import AlienDetalle,AlienLista, AparicionDetalle,TuAlienResult

# router = agrupador de endpoints
router = APIRouter()

# GET /aliens → lista de aliens
@router.get("/aliens",response_model=list[AlienLista],tags=["obtener todos los aliens"])
def get_aliens(db: Session = Depends(get_db)):

    # consulta a la base de datos
    aliens = db.query(Alien).all()

    # respuesta automática en JSON
    return aliens

@router.get("/aliens/{id}",response_model=AlienDetalle)
def get_by_id(id:int,db: Session = Depends(get_db)):

    alien = db.query(Alien).filter(Alien.id == id).first()

    if alien is None :
        raise HTTPException(status_code=404,detail="alien no encontrado")
    

    apariciones = []
    for aparicion in alien.apariciones:
        apariciones.append(
            AparicionDetalle(
                id=aparicion.id,
                serie=aparicion.serie.nombre,
                codigo=aparicion.episodio.codigo,
                episodio=aparicion.episodio.nombre))



    return AlienDetalle(
        id = alien.id,
        nombre= alien.nombre,
        especie=alien.especie,
        planeta=alien.planeta,
        imagen=alien.imagen,
        descripcion=alien.descripcion,
        habilidades=alien.habilidades,
        curiosidades=alien.curiosidades,
        
        apariciones=apariciones

    )

@router.get("/tuAlien/{id}",response_model=TuAlienResult)
def get_tuAlien(id:int,db : Session = Depends(get_db)):
    tualien = db.query(Alien).filter(Alien.id == id).first()

    if tualien == None :
        raise HTTPException(status_code=404,detail="alien no encontrado")
    
    return TuAlienResult(
        id=tualien.id,
        nombre=tualien.nombre,
        especie=tualien.especie,
        planeta=tualien.planeta,
        imagen=tualien.imagen,
        descripcion=tualien.descripcion
    )