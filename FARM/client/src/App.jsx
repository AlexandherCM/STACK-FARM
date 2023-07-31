import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TaskForms from "./pages/TaskForms";

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/Tarea/Lista" element={<TaskForms/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;