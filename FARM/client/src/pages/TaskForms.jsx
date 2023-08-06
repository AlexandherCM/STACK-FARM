import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FetchTasks, Metodo } from "../Api/FetchTasks";
//import axios from "axios";

function TaskForms() {
    const [Titulo, setTitulo] = useState('');
    const [Descripcion, setDescripcion] = useState('');
    const DatosTarea = { Titulo, Descripcion };

    //Sirve para reiniciar valores de los inputs
    const [enviado, setEnviado] = useState(false);

    const params = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        var result;
        if (!params.id) {
            // Crear tarea
            result = await FetchTasks(Metodo.POST, DatosTarea);
        } else {
            // Actualizar tarea
            result = await FetchTasks(Metodo.PUT, DatosTarea, params.id);
        }
        if (!result.ok) {
            //console.log(await result.json());
            setEnviado(true);
            return;
        }
        navigate(`/`);
    }

    useEffect(() => {
        if (params.id) {
            fetchTarea();
        }

        if (enviado) {
            setTitulo('');
            setDescripcion('');
            setEnviado(false);
        }

        async function fetchTarea() {
            //Obtener tarea
            const res = await FetchTasks(Metodo.GET, null, params.id);
            const data = await res.json();

            setTitulo(data.Titulo);
            setDescripcion(data.Descripcion);
        }
    }, [enviado]);

    return (
        <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
            <div>
                <form className="bg-zinc-950 p-10 rounded-lg" onSubmit={handleSubmit}>
                    {params.id ?
                        <h2 className="text-2xl font-bold mb-7">Actualizar Tarea</h2>
                        :
                        <h2 className="text-2xl font-bold mb-7">Crear Tarea</h2>}
                    <input type="text"
                        placeholder="Titulo"
                        className="block py-2 px-3 mb-4 w-full text-black"
                        onChange={(e) => setTitulo(e.target.value)}
                        value={Titulo}
                        autoFocus
                    />
                    <textarea
                        rows="3"
                        placeholder="Descripción"
                        className="block py-2 px-3 mb-4 w-full text-black"
                        onChange={(e) => setDescripcion(e.target.value)}
                        value={Descripcion}
                    ></textarea>
                    <button
                        className="bg-white hover:bg-slate-800 hover:text-white text-slate-800 py-2 px-4 rounded">
                        {params.id ? 'Actualizar' : 'Crear'}
                    </button>
                </form>
                {params.id && (
                    <button className="bg-red-500 hover:bg-red-400 text-white font-bold p-2 rounded mt-5"
                        onClick={async () => {
                            try {
                                //Eliminar tarea
                                const res = await FetchTasks(Metodo.DELETE, null, params.id);
                                navigate(`/`)
                            } catch (error) {
                                console.log(error);
                            }
                        }}>
                        Eliminar
                    </button>
                )}
            </div>
        </div>
    );
}

export default TaskForms;