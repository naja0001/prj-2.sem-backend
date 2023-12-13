import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import Students from "./pages/Students";
import Update from "./pages/Update";
import sidebar from "./pages/sidebar";
import "./sidebar.css";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Students />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/sidebar" element={<sidebars />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
