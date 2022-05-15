import { Formik } from "formik";
import * as yup from "yup";
import { View, Pressable, StyleSheet } from "react-native";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";

import theme from "../theme";

const initialValues = {
  username: "",
  password: "",
};

const styles = StyleSheet.create({
  container: { padding: 15, backgroundColor: "white" },
  button: {
    alignSelf: "stretch",
    overflow: "hidden",
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    color: "white",
    padding: 10,
    textAlign: "center",
    marginVertical: 10,
  },
});

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  const validationSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <Pressable onPress={onSubmit}>
        <Text fontWeight="bold" style={styles.button}>
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
