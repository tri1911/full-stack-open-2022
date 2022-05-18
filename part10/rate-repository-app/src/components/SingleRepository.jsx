import { useParams } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import { useApolloClient } from "@apollo/client";
import { GET_SINGLE_REPOSITORY } from "../graphql/queries";
import { useState } from "react";

import { FlatList } from "react-native";
import { ItemSeparator } from "./RepositoryList";
import ReviewItem from "./ReviewItem";

// TODO: fetch data using useQuery

const SingleRepository = () => {
  const [repository, setRepository] = useState(null);
  const { id } = useParams();
  const apolloClient = useApolloClient();

  apolloClient
    .query({ query: GET_SINGLE_REPOSITORY, variables: { repositoryId: id } })
    .then(({ data }) => {
      // console.log("[SingleRepository] returned repository:", data.repository);
      setRepository(data.repository);
    });

  const reviews = repository?.reviews.edges.map((edge) => edge.node) ?? [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <RepositoryItem repository={repository} openBtn />
      )}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default SingleRepository;
