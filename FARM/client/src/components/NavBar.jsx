import { Link } from "react-router-dom";

function NavBar() {
    return (
        <header className="flex justify-between items-center my-10">
            <Link to="/">
                <h1 className="text-3xl font-bold">App Tareas</h1>
            </Link>
            <Link to="/Tarea/new"
                className="bg-zinc-950 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded" >
                Nueva Tarea
            </Link>
        </header>
    )
}

export default NavBar;