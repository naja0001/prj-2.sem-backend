import { Router } from "express";
import mysql from "mysql2";
import dbConfig from "../db-connect.js";

const studentsRouter = Router();

studentsRouter.get("/", (req, res) => {
  const queryString = /*sql*/ `
    SELECT * FROM students ORDER BY firstName;`;

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

studentsRouter.get("/:id/Attendance", (req, res) => {
  const id = req.params.id;

  const queryString = /*sql*/ `
    SELECT * FROM students, Attendance 
    WHERE students.id=? AND
    Attendance.id = students.id
    ORDER BY students.name;`; // sql query

  const values = [id];

  dbConfig.query(queryString, values, (error, results) => {
    if (error) {
      console.log(error);
    } else {
      res.json(results);
    }
  });
});

studentsRouter.post("/students", (req, res) => {
  try {
    const { name, firstname, lastname, email, gender, number } = req.body;
    //firstname, lastname, email, gender, number, image
    if (!firstname || !lastname || !email || !gender || !number || !image) {
      return res.status(400).json({
        error: "More info about student required, including customId",
      });
    }

    // Check if the custom ID already exists in the database
    const checkQuery = "SELECT id FROM students WHERE studentId = ?";

    dbConfig.query(checkQuery, [customId], (checkErr, checkResults) => {
      if (checkErr) {
        console.log(checkErr);
        return res
          .status(500)
          .json({ error: "An error occurred while checking student" });
      }

      if (checkResults.length > 0) {
        return res
          .status(400)
          .json({ error: "Student with custom ID already exists" });
      }

      // Create a new student in the database with the custom ID
      const insertQuery =
        "INSERT INTO students (studentId, name, firstName, lastName, email, gender, number) VALUES (?, ?, ?, ?, ?, ?, ?)";

      dbConfig.query(
        insertQuery,
        [studentId, name, firstName, lastName, email, gender, number],
        (insertErr, result) => {
          if (insertErr) {
            console.log(insertErr);
            res
              .status(500)
              .json({ error: "An error occurred while creating this student" });
          } else {
            const newStudentId = result.insertId;
            res.status(201).json({
              id: newStudentId,
              message: "Student created successfully",
            });
          }
        }
      );
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

studentsRouter.put("/:id", (request, response) => {
  try {
    // Udtræk opdaterede kunstneroplysninger fra anmodningens krop
    const { studentId, name, firstName, lastName, email, gender, number } =
      request.body;

    if (
      !studentId ||
      !name ||
      !firstName ||
      !lastName ||
      !email ||
      !gender ||
      !number
    ) {
      return response
        .status(400)
        .json({ error: "more info about student is required" });
    }

    // Opdater kunstneren i artists-tabellen
    const updateQuery = /*sql*/ `
      UPDATE artists
      SET studentId =?, name=?, firstName=?, lastName=?, email=?, gender=?, number=?
      WHERE student.id = ?;
      `;

    dbConfig.query(
      updateQuery,
      [studentId, name, firstName, lastName, email, gender, number],
      (updateErr) => {
        if (updateErr) {
          console.log(updateErr);
          response.status(500).json({
            error: "An error occurred while updating the student",
          });
        } else {
          response.status(200).json({
            artistId,
            message: "student updated successfully",
          });
        }
      }
    );
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal server error" });
  }
});

studentsRouter.delete("/:id", (request, response) => {
  try {
    const studentId = request.params.id;

    // Slet kunstneren fra artists-tabellen
    const deleteArtistQuery = /*sql*/ `
      DELETE FROM student
      WHERE id = ?;
    `;

    dbConfig.query(deleteArtistQuery, [studentId], (deleteErr) => {
      if (deleteErr) {
        console.error(deleteErr);
        response.status(500).json({ message: "Internal server error" });
      } else {
        // Hvis du vil slette eventuelle tilknyttede data, f.eks. sange eller albums, skal du håndtere det her.
        response.json({ message: "Student deleted successfully" });
      }
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal server error" });
  }
});

export default studentsRouter;
