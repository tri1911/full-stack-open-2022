import { Diagnosis } from "../types";
import diagnoses from "../../data/diagnoses";

const getAll = (): Diagnosis[] => {
  return diagnoses;
};

export default {
  getAll,
};
