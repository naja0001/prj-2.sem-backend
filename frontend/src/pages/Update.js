import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [student, setStudents] = useState({
    firstname: "",
    lastname: "",
    email: "",
    gender: "",
    number: null,
    image: "",
  });
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const StudentsId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setStudents((prev) => ({ ...prev, [e.target.firstname]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:2300/students/" + StudentsId, student);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Update The Student</h1>
      <input
        type="text"
        placeholder="Students firstname"
        name="firstname"
        onChange={handleChange}
      />
      <textarea
        rows={5}
        type="text"
        placeholder="Student lastname"
        name="lastname"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Students email"
        name="email"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Students number"
        name="number"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Students image"
        name="image"
        onChange={handleChange}
      />
      <button className="formbutton" onClick={handleClick}>
        Update
      </button>
      {error && "Something went wrong!"}
      <Link to="/">See all Students</Link>
    </div>
  );
};

export default Update;
