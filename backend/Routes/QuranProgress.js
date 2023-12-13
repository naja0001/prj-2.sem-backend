import { Router } from "express";
import mysql from "mysql2";
import dbConfig from "../db-connect.js";

const QuranProgressRouter = Router();

QuranProgressRouter.get("/", (req, res) => {
  const queryString = `
    SELECT * FROM QuranProgress
    ORDER BY students_id, completion_date DESC;
  `;

  dbConfig.query(queryString, (error, results) => {
    if (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching Quran progress" });
    } else {
      const formattedResults = results.map((progress) => ({
        ...progress,
        is_completed: !!progress.is_completed, // Converts 0/1 to boolean
      }));
      res.json(formattedResults);
    }
  });
});

QuranProgressRouter.get("/:id", (req, res) => {
  const studentsId = req.params.id;

  const queryString = `
    SELECT * FROM QuranProgress
    WHERE students_id = ?
    ORDER BY completion_date DESC;
  `;

  const values = [studentsId];

  dbConfig.query(queryString, values, (error, results) => {
    if (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching Quran progress" });
    } else {
      const formattedResults = results.map((progress) => ({
        ...progress,
        is_completed: !!progress.is_completed, // Converts 0/1 to boolean
      }));
      res.json(formattedResults);
    }
  });
});

QuranProgressRouter.post("/", (req, res) => {
  const { students_id, chapter_number, is_completed, completion_date, grade } =
    req.body;

  // Assuming is_completed is received as a boolean in the request body
  const isCompletedValue = is_completed ? 1 : 0;

  const insertQuery = `
    INSERT INTO QuranProgress (students_id, chapter_number, is_completed, completion_date, grade)
    VALUES (?, ?, ?, ?, ?)
  `;

  const values = [
    students_id,
    chapter_number,
    isCompletedValue,
    completion_date,
    grade,
  ];

  dbConfig.query(insertQuery, values, (error, results) => {
    if (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while creating Quran progress" });
    } else {
      res.status(201).json({ message: "Quran progress created successfully" });
    }
  });
});

QuranProgressRouter.put("/:id", (req, res) => {
  const progressId = req.params.id;
  const { students_id, chapter_number, is_completed, completion_date, grade } =
    req.body;

  // Assuming is_completed is received as a boolean in the request body
  const isCompletedValue = is_completed ? 1 : 0;

  const updateQuery = `
    UPDATE QuranProgress
    SET students_id = ?, chapter_number = ?, is_completed = ?, completion_date = ?, grade = ?
    WHERE progress_id = ?
  `;

  const values = [
    students_id,
    chapter_number,
    isCompletedValue,
    completion_date,
    grade,
    progressId,
  ];

  dbConfig.query(updateQuery, values, (error, results) => {
    if (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while updating Quran progress" });
    } else {
      res.json({ message: "Quran progress updated successfully" });
    }
  });
});

QuranProgressRouter.delete("/:id", (req, res) => {
  const progressId = req.params.id;

  const deleteQuery = `
    DELETE FROM QuranProgress
    WHERE progress_id = ?
  `;

  const values = [progressId];

  dbConfig.query(deleteQuery, values, (error, results) => {
    if (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while deleting Quran progress" });
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({ message: "Quran progress record not found" });
      } else {
        res.json({ message: "Quran progress record deleted successfully" });
      }
    }
  });
});

export default QuranProgressRouter;
