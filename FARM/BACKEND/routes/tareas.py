from fastapi import APIRouter, HTTPException
from models import MiTarea, MiTareaDTO, ActualizarTarea
from database import TodasLasTareas, CrearUnaTarea, ObtenerUnaTarea_titulo, ObtenerUnaTarea_ID
from database import ObtenerUnaTarea_ID, BorrarUnaTarea, ActualizarUnaTarea

AppTarea = APIRouter()
# READ ALL- - - - - - - - - - - - - - - - - - - - - - - -  
@AppTarea.get('/api/tareas')
async def obtener_tareas():
    tareas = await TodasLasTareas()
    return tareas

# CREATE  - - - - - - - - - - - - - - - - - - - - - - - -  
@AppTarea.post('/api/tareas', response_model=MiTareaDTO)
async def crear_tarea(task: MiTarea):
    TareaEncontrada = await ObtenerUnaTarea_titulo(task.Titulo)
    if TareaEncontrada:
        raise HTTPException(409, 'La tarea ya existe >:(')

    respuesta = await CrearUnaTarea(task.dict())
    if respuesta:
        return respuesta
    raise HTTPException(400, 'Ocurrió un error :(')

# READ ONE Query - - - - - - - - - - - - - - - - - - - - - - - -  
@AppTarea.get('/api/tareas/{id}', response_model=MiTareaDTO)
async def obtener_tarea(id: str):
    tarea = await ObtenerUnaTarea_ID(id)
    if tarea:
        return tarea
    raise HTTPException(404, f'No se encontraron resultados con {id} :(')

# UPDATE - - - - - - - - - - - - - - - - - - - - - - - - 
@AppTarea.put('/api/tareas/{id}', response_model=MiTareaDTO)
async def actualizar_tarea(id: str, tarea: ActualizarTarea):
    respuesta = await ActualizarUnaTarea(id, tarea)
    if respuesta:
        return respuesta
    raise HTTPException(404, f'No se logro actualizar {id} :(')

# DELETE  - - - - - - - - - - - - - - - - - - - - - - - -  
@AppTarea.delete('/api/tareas/{id}')
async def eliminar_tarea(id):
    tarea = await BorrarUnaTarea(id)
    if tarea:
        return 'Tarea eliminada satisfactoriamente'
    raise HTTPException(404, f'No se encontraron resultados con {id} :(')


# # Asignar la cadena del ObjectId al campo 'id' del modelo MiTarea
#     respuesta['id'] = object_id_str

#     # Convertir el diccionario 'respuesta' en una instancia de la clase MiTarea
#     tarea_creada = MiTarea(**respuesta)