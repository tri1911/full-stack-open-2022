import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

import diagnoseRouter from "./routes/diagnoses";
app.use("/api/diagnoses", diagnoseRouter);

import patientRouter from "./routes/patients";
app.use("/api/patients", patientRouter);

app.get("/api/ping", (_req, res) => {
  // console.log("someone ping here");
  res.send("pong");
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
