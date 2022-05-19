import { useParams } from "react-router-native";
import { FlatList } from "react-native";

import RepositoryItem from "./RepositoryItem";
import { ItemSeparator } from "./RepositoryList";
import ReviewItem from "./ReviewItem";

import useRepository from "../hooks/useRepository";

const SingleRepository = () => {
  const { id } = useParams();

  const { repository, fetchMoreReviews } = useRepository({
    repositoryId: id,
    first: 4,
  });
  // console.log("[SingleRepository] returned repository:", data.repository);

  const reviews = repository?.reviews.edges.map((edge) => edge.node) ?? [];

  const handleEndReached = () => {
    console.log("[SingleRepository] reviews list has reached end");
    fetchMoreReviews();
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <RepositoryItem repository={repository} openBtn />
      )}
      ItemSeparatorComponent={ItemSeparator}
      onEndReachedThreshold={0.1}
      onEndReached={handleEndReached}
    />
  );
};

export default SingleRepository;
