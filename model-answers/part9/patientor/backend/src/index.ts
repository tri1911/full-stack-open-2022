import express from "express";
import cors from "cors";

import diagnoseRoutes from "./routes/diagnoses";
import patientRoutes from "./routes/patients";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send({ message: "pong" });
});

app.use("/api/diagnoses", diagnoseRoutes);
app.use("/api/patients", patientRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
