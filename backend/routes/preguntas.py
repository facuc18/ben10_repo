from fastapi import APIRouter,HTTPException,Depends
from sqlalchemy.orm import Session

from database import get_db
from models.preguntaModel import Pregunta
from models.respuestaAlienModel import RespuestaAlien
from models.alienModel import Alien

from schemas.preguntas import PreguntaSchema,UsuarioResultado
from schemas.alien import TuAlienResult

from auth.Dependencies import get_current_user

router = APIRouter()



@router.get("/preguntas", response_model=list[PreguntaSchema])
def get_preguntas(db: Session = Depends(get_db), usuario = Depends(get_current_user)):
    preguntas = db.query(Pregunta).all()
    return preguntas


@router.post("/resultado", response_model=TuAlienResult)
def usuario_respuesta(usuario_resultado: UsuarioResultado, db: Session = Depends(get_db), usuario = Depends(get_current_user)):
    puntajes = {}

    for respuesta_id in usuario_resultado.respuestas:
        resultados = db.query(RespuestaAlien).filter(RespuestaAlien.respuesta_id == respuesta_id).all()

        for resultado in resultados:
            alien_id = resultado.alien_id
            puntos = resultado.puntos

            if alien_id not in puntajes:
                puntajes[alien_id] = 0
            puntajes[alien_id] += puntos

    # 👇 esto ahora está FUERA del for, se evalúa una sola vez al final
    if not puntajes:
        raise HTTPException(status_code=404, detail="No se encontraron resultados")

    ganador_id = max(puntajes, key=puntajes.get)
    alien = db.query(Alien).filter(Alien.id == ganador_id).first()

    return alien
