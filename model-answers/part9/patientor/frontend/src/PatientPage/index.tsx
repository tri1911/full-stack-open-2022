import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import { Male, Female, QuestionMark } from "@mui/icons-material";
import { Button } from "@mui/material";

import { apiBaseUrl } from "../constants";
import { Patient, EntryFormValues } from "../types";
import { updatePatient } from "../state";
import Entry from "./Entry";
import AddEntryModal from "../AddEntryModal";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients, diagnoses }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        if (id) {
          const { data: patientFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(updatePatient(patientFromApi));
        }
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatient();
  }, [id]);

  const submitNewEntry = async (values: EntryFormValues) => {
    const newEntry = { ...values };
    if (values.sickLeave?.startDate.length == 0) {
      delete newEntry.sickLeave;
    }
    if (values.discharge?.date.length == 0) {
      delete newEntry.discharge;
    }

    try {
      if (id) {
        const { data: updatedPatient } = await axios.post<Patient>(
          `${apiBaseUrl}/patients/${id}/entries`,
          newEntry
        );
        dispatch({ type: "UPDATE_PATIENT", payload: updatedPatient });
        closeModal();
      }
    } catch (e: unknown) {
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

  if (
    !id ||
    !patients[id] ||
    !patients[id].entries ||
    Object.keys(diagnoses).length === 0
  )
    return null;

  const genderIcons = {
    male: <Male />,
    female: <Female />,
    other: <QuestionMark />,
  };

  const { name, gender, occupation, ssn, entries } = patients[id];

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <div className="App">
      <h2>
        {name} {genderIcons[gender]}
      </h2>

      <div>ssh: {ssn}</div>
      <div>occupation: {occupation}</div>

      <div>
        <h3>entries</h3>
        {entries.map((e) => (
          <Entry key={e.id} entry={e} />
        ))}
      </div>

      <AddEntryModal
        modalOpen={modalOpen}
        error={error}
        onClose={closeModal}
        onSubmit={submitNewEntry}
      />

      <Button
        variant="contained"
        style={{ marginTop: 15 }}
        onClick={() => openModal()}
      >
        Add New Entry
      </Button>
    </div>
  );
};

export default PatientPage;
