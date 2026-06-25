
from database import SessionLocal

from models.serieModel import Series
from models.alienModel import Alien
from models.episodioModel import Episodio
from models.aparicionModel import Aparicion
from models.preguntaModel import Pregunta
from models.respuestaAlienModel import RespuestaAlien
from models.respuestaModel import Respuesta

db = SessionLocal()
# =========================
# SERIES
# =========================

clasico = Series(nombre="Ben 10 Clasico")
alien_force = Series(nombre="Alien Force")
ultimate_alien = Series(nombre="Ultimate Alien")
omniverse = Series(nombre="Omniverse")

db.add_all([
    clasico,
    alien_force,
    ultimate_alien,
    omniverse
])

db.commit()


# =========================
# ALIENS
# =========================

fuego = Alien(
    nombre="Fuego",
    imagen="fuego.jpg",
    especie="Pyronita",
    planeta="Pyros",
    descripcion="Alien de fuego.",
    habilidades="Control del fuego",
    curiosidades="Uno de los primeros aliens del Omnitrix."
)

xlr8 = Alien(
    nombre="XLR8",
    imagen="xlr8.jpg",
    especie="Kinecelerano",
    planeta="Kinet",
    descripcion="Alien extremadamente veloz.",
    habilidades="Super velocidad",
    curiosidades="Puede correr más rápido que un automóvil."
)

diamante = Alien(
    nombre="Diamante",
    imagen="diamante.jpg",
    especie="Petrosapien",
    planeta="Petropia",
    descripcion="Alien cristalino muy resistente.",
    habilidades="Crear cristales y gran defensa",
    curiosidades="Puede regenerar partes dañadas."
)

cuatro_brazos = Alien(
    nombre="Cuatro Brazos",
    imagen="cuatrobrazos.jpg",
    especie="Tetramand",
    planeta="Khoros",
    descripcion="Alien de fuerza descomunal.",
    habilidades="Super fuerza",
    curiosidades="Puede levantar enormes pesos."
)

materia_gris = Alien(
    nombre="Materia Gris",
    imagen="materiagris.jpg",
    especie="Galvan",
    planeta="Galvan Prime",
    descripcion="Alien pequeño pero extremadamente inteligente.",
    habilidades="Intelecto superior",
    curiosidades="Es uno de los aliens más inteligentes del Omnitrix."
)

bestia = Alien(
    nombre="Bestia",
    imagen="bestia.jpg",
    especie="Vulpimancer",
    planeta="Vulpin",
    descripcion="Alien salvaje con sentidos desarrollados.",
    habilidades="Rastreo y agilidad",
    curiosidades="No posee ojos."
)

fantasmatico = Alien(
    nombre="Fantasmatico",
    imagen="fantasmatico.jpg",
    especie="Ectonurita",
    planeta="Anur Phaetos",
    descripcion="Alien fantasma.",
    habilidades="Intangibilidad e invisibilidad",
    curiosidades="Fue uno de los aliens más peligrosos del Omnitrix."
)

insectoide = Alien(
    nombre="Insectoide",
    imagen="insectoide.jpg",
    especie="Lepidopterrano",
    planeta="Lepidopterra",
    descripcion="Alien insecto con capacidad de volar.",
    habilidades="Vuelo y baba adhesiva",
    curiosidades="Puede disparar mucosidad pegajosa."
)

acuatico = Alien(
    nombre="Acuatico",
    imagen="acuatico.jpg",
    especie="Piscciss Volann",
    planeta="Piscciss",
    descripcion="Alien especializado en combate bajo el agua.",
    habilidades="Respirar bajo el agua",
    curiosidades="Puede nadar a gran velocidad."
)

ultra_t = Alien(
    nombre="Ultra T",
    imagen="ultrat.jpg",
    especie="Galvanic Mechamorph",
    planeta="Galvan B",
    descripcion="Alien tecnológico.",
    habilidades="Fusionarse con tecnología",
    curiosidades="Puede mejorar máquinas."
)

cannonbolt = Alien(
    nombre="Cannonbolt",
    imagen="cannonbolt.jpg",
    especie="Arburian Pelarota",
    planeta="Arburia",
    descripcion="Alien blindado.",
    habilidades="Enrollarse y golpear enemigos",
    curiosidades="Su especie casi se extinguió."
)

ditto = Alien(
    nombre="Ditto",
    imagen="ditto.jpg",
    especie="Splixson",
    planeta="Hathor",
    descripcion="Alien capaz de duplicarse.",
    habilidades="Clonación",
    curiosidades="Todos los clones sienten el mismo dolor."
)

db.add_all([
    fuego,
    xlr8,
    diamante,
    cuatro_brazos,
    materia_gris,
    bestia,
    fantasmatico,
    insectoide,
    acuatico,
    ultra_t,
    cannonbolt,
    ditto
])

db.commit()

# =========================
# EPISODIOS
# =========================

ep1 = Episodio(codigo="S01E01", nombre="Y entonces eran 10")
ep2 = Episodio(codigo="S01E02", nombre="Washington B.C.")
ep3 = Episodio(codigo="S01E03", nombre="La Kraken")
ep4 = Episodio(codigo="S01E04", nombre="Eterno Descanso")
ep5 = Episodio(codigo="S01E05", nombre="Hunted")
ep6 = Episodio(codigo="S01E06", nombre="Tourist Trap")
ep7 = Episodio(codigo="S01E07", nombre="Kevin 11")
ep8 = Episodio(codigo="S01E08", nombre="The Alliance")
ep9 = Episodio(codigo="S01E09", nombre="Last Laugh")
ep10 = Episodio(codigo="S01E10", nombre="Lucky Girl")

db.add_all([
    ep1, ep2, ep3, ep4, ep5,
    ep6, ep7, ep8, ep9, ep10
])

db.commit()
# =========================
# APARICIONES
# =========================

db.add_all([

    Aparicion(alien_id=fuego.id, episodio_id=ep1.id, serie_id=clasico.id),
    Aparicion(alien_id=fuego.id, episodio_id=ep3.id, serie_id=clasico.id),
    Aparicion(alien_id=fuego.id, episodio_id=ep7.id, serie_id=clasico.id),

    Aparicion(alien_id=xlr8.id, episodio_id=ep1.id, serie_id=clasico.id),
    Aparicion(alien_id=xlr8.id, episodio_id=ep5.id, serie_id=clasico.id),
    Aparicion(alien_id=xlr8.id, episodio_id=ep9.id, serie_id=clasico.id),

    Aparicion(alien_id=diamante.id, episodio_id=ep2.id, serie_id=clasico.id),
    Aparicion(alien_id=diamante.id, episodio_id=ep6.id, serie_id=clasico.id),
    Aparicion(alien_id=diamante.id, episodio_id=ep10.id, serie_id=clasico.id),

    Aparicion(alien_id=cuatro_brazos.id, episodio_id=ep3.id, serie_id=clasico.id),
    Aparicion(alien_id=cuatro_brazos.id, episodio_id=ep7.id, serie_id=clasico.id),

    Aparicion(alien_id=materia_gris.id, episodio_id=ep1.id, serie_id=clasico.id),
    Aparicion(alien_id=materia_gris.id, episodio_id=ep4.id, serie_id=clasico.id),

    Aparicion(alien_id=bestia.id, episodio_id=ep2.id, serie_id=clasico.id),
    Aparicion(alien_id=bestia.id, episodio_id=ep5.id, serie_id=clasico.id),

    Aparicion(alien_id=fantasmatico.id, episodio_id=ep4.id, serie_id=clasico.id),
    Aparicion(alien_id=fantasmatico.id, episodio_id=ep8.id, serie_id=clasico.id),

    Aparicion(alien_id=insectoide.id, episodio_id=ep2.id, serie_id=clasico.id),
    Aparicion(alien_id=insectoide.id, episodio_id=ep6.id, serie_id=clasico.id),

    Aparicion(alien_id=acuatico.id, episodio_id=ep3.id, serie_id=clasico.id),
    Aparicion(alien_id=acuatico.id, episodio_id=ep9.id, serie_id=clasico.id),

    Aparicion(alien_id=ultra_t.id, episodio_id=ep8.id, serie_id=omniverse.id),

    Aparicion(alien_id=cannonbolt.id, episodio_id=ep10.id, serie_id=clasico.id),

    Aparicion(alien_id=ditto.id, episodio_id=ep9.id, serie_id=omniverse.id)

])

db.commit()

# =========================
# PREGUNTAS
# =========================

p1 = Pregunta(texto="¿Qué valorás más?")
p2 = Pregunta(texto="¿Cómo resolvés un problema?")
p3 = Pregunta(texto="¿Qué poder te gustaría tener?")
p4 = Pregunta(texto="¿Qué rol tendrías en un equipo?")
p5 = Pregunta(texto="¿Qué ambiente preferís?")
p6 = Pregunta(texto="¿Qué te describe mejor?")
p7 = Pregunta(texto="¿Cuál sería tu mayor fortaleza?")
p8 = Pregunta(texto="¿Qué harías en una emergencia?")
p9 = Pregunta(texto="¿Qué tipo de héroe serías?")
p10 = Pregunta(texto="¿Cuál sería tu lema?")

db.add_all([p1,p2,p3,p4,p5,p6,p7,p8,p9,p10])
db.commit()

# P1
r1 = Respuesta(texto="Velocidad", pregunta_id=p1.id)
r2 = Respuesta(texto="Fuerza", pregunta_id=p1.id)
r3 = Respuesta(texto="Inteligencia", pregunta_id=p1.id)
r4 = Respuesta(texto="Resistencia", pregunta_id=p1.id)

# P2
r5 = Respuesta(texto="Pensando", pregunta_id=p2.id)
r6 = Respuesta(texto="Actuando rápido", pregunta_id=p2.id)
r7 = Respuesta(texto="Enfrentándolo directamente", pregunta_id=p2.id)
r8 = Respuesta(texto="Adaptándome", pregunta_id=p2.id)

# P3
r9 = Respuesta(texto="Controlar fuego", pregunta_id=p3.id)
r10 = Respuesta(texto="Super velocidad", pregunta_id=p3.id)
r11 = Respuesta(texto="Ser invisible", pregunta_id=p3.id)
r12 = Respuesta(texto="Transformar mi cuerpo", pregunta_id=p3.id)

# P4
r13 = Respuesta(texto="Líder", pregunta_id=p4.id)
r14 = Respuesta(texto="Estratega", pregunta_id=p4.id)
r15 = Respuesta(texto="Protector", pregunta_id=p4.id)
r16 = Respuesta(texto="Explorador", pregunta_id=p4.id)

# P5
r17 = Respuesta(texto="Espacio", pregunta_id=p5.id)
r18 = Respuesta(texto="Ciudad", pregunta_id=p5.id)
r19 = Respuesta(texto="Naturaleza", pregunta_id=p5.id)
r20 = Respuesta(texto="Agua", pregunta_id=p5.id)

# P6
r21 = Respuesta(texto="Impulsivo", pregunta_id=p6.id)
r22 = Respuesta(texto="Tranquilo", pregunta_id=p6.id)
r23 = Respuesta(texto="Curioso", pregunta_id=p6.id)
r24 = Respuesta(texto="Valiente", pregunta_id=p6.id)

# P7
r25 = Respuesta(texto="Fuerza física", pregunta_id=p7.id)
r26 = Respuesta(texto="Rapidez", pregunta_id=p7.id)
r27 = Respuesta(texto="Inteligencia", pregunta_id=p7.id)
r28 = Respuesta(texto="Resistencia", pregunta_id=p7.id)

# P8
r29 = Respuesta(texto="Salvar a todos", pregunta_id=p8.id)
r30 = Respuesta(texto="Buscar una solución", pregunta_id=p8.id)
r31 = Respuesta(texto="Entrar en acción", pregunta_id=p8.id)
r32 = Respuesta(texto="Mantener la calma", pregunta_id=p8.id)

# P9
r33 = Respuesta(texto="Ofensivo", pregunta_id=p9.id)
r34 = Respuesta(texto="Defensivo", pregunta_id=p9.id)
r35 = Respuesta(texto="Tecnológico", pregunta_id=p9.id)
r36 = Respuesta(texto="Sigiloso", pregunta_id=p9.id)

# P10
r37 = Respuesta(texto="Nunca rendirse", pregunta_id=p10.id)
r38 = Respuesta(texto="Pensar antes de actuar", pregunta_id=p10.id)
r39 = Respuesta(texto="La unión hace la fuerza", pregunta_id=p10.id)
r40 = Respuesta(texto="Siempre hay otra salida", pregunta_id=p10.id)

db.add_all([
r1,r2,r3,r4,r5,r6,r7,r8,r9,r10,
r11,r12,r13,r14,r15,r16,r17,r18,r19,r20,
r21,r22,r23,r24,r25,r26,r27,r28,r29,r30,
r31,r32,r33,r34,r35,r36,r37,r38,r39,r40
])

db.commit()

# =========================
# RESPUESTA_ALIEN
# =========================

db.add_all([

# P1 - ¿Qué valorás más?

RespuestaAlien(respuesta_id=r1.id, alien_id=xlr8.id, puntos=3),
RespuestaAlien(respuesta_id=r1.id, alien_id=insectoide.id, puntos=2),

RespuestaAlien(respuesta_id=r2.id, alien_id=cuatro_brazos.id, puntos=3),
RespuestaAlien(respuesta_id=r2.id, alien_id=cannonbolt.id, puntos=2),

RespuestaAlien(respuesta_id=r3.id, alien_id=materia_gris.id, puntos=3),
RespuestaAlien(respuesta_id=r3.id, alien_id=ultra_t.id, puntos=2),

RespuestaAlien(respuesta_id=r4.id, alien_id=diamante.id, puntos=3),
RespuestaAlien(respuesta_id=r4.id, alien_id=fuego.id, puntos=2),

# P2

RespuestaAlien(respuesta_id=r5.id, alien_id=materia_gris.id, puntos=3),
RespuestaAlien(respuesta_id=r5.id, alien_id=ultra_t.id, puntos=2),

RespuestaAlien(respuesta_id=r6.id, alien_id=xlr8.id, puntos=3),

RespuestaAlien(respuesta_id=r7.id, alien_id=cuatro_brazos.id, puntos=3),

RespuestaAlien(respuesta_id=r8.id, alien_id=ditto.id, puntos=3),

# P3

RespuestaAlien(respuesta_id=r9.id, alien_id=fuego.id, puntos=3),

RespuestaAlien(respuesta_id=r10.id, alien_id=xlr8.id, puntos=3),

RespuestaAlien(respuesta_id=r11.id, alien_id=fantasmatico.id, puntos=3),

RespuestaAlien(respuesta_id=r12.id, alien_id=diamante.id, puntos=2),
RespuestaAlien(respuesta_id=r12.id, alien_id=ditto.id, puntos=2),

# P4

RespuestaAlien(respuesta_id=r13.id, alien_id=fuego.id, puntos=2),
RespuestaAlien(respuesta_id=r13.id, alien_id=cuatro_brazos.id, puntos=2),

RespuestaAlien(respuesta_id=r14.id, alien_id=materia_gris.id, puntos=3),

RespuestaAlien(respuesta_id=r15.id, alien_id=diamante.id, puntos=3),

RespuestaAlien(respuesta_id=r16.id, alien_id=bestia.id, puntos=3),

# P5

RespuestaAlien(respuesta_id=r17.id, alien_id=ultra_t.id, puntos=2),

RespuestaAlien(respuesta_id=r18.id, alien_id=xlr8.id, puntos=2),

RespuestaAlien(respuesta_id=r19.id, alien_id=bestia.id, puntos=3),

RespuestaAlien(respuesta_id=r20.id, alien_id=acuatico.id, puntos=3),

# P6

RespuestaAlien(respuesta_id=r21.id, alien_id=fuego.id, puntos=3),

RespuestaAlien(respuesta_id=r22.id, alien_id=diamante.id, puntos=2),

RespuestaAlien(respuesta_id=r23.id, alien_id=materia_gris.id, puntos=3),

RespuestaAlien(respuesta_id=r24.id, alien_id=cuatro_brazos.id, puntos=2),

# P7

RespuestaAlien(respuesta_id=r25.id, alien_id=cuatro_brazos.id, puntos=3),

RespuestaAlien(respuesta_id=r26.id, alien_id=xlr8.id, puntos=3),

RespuestaAlien(respuesta_id=r27.id, alien_id=materia_gris.id, puntos=3),

RespuestaAlien(respuesta_id=r28.id, alien_id=diamante.id, puntos=3),

# P8

RespuestaAlien(respuesta_id=r29.id, alien_id=fuego.id, puntos=2),

RespuestaAlien(respuesta_id=r30.id, alien_id=materia_gris.id, puntos=2),

RespuestaAlien(respuesta_id=r31.id, alien_id=cuatro_brazos.id, puntos=3),

RespuestaAlien(respuesta_id=r32.id, alien_id=diamante.id, puntos=2),

# P9

RespuestaAlien(respuesta_id=r33.id, alien_id=fuego.id, puntos=3),

RespuestaAlien(respuesta_id=r34.id, alien_id=cannonbolt.id, puntos=3),

RespuestaAlien(respuesta_id=r35.id, alien_id=ultra_t.id, puntos=3),

RespuestaAlien(respuesta_id=r36.id, alien_id=fantasmatico.id, puntos=3),

# P10

RespuestaAlien(respuesta_id=r37.id, alien_id=cuatro_brazos.id, puntos=2),

RespuestaAlien(respuesta_id=r38.id, alien_id=materia_gris.id, puntos=2),

RespuestaAlien(respuesta_id=r39.id, alien_id=ditto.id, puntos=2),

RespuestaAlien(respuesta_id=r40.id, alien_id=fantasmatico.id, puntos=2),

])

db.commit()

db.close()

print("Seed completado correctamente.")

