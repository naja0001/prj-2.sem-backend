import React, { useEffect, useState } from "react";
import axios from "axios";
import GradeSelector from "./GradeSelector.js";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [quranProgress, setQuranProgress] = useState([]);
  const [selectedGrades, setSelectedGrades] = useState({});
  const [studentHomework, setStudentHomework] = useState([]);
  const [Attendance, setAttendanceData] = useState([]);

  const fetchData = async () => {
    try {
      const studentsResponse = await axios.get(
        "http://localhost:2300/students"
      );
      setStudents(studentsResponse.data);

      const progressResponse = await axios.get(
        "http://localhost:2300/QuranProgress"
      );
      setQuranProgress(progressResponse.data);

      const attendanceResponse = await axios.get(
        "http://localhost:2300/Attendance"
      );
      setAttendanceData(attendanceResponse.data);

      const homeworkResponse = await axios.get(
        "http://localhost:2300/homework"
      );
      const allHomework = homeworkResponse.data;
      setStudentHomework(allHomework);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const AttendanceButtons = ({ onSelect }) => {
    return (
      <div>
        <button onClick={() => onSelect(true)}>Yes</button>
        <button onClick={() => onSelect(false)}>No</button>
      </div>
    );
  };

  const handleAttendanceSelect = (option, index) => {
    const updatedAttendance = [...Attendance];
    updatedAttendance[index].is_present = option;
    setAttendanceData(updatedAttendance);
  };

  const [formData, setFormData] = useState({
    assignment_name: "",
    description: "",
    due_date: "",
  });

  const handleSubmit = async (e, studentId) => {
    e.preventDefault();
    try {
      const dataToInsert = {
        students_id: studentId,
        assignment_name: formData.assignment_name,
        description: formData.description,
        due_date: formData.due_date,
      };

      await axios.post(
        `http://localhost:2300/homework/${studentId}`,
        dataToInsert
      );

      setFormData({
        assignment_name: "",
        description: "",
        due_date: "",
      });

      fetchData();
    } catch (error) {
      console.error("Error inserting data:", error.response);
    }
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const FilteredStudents = ({ searchTerm, genderFilter }) => {
    const filteredStudents = students.filter((student) => {
      const name = `${student.first_name} ${student.last_name}`.toLowerCase();
      return (
        name.includes(searchTerm.toLowerCase()) &&
        (genderFilter === "" || student.gender === genderFilter)
      );
    });

    return (
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {filteredStudents.map((student, index) => (
          <div key={student.id} className="col">
            <div className="card h-100">
              <div className="card-body">{/* Display student details */}</div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container mt-5">
      <h2>List of Students</h2>
      <FilteredStudents searchTerm={""} genderFilter={""} />

      {/* Form to assign new homework */}
      <div className="row mt-5">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <form onSubmit={(e) => handleSubmit(e /* pass student id */)}>
                <h2>New Hifdh</h2>
                <label>
                  Hifdh:
                  <input
                    type="text"
                    value={formData.assignment_name}
                    onChange={(e) => handleInputChange(e, "assignment_name")}
                  />
                </label>
                <label>
                  Description:
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => handleInputChange(e, "description")}
                  />
                </label>
                <label>
                  Date:
                  <input
                    type="date"
                    value={formData.due_date}
                    onChange={(e) => handleInputChange(e, "due_date")}
                  />
                </label>
                {/* Submit button */}
                <button type="submit">Assign</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;
