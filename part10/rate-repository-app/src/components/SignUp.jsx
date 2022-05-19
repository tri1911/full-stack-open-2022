import { Formik } from "formik";
import { StyleSheet, View } from "react-native";
import * as yup from "yup";

import FormikTextInput from "./FormikTextInput";
import Button from "./Button";
import useSignUp from "../hooks/useSignUp";
import { useNavigate } from "react-router-native";
import useSignIn from "../hooks/useSignIn";

const styles = StyleSheet.create({
  container: { padding: 15, backgroundColor: "white" },
  fieldContainer: { marginBottom: 15 },
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <FormikTextInput name="username" placeholder="Username" />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput
          name="password"
          placeholder="Password"
          secureTextEntry
        />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput
          name="passwordConfirmation"
          placeholder="Password confirmation"
          secureTextEntry
        />
      </View>
      <Button onPress={onSubmit}>Sign Up</Button>
    </View>
  );
};

const initialValues = { username: "", password: "", passwordConfirmation: "" };

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, "Username should have the length greater than or equal 1")
    .max(30, "Username should have the length less than or equal 30")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password should have the length greater than or equal 5")
    .max(50, "Password should have the length less than or equal 50")
    .required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password confirmation is not matched")
    .required("Password confirmation is required"),
});

const SignUp = () => {
  const createUser = useSignUp();
  const navigate = useNavigate();
  const [signIn] = useSignIn();

  const handleSubmit = async (values) => {
    // console.log("[SignUp] values to submit:", values);
    try {
      const { username, password } = values;
      await createUser({ username, password });
      await signIn({ username, password });
      navigate("/", { replace: true });
    } catch (error) {
      console.error("[SignUp] error:", error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUp;
