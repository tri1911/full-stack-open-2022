import { Button, Grid } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import React from "react";
import {
  TextField,
  DiagnosisSelection,
  SelectField,
  Option,
} from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { Entry, EntryType, HealthCheckRating } from "../types";

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;
export type EntryFormValues = UnionOmit<Entry, "id">;
// export type EntryFormValues = Omit<HealthCheckEntry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const healthCheckRatingOptions: Option[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "LowRisk" },
  { value: HealthCheckRating.HighRisk, label: "HighRisk" },
  { value: HealthCheckRating.CriticalRisk, label: "CriticalRisk" },
];

const typeOptions: Option[] = [
  { value: EntryType.HealthCheck, label: "Healthy" },
  { value: EntryType.OccupationalHealthcare, label: "Occupational Healthcare" },
  { value: EntryType.Hospital, label: "Hospital" },
];

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  const initialValues: EntryFormValues = {
    description: "",
    date: "",
    specialist: "",
    diagnosisCodes: [],
    type: EntryType.HealthCheck,
    healthCheckRating: HealthCheckRating.Healthy,
  };

  return (
    <Formik
      initialValues={initialValues as EntryFormValues}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
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
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              diagnoses={Object.values(diagnoses)}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />

            {values.type === EntryType.HealthCheck && (
              <SelectField
                label="Health Check Rating"
                name="healthCheckRating"
                options={healthCheckRatingOptions}
              />
            )}

            {values.type === EntryType.OccupationalHealthcare && (
              <>
                <Field
                  label="Employer Name"
                  placeholder="Employer Name"
                  name="employerName"
                  component={TextField}
                />
                <Field
                  label="Sick Leave Start Date"
                  placeholder="Sick Leave Start Date"
                  name="startDate"
                  component={TextField}
                />
                <Field
                  label="Sick Leave End Date"
                  placeholder="Sick Leave End Date"
                  name="endDate"
                  component={TextField}
                />
              </>
            )}

            {values.type === EntryType.Hospital && (
              <>
                <Field
                  label="Discharge Date"
                  placeholder="Discharge Date"
                  name="dischargeDate"
                  component={TextField}
                />
                <Field
                  label="Discharge Criteria"
                  placeholder="Discharge Criteria"
                  name="dischargeCriteria"
                  component={TextField}
                />
              </>
            )}

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
                  variant="contained"
                  style={{ float: "right" }}
                  type="submit"
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
