from motor.motor_asyncio import AsyncIOMotorClient
from models import MiTarea, MiTareaDTO
from bson import ObjectId

client = AsyncIOMotorClient('mongodb://localhost:27017')
database = client.TareasBD
collection = database.tareas
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async def ObtenerUnaTarea_ID(id):
    try:
        ID = ObjectId(id)

        tarea = await collection.find_one({'_id': ID})
        if tarea:
            mi_dto = MiTareaDTO(
                id= str(tarea['_id']),
                Titulo=tarea['Titulo'],
                Descripcion=tarea['Descripcion'],
                Completado=tarea['Completado']
            )
            return mi_dto
        else:
            return False
    except:
        return False
    
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async def ObtenerUnaTarea_titulo(titulo):
    tarea = await collection.find_one({'Titulo':titulo})
    if tarea:
        return tarea
    return False

# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async def TodasLasTareas():
    tareas = []
    cursor = collection.find({})
    async for document in cursor:
        Modelo = MiTareaDTO(
            id= str(document['_id']),
            Titulo=document['Titulo'],
            Descripcion=document['Descripcion'],
            Completado=document['Completado']
        )       
        tareas.append(Modelo)
    return tareas

# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async def CrearUnaTarea(tarea : MiTarea):
    NuevaTarea = await collection.insert_one(tarea)
    TareaCreada = await collection.find_one({'_id': NuevaTarea.inserted_id})
    #if '_id' in respuesta and isinstance(respuesta['_id'], ObjectId):
    mi_dto = MiTareaDTO(
        id = str(TareaCreada['_id']),
        Titulo = TareaCreada['Titulo'],
        Descripcion = TareaCreada['Descripcion'],
        Completado = TareaCreada['Completado']
    )
    return mi_dto

# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async def ActualizarUnaTarea(id: str, data): 
    tarea = {k:v for k, v in data.dict().items() if v is not None}
    #print(tarea)
    await collection.update_one({'_id':ObjectId(id)}, {'$set':tarea})
    documento = await collection.find_one({'_id':ObjectId(id)})

    mi_dto = MiTareaDTO(
        id = str(documento['_id']),
        Titulo = documento['Titulo'],
        Descripcion = documento['Descripcion'],
        Completado = documento['Completado']
    )
    return mi_dto

# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async def BorrarUnaTarea(id: str):
    await collection.delete_one({'_id':ObjectId(id)})
    return True