import React, { useEffect, useState } from "react";
import axios from "axios";

const Homework = () => {
  const [students, setStudents] = useState([]);
  const [studentHomework, setStudentHomework] = useState([]);
  const [formData, setFormData] = useState({
    assignment_name: "",
    description: "",
    due_date: "",
  });
  const [selectedStudentId, setSelectedStudentId] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const studentsResponse = await axios.get(
        "http://localhost:2300/students"
      );
      setStudents(studentsResponse.data);

      const homeworkResponse = await axios.get(
        "http://localhost:2300/homework"
      );
      setStudentHomework(homeworkResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const assignHomework = async (e) => {
    e.preventDefault();
    if (!selectedStudentId) return;

    try {
      const dataToInsert = {
        students_id: selectedStudentId,
        assignment_name: formData.assignment_name,
        description: formData.description,
        due_date: formData.due_date,
      };

      await axios.post(
        `http://localhost:2300/homework/${selectedStudentId}`,
        dataToInsert
      );
      fetchData();
    } catch (error) {
      console.error("Error assigning homework:", error.response);
    }
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Student Homework</h2>
      <div className="row">
        <div className="col-md-4 mb-4">
          <ul className="list-group">
            {students.map((student) => (
              <li
                key={student.id}
                className={`list-group-item`}
                onClick={() => setSelectedStudentId(student.id)}
              >
                {`${student.first_name} ${student.last_name}`}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              {selectedStudentId && (
                <div>
                  <h4 className="card-title">
                    {
                      students.find(
                        (student) => student.id === selectedStudentId
                      )?.first_name
                    }
                    's Homework
                  </h4>
                  <ul className="list-group">
                    {studentHomework
                      .filter((hw) => hw.students_id === selectedStudentId)
                      .map((hw, index) => (
                        <li key={index} className="list-group-item">
                          <strong>{hw.assignment_name}</strong>:{" "}
                          {hw.description} - Due: {hw.due_date}
                        </li>
                      ))}
                  </ul>
                  <form onSubmit={assignHomework} className="mt-3">
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Assignment Name"
                        value={formData.assignment_name}
                        onChange={(e) =>
                          handleInputChange(e, "assignment_name")
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Description"
                        value={formData.description}
                        onChange={(e) => handleInputChange(e, "description")}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Due Date"
                        value={formData.due_date}
                        onChange={(e) => handleInputChange(e, "due_date")}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Assign Homework
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homework;
