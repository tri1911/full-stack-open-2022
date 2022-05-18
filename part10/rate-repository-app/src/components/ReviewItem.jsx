import { format } from "date-fns";
import { StyleSheet, View } from "react-native";
import Text from "./Text";

import theme from "../theme";

const RATING_SIZE = 40;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
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
});

const ReviewItem = ({ review }) => {
  const {
    rating,
    user: { username },
    createdAt,
    text,
  } = review;

  return (
    <View style={styles.container}>
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
          {username}
        </Text>
        <Text style={styles.createdAtText} color="textSecondary">
          {format(new Date(createdAt), "dd.MM.yyyy")}
        </Text>
        <Text style={styles.reviewText}>{text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
