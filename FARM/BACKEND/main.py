from fastapi import FastAPI, HTTPException
from routes.tareas import AppTarea

app = FastAPI()
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  
@app.get('/')
def Bienvenido():
    return {'Mensaje':'Bienvenido a mi Api'}

app.include_router(AppTarea)