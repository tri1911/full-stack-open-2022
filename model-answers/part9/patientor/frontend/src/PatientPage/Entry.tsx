import React from "react";
import { Entry } from "../types";
import { useStateValue } from "../state";
import { LocalHospital, MedicalServices, Work } from "@mui/icons-material";
import { Favorite } from "@mui/icons-material";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  let icon;
  let details;
  switch (entry.type) {
    case "Hospital":
      icon = <LocalHospital />;
      details = entry.discharge && (
        <div>
          discharged {entry.discharge.date}: {entry.discharge.criteria}
        </div>
      );
      break;
    case "HealthCheck":
      const colors = {
        0: "green",
        1: "yellow",
        2: "orange",
        3: "red",
      };
      icon = <MedicalServices />;
      details = <Favorite htmlColor={colors[entry.healthCheckRating]} />;
      break;
    case "OccupationalHealthcare":
      icon = (
        <i>
          <Work /> {entry.employerName}
        </i>
      );
      details = entry.sickLeave && (
        <div style={{ marginTop: 3, marginBottom: 3 }}>
          sickleave from {entry.sickLeave.startDate} to{" "}
          {entry.sickLeave.endDate}
        </div>
      );
      break;
    default:
      return assertNever(entry);
  }
  return (
    <>
      {entry.date} {icon}
      <div style={{ marginTop: 3, marginBottom: 3 }}>
        <i>{entry.description}</i>
      </div>
      {details}
    </>
  );
};

const EntryComponent = ({ entry }: { entry: Entry }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <div
      style={{
        marginTop: 10,
        borderWidth: 1,
        borderStyle: "solid",
        padding: 4,
        borderRadius: 5,
      }}
    >
      <EntryDetails entry={entry} />
      {entry.diagnosisCodes &&
        entry.diagnosisCodes.map((c) => (
          <li key={c}>
            {c} {diagnoses[c].name}
          </li>
        ))}
      <div style={{ marginTop: 5 }}>diagnose by {entry.specialist}</div>
    </div>
  );
};

export default EntryComponent;
