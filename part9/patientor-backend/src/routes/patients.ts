import express from "express";
import patientService from "../services/patients";
import { NewPatient, Patient } from "../types";
import toNewPatientEntry from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(patientService.getAllPatients());
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry: NewPatient = toNewPatientEntry(req.body);
    const addedPatient: Patient = patientService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong. ";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).json(errorMessage);
  }
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const patient = patientService.getPatient(id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(400).json({ error: "user is not found" });
  }
});

export default router;
