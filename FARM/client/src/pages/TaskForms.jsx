import { useState } from "react";
//import axios from "axios";

function TaskForms() {
    const [Titulo, setTitulo] = useState('');
    const [Descripcion, setDescripcion] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('http://localhost:8000/api/tareas',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Titulo,
                Descripcion
            })
        });

        //ESTE SE PUEDE OPTIMIZAR CON AXIOS
        // const res = await axios.post('http://localhost:8000/api/tareas', {
        //     Titulo,
        //     Descripcion
        // });

        console.log(await res.json());
        //Limpiamos el formulario
        e.target.reset();
    }

    return (
        <div className="flex items-center justify-center h-[calc(100vh-10rem)]"> 
            <form className="bg-zinc-950 p-10" onSubmit={handleSubmit}>
                <input type="text"
                    placeholder="Titulo"
                    className="block py-2 px-3 mb-4 w-full text-black" 
                    onChange={(e) => setTitulo(e.target.value)}
                    autoFocus
                    />
                <textarea
                    rows="3"
                    placeholder="Descripción"
                    className="block py-2 px-3 mb-4 w-full text-black"
                    onChange={(e) => setDescripcion(e.target.value)}></textarea>
                <button className="btn btn-primary btn-block">Agregar</button>
            </form>
        </div>
    );
}

export default TaskForms;