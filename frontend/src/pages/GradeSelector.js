// GradeSelector.js
import React, { useState } from "react";

const GradeSelector = () => {
  const [selectedGrade, setSelectedGrade] = useState(""); // State to hold selected grade

  const handleGradeChange = (e) => {
    setSelectedGrade(e.target.value); // Update selected grade when changed
  };

  return (
    <div>
      <label htmlFor="grade">Select Grade:</label>
      <select id="grade" value={selectedGrade} onChange={handleGradeChange}>
        <option value="">Select a Grade</option>
        <option value="Mumtaaz">Mumtaaz</option>
        <option value="Jayid Jiddan">Jayid Jiddan</option>
        <option value="Jayid">Jayid</option>
        <option value="Lam yahfad">Lam yahfad</option>
      </select>
      <p>Selected Grade: {selectedGrade}</p>
    </div>
  );
};

export default GradeSelector;
