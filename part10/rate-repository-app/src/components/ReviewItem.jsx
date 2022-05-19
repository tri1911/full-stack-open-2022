import { format } from "date-fns";
import { StyleSheet, View } from "react-native";
import Text from "./Text";

import theme from "../theme";
import Button from "./Button";
import { useNavigate } from "react-router-native";

const RATING_SIZE = 40;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 15,
  },
  topWrapper: {
    flexDirection: "row",
  },
  bottomWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  ratingContainer: {
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
    width: RATING_SIZE,
    height: RATING_SIZE,
    borderRadius: RATING_SIZE / 2,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  contentContainer: {
    paddingVertical: 5,
    flexShrink: 1,
  },
  ratingText: {
    color: theme.colors.primary,
  },
  usernameText: { marginBottom: 5 },
  createdAtText: { marginBottom: 10 },
  reviewText: {},
  actionBtn: {
    width: 170,
  },
});

const ReviewItem = ({ review, inReviewsList, handleDeletePressed }) => {
  const {
    rating,
    user: { username },
    createdAt,
    text,
    repositoryId,
  } = review;

  const navigate = useNavigate();

  return (
    <View style={styles.container}>
      <View style={styles.topWrapper}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText} fontWeight="bold">
            {rating}
          </Text>
        </View>
        <View style={styles.contentContainer}>
          <Text
            style={styles.usernameText}
            fontWeight="bold"
            fontSize="subheading"
          >
            {inReviewsList ? repositoryId.replace(".", "/") : username}
          </Text>
          <Text style={styles.createdAtText} color="textSecondary">
            {format(new Date(createdAt), "dd.MM.yyyy")}
          </Text>
          <Text style={styles.reviewText}>{text}</Text>
        </View>
      </View>
      {inReviewsList && (
        <View style={styles.bottomWrapper}>
          <Button
            style={styles.actionBtn}
            onPress={() => {
              navigate(`/repositories/${repositoryId}`);
            }}
          >
            View Repository
          </Button>
          <Button
            style={[styles.actionBtn, { backgroundColor: "red" }]}
            onPress={handleDeletePressed}
          >
            Delete Review
          </Button>
        </View>
      )}
    </View>
  );
};

export default ReviewItem;
