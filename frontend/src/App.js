import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import Students from "./pages/Students";
import Update from "./pages/Update";
import Sidebar from "./pages/Sidebar";
import QuranLessonCalendar from "./pages/Calender";
import "./sidebar.css";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <div className="container">
          <Sidebar className="sidebar" />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Students />} />
              <Route path="/add" element={<Add />} />
              <Route path="/update/:id" element={<Update />} />
              {/* Add other routes for different pages if needed */}
            </Routes>
          </div>
        </div>
        <div className="quran-calendar">
          <QuranLessonCalendar />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

function Home() {
  return <div></div>; // Empty component for the home page
}
