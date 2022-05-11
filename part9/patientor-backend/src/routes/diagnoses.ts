import express from "express";
const router = express.Router();

import diagnoseService from "../services/diagnoses";

router.get("/", (_req, res) => {
  res.json(diagnoseService.getDiagnoseEntries());
});

export default router;
