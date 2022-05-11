import diagnoses from "../../data/diagnoses.json";
import { DiagnoseEntry } from "../types";

const getDiagnoseEntries = (): DiagnoseEntry[] => {
  return diagnoses;
};

export default { getDiagnoseEntries };
