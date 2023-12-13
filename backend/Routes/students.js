import { Router } from "express";
import mysql from "mysql2";
import dbConfig from "../db-connect.js";

const studentsRouter = Router();

studentsRouter.get("/", (req, res) => {
  const queryString = /*sql*/ `
    SELECT * FROM students ORDER BY firstname;`;

  dbConfig.query(queryString, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "An error occurred" });
    } else {
      res.json(results);
    }
  });
});

studentsRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  const queryString = /*sql*/ `
    SELECT * 
    FROM students
    WHERE id=?;`;
  const values = [id];

  dbConfig.query(queryString, values, (error, results) => {
    if (error) {
      console.log(error);
    } else {
      res.json(results[0]);
    }
  });
});

studentsRouter.post("/", (req, res) => {
  const { firstname, lastname, email, gender, number } = req.body;

  // Validering af numerisk 'number'
  const numericNumber = parseFloat(number);

  if (isNaN(numericNumber)) {
    return res.status(400).json({
      error: "Invalid 'number' format. Please provide a valid number.",
    });
  }

  // Opret forbindelse til databasen og udfør indsættelsen af data

  const insertQuery =
    "INSERT INTO Students (`firstname`, `lastname`, `email`, `gender`, `number`) VALUES (?, ?, ?, ?, ?)";
  const values = [firstname, lastname, email, gender, number];

  dbConfig.query(insertQuery, values, (err, data) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "An error occurred while creating the student" });
    }
    return res
      .status(201)
      .json({ message: "Student has been created successfully" });
  });
});

studentsRouter.delete("/:id", (req, res) => {
  const studentid = req.params.id;

  // Validering af studentId (her antages det, at studentId skal være en numerisk værdi)
  if (!studentid || isNaN(studentid)) {
    return res.status(400).json({ message: "Invalid student ID" });
  }

  const deleteQuery = "DELETE FROM students WHERE id = ?";

  dbConfig.query(deleteQuery, [studentid], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to delete student" });
    }

    if (data.affectedRows === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted successfully" });
  });
});

//{ firstname, lastname, email, gender, number, image
studentsRouter.put("/:id", (req, res) => {
  const studentId = req.params.id;
  const q =
    "UPDATE students SET `firstname`= ?, `lastname`= ?, `email`= ?, `gender`= ?, `number`= ? WHERE id =?";

  const values = [
    req.body.firstname,
    req.body.lastname,
    req.body.email,
    req.body.gender,
    req.body.number,
  ];

  dbConfig.query(q, [...values, studentId], (err, data) => {
    if (err) return res.json(err);
    return res.json("student has been updated successfully");
  });
});

export default studentsRouter;
