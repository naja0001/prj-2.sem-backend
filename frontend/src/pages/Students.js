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

      // Process data and update the state
      setStudentHomework(allHomework);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array to run only on mount

  const handleGradeSelect = (studentId, grade) => {
    setSelectedGrades((prevSelectedGrades) => ({
      ...prevSelectedGrades,
      [studentId]: grade,
    }));
  };

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:2300/students/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
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

      // Clear form data after successful submission if needed
      setFormData({
        assignment_name: "",
        description: "",
        due_date: "",
      });

      // Fetch updated data or perform necessary actions
      // fetchData(); // Call your function to update data if needed
    } catch (error) {
      console.error("Error inserting data:", error.response);
    }
  };

  // Function to handle input changes
  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  // Function to format date strings
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // Options for formatting the date - adjust as needed
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="students-container">
      <h2>List of Students</h2>
      <div className="students-grid">
        {students.map((student) => {
          const studentProgress = quranProgress.filter(
            (progress) => progress.students_id === student.id
          );

          const studentAttendance = Attendance.filter(
            (attendance) => attendance.students_id === student.id
          );

          return (
            <div key={student.id} className="student-box">
              <div className="student-details">
                <h1>{`${student.firstname} ${student.lastname}`}</h1>
                <p>Email: {student.email}</p>
                <p>Gender: {student.gender}</p>
                <span>Number: {student.number}</span>

                {/* Save Changes button */}

                <div>
                  <h2>Quran Progress:</h2>
                  {studentProgress.map((progress, index) => (
                    <div key={index}>
                      <p>Chapter Number: {progress.chapter_number}</p>
                      <p>
                        Completion Date: {formatDate(progress.completion_date)}
                      </p>
                    </div>
                  ))}
                </div>
                <div>
                  <h2>Attendance:</h2>
                  {studentAttendance.map((attendance, index) => (
                    <div key={index}>
                      <p>
                        Attendance Date:{" "}
                        {formatDate(attendance.attendance_date)}
                      </p>
                      <p>Is Present: {attendance.is_present ? "Yes" : "No"}</p>
                      <AttendanceButtons
                        onSelect={(option) =>
                          handleAttendanceSelect(option, index)
                        }
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <h2>Hifdh homework</h2>
                  <table>
                    <tbody>
                      <tr key={student.id}>
                        <td>
                          <div>
                            {Array.isArray(studentHomework) &&
                              studentHomework
                                .filter((hw) => hw.students_id === student.id) // Filter homework for the specific student
                                .map((assignment) => (
                                  <div key={assignment.homework_id}>
                                    <p>Hifdh: {assignment.assignment_name}</p>
                                    <p>Description: {assignment.description}</p>
                                    <p>Date: {assignment.due_date}</p>
                                    <GradeSelector
                                      onGradeSelect={(grade) =>
                                        handleGradeSelect(student.id, grade)
                                      }
                                    />
                                    {selectedGrades[student.id] && (
                                      <p>
                                        Selected Grade:{" "}
                                        {selectedGrades[student.id]}
                                      </p>
                                    )}
                                  </div>
                                ))}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <form onSubmit={(e) => handleSubmit(e, student.id)}>
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
                    description:
                    <input
                      type="text"
                      value={formData.description}
                      onChange={(e) => handleInputChange(e, "surah")}
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
                  <button type="submit">Assign</button>
                </form>
                <div className="buttons">
                  <button
                    className="delete"
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Students;
