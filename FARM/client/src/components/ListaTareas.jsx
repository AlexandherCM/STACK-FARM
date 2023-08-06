import Card from "../components/Card";

function ListaTareas({ tareas }) {
    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {
                tareas.map(tarea => (
                    <Card tarea={tarea} key={tarea.id} />
                ))
            }
        </div>

    )
}

export default ListaTareas;