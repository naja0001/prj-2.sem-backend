import React, { useEffect, useState } from "react";
import axios from "axios";
//import GradeSelector from "./GradeSelector.js";

const Students = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:2300/students");
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div>
      <h2>List of Students</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.first_name} {student.last_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Students;
