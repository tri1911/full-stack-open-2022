import React from "react";
import { Grid, Button } from "@mui/material";
import { Field, Formik, Form } from "formik";

import {
  TextField,
  DiagnosisSelection,
  SelectField,
  RatingOption,
  TypeOption,
} from "../components/FormField";
import { EntryFormValues } from "../types";
import { useStateValue } from "../state";

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const healthCheckOptions: RatingOption[] = [
  { value: 0, label: "Healthy" },
  { value: 1, label: "Low risk" },
  { value: 2, label: "High risk" },
  { value: 3, label: "Critical risk" },
];

const typeOptions: TypeOption[] = [
  { value: "HealthCheck", label: "Health check" },
  { value: "Hospital", label: "Hospital" },
  { value: "OccupationalHealthcare", label: "Occupational healthcare" },
];

const groupStyle = {
  margin: 5,
  borderStyle: "solid",
  padding: 10,
  borderRadius: 5,
};

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: "Hospital",
        date: "",
        specialist: "",
        description: "",
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: "",
        },
        discharge: {
          date: "",
          criteria: "",
        },
        healthCheckRating: 0,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <SelectField label="Type" name="type" options={typeOptions} />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="Date"
              name="date"
              component={TextField}
            />

            {values.type == "HealthCheck" && (
              <SelectField
                label="Healt check rating"
                name="healthCheckRating"
                options={healthCheckOptions}
              />
            )}

            {values.type == "Hospital" && (
              <div style={groupStyle}>
                <p>discharge</p>
                <Field
                  label="date"
                  placeholder="date"
                  name="discharge.date"
                  component={TextField}
                />
                <Field
                  label="criteria"
                  placeholder="criteria"
                  name="discharge.criteria"
                  component={TextField}
                />
              </div>
            )}

            {values.type === "OccupationalHealthcare" && (
              <>
                <Field
                  label="employer"
                  placeholder="employer"
                  name="employerName"
                  component={TextField}
                />
                <div style={groupStyle}>
                  <p>sick leave</p>
                  <Field
                    label="start date"
                    placeholder="start date"
                    name="sickLeave.startDate"
                    component={TextField}
                  />
                  <Field
                    label="end date"
                    placeholder="end date"
                    name="sickLeave.endDate"
                    component={TextField}
                  />
                </div>
              </>
            )}

            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
