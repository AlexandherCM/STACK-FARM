from fastapi import FastAPI, HTTPException
from routes.tareas import AppTarea
from fastapi.middleware.cors import CORSMiddleware
from decouple import config

app = FastAPI()

origins = [
    config('FRONTEND_URL')
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  
@app.get('/')
def Bienvenido():
    return {'Mensaje':'Bienvenido a mi Api'}

app.include_router(AppTarea)