import {
  EntryType,
  EntryWithoutId,
  Gender,
  HealthCheckRating,
  NewPatient,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }
  return occupation;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param as Gender);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatient = (obj: any): NewPatient => {
  return {
    name: parseName(obj.name),
    dateOfBirth: parseDate(obj.dateOfBirth),
    gender: parseGender(obj.gender),
    ssn: parseSSN(obj.ssn),
    occupation: parseOccupation(obj.occupation),
  };
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or missing description");
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect or missing specialist");
  }
  return specialist;
};

const isEntryType = (type: string): type is EntryType => {
  return ["HealthCheck", "OccupationalHealthcare", "Hospital"].includes(type);
};

const parseType = (type: unknown): EntryType => {
  if (!type || !isString(type) || !isEntryType(type)) {
    throw new Error("Incorrect or missing type: " + type);
  }
  return type;
};

const isHealthCheckRating = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  healthCheckRating: any
): healthCheckRating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(
    healthCheckRating as HealthCheckRating
  );
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (
    healthCheckRating === undefined ||
    !isHealthCheckRating(healthCheckRating)
  ) {
    throw new Error(
      "Incorrect or missing healthCheckRating: " + healthCheckRating
    );
  }
  return healthCheckRating;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error("Incorrect or missing employerName");
  }
  return employerName;
};

const parseCriteria = (criteria: unknown): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error("Incorrect or missing criteria");
  }
  return criteria;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const parseDischarge = (discharge: any): { date: string; criteria: string } => {
//   if (!discharge) {
//     throw new Error("Missing discharge");
//   }
//   return {
//     date: parseDate(discharge.date),
//     criteria: parseCriteria(discharge.criteria),
//   };
// };

const parseDiagnosisCodes = (diagnosisCodes: unknown): string[] => {
  if (!Array.isArray(diagnosisCodes) || !diagnosisCodes.every(isString)) {
    throw new Error("Incorrect diagnosisCodes");
  }
  return diagnosisCodes;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (obj: any): EntryWithoutId => {
  const description = parseDescription(obj.description);
  const date = parseDate(obj.date);
  const specialist = parseSpecialist(obj.specialist);
  const type = parseType(obj.type);
  const diagnosisCodes = parseDiagnosisCodes(obj.diagnosisCodes);

  switch (type) {
    case "HealthCheck":
      return {
        description,
        date,
        specialist,
        diagnosisCodes,
        type,
        healthCheckRating: parseHealthCheckRating(obj.healthCheckRating),
      };
    case "OccupationalHealthcare":
      return {
        description,
        date,
        specialist,
        diagnosisCodes,
        type,
        employerName: parseEmployerName(obj.employerName),
        sickLeave: {
          startDate: parseDate(obj.startDate),
          endDate: parseDate(obj.endDate),
        },
      };
    case "Hospital":
      return {
        description,
        date,
        specialist,
        diagnosisCodes,
        type,
        discharge: {
          date: parseDate(obj.dischargeDate),
          criteria: parseCriteria(obj.dischargeCriteria),
        },
      };
  }
};
