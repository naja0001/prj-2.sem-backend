import express from "express";
import dbConfig from "./db-connect.js";
import cors from "cors";
import StudentsRouter from "./Routes/students.js";
import teachersRouter from "./Routes/teachers.js";
import attendanceRouter from "./Routes/attendance.js";
import QuranProgressRouter from "./Routes/QuranProgress.js";
import homeworkRouter from "./Routes/homework.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/students", StudentsRouter);
app.use("/teachers", teachersRouter);
app.use("/attendance", attendanceRouter);
app.use("/QuranProgress", QuranProgressRouter);
app.use("/homework", homeworkRouter);

app.get("/", (req, res) => {
  res.json("hello this is the backend");
});

app.listen(2300, () => {
  console.log("connected to backend");
});
