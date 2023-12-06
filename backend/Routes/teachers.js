import { Router } from "express";
import mysql from "mysql2";
import dbConfig from "../db-connect.js";

const teachersRouter = Router();

teachersRouter.get("/", (req, res) => {
  const queryString = /*sql*/ `
    SELECT * FROM Teachers ORDER BY firstname;`;

  dbConfig.query(queryString, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "An error occurred" });
    } else {
      res.json(results);
    }
  });
});

teachersRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  const queryString = /*sql*/ `
    SELECT * 
    FROM Teachers
    WHERE id=?;`;
  const values = [id];
  //firstname, lastname, email, number
  dbConfig.query(queryString, values, (error, results) => {
    if (error) {
      console.log(error);
    } else {
      res.json(results[0]);
    }
  });
});

teachersRouter.post("/", (req, res) => {
  const { firstname, lastname, email, number } = req.body;
  //firstname, lastname, email, number
  // Validering af numerisk 'number'
  const numericNumber = parseFloat(number);

  if (isNaN(numericNumber)) {
    return res.status(400).json({
      error: "Invalid 'number' format. Please provide a valid number.",
    });
  }

  // Opret forbindelse til databasen og udfør indsættelsen af data
  const insertQuery =
    "INSERT INTO Teachers (`firstname`, `lastname`, `email`, `number`) VALUES (?, ?, ?, ?)";
  const values = [firstname, lastname, email, number];

  dbConfig.query(insertQuery, values, (err, data) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "An error occurred while creating the teacher" });
    }
    return res
      .status(201)
      .json({ message: "teacher has been created successfully" });
  });
});

teachersRouter.delete("/:id", (req, res) => {
  const teacherid = req.params.id;

  // Validering af studentId (her antages det, at studentId skal være en numerisk værdi)
  if (!teacherid || isNaN(teacherid)) {
    return res.status(400).json({ message: "Invalid teacher ID" });
  }

  const deleteQuery = "DELETE FROM Teachers WHERE id = ?";

  dbConfig.query(deleteQuery, [teacherid], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to delete teacher" });
    }

    if (data.affectedRows === 0) {
      return res.status(404).json({ message: "teacher not found" });
    }

    res.json({ message: "teacher deleted successfully" });
  });
});
//{ firstname, lastname, email, gender, number, image
teachersRouter.put("/:id", (req, res) => {
  const teacherId = req.params.id;
  const q =
    "UPDATE Teachers SET `firstname`= ?, `lastname`= ?, `email`= ?, `number`= ? WHERE id = ?";
  const values = [
    req.body.firstname,
    req.body.lastname,
    req.body.email,
    req.body.number,
    teacherId, // Tilføj teacherId til slutningen af values-arrayet
  ];

  dbConfig.query(q, values, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to update teacher" });
    }
    return res.json("Teacher has been updated successfully");
  });
});

export default teachersRouter;
