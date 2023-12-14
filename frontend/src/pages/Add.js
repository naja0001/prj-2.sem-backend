import React, { useState } from "react";
import axios from "axios";

const Add = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    gender: "",
    number: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:2300/students", formData);
      // Handle success - redirect, show notification, etc.
      console.log("Student added successfully!");
    } catch (error) {
      console.error("Error adding student:", error);
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
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="firstname" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="firstname"
            value={formData.firstname}
            onChange={(e) => handleInputChange(e, "firstname")}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastname" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="lastname"
            value={formData.lastname}
            onChange={(e) => handleInputChange(e, "lastname")}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={formData.email}
            onChange={(e) => handleInputChange(e, "email")}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">
            Gender
          </label>
          <select
            className="form-select"
            id="gender"
            value={formData.gender}
            onChange={(e) => handleInputChange(e, "gender")}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="number" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            className="form-control"
            id="number"
            value={formData.number}
            onChange={(e) => handleInputChange(e, "number")}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Student
        </button>
      </form>
    </div>
  );
};

export default Add;
