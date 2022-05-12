import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { setPatient, useStateValue } from "../state";
import { Patient } from "../types";
import EntryDetails from "./EntryDetails";
import { Button } from "@material-ui/core";

const PatientDetailsPage = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id && (!patient || patient.id !== id)) {
      const fetchPatientDetails = async () => {
        const { data: fetchedPatient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatient(fetchedPatient));
      };
      void fetchPatientDetails();
    }
  }, []);

  if (!patient) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>{patient.name}</h2>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <h3>entries</h3>
      {patient.entries.map(
        (entry) => (
          <EntryDetails key={entry.id} entry={entry} />
        )
        // (
        //   <div key={entry.id}>
        //     <p>
        //       {entry.date} <i>{entry.description}</i>
        //     </p>
        //     <ul>
        //       {entry.diagnosisCodes?.map((code) => (
        //         <li key={code}>
        //           {code} {diagnoses[code]?.name}
        //         </li>
        //       ))}
        //     </ul>
        //   </div>
        // );
      )}
      <Button variant="contained">Add New Entry</Button>
    </div>
  );
};

export default PatientDetailsPage;
