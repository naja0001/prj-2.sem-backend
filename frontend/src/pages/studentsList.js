// StudentsList.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const StudentsList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:2300/students");
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Students List</h2>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {students.map((student) => (
          <div key={student.id} className="col">
            <Link
              to={`/students/${student.id}`}
              className="text-decoration-none"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="card h-100" style={{ cursor: "pointer" }}>
                <div
                  className="card-body"
                  style={{ transition: "background-color 0.3s" }}
                >
                  <h5 className="card-title">
                    {student.firstname} {student.lastname}
                  </h5>
                  <p className="card-text">Email: {student.email}</p>
                  <p className="card-text">Number: {student.number}</p>
                  <p className="card-text">Gender: {student.gender}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentsList;
