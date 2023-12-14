// App.js

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import Students from "./pages/Students";
import Update from "./pages/Update";
import Sidebar from "./pages/Sidebar";
import QuranLessonCalendar from "./pages/Calender";
import StudentsList from "./pages/studentsList";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="container-fluid mt-5">
      <BrowserRouter>
        <div className="row">
          <div className="col-lg-3 bg-dark py-4">
            <Sidebar />
          </div>
          <div className="col-lg-9">
            <Routes>
              <Route path="/" element={<QuranLessonCalendar />} />
              <Route path="Home" element={<QuranLessonCalendar />} />
              <Route path="/mail" element={<StudentsList />} />
              <Route path="/students/:id" element={<Students />} />{" "}
              {/* Route for individual student details */}
              <Route path="/add" element={<Add />} />
              <Route path="/update/:id" element={<Update />} />
              {/* Add other routes for different pages if needed */}
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
