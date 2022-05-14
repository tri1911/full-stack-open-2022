/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  NewPatient,
  Gender,
  Entry,
  TypedBaseEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
  HealthCheckRating,
} from "./types";

const parseField = (value: unknown, field: string): string => {
  if (!value || !isString(value)) {
    throw new Error("Incorrect or missing " + field);
  }

  return value;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isArray = (data: unknown): data is unknown[] => {
  return Array.isArray(data);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntry = (data: any): data is TypedBaseEntry => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { id, description, specialist, diagnosisCodes, type } = data;

  if (!type || !isString(type)) {
    throw new Error("Incorrect or missing entry type: " + JSON.stringify(data));
  }
  if (id !== undefined && !isString(id)) {
    throw new Error("Incorrect entry id: " + JSON.stringify(data));
  }
  if (!description || !isString(description)) {
    throw new Error(
      "Incorrect or missing entry description: " + JSON.stringify(data)
    );
  }
  if (!specialist || !isString(specialist)) {
    throw new Error(
      "Incorrect or missing entry specialist: " + JSON.stringify(data)
    );
  }

  if (diagnosisCodes) {
    if (!isArray(diagnosisCodes)) {
      throw new Error("Incorrect diagnosisCodes: " + JSON.stringify(data));
    }

    for (const code of diagnosisCodes) {
      if (!isString(code)) {
        throw new Error("Incorrect or missing entry diagnostics code: " + code);
      }
    }
  }

  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isOccupationalHealthcareEntry = (
  data: any
): data is OccupationalHealthcareEntry => {
  const { employerName, sickLeave } = data;

  if (!employerName || !isString(employerName)) {
    throw new Error(
      "Incorrect OccupationalHealthcareEntry: " + JSON.stringify(data)
    );
  }

  if (!sickLeave) {
    return true;
  }

  let startDate;
  let endDate;

  try {
    startDate = sickLeave.startDate;
    endDate = sickLeave.endDate;
  } catch (e) {
    throw new Error(
      "Incorrect OccupationalHealthcareEntry: " + JSON.stringify(data)
    );
  }

  if (!startDate || !isString(startDate) || !isDate(startDate)) {
    throw new Error(
      "Incorrect OccupationalHealthcareEntry: " + JSON.stringify(data)
    );
  }

  if (!endDate || !isString(endDate) || !isDate(endDate)) {
    throw new Error(
      "Incorrect OccupationalHealthcareEntry: " + JSON.stringify(data)
    );
  }

  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHospitalEntry = (data: any): data is HospitalEntry => {
  const { discharge } = data;

  if (!discharge) {
    return true;
  }

  let date;
  let criteria;

  try {
    date = discharge.date;
    criteria = discharge.criteria;
  } catch (e) {
    throw new Error("Incorrect HospitalEntry:1" + JSON.stringify(data));
  }

  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect HospitalEntry: " + JSON.stringify(data));
  }

  if (!criteria || !isString(criteria)) {
    throw new Error("Incorrect HospitalEntry: " + JSON.stringify(data));
  }

  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckEntry = (data: any): data is HealthCheckEntry => {
  const { healthCheckRating } = data;

  if (
    healthCheckRating === undefined ||
    !isHealthCheckRating(healthCheckRating)
  ) {
    throw new Error("Incorrect entry: " + data);
  }

  return true;
};

export const parseEntry = (data: unknown): Entry => {
  if (!isEntry(data)) {
    throw new Error("Incorrect entry: " + data);
  }
  switch (data.type) {
    case "Hospital":
      if (!isHospitalEntry(data)) {
        throw new Error("Incorrect Hospital entry: " + data);
      }
      break;
    case "OccupationalHealthcare":
      if (!isOccupationalHealthcareEntry(data)) {
        throw new Error("Incorrect OccupationalHealthcare entry: " + data);
      }
      break;
    case "HealthCheck":
      if (!isHealthCheckEntry(data)) {
        throw new Error("Incorrect OccupationalHealthcare entry: " + data);
      }
      break;
    default:
      throw new Error("Incorrect entry type: " + data);
  }

  return data as Entry;
};

const parseEntries = (data: unknown): Entry[] => {
  if (!data) {
    return [];
  }

  if (!isArray(data)) {
    throw new Error("Incorrect entries: " + data);
  }

  return data.map(parseEntry);
};

type Fields = {
  name: unknown;
  gender: unknown;
  dateOfBirth: unknown;
  occupation: unknown;
  ssn: unknown;
  entries?: unknown;
};

export const toNewPatient = ({
  name,
  gender,
  dateOfBirth,
  occupation,
  ssn,
  entries,
}: Fields): NewPatient => {
  return {
    name: parseField(name, "name"),
    occupation: parseField(occupation, "occupation"),
    ssn: parseField(ssn, "ssn"),
    gender: parseGender(gender),
    dateOfBirth: parseDate(dateOfBirth),
    entries: parseEntries(entries),
  };
};
