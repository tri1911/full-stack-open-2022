import express from "express";
import patientService from "../services/patients";
import { EntryWithoutId, NewPatient, Patient } from "../types";
import { toNewEntry, toNewPatient } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(patientService.getAllPatients());
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry: NewPatient = toNewPatient(req.body);
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

// Exercise 9.23
router.post("/:id/entries", (req, res) => {
  try {
    // parse the user input before adding into entries list's patient
    const newEntry: EntryWithoutId = toNewEntry(req.body);
    const addedEntry = patientService.addEntry(req.params.id, newEntry);
    if (addedEntry) {
      res.json(addedEntry);
    } else {
      res.status(400).send({ error: "the patient does not exist" });
    }
  } catch (error: unknown) {
    let errorMessage = "There is something wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).json({ error: errorMessage });
  }
});

export default router;
