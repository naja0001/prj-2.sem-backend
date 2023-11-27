import express from "express";
import cors from "cors";

const app = express();
const PORT = 5005;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("There we go");
});

app.listen(PORT, () => {
  console.log(`Serveren Kører på http://localhost:${PORT}`);
});
