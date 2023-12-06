import { Router } from "express";
import mysql from "mysql2";
import dbConfig from "../db-connect.js";

const attendanceRouter = Router();

attendanceRouter.get("/", (req, res) => {
  const queryString = `
    SELECT * FROM Attendance
  `;

  dbConfig.query(queryString, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    } else {
      res.json(results);
    }
  });
});

attendanceRouter.get("/:id", (req, res) => {
  const studentsId = req.params.id;

  const queryString = /*sql*/ `
    SELECT * FROM Attendance
    WHERE students_id = ?
    ORDER BY attendance_date DESC;`;

  const values = [studentsId];

  dbConfig.query(queryString, values, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "An error occurred" });
    } else {
      // Convert 0 or 1 to boolean
      const transformAttendance = (attendance) => {
        return {
          ...attendance,
          is_present: Boolean(attendance.is_present),
        };
      };

      // Modify the results before sending the response
      const transformedResults = results.map(transformAttendance);
      res.json(transformedResults);
    }
  });
});

attendanceRouter.post("/:id", (req, res) => {
  const { class_id, attendance_date, is_present } = req.body;
  const studentsId = req.params.id;

  const insertQuery = /*sql*/ `
    INSERT INTO Attendance (students_id, class_id, attendance_date, is_present)
    VALUES (?, ?, ?, ?)`;

  const values = [studentsId, class_id, attendance_date, is_present];

  dbConfig.query(insertQuery, values, (error, result) => {
    if (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "An error occurred while adding attendance" });
    } else {
      res.status(201).json({ message: "Attendance added successfully" });
    }
  });
});

attendanceRouter.put("/:id", (req, res) => {
  const { studentsId, attendanceId } = req.params;

  const { class_id, attendance_date, is_present } = req.body;

  const updateQuery = `
    UPDATE Attendance
    SET class_id = ?, attendance_date = ?, is_present = ?
    WHERE students_id = ? AND attendance_id = ?
  `;

  const values = [
    class_id,
    attendance_date,
    is_present,
    studentsId,
    attendanceId,
  ];

  dbConfig.query(updateQuery, values, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    } else {
      res.json({ message: "Attendance updated successfully" });
    }
  });
});
attendanceRouter.delete("/:attendanceId", (req, res) => {
  const { studentsId, attendanceId } = req.params;

  const deleteQuery = `
    DELETE FROM Attendance
    WHERE students_id = ? AND attendance_id = ?
  `;

  const values = [studentsId, attendanceId];

  dbConfig.query(deleteQuery, values, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({ message: "Attendance record not found" });
      } else {
        res.json({ message: "Attendance record deleted successfully" });
      }
    }
  });
});

export default attendanceRouter;
