import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { setPatient, useStateValue } from "../state";
import { Patient, Entry } from "../types";
import EntryDetails from "./EntryDetails";
import { Button } from "@material-ui/core";
import AddPatientEntryModal from "../AddPatientEntryModel";
import { EntryFormValues } from "../AddPatientEntryModel/AddEntryForm";

const PatientDetailsPage = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  if (!id) {
    return null;
  }

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch({ type: "ADD_PATIENT_ENTRY", payload: newEntry });
      closeModal();
    } catch (e: unknown) {
      console.log("error:", e);

      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(
          String(e?.response?.data?.error) || "Unrecognized axios error"
        );
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

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
      <AddPatientEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
};

export default PatientDetailsPage;
