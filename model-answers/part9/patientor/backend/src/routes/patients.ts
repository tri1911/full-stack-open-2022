import express from "express";
import patientService from "../services/patientService";
import { toNewPatient, parseEntry } from "../util";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getAll());
});

router.get("/:id", (req, res) => {
  res.send(patientService.getById(req.params.id));
});

router.post("/", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = toNewPatient(req.body);

    const savedPatient = patientService.addPatient(newPatient);

    console.log(savedPatient);
    res.send(savedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const entry = parseEntry(req.body);
    const patient = patientService.addEntry(req.params.id, entry);

    if (!patient) {
      return res.status(404).end();
    }

    return res.send(patient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    return res.status(400).send(errorMessage);
  }
});

export default router;
