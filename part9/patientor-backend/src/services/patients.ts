import data from "../../data/patients.json";
import {
  PatientEntry,
  NonSensitivePatientEntry,
  NewPatientEntry,
} from "../types";
import { v1 as uuid } from "uuid";
import toNewPatientEntry from "../utils";

const patients: PatientEntry[] = data.map((rawObj) => {
  const parsedObj = toNewPatientEntry(rawObj) as PatientEntry;
  parsedObj.id = rawObj.id;
  return parsedObj;
});

const getPatientEntries = (): PatientEntry[] => {
  return patients;
};

const getNonSensitivePatientEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return { id, name, dateOfBirth, gender, occupation };
  });
};

const addPatient = (newEntry: NewPatientEntry): PatientEntry => {
  const id = uuid();
  const addedPatient = { ...newEntry, id };
  patients.push(addedPatient);
  return addedPatient;
};

export default { getPatientEntries, getNonSensitivePatientEntries, addPatient };
