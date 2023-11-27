import express from "express";
import dbConfig from "./db-connect.js";
import cors from "cors";
import studentsRouter from "./Routes/students.js";
import TeacherRouter from "./Routes/Teacher.js";

const app = express();

//by default we cant send any data to our express server, so we use
app.use(express.json());
//it allows us to send any json file using a client
app.use(cors());

app.use("/students", studentsRouter);
app.use("/Teacher", TeacherRouter);

app.listen(5005, () => {
  console.log("connected to backend");
});

app.get("/", (req, res) => {
  res.json("hello this is the backend");
});
