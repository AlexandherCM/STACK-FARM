import { useNavigate } from "react-router-dom"
import { FetchTasks, Metodo } from "../Api/FetchTasks";

function Card({ tarea }) {

    const navigate = useNavigate();
    return (
        <div
            className="card bg-zinc-950 p-5 hover:cursor-pointer hover:bg-gray-950 rounded-lg" onClick={() => {
                navigate(`/Tarea/${tarea.id}`)
            }}>
            <div className="flex justify-between">
                <h3 className="font-bold card-title text-xl pb-5">{tarea.Titulo}</h3>
                <button onClick={
                    async (e) => {
                        e.stopPropagation();
                        const res = await FetchTasks(Metodo.PUT, { Completado: !tarea.Completado }, tarea.id)
                        console.log(res.json());

                        if (res.ok) {
                            window.location.reload();
                        }
                    }
                }>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24"
                        strokeWidth={1.5} stroke="currentColor"
                        className={`w-6 h-6 ${tarea.Completado ? 'text-green-500' : ''}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                </button>
            </div>
            <p className="card-text text-justify">{tarea.Descripcion}</p>
        </div>
    )
}

export default Card