import React from "react";
import {
  Entry,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
  HospitalEntry,
} from "../types";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import HealingIcon from "@material-ui/icons/Healing";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetails entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated entry: ${JSON.stringify(value)}`);
};

const EntryLayout = ({ children }: { children: React.ReactNode }) => {
  const boxStyle = {
    borderStyle: "solid",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  };

  return <div style={boxStyle}>{children}</div>;
};

const HospitalEntryDetails = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <EntryLayout>
      <div>
        {entry.date} <LocalHospitalIcon />
      </div>
      <div>
        <i>{entry.description}</i>
      </div>
      <div>
        discharge at {entry.discharge.date}, criteria:{" "}
        {entry.discharge.criteria}
      </div>
      <div>diagnose by {entry.specialist}</div>
    </EntryLayout>
  );
};

const OccupationalHealthcareEntryDetails = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <EntryLayout>
      <div>
        {entry.date} <FitnessCenterIcon /> {entry.employerName}
      </div>
      <div>
        <i>{entry.description}</i>
      </div>
      <div>diagnose by {entry.specialist}</div>
    </EntryLayout>
  );
};

const HealthCheckEntryDetails = ({ entry }: { entry: HealthCheckEntry }) => {
  return (
    <EntryLayout>
      <div>
        {entry.date} <HealingIcon />
      </div>
      <div>
        <i>{entry.description}</i>
      </div>
      {[...Array(4 - entry.healthCheckRating).keys()].map((i) => (
        <FavoriteIcon key={i} color="primary" />
      ))}
      <div>diagnose by {entry.specialist}</div>
    </EntryLayout>
  );
};

export default EntryDetails;
