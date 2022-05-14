import patients from "../../data/patients";
import {
  Patient,
  PublicPatient,
  NewPatient,
  EntryWithoutId,
  Entry,
} from "../types";
import { v1 as uuid } from "uuid";
// import toNewPatientEntry from "../utils";

// const patients: Patient[] = data.map((rawObj) => {
//   const parsedObj = toNewPatientEntry(rawObj) as Patient;
//   parsedObj.id = rawObj.id;
//   return parsedObj;
// });

const getAllPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return { id, name, dateOfBirth, gender, occupation };
  });
};

const addPatient = (newEntry: NewPatient): Patient => {
  const id = uuid();
  const addedPatient = { ...newEntry, entries: [], id };
  patients.push(addedPatient);
  return addedPatient;
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};

const addEntry = (id: string, newEntry: EntryWithoutId): Entry | undefined => {
  const patient = patients.find((p) => p.id === id);
  if (patient !== undefined) {
    const createdEntry = { ...newEntry, id: uuid() };
    patients.map((patient) =>
      patient.id === id ? patient.entries.push(createdEntry) : patient
    );
    return createdEntry;
  }
  return undefined;
};

export default {
  getAllPatients,
  addPatient,
  getPatient,
  addEntry,
};
