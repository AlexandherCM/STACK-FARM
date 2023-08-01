import { useEffect, useState } from "react";
import ListaTareas from "../components/ListaTareas";

function HomePage() {
    const [tareas, setTareas] = useState([]);

    useEffect(() => {
        async function fetchTareas() {
            const res = await fetch('http://localhost:8000/api/tareas', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await res.json();  

            setTareas(data);
            console.log(data);
        }
        fetchTareas();
    }, []);

    return (
        <>
            <h1 className="text-3xl font-bold text-center my-5">Lista de Tareas</h1>
            <ListaTareas tareas={tareas}/>
        </>
    );
}

export default HomePage;
