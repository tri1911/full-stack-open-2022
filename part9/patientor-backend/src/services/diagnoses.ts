import diagnoses from "../../data/diagnoses.json";
import { Diagnosis } from "../types";

const getDiagnoseEntries = (): Diagnosis[] => {
  return diagnoses;
};

export default { getDiagnoseEntries };
