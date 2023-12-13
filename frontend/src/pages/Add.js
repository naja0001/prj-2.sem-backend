import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles.css";

const Add = () => {
  const [student, setStudent] = useState({
    firstname: "",
    lastname: "",
    email: "",
    gender: "",
    number: null,
  });
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setStudent((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:2300/students", student);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Add New Student</h1>
      <input
        type="text"
        placeholder="Student firstname"
        name="firsname"
        onChange={handleChange}
      />
      <textarea
        type="text"
        placeholder="student lastname"
        name="lastname"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Student email"
        name="email"
        onChange={handleChange}
      />

      <select name="gender" onChange={handleChange}>
        <option value="">Select gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <input
        type="number"
        placeholder="Student number"
        name="number"
        onChange={handleChange}
      />
      <button className="formbutton" onClick={handleClick}>
        Add
      </button>
      {error && "Something went wrong!"}
      <Link to="/">See all students</Link>
    </div>
  );
};

export default Add;
