import { useEffect, useState } from "react";
import ListaTareas from "../components/ListaTareas";
import { FetchTasks, Metodo } from "../Api/FetchTasks";

function HomePage() {
    const [tareas, setTareas] = useState([]);

    useEffect(() => {
        async function fetchTareas() {
            const res = await FetchTasks(Metodo.GET);
            const data = await res.json();

            setTareas(data);
        }
        fetchTareas();
    }, []);

    return (
        <ListaTareas tareas={tareas} />
    );
}

export default HomePage;
