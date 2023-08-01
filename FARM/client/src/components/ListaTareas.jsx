

function ListaTareas({ tareas }) {
    return (
        <div className="grid grid-cols-3 gap-8" > 
            {
                tareas.map(tarea => (
                    <div className="card bg-zinc-950 p-4 hover:cursor-pointer
                    hover:bg-gray-950" key={tarea.id}>
                        <div className="card-body">
                            <h3 className="card-title">{tarea.Titulo}</h3>
                            <p className="card-text">{tarea.Descripcion}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default ListaTareas;