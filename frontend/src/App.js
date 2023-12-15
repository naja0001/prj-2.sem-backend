// App.js

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import Update from "./pages/Update";
import Sidebar from "./pages/Sidebar";
import QuranLessonCalendar from "./pages/Calender";
import StudentsList from "./pages/studentsList";
import Homework from "./pages/Homework";
import Students from "./pages/Students";
import HTMLViewer from "./HTMLViewer";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="container-fluid mt-5">
      <BrowserRouter>
        <div className="row">
          <div className="col-lg-3 bg-dark py-4">
            <Sidebar />
            <HTMLViewer />
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
              <Route path="/homework" element={<Homework />} />{" "}
              <Route path="/students" element={<Students />} />{" "}
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
