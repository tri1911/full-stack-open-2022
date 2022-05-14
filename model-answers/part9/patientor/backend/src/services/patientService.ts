import { PublicPatient, Patient, Entry, NewPatient } from "../types";
import patients from "../../data/patients";
import { v1 as uuid } from "uuid";

const generateId = (): string => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  return uuid() as string;
};

const getAll = (): PublicPatient[] => {
  return patients.map(({ name, occupation, dateOfBirth, id, gender }) => {
    return {
      name,
      occupation,
      dateOfBirth,
      id,
      gender,
    };
  });
};

const getById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  if (!patient) {
    return undefined;
  }

  return patient;
};

const addPatient = (newPatient: NewPatient): Patient => {
  const patient = {
    ...newPatient,
    id: generateId(),
  };

  patients.push(patient);

  return patient;
};

const addEntry = (id: string, entry: Entry): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  if (!patient) {
    return undefined;
  }

  entry.id = generateId();
  patient.entries = patient.entries.concat(entry);

  return patient;
};

export default {
  getAll,
  getById,
  addEntry,
  addPatient,
};
