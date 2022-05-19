import { useQuery } from "@apollo/client";
// import { useState } from "react";
// import { useApolloClient } from "@apollo/client";

import { GET_REPOSITORIES } from "../graphql/queries";

// use useQuery to fetch data from GraphQL
const useRepositories = (variables) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: "cache-and-network",
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

/*
  const useRepositories = (variables) => {
    const [repositories, setRepositories] = useState();
    const apolloClient = useApolloClient();

    apolloClient
      .query({
        query: GET_REPOSITORIES,
        variables,
      })
      .then(({ data }) => {
        setRepositories(data.repositories);
      });

    return { repositories };
  };
*/

export default useRepositories;
