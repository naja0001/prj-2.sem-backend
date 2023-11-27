import express from "express";
import dbConfig from "./db-connect.js";
import cors from "cors";
import StudentsRouter from "./Routes/students.js";
import TeacherRouter from "./Routes/Teacher.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/students", StudentsRouter);
app.use("/teacher", TeacherRouter);

app.get("/", (req, res) => {
  res.json("hello this is the backend");
});

app.listen(5005, () => {
  console.log("connected to backend");
});
