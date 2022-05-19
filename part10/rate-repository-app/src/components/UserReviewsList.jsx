import { FlatList, Alert } from "react-native";
import ReviewItem from "./ReviewItem";

import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../graphql/queries";
import { ItemSeparator } from "./RepositoryList";
import useDeleteReview from "../hooks/useDeleteReview";

export const ReviewsListContainer = ({ reviews, handleDeleteReview }) => {
  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];

  const handleDeletePressed = (deleteReviewId) => () => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("[ReviewsListContainer] Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => handleDeleteReview(deleteReviewId),
        },
      ]
    );
  };

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => (
        <ReviewItem
          review={item}
          inReviewsList
          handleDeletePressed={handleDeletePressed(item.id)}
        />
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

const UserReviewsList = () => {
  const { data, refetch } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true },
  });

  const deleteReview = useDeleteReview();

  const handleDeleteReview = async (deleteReviewId) => {
    await deleteReview(deleteReviewId);
    console.log(
      `[UserReviewsList] Deleted the review with id ${deleteReviewId}. Refetching the list...`
    );
    refetch({ includeReviews: true });
  };

  return (
    <ReviewsListContainer
      reviews={data?.me.reviews}
      handleDeleteReview={handleDeleteReview}
    />
  );
};

export default UserReviewsList;
