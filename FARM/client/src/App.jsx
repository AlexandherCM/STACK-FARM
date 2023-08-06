import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TaskForms from "./pages/TaskForms";
import NavBar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <div className="container mx-auto px-7">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Tarea/new" element={<TaskForms />} />
          <Route path="/Tarea/:id" element={<TaskForms />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;