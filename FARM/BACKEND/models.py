from pydantic import BaseModel, Field
from typing import Optional
from bson import ObjectId

class MiTarea(BaseModel):
    Titulo: str
    Descripcion: Optional[str] = None
    Completado: bool = False

class MiTareaDTO(MiTarea):
    id: Optional[str] = None

class ActualizarTarea(BaseModel):
    Titulo: Optional[str] = None
    Descripcion: Optional[str] = None
    Completado: Optional[bool] = None
    
# class PyObjectId(ObjectId):
#     # Convertir el ObjectId en cadena cuando se devuelve como JSON
#     __config__ = {"json_encoders": {ObjectId: str}}

# class MiTarea(BaseModel):
#     _id: Optional[PyObjectId] = Field(alias='_id', pre=True, default=None)
#     Titulo: str
#     Descripcion: Optional[str] = None
#     Completado: bool = False

#     # Propiedad calculada para mostrar el valor del ObjectId como cadena sin guardarlo en MongoDB
#     @property
#     def id(self) -> Optional[str]:
#         return str(self._id) if self._id else None

#     class Config:
#         from_attributes = True
#         populate_by_name = True
#         json_encoders: {ObjectId: str}
