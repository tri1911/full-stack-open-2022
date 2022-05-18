import { Formik } from "formik";
import * as yup from "yup";
import { StyleSheet, View } from "react-native";
import FormikTextInput from "./FormikTextInput";
import Button from "./Button";
import useReview from "../hooks/useReview";
import { useNavigate } from "react-router-native";
import { useApolloClient } from "@apollo/client";

const styles = StyleSheet.create({
  container: { padding: 15, backgroundColor: "white" },
  fieldContainer: { marginBottom: 15 },
});

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <FormikTextInput name="ownerName" placeholder="Repository owner name" />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput name="repositoryName" placeholder="Repository name" />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput name="text" placeholder="Review" multiline />
      </View>
      <Button onPress={onSubmit}>Create a review</Button>
    </View>
  );
};

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .integer()
    .min(0, "Rating must be greater than or equal to 0")
    .max(100, "Rating must be less than or equal to 100")
    .required("Rating is required"),
  text: yup.string(),
});

const Review = () => {
  const [createReview] = useReview();
  const navigate = useNavigate();
  const apolloClient = useApolloClient();

  const handleSubmit = async (values) => {
    // console.log("[Review] values to submit:", values);
    const { ownerName, repositoryName, rating, text } = values;
    try {
      const createdReview = await createReview({
        ownerName,
        repositoryName,
        rating: Number(rating),
        text,
      });
      apolloClient.resetStore();
      navigate(`/repositories/${createdReview.repository.id}`);
    } catch (error) {
      console.log("[Review] error:", error.graphQLErrors[0].message);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default Review;
